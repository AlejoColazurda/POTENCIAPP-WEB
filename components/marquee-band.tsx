"use client"

import { useTranslations } from "next-intl"
import ScrollVelocity from "@/components/reactbits/ScrollVelocity"

/**
 * Full-bleed band whose two rows drift in opposite directions and speed up with
 * scroll velocity. Purely decorative — hidden from assistive tech.
 */
export function MarqueeBand() {
  const t = useTranslations()
  const words = t.raw("band") as string[]
  const line = words.join(" · ") + " · "

  return (
    <div
      aria-hidden
      className="relative bg-gray-950 border-y border-gray-800 py-10 lg:py-14 overflow-hidden select-none"
    >
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-32 lg:w-56 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-32 lg:w-56 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none"
      />

      <ScrollVelocity
        texts={[line, line]}
        velocity={48}
        numCopies={6}
        damping={44}
        stiffness={380}
        className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-[-0.03em] text-outline"
        parallaxClassName="py-1"
      />
    </div>
  )
}
