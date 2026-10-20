import { NextResponse, type NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { createServerClient } from "@supabase/ssr"
import { routing } from "./i18n/routing"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./lib/supabase-env"

const intl = createMiddleware(routing)

/**
 * /admin is a separate, non-localized app: it skips next-intl and instead
 * refreshes the Supabase session. Pages (Server Components) cannot write
 * cookies, so without this the rotated refresh token would never be saved
 * and the admin would be logged out after the first token expiry.
 */
async function refreshAdminSession(request: NextRequest) {
  const url = SUPABASE_URL
  const anon = SUPABASE_ANON_KEY
  let response = NextResponse.next({ request })
  if (!url || !anon) return response

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })
  await supabase.auth.getUser()
  return response
}

// /en/admin, /pt/admin/login…: the panel has no locale prefix. Visitors who
// browse the site in another language (NEXT_LOCALE cookie) end up here.
const LOCALIZED_ADMIN = new RegExp(`^/(?:${routing.locales.join("|")})(/admin(?:/.*)?)$`)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const localized = pathname.match(LOCALIZED_ADMIN)
  if (localized) {
    const url = request.nextUrl.clone()
    url.pathname = localized[1]
    return NextResponse.redirect(url)
  }
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return refreshAdminSession(request)
  }
  return intl(request)
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
}
