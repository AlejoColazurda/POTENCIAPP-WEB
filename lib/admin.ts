import "server-only"
import { redirect } from "next/navigation"
import { adminEmails, isSupabaseConfigured, serviceClient, sessionClient } from "@/lib/supabase"

export type AdminPost = {
  id: string
  slug: string
  title: string
  description: string
  tag: string
  body_md: string
  status: "draft" | "published" | "discarded"
  origin: "manual" | "ai"
  sources: { title: string; url: string }[]
  published_at: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  updated_by: string | null
}

export type Role = "owner" | "editor"

export type Member = {
  email: string
  role: Role
  active: boolean
  invited_by: string | null
  created_at: string
}

/**
 * Who may enter /admin, and with which role:
 * - ADMIN_EMAILS (env) are always owners. They can't be removed from the panel,
 *   so the founders can never lock themselves out.
 * - Active rows of `blog_members` (invited from /admin/equipo).
 * Returns null for anyone else.
 */
export async function roleFor(email: string): Promise<Role | null> {
  const e = email.trim().toLowerCase()
  if (!e) return null
  if (adminEmails().includes(e)) return "owner"
  const { data } = await serviceClient()
    .from("blog_members")
    .select("role")
    .eq("email", e)
    .eq("active", true)
    .maybeSingle()
  return (data?.role as Role | undefined) ?? null
}

/**
 * Gate for every /admin page and action: a Supabase session (opened with a
 * one-time login link) whose email still has a role. The role is re-checked on
 * every request, so deactivating a member locks them out immediately even if
 * their session cookie is still valid.
 */
export async function requireAdmin(): Promise<{ email: string; role: Role }> {
  if (!isSupabaseConfigured()) redirect("/admin/login")
  const supabase = await sessionClient()
  const { data } = await supabase.auth.getUser()
  const email = data.user?.email?.toLowerCase()
  const role = email ? await roleFor(email) : null
  if (!email || !role) redirect("/admin/login")
  return { email, role }
}

/** Team management and permanent deletion are owner-only. */
export async function requireOwner(): Promise<{ email: string; role: Role }> {
  const admin = await requireAdmin()
  if (admin.role !== "owner") redirect("/admin")
  return admin
}
