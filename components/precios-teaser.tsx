"use client"

import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { SectionHeading } from "@/components/services-section"
import AnimatedContent from "@/components/reactbits/AnimatedContent"

const TEASER_BANDS = ["sitio", "tienda", "sistema"] as const

export function PreciosTeaser() {
  const t = useTranslations("precios")

  return (
    <section className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <SectionHeading eyebrow={t("teaser.eyebrow")} title={t("teaser.title")} />

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEASER_BANDS.map((id, i) => (
            <AnimatedContent key={id} distance={40} duration={0.7} delay={i * 0.08} threshold={0.15}>
              <article className="h-full rounded-2xl border border-gray-800 bg-gray-900 p-6 lg:p-8">
                <h3 className="font-display font-semibold text-xl text-gray-100">
                  {t(`bands.${id}.title`)}
                </h3>
                <p className="mt-3 text-base text-gray-300 leading-relaxed">
                  {t(`bands.${id}.line`)}
                </p>
              </article>
            </AnimatedContent>
          ))}
        </div>

        <p className="mt-8 text-base text-gray-300">{t("teaser.note")}</p>

        <Link
          href="/precios"
          className="mt-6 inline-flex min-h-11 items-center gap-2 font-display font-semibold text-brand-green hover:underline underline-offset-4"
        >
          {t("teaser.cta")}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  )
}
