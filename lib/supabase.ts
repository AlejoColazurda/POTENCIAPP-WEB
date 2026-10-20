import "server-only"
import { cookies } from "next/headers"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { createServerClient } from "@supabase/ssr"
import { SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY, SUPABASE_URL } from "@/lib/supabase-env"

/**
 * Supabase access for the blog admin. Three clients, all server-side:
 *
 * - publicClient(): anon key, no session. Reads published posts for the
 *   public pages (RLS only lets it see status = 'published').
 * - serviceClient(): service-role key. Every admin write goes through it,
 *   and only after requireAdmin() has checked the session.
 * - sessionClient(): anon key + the visitor's auth cookies, to log in/out
 *   and to read who is logged in.
 *
 * When the env vars are missing (local dev without Supabase, or before the
 * production project is configured), isSupabaseConfigured() is false and the
 * blog falls back to the Markdown files in content/blog/.
 */

const URL = SUPABASE_URL
const ANON = SUPABASE_ANON_KEY
const SERVICE = SUPABASE_SERVICE_KEY

export function isSupabaseConfigured() {
  return Boolean(URL && ANON && SERVICE)
}

export function publicClient(): SupabaseClient | null {
  if (!URL || !ANON) return null
  return createClient(URL, ANON, { auth: { persistSession: false } })
}

export function serviceClient(): SupabaseClient {
  if (!URL || !SERVICE) throw new Error("Supabase is not configured (SUPABASE_SERVICE_ROLE_KEY)")
  return createClient(URL, SERVICE, { auth: { persistSession: false } })
}

export async function sessionClient(): Promise<SupabaseClient> {
  if (!URL || !ANON) throw new Error("Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY)")
  const store = await cookies()
  return createServerClient(URL, ANON, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        // Server Components cannot set cookies; Server Actions and Route
        // Handlers can. Reading the session from a page is still fine.
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options))
        } catch {}
      },
    },
  })
}

/** Comma-separated allowlist, e.g. "vladimir@potenciapp.com,alejo@potenciapp.com". */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}
