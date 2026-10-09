"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { fileSlugs } from "@/lib/blog"
import { generateDrafts } from "@/lib/blog-drafts"
import { requireAdmin } from "@/lib/admin"
import { adminEmails, serviceClient, sessionClient } from "@/lib/supabase"

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
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

// ---------- session ----------

export async function login(_prev: ActionState, form: FormData): Promise<ActionState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase()
  const password = String(form.get("password") ?? "")
  if (!email || !password) return { error: "Completá email y contraseña." }
  if (!adminEmails().includes(email)) return { error: "Email o contraseña incorrectos." }

  const supabase = await sessionClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: "Email o contraseña incorrectos." }
  redirect("/admin")
}

export async function logout() {
  const supabase = await sessionClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

// ---------- posts ----------

export async function savePost(_prev: ActionState, form: FormData): Promise<ActionState> {
  await requireAdmin()
  const id = String(form.get("id") ?? "") || null
  const slug = String(form.get("slug") ?? "").trim()
  const title = String(form.get("title") ?? "").trim()
  const description = String(form.get("description") ?? "").trim()
  const tag = String(form.get("tag") ?? "").trim() || "Ciberseguridad"
  const body_md = String(form.get("body_md") ?? "")

  if (!title) return { error: "El título es obligatorio." }
  if (!SLUG_RE.test(slug)) return { error: "La URL solo puede tener minúsculas, números y guiones (ej. estafas-por-whatsapp)." }
  if (fileSlugs().includes(slug)) return { error: "Esa URL ya la usa un artículo del repositorio. Elegí otra." }
  if (description.length > 200) return { error: "La descripción puede tener hasta 200 caracteres." }

  const db = serviceClient()
  const values = { slug, title, description, tag, body_md }
  const { data, error } = id
    ? await db.from("blog_posts").update(values).eq("id", id).select("id").single()
    : await db.from("blog_posts").insert(values).select("id").single()

  if (error) {
    if (error.code === "23505") return { error: "Ya existe otro artículo con esa URL." }
    return { error: error.message }
  }
  revalidateBlog()
  if (!id) redirect(`/admin/posts/${data.id}`)
  return { ok: "Guardado." }
}

export async function setStatus(id: string, status: "draft" | "published" | "discarded") {
  await requireAdmin()
  const db = serviceClient()
  const patch: Record<string, unknown> = { status }
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
  await requireAdmin()
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
