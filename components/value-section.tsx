"use client"

import { useTranslations } from "next-intl"
import { BrandMark } from "@/components/brand"
import { BRAND_LOGOS, BrandLogo } from "@/components/brand-logos"

export function ValueSection() {
  const tLogos = useTranslations("logos")
  const t = useTranslations("value")

  return (
    <section className="relative bg-gray-950 py-20 lg:py-32 overflow-hidden">
      {/* Stack & integrations marquee */}
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 mb-20 lg:mb-32">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-gray-800" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500 px-3">
            {tLogos("eyebrow")}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-800 to-gray-800" />
        </div>

        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-32 lg:w-48 bg-gradient-to-r from-gray-950 to-transparent z-10"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-32 lg:w-48 bg-gradient-to-l from-gray-950 to-transparent z-10"
          />

          {/*
            Canonical marquee: 2N items in a single flex track, each with
            trailing pr-12. No flex `gap` (which would break the -50% math).
            Animating the track 0 → -50% lands precisely on the boundary
            between copy A and copy B — perfect seamless loop.
            Pauses on hover for legibility.
          */}
          <ul
            className="flex items-center marquee-track"
            style={{ width: "max-content" }}
          >
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
              <li
                key={i}
                className="shrink-0 pr-12 lg:pr-16"
                aria-hidden={i >= BRAND_LOGOS.length || undefined}
              >
                <BrandLogo logo={logo} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Value prop */}
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 text-center">
        <div className="inline-flex items-center justify-center mb-8">
          <BrandMark size={56} glow />
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
            {t("eyebrow")}
          </span>
        </span>

        <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.02em] text-gray-100 max-w-[880px] mx-auto">
          {t("title")} <span className="text-brand-green">{t("accent")}</span>
        </h2>

        <p className="mt-8 text-lg text-gray-300 max-w-[640px] mx-auto leading-relaxed">
          {t("body")}
        </p>
      </div>
    </section>
  )
}
