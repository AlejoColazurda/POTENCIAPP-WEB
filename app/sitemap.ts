import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { routing } from "@/i18n/routing"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const base = (locale: string) =>
    locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`

  return routing.locales.flatMap((locale) => [
    {
      // Default locale ("as-needed") lives at the root; the rest are prefixed.
      url: base(locale),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: locale === routing.defaultLocale ? 1 : 0.8,
    },
    {
      url: `${base(locale)}/legal`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ])
}
