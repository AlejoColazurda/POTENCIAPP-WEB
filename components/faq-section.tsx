"use client"

import { useId, useState } from "react"
import { useTranslations } from "next-intl"
import { openFloatingChat } from "@/lib/site"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"

/**
 * FAQ as a numbered, ruled reference list: question in the display face,
 * answer in a narrower measure, index in mono. Same Q&A as the FAQPage
 * JSON-LD on the home page.
 */
export function FaqSection() {
  const t = useTranslations("faq")
  const items = t.raw("items") as { q: string; a: string }[]
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section id="faq" className="relative bg-gray-900 text-gray-100 scroll-mt-16">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-24 lg:py-36">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
            <div className="ed-rise">
              <SectionIndex n="09" label={t("eyebrow")} />
            </div>
            <h2
              className="ed-rise mt-8 font-ed-display font-medium text-[clamp(30px,3.4vw,54px)] leading-[1.04] tracking-[-0.035em]"
              style={{ ["--i" as string]: 1 }}
            >
              {t("title")}
            </h2>
            <p className="ed-rise mt-8 font-ed-sans text-[16px] text-gray-300" style={{ ["--i" as string]: 2 }}>
              {t("cta")}{" "}
              <button type="button" onClick={openFloatingChat} className="font-semibold text-gray-100 ed-link">
                {t("ctaLink")}
              </button>
            </p>
          </Reveal>

          <ol className="col-span-12 lg:col-span-8 border-t border-gray-100/35">
            {items.map((f, i) => {
              const open = openIdx === i
              const btnId = `${baseId}-btn-${i}`
              const panelId = `${baseId}-panel-${i}`
              return (
                <li key={f.q} className="border-b border-gray-800">
                  <h3>
                    <button
                      type="button"
                      id={btnId}
                      onClick={() => setOpenIdx(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={panelId}
                      className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 text-left focus-visible:outline-none focus-visible:bg-gray-900"
                    >
                      <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-ed-display text-lg lg:text-[22px] font-medium tracking-[-0.02em] leading-[1.25] group-hover:underline decoration-brand-green decoration-[3px] underline-offset-[6px]">
                        {f.q}
                      </span>
                      <span aria-hidden className={`font-ed-display text-2xl leading-none transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pl-[3.5rem] pr-10 font-ed-sans text-[16px] leading-[1.65] text-gray-300 max-w-[68ch]">{f.a}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
