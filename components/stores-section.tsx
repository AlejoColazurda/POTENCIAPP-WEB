"use client"

import { useTranslations } from "next-intl"
import { BadgeCheck, ShieldCheck, Rocket, Smartphone } from "lucide-react"
import AnimatedContent from "@/components/reactbits/AnimatedContent"
import SpotlightCard from "@/components/reactbits/SpotlightCard"
import ShinyText from "@/components/reactbits/ShinyText"
import { AppStoreBadge, PlayStoreBadge } from "@/components/store-badges"

const POINT_ICONS = [
  <BadgeCheck key="0" className="h-5 w-5" strokeWidth={2.2} />,
  <ShieldCheck key="1" className="h-5 w-5" strokeWidth={2.2} />,
  <Rocket key="2" className="h-5 w-5" strokeWidth={2.2} />,
  <Smartphone key="3" className="h-5 w-5" strokeWidth={2.2} />,
]

export function StoresSection() {
  const t = useTranslations("stores")
  const points = t.raw("points") as { title: string; desc: string }[]

  return (
    <section id="apps" className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800 overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-brand-green/[0.06] blur-[150px] pointer-events-none"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8">
        <AnimatedContent distance={60} duration={0.9} threshold={0.15}>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {t("eyebrow")}
              </span>
            </span>

            <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-gray-100 max-w-[820px] mx-auto">
              {t("title")}{" "}
              <span className="text-brand-green">{t("accent")}</span>
            </h2>

            <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-[640px] mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </AnimatedContent>

        <AnimatedContent distance={40} duration={0.8} delay={0.15} threshold={0.15}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <AppStoreBadge
              top={t("appStoreTop")}
              name={t("appStoreName")}
              verified={t("verified")}
            />
            <PlayStoreBadge
              top={t("playStoreTop")}
              name={t("playStoreName")}
              verified={t("verified")}
            />
          </div>

          <div className="mt-5 flex justify-center">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
              <BadgeCheck className="h-4 w-4 text-brand-green" strokeWidth={2.5} />
              <ShinyText text={t("verified")} speed={4} className="text-gray-300" />
            </span>
          </div>
        </AnimatedContent>

        <div className="mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {points.map((p, i) => (
            <AnimatedContent key={p.title} distance={50} duration={0.8} delay={0.1 * i} threshold={0.1}>
              <SpotlightCard
                className="h-full bg-gray-900 border border-gray-800 rounded-2xl p-6 transition-colors duration-300 hover:border-brand-green/40"
                spotlightColor="rgba(34, 242, 58, 0.16)"
              >
                <div className="h-10 w-10 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-brand-green">
                  {POINT_ICONS[i]}
                </div>
                <h3 className="mt-5 font-display font-semibold text-lg text-gray-100 tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">{p.desc}</p>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
