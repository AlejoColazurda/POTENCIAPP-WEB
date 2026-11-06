import fs from "node:fs"
import path from "node:path"
import type { BlogPost } from "./types"
import { SITE_URL } from "@/lib/site"
import { COMPANY, ORG_ID } from "@/lib/company"
import { blogIndexUrl, blogPostUrl } from "./urls"

export function blogIndexOgImage() {
  const kit = path.join(process.cwd(), "public/studio/og/og-blog-1200x630.jpg")
  return fs.existsSync(kit) ? `${SITE_URL}/studio/og/og-blog-1200x630.jpg` : `${SITE_URL}/og.png`
}

export function blogPostOgImage(coverImage: string | undefined, title: string) {
  if (coverImage) return { url: coverImage, width: 1200, height: 630, alt: title }
  return { url: blogIndexOgImage(), width: 1200, height: 630, alt: title }
}

/** The brand as an Organization node, shared by every blog JSON-LD block. */
function brandOrganization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY.brand,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${COMPANY.logo.path}`,
      width: COMPANY.logo.width,
      height: COMPANY.logo.height,
    },
  }
}

/**
 * Byline as structured data. The team byline ("Equipo PotenciApp",
 * "PotenciApp team"…) is the company itself, so it resolves to the same
 * Organization entity (named exactly "PotenciApp"); a person's name stays
 * a Person who works for it.
 */
function authorJsonLd(name: string) {
  if (!name || /potenciapp/i.test(name)) return brandOrganization()
  return { "@type": "Person", name, worksFor: { "@id": ORG_ID } }
}

/** JSON-LD for an article, in the language the visitor is reading it in. */
export function generateBlogPostingJsonLd(post: BlogPost) {
  const url = blogPostUrl(post.slug, post.locale)

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.summary,
    image: [post.coverImage || blogIndexOgImage()],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: authorJsonLd(post.author.name),
    publisher: brandOrganization(),
    keywords: post.tags.join(", "),
    inLanguage: post.locale,
  }
}

export function generateBlogIndexJsonLd(locale: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name,
    description,
    url: blogIndexUrl(locale),
    inLanguage: locale,
    publisher: brandOrganization(),
  }
}
