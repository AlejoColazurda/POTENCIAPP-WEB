"use client"

import { useTranslations } from "next-intl"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"

/**
 * The manifesto, set on ink. A statement, not a card: index in the margin,
 * the sentence across nine columns, the body text offset underneath.
 */
export function ValueSection() {
  const t = useTranslations("value")

  return (
    <section className="relative bg-black text-gray-100">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-24 lg:py-40">
        <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="ed-rise col-span-12 lg:col-span-3">
            <SectionIndex n="01" label={t("eyebrow")} />
          </div>

          <h2 className="ed-rise col-span-12 lg:col-span-9 font-ed-display font-medium text-[clamp(32px,4.6vw,76px)] leading-[1.02] tracking-[-0.035em]" style={{ ["--i" as string]: 1 }}>
            {t("title")} <span className="text-brand-green">{t("accent")}</span>
          </h2>

          <div className="ed-rise col-span-12 md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-8 border-t border-gray-800 pt-6" style={{ ["--i" as string]: 2 }}>
            <p className="font-ed-sans text-lg leading-[1.55] text-gray-300">{t("body")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
