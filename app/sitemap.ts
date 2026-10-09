import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { routing } from "@/i18n/routing"
import { getAllPosts } from "@/lib/blog"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const base = (locale: string) =>
    locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`

  // Articles are Spanish-only, so only their canonical (unprefixed) URLs are listed.
  const posts = (await getAllPosts()).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

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
