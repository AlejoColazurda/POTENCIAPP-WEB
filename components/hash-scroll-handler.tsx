"use client"

import { useEffect } from "react"
import { usePathname } from "@/i18n/navigation"

/**
 * Handles smooth scrolling to anchor elements when navigating from external
 * pages (e.g. from /blog to /#soluciones) or when hash changes.
 */
export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return

    const scrollToHash = () => {
      const hash = window.location.hash
      if (hash && hash.length > 1) {
        const id = decodeURIComponent(hash.slice(1))
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    // Delay slightly to ensure page hydration and layout measurement have completed
    const timer = setTimeout(scrollToHash, 160)
    window.addEventListener("hashchange", scrollToHash)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("hashchange", scrollToHash)
    }
  }, [pathname])

  return null
}
