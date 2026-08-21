import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { routing } from "@/i18n/routing"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routing.locales.map((locale) => ({
    // Default locale ("as-needed") lives at the root; the rest are prefixed.
    url: locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
  }))
}
