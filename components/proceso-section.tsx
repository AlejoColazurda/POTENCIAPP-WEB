"use client"

import { useTranslations } from "next-intl"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"

const KEYS = ["s1", "s2", "s3"] as const

/**
 * Process as one continuous line of time rather than three icon boxes: a
 * single rule runs across the stages and fills with brand green as the
 * section scrolls through (CSS scroll-driven animation where supported,
 * a full static rule elsewhere). Each stage hangs from the line.
 */
export function ProcesoSection() {
  const t = useTranslations("proceso")

  return (
    <section id="proceso" className="relative bg-gray-950 text-gray-100 border-t border-gray-100/35 scroll-mt-16">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-24 lg:py-36">
        <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="ed-rise col-span-12 lg:col-span-3">
            <SectionIndex n="06" label={t("eyebrow")} />
          </div>
          <h2
            className="ed-rise col-span-12 lg:col-span-5 font-ed-display font-medium text-[clamp(32px,4vw,64px)] leading-[1.02] tracking-[-0.035em]"
            style={{ ["--i" as string]: 1 }}
          >
            {t("title")}
          </h2>
          <p
            className="ed-rise col-span-12 md:col-span-8 lg:col-span-4 self-end font-ed-sans text-lg leading-[1.5] text-gray-300"
            style={{ ["--i" as string]: 2 }}
          >
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="relative mt-20 lg:mt-28">
          {/* The line of time */}
          <div aria-hidden className="absolute left-0 right-0 top-0 hidden h-[3px] bg-gray-800 md:block">
            <div className="ed-scroll-fill h-full w-full bg-brand-green" />
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 md:gap-x-6">
            {KEYS.map((k, i) => (
              <Reveal
                as="li"
                key={k}
                className="relative border-l-[3px] border-gray-800 pl-6 pb-14 md:border-l-0 md:pl-0 md:pb-0 md:pt-10"
              >
                <span aria-hidden className="absolute -left-[9px] top-0 h-4 w-4 bg-gray-100 md:left-0 md:-top-[6.5px]" />
                <div className="ed-rise flex items-baseline justify-between gap-4" style={{ ["--i" as string]: i }}>
                  <span className="ed-parallax-slow inline-block font-ed-display font-extrabold leading-none tracking-[-0.06em] text-[clamp(72px,8vw,136px)] ed-outline">
                    {t(`steps.${k}.num`)}
                  </span>
                  <span className="ed-label text-gray-100 border border-gray-100/35 px-2 py-1">{t(`steps.${k}.tag`)}</span>
                </div>
                <h3
                  className="ed-rise mt-8 font-ed-display text-2xl lg:text-[28px] font-medium tracking-[-0.025em] leading-[1.1]"
                  style={{ ["--i" as string]: i + 1 }}
                >
                  {t(`steps.${k}.title`)}
                </h3>
                <p
                  className="ed-rise mt-4 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[40ch]"
                  style={{ ["--i" as string]: i + 2 }}
                >
                  {t(`steps.${k}.desc`)}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
