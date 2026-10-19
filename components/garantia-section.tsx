"use client"

import { useEffect, useState } from "react"
import { FileSignature, Tag, ShieldCheck, Receipt, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import CardSwap, { Card } from "@/components/reactbits/CardSwap"
import AnimatedContent from "@/components/reactbits/AnimatedContent"
import Magnet from "@/components/reactbits/Magnet"

type ItemKey = "contrato" | "precio" | "garantia" | "respaldo"

const ITEMS: { key: ItemKey; icon: React.ReactNode }[] = [
  { key: "contrato", icon: <FileSignature className="h-5 w-5" strokeWidth={2.2} /> },
  { key: "precio", icon: <Tag className="h-5 w-5" strokeWidth={2.2} /> },
  { key: "garantia", icon: <ShieldCheck className="h-5 w-5" strokeWidth={2.2} /> },
  { key: "respaldo", icon: <Receipt className="h-5 w-5" strokeWidth={2.2} /> },
]

/**
 * Replaces the old testimonials section, which was built on invented people.
 * These four commitments are contractual, so they carry the trust load instead.
 */
export function GarantiaSection() {
  const t = useTranslations("garantia")
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReducedMotion(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  const useSwap = !reducedMotion

  return (
    <section
      id="garantia"
      className="relative bg-gray-950 pt-20 pb-20 lg:pt-32 lg:pb-32 border-t border-gray-800 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-brand-green/[0.05] blur-[170px] pointer-events-none"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <AnimatedContent distance={60} duration={0.9} threshold={0.15}>
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-green" strokeWidth={2.5} />
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                  {t("eyebrow")}
                </span>
              </span>

              <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-gray-100 max-w-[520px]">
                {t("title")} <span className="text-brand-green">{t("accent")}</span>
              </h2>

              <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-[480px]">
                {t("subtitle")}
              </p>

              <Magnet padding={80} magnetStrength={6} disabled={reducedMotion} wrapperClassName="mt-9 inline-flex">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3.5 rounded-lg bg-brand-green text-black font-display font-bold text-base hover:bg-green-hover hover:shadow-[0_0_32px_rgba(34,242,58,0.45)] transition-all duration-300 active:scale-[0.98]"
                >
                  {t("cta")}
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                </a>
              </Magnet>
            </div>
          </AnimatedContent>

          {/* Desktop 3D stack stays inside this box so it cannot overlap the
              footer or create page-level scroll-x. Mobile and reduced-motion
              use the same plain grid. */}
          {useSwap && (
            <div className="hidden lg:block relative isolate min-h-[420px] h-[560px] overflow-hidden">
              <CardSwap
                width={420}
                height={400}
                cardDistance={40}
                verticalDistance={48}
                delay={4600}
                pauseOnHover
                skewAmount={4}
                easing="linear"
              >
                {ITEMS.map(({ key, icon }) => (
                  <Card
                    key={key}
                    customClass="overflow-hidden border border-gray-800 bg-gray-900 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.85)]"
                  >
                    <CommitmentBody itemKey={key} icon={icon} className="h-full p-7" />
                  </Card>
                ))}
              </CardSwap>
            </div>
          )}

          <div className={`${useSwap ? "lg:hidden" : ""} grid gap-4 sm:grid-cols-2`}>
            {ITEMS.map(({ key, icon }, i) => (
              <AnimatedContent
                key={key}
                distance={40}
                duration={0.7}
                delay={i * 0.08}
                threshold={0.1}
                className="h-full"
              >
                <CommitmentBody
                  itemKey={key}
                  icon={icon}
                  className="h-full rounded-2xl border border-gray-800 bg-gray-900 p-6"
                />
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CommitmentBody({
  itemKey,
  icon,
  className = "",
}: {
  itemKey: ItemKey
  icon: React.ReactNode
  className?: string
}) {
  const t = useTranslations("garantia")

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-gray-950 text-brand-green">
          {icon}
        </span>
        <span className="rounded-full border border-brand-green/30 bg-brand-green/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-green text-right">
          {t(`items.${itemKey}.tag`)}
        </span>
      </div>

      <h3 className="font-display text-xl lg:text-2xl font-semibold tracking-tight text-gray-100">
        {t(`items.${itemKey}.title`)}
      </h3>

      <p className="text-[15px] leading-relaxed text-gray-300">{t(`items.${itemKey}.desc`)}</p>
    </div>
  )
}
