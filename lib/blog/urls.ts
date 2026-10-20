import { SITE_URL } from "@/lib/site"

/** Absolute article URL. Spanish (default locale) is unprefixed ("as-needed"). */
export function blogPostUrl(slug: string, locale: string) {
  return locale === "es" ? `${SITE_URL}/blog/${slug}` : `${SITE_URL}/${locale}/blog/${slug}`
}

export function blogIndexUrl(locale: string) {
  return locale === "es" ? `${SITE_URL}/blog` : `${SITE_URL}/${locale}/blog`
}

const DATE_LOCALE: Record<string, string> = { es: "es-AR", en: "en-US", pt: "pt-BR", fr: "fr-FR" }

export function formatBlogDate(iso: string, locale: string, month: "short" | "long" = "long") {
  return new Date(iso).toLocaleDateString(DATE_LOCALE[locale] ?? "es-AR", {
    day: "numeric",
    month,
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  })
}
