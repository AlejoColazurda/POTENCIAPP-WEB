"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { BLOG_CATEGORIES } from "@/lib/blog/categories"
import { fileSlugs } from "@/lib/blog/service"
import { generateDrafts, generateMonthlyRoundup } from "@/lib/blog-drafts"
import { requireAdmin, requireOwner, roleFor } from "@/lib/admin"
import { SITE_URL } from "@/lib/site"
import { adminEmails, isSupabaseConfigured, serviceClient, sessionClient } from "@/lib/supabase"

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

export type ActionState = { error?: string; ok?: string } | null

/** Every public surface that lists or renders posts. */
function revalidateBlog() {
  revalidatePath("/[locale]/blog", "page")
  revalidatePath("/[locale]/blog/[slug]", "page")
  revalidatePath("/sitemap.xml")
  revalidatePath("/llms.txt")
}

async function requestOrigin() {
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  if (!host) return SITE_URL
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
  return `${proto}://${host}`
}

/**
 * Supabase only sends login links to existing auth users (public sign-up stays
 * off), so an allowed email gets its auth user created on first use.
 */
async function ensureAuthUser(email: string) {
  const { error } = await serviceClient().auth.admin.createUser({ email, email_confirm: true })
  if (error && !/already|registered|exists/i.test(error.message)) throw new Error(error.message)
}

// ---------- session ----------

const LINK_SENT = "Si ese email tiene acceso, te llega un link para entrar. Vence en 1 hora y sirve una sola vez."

/**
 * Passwordless login: emails a one-time link. The answer is the same whether
 * or not the email has access, so the form can't be used to find out who does.
 */
export async function requestLoginLink(_prev: ActionState, form: FormData): Promise<ActionState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase()
  if (!EMAIL_RE.test(email)) return { error: "Escribí un email válido." }
  if (!(await roleFor(email))) return { ok: LINK_SENT }

  try {
    await ensureAuthUser(email)
    const supabase = await sessionClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: `${await requestOrigin()}/admin/auth/confirm` },
    })
    if (error) {
      if (error.status === 429) return { error: "Pediste muchos links seguidos. Esperá unos minutos." }
      throw error
    }
  } catch (err) {
    console.error("login link failed", err)
    return { error: "No se pudo enviar el link. Probá de nuevo en un rato." }
  }
  return { ok: LINK_SENT }
}

/**
 * Spends a login link (see app/admin/auth/confirm/page.tsx).
 * - `token_hash`: custom email template or a link an owner copied. Works on
 *   any device, even a different browser than the one that asked for it.
 * - `code`: Supabase's default template (PKCE). Same browser only.
 * The link proves who they are; the allowlist decides if they may enter.
 */
export async function confirmLogin(form: FormData) {
  const tokenHash = String(form.get("token_hash") ?? "")
  const type = String(form.get("type") ?? "")
  const code = String(form.get("code") ?? "")
  if (!isSupabaseConfigured()) redirect("/admin/login")
  const supabase = await sessionClient()

  let email: string | undefined
  if (tokenHash && (type === "email" || type === "magiclink")) {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
    if (error) redirect("/admin/login?error=link")
    email = data.user?.email
  } else if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) redirect("/admin/login?error=link")
    email = data.user?.email
  } else {
    redirect("/admin/login?error=link")
  }

  if (!email || !(await roleFor(email))) {
    await supabase.auth.signOut()
    redirect("/admin/login?error=denied")
  }
  redirect("/admin")
}

export async function logout() {
  const supabase = await sessionClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

// ---------- team (owners only) ----------

export async function addMember(_prev: ActionState, form: FormData): Promise<ActionState> {
  const { email: by } = await requireOwner()
  const email = String(form.get("email") ?? "").trim().toLowerCase()
  const role = form.get("role") === "owner" ? "owner" : "editor"
  if (!EMAIL_RE.test(email)) return { error: "Escribí un email válido." }
  if (adminEmails().includes(email)) return { error: "Ese email ya es dueño (ADMIN_EMAILS)." }

  const { error } = await serviceClient()
    .from("blog_members")
    .upsert({ email, role, active: true, invited_by: by }, { onConflict: "email" })
  if (error) return { error: error.message }
  revalidatePath("/admin/equipo")
  return { ok: `${email} ya tiene acceso. Puede pedir su link en /admin/login, o copiale uno desde la lista.` }
}

async function signOutEverywhere(email: string) {
  const db = serviceClient()
  const { data } = await db.auth.admin.listUsers({ perPage: 1000 })
  const user = data?.users.find((u) => u.email?.toLowerCase() === email)
  // Deleting the auth user revokes its refresh tokens. requireAdmin() already
  // rejects the email on its next request either way.
  if (user) await db.auth.admin.deleteUser(user.id)
}

export async function setMemberActive(email: string, active: boolean) {
  await requireOwner()
  const { error } = await serviceClient().from("blog_members").update({ active }).eq("email", email)
  if (error) throw new Error(error.message)
  if (!active) await signOutEverywhere(email)
  revalidatePath("/admin/equipo")
}

export async function removeMember(email: string) {
  await requireOwner()
  const { error } = await serviceClient().from("blog_members").delete().eq("email", email)
  if (error) throw new Error(error.message)
  await signOutEverywhere(email)
  revalidatePath("/admin/equipo")
}

/**
 * One-time login link an owner can pass on by WhatsApp or any other channel,
 * without depending on email delivery. Same expiry and single use as the
 * emailed one.
 */
export async function copyLoginLink(email: string): Promise<{ url?: string; error?: string }> {
  await requireOwner()
  if (!(await roleFor(email))) return { error: "Ese email no tiene acceso activo." }
  try {
    await ensureAuthUser(email)
    const { data, error } = await serviceClient().auth.admin.generateLink({ type: "magiclink", email })
    if (error || !data.properties?.hashed_token) return { error: error?.message ?? "No se pudo generar el link." }
    const params = new URLSearchParams({ token_hash: data.properties.hashed_token, type: "magiclink" })
    return { url: `${await requestOrigin()}/admin/auth/confirm?${params}` }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "No se pudo generar el link." }
  }
}

// ---------- posts ----------

export async function savePost(_prev: ActionState, form: FormData): Promise<ActionState> {
  const { email: by } = await requireAdmin()
  const id = String(form.get("id") ?? "") || null
  const slug = String(form.get("slug") ?? "").trim()
  const title = String(form.get("title") ?? "").trim()
  const description = String(form.get("description") ?? "").trim()
  const tag = String(form.get("tag") ?? "").trim() || "Ciberseguridad"
  const body_md = String(form.get("body_md") ?? "")
  const category = String(form.get("category") ?? "security")
  const cover_image = String(form.get("cover_image") ?? "").trim()
  const author_name = String(form.get("author_name") ?? "").trim().slice(0, 60) || "Equipo PotenciApp"

  if (!title) return { error: "El título es obligatorio." }
  if (!SLUG_RE.test(slug)) return { error: "La URL solo puede tener minúsculas, números y guiones (ej. estafas-por-whatsapp)." }
  if (fileSlugs().includes(slug)) return { error: "Esa URL ya la usa un artículo del repositorio. Elegí otra." }
  if (description.length > 200) return { error: "La descripción puede tener hasta 200 caracteres." }
  if (!(category in BLOG_CATEGORIES)) return { error: "Categoría inválida." }
  if (cover_image && !/^https:\/\/\S+$/.test(cover_image)) return { error: "La portada tiene que ser una URL https." }

  const db = serviceClient()
  const values = { slug, title, description, tag, body_md, category, cover_image, author_name, updated_by: by }
  const { data, error } = id
    ? await db.from("blog_posts").update(values).eq("id", id).select("id").single()
    : await db.from("blog_posts").insert({ ...values, created_by: by }).select("id").single()

  if (error) {
    if (error.code === "23505") return { error: "Ya existe otro artículo con esa URL." }
    return { error: error.message }
  }
  revalidateBlog()
  if (!id) redirect(`/admin/posts/${data.id}`)
  return { ok: "Guardado." }
}

export async function setStatus(id: string, status: "draft" | "published" | "discarded") {
  const { email: by } = await requireAdmin()
  const db = serviceClient()
  const patch: Record<string, unknown> = { status, updated_by: by }
  if (status === "published") {
    const { data } = await db.from("blog_posts").select("published_at").eq("id", id).single()
    if (!data?.published_at) patch.published_at = new Date().toISOString()
  }
  const { error } = await db.from("blog_posts").update(patch).eq("id", id)
  if (error) throw new Error(error.message)
  revalidateBlog()
  revalidatePath("/admin")
  revalidatePath(`/admin/posts/${id}`)
}

export async function deletePost(id: string) {
  await requireOwner()
  const { error } = await serviceClient().from("blog_posts").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidateBlog()
  redirect("/admin")
}

export async function generateNow(_prev: ActionState): Promise<ActionState> {
  await requireAdmin()
  try {
    const slugs = await generateDrafts(1)
    revalidatePath("/admin")
    return { ok: `Borrador creado: ${slugs.join(", ")}` }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "No se pudo generar el borrador." }
  }
}

export async function generateMonthlyNow(_prev: ActionState): Promise<ActionState> {
  await requireAdmin()
  try {
    const slug = await generateMonthlyRoundup()
    revalidatePath("/admin")
    return slug ? { ok: `Resumen creado: ${slug}` } : { ok: "El resumen de ese mes ya existe." }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "No se pudo generar el resumen." }
  }
}

export async function uploadImage(form: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin()
  const file = form.get("file")
  if (!(file instanceof File) || file.size === 0) return { error: "Elegí una imagen." }
  const ext = IMAGE_TYPES[file.type]
  if (!ext) return { error: "Formato no soportado (JPG, PNG, WebP o GIF)." }
  if (file.size > MAX_IMAGE_BYTES) return { error: "La imagen pesa más de 5 MB." }

  const path = `${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID()}.${ext}`
  const storage = serviceClient().storage.from("blog")
  const { error } = await storage.upload(path, file, { contentType: file.type })
  if (error) return { error: error.message }
  return { url: storage.getPublicUrl(path).data.publicUrl }
}
