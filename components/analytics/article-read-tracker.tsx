"use client"

import { useEffect, useRef } from "react"
import { trackEvent } from "@/lib/analytics"

/**
 * Sentinel placed right after an article's body. Fires `blog_article_read`
 * once when it scrolls into view, i.e. the reader reached the end. The
 * `engagement_seconds` param lets reports discard skim-scrolls.
 */
export function ArticleReadTracker({
  slug,
  title,
  category,
}: {
  slug: string
  title: string
  category: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const startedAt = Date.now()
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      trackEvent("blog_article_read", {
        article_slug: slug,
        article_title: title,
        article_category: category,
        engagement_seconds: Math.round((Date.now() - startedAt) / 1000),
      })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [slug, title, category])

  return <div ref={ref} aria-hidden />
}
