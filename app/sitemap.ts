import fs from "node:fs"
import path from "node:path"
import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { blogIndexUrl, blogPostUrl } from "@/lib/blog/urls"

function publishedFileSlugs(): string[] {
  const dir = path.join(process.cwd(), "content", "blog")
  if (!fs.existsSync(dir)) return []
  const slugs = new Set<string>()
  for (const file of fs.readdirSync(dir)) {
    const match = file.match(/^([a-z0-9]+(?:-[a-z0-9]+)*)(?:\.(en|pt|fr))?\.md$/)
    if (match) slugs.add(match[1])
  }
  return [...slugs]
}

/**
 * Do not import next-intl `routing` here. Metadata routes run outside the
 * locale layout; that import is a common `/sitemap.xml` 500.
 */
export const dynamic = "force-static"
export const revalidate = 3600

const locales = ["es", "en", "pt", "fr"] as const
const defaultLocale = "es"

function originFor(locale: string) {
  return locale === defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const pages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: originFor(locale),
      lastModified,
      changeFrequency: "monthly",
      priority: locale === defaultLocale ? 1 : 0.8,
    },
    {
      url: `${originFor(locale)}/legal`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: blogIndexUrl(locale),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ])

  const posts: MetadataRoute.Sitemap = publishedFileSlugs().flatMap((slug) =>
    locales.map((locale) => ({
      url: blogPostUrl(slug, locale),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  )

  return [...pages, ...posts]
}
