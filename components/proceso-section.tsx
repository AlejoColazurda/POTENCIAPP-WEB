"use client"

import { useTranslations } from "next-intl"
import { SectionHeading } from "./services-section"
import ScrollFloat from "@/components/reactbits/ScrollFloat"
import AnimatedContent from "@/components/reactbits/AnimatedContent"

type StepKey = "s1" | "s2" | "s3"

export function ProcesoSection() {
  const t = useTranslations("proceso")
  const keys: StepKey[] = ["s1", "s2", "s3"]

  return (
    <section id="proceso" className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="relative mt-16 lg:mt-24">
          <div
            aria-hidden
            className="hidden md:block absolute left-[6%] right-[6%] top-[64px] h-px"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #2A2A2A 0, #2A2A2A 8px, transparent 8px, transparent 16px)",
              backgroundSize: "16px 1px",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {keys.map((k, i) => (
              <div key={k} className="relative">
                {/* Step numeral rises and un-squashes as the row enters the viewport */}
                <ScrollFloat
                  containerClassName="!my-0"
                  textClassName="font-display font-bold text-[96px] lg:text-[128px] text-gray-700 leading-none tracking-[-0.04em] select-none"
                  animationDuration={0.9}
                  stagger={0.05}
                  scrollStart="center bottom+=35%"
                  scrollEnd="bottom bottom-=25%"
                >
                  {t(`steps.${k}.num`)}
                </ScrollFloat>

                <AnimatedContent distance={40} duration={0.8} delay={0.1 + i * 0.1} threshold={0.15}>
                  <h3 className="mt-4 font-display font-semibold text-2xl text-gray-100">
                    {t(`steps.${k}.title`)}
                  </h3>
                  <p className="mt-3 text-base text-gray-300 leading-relaxed max-w-[360px]">
                    {t(`steps.${k}.desc`)}
                  </p>
                  <span className="mt-5 inline-block font-mono text-[11px] uppercase tracking-wider text-brand-green border border-brand-green/30 rounded-md px-2.5 py-1 bg-brand-green/5">
                    {t(`steps.${k}.tag`)}
                  </span>
                </AnimatedContent>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
