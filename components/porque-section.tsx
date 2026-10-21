"use client"

import { useTranslations } from "next-intl"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"

/**
 * "Cualquiera te promete. Nosotros te lo firmamos." set as a ledger: each
 * usual practice struck through on the left, its counterpart on the right,
 * row by row. Figures close the section like a table footer.
 */
export function PorQueSection() {
  const t = useTranslations("porque")
  const otros = t.raw("otrosItems") as string[]
  const nosotros = t.raw("nosotrosItems") as string[]
  const stats = t.raw("stats") as { value: string; label: string }[]

  return (
    <section className="relative bg-black text-gray-100">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-24 lg:py-36">
        <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="ed-rise col-span-12 lg:col-span-3">
            <SectionIndex n="07" label={t("eyebrow")} />
          </div>
          <h2
            className="ed-rise col-span-12 lg:col-span-9 font-ed-display font-medium text-[clamp(34px,5.2vw,88px)] leading-[0.98] tracking-[-0.045em]"
            style={{ ["--i" as string]: 1 }}
          >
            {t("title")}
            <br />
            <span className="text-brand-green">{t("accent")}</span>
          </h2>
        </Reveal>

        <div className="mt-16 lg:mt-24 grid grid-cols-12 gap-x-6">
          <div className="hidden lg:block lg:col-span-3" />
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-2 gap-x-6 border-b border-gray-100/35 pb-3">
              <p className="ed-label text-gray-400">{t("otros")}</p>
              <p className="ed-label text-brand-green">{t("nosotros")}</p>
            </div>
            <Reveal as="ol">
              {nosotros.map((ours, i) => (
                <li
                  key={ours}
                  className="ed-rise grid grid-cols-1 gap-y-2 border-b border-gray-800 py-5 md:grid-cols-2 md:gap-x-6 lg:py-6"
                  style={{ ["--i" as string]: i }}
                >
                  <p className="font-ed-sans text-[15px] leading-[1.5] text-gray-400 line-through decoration-gray-600">
                    {otros[i]}
                  </p>
                  <p className="font-ed-sans text-[17px] leading-[1.45] text-gray-100">
                    <span className="ed-label mr-3 text-brand-green">{String(i + 1).padStart(2, "0")}</span>
                    {ours}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>

        {stats.length > 0 && (
        <Reveal className="mt-20 grid grid-cols-2 lg:grid-cols-4 border-t border-gray-100/35">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`ed-rise py-6 lg:py-8 pr-4 ${i % 2 === 1 ? "pl-4 border-l border-gray-800" : ""} ${
                i >= 2 ? "border-t border-gray-800 lg:border-t-0" : ""
              } ${i === 2 ? "lg:pl-4 lg:border-l" : ""}`}
              style={{ ["--i" as string]: i }}
            >
              <div className="font-ed-display text-4xl lg:text-5xl font-medium tracking-[-0.04em] tabular-nums">{s.value}</div>
              <div className="ed-label mt-2 text-gray-400">{s.label}</div>
            </div>
          ))}
        </Reveal>
        )}
      </div>
    </section>
  )
}
