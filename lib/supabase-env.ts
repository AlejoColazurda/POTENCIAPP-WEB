/**
 * Supabase settings, read once from the environment. Shared by lib/supabase.ts
 * (server) and middleware.ts (edge), so it must stay free of Node-only imports.
 *
 * Accepts the documented names and the shorter ones used in some .env files:
 *   NEXT_PUBLIC_SUPABASE_URL      (optional: derived from the key's project ref)
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY  or SUPABASE_PUBLIC_KEY
 *   SUPABASE_SERVICE_ROLE_KEY      or SUPABASE_SERVICE_ROLE
 */

function projectRef(jwt: string | undefined): string | null {
  const payload = jwt?.split(".")[1]
  if (!payload) return null
  try {
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    return typeof json.ref === "string" && /^[a-z0-9]+$/.test(json.ref) ? json.ref : null
  } catch {
    return null
  }
}

const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLIC_KEY || undefined
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE || undefined
const ref = projectRef(anonKey) ?? projectRef(serviceKey)

export const SUPABASE_ANON_KEY = anonKey
export const SUPABASE_SERVICE_KEY = serviceKey
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || (ref ? `https://${ref}.supabase.co` : undefined)
