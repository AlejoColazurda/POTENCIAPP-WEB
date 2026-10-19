"use client"

import { useTranslations } from "next-intl"
import AnimatedContent from "@/components/reactbits/AnimatedContent"
import { StudioAtmosphere } from "@/components/studio-atmosphere"

const FRAMES = [
  {
    src: "/studio/covers/cover-seguridad-16x9.jpg",
    key: "seguridad" as const,
  },
  {
    src: "/studio/covers/cover-tiendas-16x9.jpg",
    key: "tiendas" as const,
  },
  {
    src: "/studio/covers/cover-resumen-16x9.jpg",
    key: "resumen" as const,
  },
]

/**
 * Visual chapter between PorQue and FAQ: studio stills in one composition.
 * No cards-as-content — full-bleed frames with hairline and captions only.
 */
export function StudioLookBand() {
  const t = useTranslations("studioLook")

  return (
    <section
      aria-labelledby="studio-look-heading"
      className="relative overflow-hidden border-t border-gray-800 bg-gray-950 py-20 lg:py-28"
    >
      <StudioAtmosphere plate="blog" opacity={0.16} hairline="right" />

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <AnimatedContent distance={50} duration={0.85} threshold={0.12}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-green">
            {t("eyebrow")}
          </p>
          <h2
            id="studio-look-heading"
            className="mt-4 max-w-[720px] font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-gray-100 sm:text-4xl lg:text-[44px]"
          >
            {t("title")}{" "}
            <span className="text-brand-green">{t("accent")}</span>
          </h2>
          <p className="mt-5 max-w-[560px] text-base leading-relaxed text-gray-300 lg:text-lg">
            {t("body")}
          </p>
        </AnimatedContent>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {FRAMES.map((frame, i) => (
            <AnimatedContent
              key={frame.key}
              distance={40}
              duration={0.75}
              delay={0.08 + i * 0.1}
              threshold={0.12}
            >
              <figure className="group relative overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={frame.src}
                    alt={t(`frames.${frame.key}.alt`)}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-y-[12%] left-0 w-px bg-brand-green/80 opacity-80"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-display text-sm font-semibold text-gray-100">
                    {t(`frames.${frame.key}.label`)}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                    {t(`frames.${frame.key}.tag`)}
                  </span>
                </figcaption>
              </figure>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
