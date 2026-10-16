import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { routing } from "@/i18n/routing"
import { SEED_BLOG_POSTS } from "@/lib/blog/data/seed-posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const base = (locale: string) =>
    locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`

  const staticRoutes = routing.locales.flatMap((locale) => [
    {
      // Default locale ("as-needed") lives at the root; the rest are prefixed.
      url: base(locale),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: locale === routing.defaultLocale ? 1 : 0.8,
    },
    {
      url: `${base(locale)}/blog`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${base(locale)}/legal`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ])

  const blogPostRoutes = routing.locales.flatMap((locale) =>
    SEED_BLOG_POSTS.map((post) => ({
      url: `${base(locale)}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  )

  return [...staticRoutes, ...blogPostRoutes]
}
