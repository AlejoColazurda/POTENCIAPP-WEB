import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { routing } from "@/i18n/routing"
import { getAllPosts } from "@/lib/blog/service"
import { blogPostUrl } from "@/lib/blog/urls"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const base = (locale: string) =>
    locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`

  // Each article once per language it really exists in (Spanish + translations).
  // Untranslated /en|/pt|/fr pages canonicalize to Spanish, so they're left out.
  const posts = (await getAllPosts()).flatMap((post) =>
    (post.availableLocales ?? ["es"]).map((locale) => ({
      url: blogPostUrl(post.slug, locale),
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  )

  const pages = routing.locales.flatMap((locale) => [
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
    {
      url: `${base(locale)}/blog`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ])

  return [...pages, ...posts]
}
