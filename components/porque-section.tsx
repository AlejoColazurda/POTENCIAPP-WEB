"use client"

import { Check, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { SectionHeading } from "./services-section"
import { BrandMark } from "@/components/brand"
import SpotlightCard from "@/components/reactbits/SpotlightCard"
import AnimatedContent from "@/components/reactbits/AnimatedContent"

export function PorQueSection() {
  const t = useTranslations("porque")
  const otrosItems = t.raw("otrosItems") as string[]
  const nosotrosItems = t.raw("nosotrosItems") as string[]
  const stats = t.raw("stats") as { value: string; label: string }[]

  return (
    <section className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("title")} <span className="text-brand-green">{t("accent")}</span>
            </>
          }
        />

        <AnimatedContent distance={60} duration={0.9} delay={0.1} threshold={0.12}>
          <div className="mt-14 lg:mt-20 relative grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="bg-gray-950 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <X className="h-5 w-5 text-gray-500" />
                <h3 className="font-display font-semibold text-xl text-gray-300">{t("otros")}</h3>
              </div>
              <ul className="space-y-4">
                {otrosItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <SpotlightCard
              className="bg-gray-950 p-8 lg:p-10"
              spotlightColor="rgba(34, 242, 58, 0.16)"
            >
              <div className="flex items-center gap-3 mb-6">
                <BrandMark size={20} />
                <h3 className="font-display font-semibold text-xl text-gray-100">
                  {t("nosotros")}
                </h3>
              </div>
              <ul className="space-y-4">
                {nosotrosItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="text-gray-100 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10 bg-gray-950 p-1.5 rounded-full pointer-events-none">
              <BrandMark size={48} glow />
            </div>
          </div>
        </AnimatedContent>

        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {stats.map((s, i) => (
            <AnimatedContent key={s.label} distance={40} duration={0.7} delay={i * 0.08} threshold={0.2}>
              <div className="flex flex-col gap-1">
                <div className="font-display font-bold text-3xl lg:text-4xl text-gray-100 tracking-tight">
                  {s.value}
                </div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
