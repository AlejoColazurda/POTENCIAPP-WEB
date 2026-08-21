"use client"

import { useState, useId } from "react"
import { Plus } from "lucide-react"
import { openFloatingChat } from "@/lib/site"
import { useTranslations } from "next-intl"
import AnimatedContent from "@/components/reactbits/AnimatedContent"

export function FaqSection() {
  const t = useTranslations("faq")
  const items = t.raw("items") as { q: string; a: string }[]
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section id="faq" className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <AnimatedContent distance={60} duration={0.9} threshold={0.15}>
        <div className="max-w-[800px] mx-auto text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
              {t("eyebrow")}
            </span>
          </span>
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-gray-100">
            {t("title")}
          </h2>
        </div>
        </AnimatedContent>

        <div className="max-w-[800px] mx-auto divide-y divide-gray-800 border-y border-gray-800">
          {items.map((f, i) => {
            const open = openIdx === i
            const btnId = `${baseId}-btn-${i}`
            const panelId = `${baseId}-panel-${i}`
            return (
              <AnimatedContent key={f.q} distance={30} duration={0.6} delay={i * 0.05} threshold={0.1}>
                <button
                  type="button"
                  id={btnId}
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between gap-6 py-6 lg:py-7 text-left group"
                >
                  <h3 className="font-display font-semibold text-lg lg:text-xl text-gray-100 group-hover:text-brand-green transition-colors">
                    {f.q}
                  </h3>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
                      open ? "rotate-45 text-brand-green" : "text-gray-500"
                    }`}
                    strokeWidth={2.5}
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 lg:pb-7 pr-12 text-base text-gray-300 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            )
          })}
        </div>

        <div className="max-w-[800px] mx-auto mt-10 text-center">
          <p className="text-base text-gray-300">
            {t("cta")}{" "}
            <button
              type="button"
              onClick={openFloatingChat}
              className="text-brand-green font-semibold hover:underline underline-offset-4"
            >
              {t("ctaLink")}
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
