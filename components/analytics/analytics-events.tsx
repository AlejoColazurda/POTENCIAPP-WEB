"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"

const BLOG_PATH = /^\/(?:(?:es|en|pt|fr)\/)?blog\/([^/]+)\/?$/

/** Where in the page the click happened: nearest section id, else the page chrome. */
function locationOf(el: Element) {
  const section = el.closest("[id]")?.id
  if (section) return section
  if (el.closest("header")) return "header"
  if (el.closest("footer")) return "footer"
  return "page"
}

/**
 * One delegated click listener instead of onClick on every button, so the
 * events cover every WhatsApp link in the site (blog included) without
 * threading handlers through server components.
 *
 * - `whatsapp_click`: any link to wa.me.
 * - `pedir_propuesta_click`: links marked `data-ga-cta="pedir_propuesta"`; fires in
 *   addition to `whatsapp_click` when that CTA opens WhatsApp.
 *
 * Both carry `article_slug` when clicked from a blog post, which is what tells
 * us which articles bring inquiries.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      const link = event.target.closest("a")
      if (!link) return

      const params = {
        link_text: link.textContent?.trim().slice(0, 80) || undefined,
        link_location: locationOf(link),
        page_path: window.location.pathname,
        article_slug: BLOG_PATH.exec(window.location.pathname)?.[1],
      }

      if (link.href.startsWith("https://wa.me/")) trackEvent("whatsapp_click", params)
      if (link.dataset.gaCta === "pedir_propuesta") trackEvent("pedir_propuesta_click", params)
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}
