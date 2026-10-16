import type { BlogPost } from "./types"
import { SITE_URL } from "@/lib/site"

export function generateBlogPostingJsonLd(post: BlogPost, locale = "es") {
  const url = `${SITE_URL}/${locale}/blog/${post.slug}`

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: post.title,
    description: post.summary,
    image: [post.coverImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": post.author.isAgent ? "SoftwareApplication" : "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: post.author.handle ? `https://x.com/${post.author.handle.replace("@", "")}` : SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PotenciApp",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/potenciapp-logo.png`,
      },
    },
    keywords: post.tags.join(", "),
    inLanguage: locale,
  }
}

export function generateBlogIndexJsonLd(locale = "es") {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog PotenciApp | Software, Inteligencia Artificial y Negocios Digitales",
    description: "Insights técnicos, arquitectura cloud, agentes autónomos y desarrollo de apps de alto impacto.",
    url: `${SITE_URL}/${locale}/blog`,
    publisher: {
      "@type": "Organization",
      name: "PotenciApp",
      url: SITE_URL,
      logo: `${SITE_URL}/potenciapp-logo.png`,
    },
  }
}
