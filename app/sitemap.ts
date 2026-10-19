import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

/**
 * Do not import next-intl `routing` here. Metadata routes run outside the
 * locale layout; that import is a common `/sitemap.xml` 500.
 * /blog /equipo are added by their own branches.
 */
export const dynamic = "force-static"

const locales = ["es", "en", "pt", "fr"] as const
const defaultLocale = "es"

function originFor(locale: string) {
  return locale === defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return locales.flatMap((locale) => [
    {
      url: originFor(locale),
      lastModified,
      changeFrequency: "monthly",
      priority: locale === defaultLocale ? 1 : 0.8,
    },
    {
      url: `${originFor(locale)}/precios`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${originFor(locale)}/legal`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ])
}
