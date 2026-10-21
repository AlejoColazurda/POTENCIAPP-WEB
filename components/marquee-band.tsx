"use client"

import { useTranslations } from "next-intl"

/**
 * The one full-bleed brand-green moment of the page: the divisions drift in
 * two rows, opposite directions, pure CSS (no per-frame JS). Decorative only.
 */
export function MarqueeBand() {
  const t = useTranslations()
  const words = t.raw("band") as string[]

  const row = (reverse: boolean) => (
    <div className={`${reverse ? "marquee-track-reverse" : "marquee-track"} flex items-center`} style={{ width: "max-content" }}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center">
          {words.map((w) => (
            <span key={`${copy}-${w}`} className="flex items-center whitespace-nowrap pr-8 lg:pr-12">
              <span className="font-ed-display font-medium uppercase tracking-[-0.03em] text-[clamp(28px,4.4vw,68px)] leading-[1.15]">
                {w}
              </span>
              <span className="ml-8 lg:ml-12 inline-block h-3 w-3 lg:h-4 lg:w-4 bg-ink" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <div aria-hidden className="relative select-none overflow-hidden bg-brand-green text-ink py-6 lg:py-8">
      {row(false)}
      <div className="ed-outline" style={{ ["--ed-outline-fill" as string]: "var(--brand-green)", WebkitTextStrokeColor: "var(--color-ink)" }}>{row(true)}</div>
    </div>
  )
}
