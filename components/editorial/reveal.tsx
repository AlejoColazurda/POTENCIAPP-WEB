"use client"

import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

/**
 * Adds `ed-in` to its element once it scrolls into view; the CSS in
 * globals.css (.ed-line, .ed-rise, .ed-mask, .ed-rule-draw, .ed-mark) does
 * the motion. One observer per element, disconnected after the first hit,
 * so there is no per-frame work. `immediate` reveals on mount (above the fold).
 *
 * threshold 0: a block taller than the viewport would otherwise never reach a
 * ratio like 0.18 and stay hidden; the negative bottom margin keeps it from
 * firing while the block is still a sliver at the fold.
 *
 * Without JS, or with prefers-reduced-motion, content is still visible: the
 * reduced-motion rules neutralise the hidden start states.
 */
export function Reveal({
  as = "div",
  className = "",
  style,
  immediate = false,
  threshold = 0,
  children,
  ...rest
}: {
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  style?: CSSProperties
  immediate?: boolean
  threshold?: number
  children?: ReactNode
  id?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}) {
  const ref = useRef<HTMLElement>(null)
  // Kept in state (not classList) so a re-render with a new className
  // cannot wipe the revealed state.
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    // Dev only: `?reveal=1` shows everything at once for static screenshots.
    const forced =
      process.env.NODE_ENV !== "production" && window.location.search.includes("reveal=1")
    if (forced) {
      // ...and `&y=<px>` scrolls there, for shots below the fold.
      const y = Number(new URLSearchParams(window.location.search).get("y") ?? 0)
      if (y) setTimeout(() => window.scrollTo({ top: y, behavior: "instant" }), 600)
    }
    if (immediate || forced || !("IntersectionObserver" in window)) {
      // setTimeout, not rAF: rAF never fires in a background tab, which would
      // leave above-the-fold content hidden until the tab is focused.
      const id = setTimeout(() => setShown(true), 30)
      return () => clearTimeout(id)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [immediate, threshold, shown])

  return createElement(as, { ref, className: shown ? `${className} ed-in` : className, style, ...rest }, children)
}

/** A headline line that rises out of its own mask; `i` staggers lines. */
export function Line({ i = 0, children }: { i?: number; children: ReactNode }) {
  return (
    <span className="ed-line">
      <span style={{ "--i": i } as CSSProperties}>{children}</span>
    </span>
  )
}

/** Mono section index: "§ 02 — Soluciones". */
export function SectionIndex({ n, label, className = "" }: { n: string; label: string; className?: string }) {
  return (
    <p className={`ed-label flex items-center gap-3 text-gray-400 ${className}`}>
      <span className="text-brand-green tabular-nums">{n}</span>
      <span>{label}</span>
    </p>
  )
}
