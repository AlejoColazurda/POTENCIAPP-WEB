"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { SectionHeading } from "./services-section"

type CaseKey = "c1" | "c2" | "c3"

const METRICS: Record<CaseKey, { value: number; suffix: string; prefix?: string; decimals?: number }> = {
  c1: { value: 340, suffix: "%", prefix: "+" },
  c2: { value: 67, suffix: "%", prefix: "−" },
  c3: { value: 99.98, suffix: "%", decimals: 2 },
}

export function CasesSection() {
  const t = useTranslations("cases")
  const keys: CaseKey[] = ["c1", "c2", "c3"]

  return (
    <section id="casos" className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {keys.map((k) => (
            <CaseCard key={k} caseKey={k} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ caseKey }: { caseKey: CaseKey }) {
  const t = useTranslations(`cases.items.${caseKey}`)
  const tRoot = useTranslations("cases")
  const m = METRICS[caseKey]
  const ref = useRef<HTMLDivElement>(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf: number
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (reduced) {
            setVal(m.value)
          } else {
            const start = performance.now()
            const duration = 2800
            const step = (now: number) => {
              const t = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - t, 3)
              setVal(eased * m.value)
              if (t < 1) raf = requestAnimationFrame(step)
            }
            raf = requestAnimationFrame(step)
          }
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(ref.current)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [m.value])

  const formatted = m.decimals
    ? val.toFixed(m.decimals).replace(".", ",")
    : Math.round(val).toString()

  return (
    <div
      ref={ref}
      className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-brand-green hover:-translate-y-0.5"
    >
      <div className="font-display font-bold text-6xl lg:text-7xl text-brand-green leading-none tracking-[-0.04em] tabular-nums">
        {m.prefix || ""}
        {formatted}
        {m.suffix}
      </div>

      <div className="mt-3 font-mono text-[11px] uppercase tracking-wider text-gray-500">
        {t("metricLabel")}
      </div>

      <h3 className="mt-8 font-display font-semibold text-xl text-gray-100">{t("client")}</h3>
      <p className="mt-2 text-base text-gray-300 leading-relaxed">{t("desc")}</p>

      <Link
        href="#contacto"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green group-hover:gap-2.5 transition-all"
      >
        {tRoot("verCompleto")}
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </Link>
    </div>
  )
}
