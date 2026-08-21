"use client"

import { useTranslations } from "next-intl"
import { BrandMark } from "@/components/brand"
import { BRAND_LOGOS, BrandLogo } from "@/components/brand-logos"
import LogoLoop from "@/components/reactbits/LogoLoop"
import ScrollFloat from "@/components/reactbits/ScrollFloat"
import AnimatedContent from "@/components/reactbits/AnimatedContent"

export function ValueSection() {
  const tLogos = useTranslations("logos")
  const t = useTranslations("value")

  const logos = BRAND_LOGOS.map((logo) => ({
    node: <BrandLogo logo={logo} />,
    title: logo.name,
    ariaLabel: logo.name,
  }))

  return (
    <section className="relative bg-gray-950 py-20 lg:py-32 overflow-hidden">
      {/* Stack & integrations */}
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 mb-20 lg:mb-32">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-gray-800" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500 px-3">
            {tLogos("eyebrow")}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-800 to-gray-800" />
        </div>

        <LogoLoop
          logos={logos}
          speed={62}
          direction="left"
          logoHeight={34}
          gap={64}
          pauseOnHover
          hoverSpeed={0.25}
          scaleOnHover
          fadeOut
          fadeOutColor="#0A0A0A"
          ariaLabel={tLogos("eyebrow")}
        />
      </div>

      {/* Value prop */}
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 text-center">
        <AnimatedContent distance={50} duration={0.9} threshold={0.15}>
          <div className="inline-flex items-center justify-center mb-8">
            <BrandMark size={56} glow />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {t("eyebrow")}
              </span>
            </span>
          </div>
        </AnimatedContent>

        {/* Word-by-word float as the heading scrolls through the viewport */}
        <ScrollFloat
          containerClassName="max-w-[880px] mx-auto"
          textClassName="font-display font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.02em] text-gray-100"
          accent={t("accent")}
          accentClassName="text-brand-green"
          animationDuration={1}
          stagger={0.024}
          scrollStart="center bottom+=40%"
          scrollEnd="bottom bottom-=20%"
        >
          {t("title")}
        </ScrollFloat>

        <AnimatedContent distance={40} duration={0.8} delay={0.1} threshold={0.15}>
          <p className="mt-8 text-lg text-gray-300 max-w-[640px] mx-auto leading-relaxed">
            {t("body")}
          </p>
        </AnimatedContent>
      </div>
    </section>
  )
}
