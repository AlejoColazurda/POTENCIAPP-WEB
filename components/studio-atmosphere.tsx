"use client"

import { useEffect, useRef, useState } from "react"

type Plate = "precios" | "equipo" | "blog"

const PLATE_SRC: Record<Plate, string> = {
  precios: "/studio/plates/plate-precios-16x9.jpg",
  equipo: "/studio/plates/plate-equipo-16x9.jpg",
  blog: "/studio/plates/plate-blog-16x9.jpg",
}

/**
 * Atmospheric studio still behind a section. Missing file → renders nothing.
 * Subtle parallax on scroll when motion is allowed; reduced-motion = static.
 */
export function StudioAtmosphere({
  plate,
  opacity = 0.2,
  hairline = "left",
}: {
  plate: Plate
  opacity?: number
  hairline?: "left" | "right" | "none"
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [offset, setOffset] = useState(0)
  const [allowMotion, setAllowMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setAllowMotion(!mql.matches)
    apply()
    mql.addEventListener("change", apply)
    return () => mql.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (!allowMotion) {
      setOffset(0)
      return
    }
    const el = rootRef.current
    if (!el) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight || 1
        // Map section progress through the viewport to a small Y shift.
        const progress = (vh - rect.top) / (vh + rect.height)
        const clamped = Math.max(0, Math.min(1, progress))
        setOffset((clamped - 0.5) * 36)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [allowMotion])

  if (!visible) return null

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative; must not steal LCP */}
      <img
        src={PLATE_SRC[plate]}
        alt=""
        decoding="async"
        fetchPriority="low"
        onError={() => setVisible(false)}
        className="absolute inset-0 h-[118%] w-full object-cover object-center"
        style={{
          opacity,
          transform: allowMotion ? `translate3d(0, ${offset}px, 0)` : undefined,
          willChange: allowMotion ? "transform" : undefined,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/75 via-gray-950/55 to-gray-950" />
      {hairline === "left" ? (
        <span className="absolute left-0 top-[18%] h-[42%] w-px bg-brand-green/70 shadow-[0_0_12px_rgba(34,242,58,0.45)]" />
      ) : null}
      {hairline === "right" ? (
        <span className="absolute right-0 top-[22%] h-[38%] w-px bg-brand-green/70 shadow-[0_0_12px_rgba(34,242,58,0.45)]" />
      ) : null}
    </div>
  )
}
