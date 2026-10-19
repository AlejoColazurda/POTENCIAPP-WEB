"use client"

import { useEffect, useState } from "react"

/** Thin brand hairline that tracks page scroll. Decorative only. */
export function StudioScrollProgress() {
  const [width, setWidth] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const applyMotion = () => setShow(!mql.matches)
    applyMotion()
    mql.addEventListener("change", applyMotion)

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        setWidth(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      mql.removeEventListener("change", applyMotion)
    }
  }, [])

  if (!show) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-transparent"
    >
      <div
        className="h-full origin-left bg-brand-green shadow-[0_0_10px_rgba(34,242,58,0.55)]"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
