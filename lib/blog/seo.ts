import type { BlogPost } from "./types"
import { SITE_URL } from "@/lib/site"
import { blogIndexUrl, blogPostUrl } from "./urls"

/** JSON-LD for an article, in the language the visitor is reading it in. */
export function generateBlogPostingJsonLd(post: BlogPost) {
  const url = blogPostUrl(post.slug, post.locale)

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.summary,
    image: [post.coverImage],
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
