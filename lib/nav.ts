import { routing } from "@/i18n/routing"

/**
 * Feature branches flip their key to true when the route exists.
 * Do not add hrefs while the flag is false — those URLs 404 on this branch.
 */
export const NAV_PAGE_LINKS = {
  precios: false,
  equipo: true,
  blog: false,
} as const

export function homeSectionHref(pathname: string, locale: string, id: string) {
  if (pathname === "/") return `#${id}`
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`
  return `${prefix}/#${id}`
}
