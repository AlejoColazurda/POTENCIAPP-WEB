import type { Metadata } from "next"
import { SITE_URL } from "@/lib/site"

const LOCALES = ["es", "en", "pt", "fr"] as const
const DEFAULT_LOCALE = "es"

/** Absolute URL of a static page in a locale ("/" prefix for es). */
export function pageUrl(path: string, locale: string) {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`
  return `${SITE_URL}${prefix}${path}`
}

/** Canonical + hreflang + OG metadata shared by the static trust pages. */
export function pageMetadata({
  path,
  locale,
  title,
  description,
}: {
  path: string
  locale: string
  title: string
  description: string
}): Metadata {
  const url = pageUrl(path, locale)
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, pageUrl(path, l)])),
        "x-default": pageUrl(path, DEFAULT_LOCALE),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "PotenciApp",
      locale,
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "PotenciApp" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  }
}

/**
 * Metadata for Spanish-only pages (local landings): canonical plus a single
 * hreflang, so search engines do not look for en/pt/fr versions.
 */
export function esOnlyMetadata({
  path,
  title,
  description,
}: {
  path: string
  title: string
  description: string
}): Metadata {
  const url = pageUrl(path, DEFAULT_LOCALE)
  return {
    title,
    description,
    alternates: { canonical: url, languages: { es: url, "x-default": url } },
    openGraph: {
      title,
      description,
      url,
      siteName: "PotenciApp",
      locale: "es_AR",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "PotenciApp" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  }
}

/** BreadcrumbList JSON-LD from [name, path] pairs (Spanish URLs). */
export function breadcrumbJsonLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: pageUrl(path, DEFAULT_LOCALE),
    })),
  }
}
