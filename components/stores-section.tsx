"use client"

import { useTranslations } from "next-intl"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"
import { AppStoreBadge, PlayStoreBadge } from "@/components/store-badges"

/**
 * Native apps: a statement plus the store badges, then the four guarantees
 * as a ruled, numbered sequence — columns divided by hairlines, no cards.
 */
export function StoresSection() {
  const t = useTranslations("stores")
  const points = t.raw("points") as { title: string; desc: string }[]

  return (
    <section id="apps" className="relative bg-gray-900 text-gray-100">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-24 lg:py-32">
        <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
          <div className="ed-rise col-span-12 lg:col-span-3 self-start">
            <SectionIndex n="03" label={t("eyebrow")} />
          </div>
          <h2
            className="ed-rise col-span-12 lg:col-span-6 font-ed-display font-medium text-[clamp(30px,3.8vw,60px)] leading-[1.04] tracking-[-0.035em]"
            style={{ ["--i" as string]: 1 }}
          >
            {t("title")} <span className="ed-mark">{t("accent")}</span>
          </h2>
          <div className="ed-rise col-span-12 lg:col-span-3 flex flex-wrap items-start gap-3 lg:flex-col" style={{ ["--i" as string]: 2 }}>
            <AppStoreBadge top={t("appStoreTop")} name={t("appStoreName")} verified={t("verified")} />
            <PlayStoreBadge top={t("playStoreTop")} name={t("playStoreName")} verified={t("verified")} />
          </div>
          <p
            className="ed-rise col-span-12 md:col-span-8 lg:col-span-6 lg:col-start-4 font-ed-sans text-lg leading-[1.5] text-gray-300"
            style={{ ["--i" as string]: 3 }}
          >
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal as="ol" className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-gray-100/35">
          {points.map((p, i) => (
            <li
              key={p.title}
              className={`ed-rise border-b border-gray-800 py-6 sm:pr-6 lg:border-b-0 lg:py-8 ${
                i > 0 ? "lg:border-l lg:pl-6" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:pl-6" : ""}`}
              style={{ ["--i" as string]: i }}
            >
              <span className="ed-label text-gray-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-ed-display text-xl font-medium tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-3 font-ed-sans text-[15px] leading-[1.55] text-gray-300">{p.desc}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
