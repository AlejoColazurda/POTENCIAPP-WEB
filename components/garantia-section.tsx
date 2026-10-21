"use client"

import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"

const KEYS = ["contrato", "precio", "garantia", "respaldo"] as const

/**
 * The four commitments typeset as the clauses of a contract — because that is
 * what they are. Ruled sheet, numbered clauses, two signature lines at the
 * foot. Replaces the old testimonials (built on invented people) and the
 * CardSwap stack.
 */
export function GarantiaSection() {
  const t = useTranslations("garantia")
  const te = useTranslations("editorial")

  return (
    <section id="garantia" className="relative bg-gray-950 text-gray-100 scroll-mt-16">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-24 lg:py-36">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
            <div className="ed-rise">
              <SectionIndex n="05" label={t("eyebrow")} />
            </div>
            <h2
              className="ed-rise mt-8 font-ed-display font-medium text-[clamp(32px,3.6vw,58px)] leading-[1.02] tracking-[-0.035em]"
              style={{ ["--i" as string]: 1 }}
            >
              {t("title")} <span className="ed-mark">{t("accent")}</span>
            </h2>
            <p className="ed-rise mt-6 font-ed-sans text-lg leading-[1.5] text-gray-300 max-w-[44ch]" style={{ ["--i" as string]: 2 }}>
              {t("subtitle")}
            </p>
            <a
              href="#contacto"
              className="ed-rise group mt-10 inline-flex items-center gap-4 bg-brand-green px-5 py-4 font-ed-sans font-semibold text-ink transition-colors duration-300 hover:bg-green-hover"
              style={{ ["--i" as string]: 3 }}
            >
              {t("cta")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </a>
          </Reveal>

          {/* The sheet */}
          <Reveal as="div" className="ed-parallax-fast col-span-12 lg:col-span-7 lg:col-start-6 bg-gray-900 border border-gray-800">
            <div className="flex items-baseline justify-between border-b border-gray-100/35 px-6 py-4 lg:px-10">
              <span className="ed-label text-gray-100">PotenciApp® — {t("eyebrow")}</span>
              <span className="ed-label text-gray-400">{String(KEYS.length).padStart(2, "0")} × {te("clause")}</span>
            </div>
            <ol>
              {KEYS.map((key, i) => (
                <li
                  key={key}
                  className="ed-rise grid grid-cols-[3.5rem_1fr] lg:grid-cols-[5.5rem_1fr] gap-x-4 border-b border-gray-800 px-6 py-8 lg:px-10 lg:py-10"
                  style={{ ["--i" as string]: i }}
                >
                  <div>
                    <div className="ed-label text-gray-400">{te("clause")}</div>
                    <div className="mt-1 font-ed-display text-3xl lg:text-4xl font-medium tracking-[-0.04em] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-ed-display text-xl lg:text-2xl font-medium tracking-[-0.02em] leading-[1.15]">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-3 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[56ch]">
                      {t(`items.${key}.desc`)}
                    </p>
                    <p className="mt-4 ed-label text-gray-100 inline-flex items-center gap-2">
                      <span aria-hidden className="inline-block h-1.5 w-1.5 bg-brand-green" />
                      {t(`items.${key}.tag`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="grid grid-cols-2 gap-6 px-6 pb-8 pt-12 lg:px-10 lg:pb-10">
              {[te("signClient"), te("signStudio")].map((label) => (
                <div key={label}>
                  <div className="h-px w-full bg-gray-100/60 ed-rule-draw" />
                  <p className="mt-2 ed-label text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
