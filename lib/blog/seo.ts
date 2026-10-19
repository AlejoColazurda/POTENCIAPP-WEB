import fs from "node:fs"
import path from "node:path"
import type { BlogPost } from "./types"
import { SITE_URL } from "@/lib/site"
import { blogIndexUrl, blogPostUrl } from "./urls"

export function blogIndexOgImage() {
  const kit = path.join(process.cwd(), "public/studio/og/og-blog-1200x630.jpg")
  return fs.existsSync(kit) ? `${SITE_URL}/studio/og/og-blog-1200x630.jpg` : `${SITE_URL}/og.png`
}

export function blogPostOgImage(coverImage: string | undefined, title: string) {
  if (coverImage) return { url: coverImage, width: 1200, height: 630, alt: title }
  return { url: blogIndexOgImage(), width: 1200, height: 630, alt: title }
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
    author: { "@type": "Organization", name: post.author.name, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "PotenciApp",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/potenciapp-logo.png` },
    },
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
    publisher: {
      "@type": "Organization",
      name: "PotenciApp",
      url: SITE_URL,
      logo: `${SITE_URL}/potenciapp-logo.png`,
    },
  }
}
