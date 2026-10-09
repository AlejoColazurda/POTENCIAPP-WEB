import "server-only"
import { redirect } from "next/navigation"
import { adminEmails, isSupabaseConfigured, sessionClient } from "@/lib/supabase"

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
}

/**
 * Gate for every /admin page and action: a Supabase session whose email is in
 * ADMIN_EMAILS. Users are created by hand in the Supabase dashboard (public
 * sign-up stays disabled), so the allowlist is a second, independent lock.
 */
export async function requireAdmin(): Promise<{ email: string }> {
  if (!isSupabaseConfigured()) redirect("/admin/login")
  const supabase = await sessionClient()
  const { data } = await supabase.auth.getUser()
  const email = data.user?.email?.toLowerCase()
  if (!email || !adminEmails().includes(email)) redirect("/admin/login")
  return { email }
}
