import { notFound } from "next/navigation"

/**
 * Any path that matches no page (e.g. /precios or /en/foo) lands here, so it
 * renders the localized, branded app/[locale]/not-found.tsx inside the site
 * layout instead of Next's bare default 404.
 */
export default function CatchAll() {
  notFound()
}
