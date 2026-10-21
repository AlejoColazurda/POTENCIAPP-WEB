"use client"

import { useId, useState } from "react"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"

const KEYS = [
  "apps",
  "ia",
  "ecommerce",
  "mercadolibre",
  "marketing",
  "sitios",
  "sistemas",
  "automatizaciones",
  "ciberseguridad",
  "infraestructura",
  "consultoria",
] as const

type CardKey = (typeof KEYS)[number]

/**
 * Services as an editorial index instead of a card grid: eleven numbered
 * rows set large, each opening to its description and stack. On desktop a
 * sticky margin keeps the number of the row under the pointer, set huge.
 */
export function ServicesSection() {
  const t = useTranslations("services")
  const [open, setOpen] = useState<CardKey | null>("apps")
  const [hover, setHover] = useState<CardKey>("apps")
  const baseId = useId()
  const platforms = t.raw("platforms") as string[]
  const focus = hover ?? open ?? "apps"
  const focusIndex = KEYS.indexOf(focus)

  return (
    <section id="soluciones" className="relative bg-gray-950 text-gray-100 scroll-mt-16">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-24 lg:py-36">
        <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="ed-rise col-span-12 lg:col-span-3">
            <SectionIndex n="02" label={t("eyebrow")} />
          </div>
          <h2
            className="ed-rise col-span-12 lg:col-span-9 font-ed-display font-medium text-[clamp(32px,4.4vw,72px)] leading-[1.02] tracking-[-0.035em]"
            style={{ ["--i" as string]: 1 }}
          >
            {t("title")}
          </h2>
          <p
            className="ed-rise col-span-12 md:col-span-8 lg:col-span-5 lg:col-start-8 font-ed-sans text-lg leading-[1.5] text-gray-300"
            style={{ ["--i" as string]: 2 }}
          >
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-16 lg:mt-24 grid grid-cols-12 gap-x-6">
          {/* Sticky margin: the number of the focused row, set huge */}
          <div className="hidden lg:block lg:col-span-3">
            <div aria-hidden className="sticky top-28 ed-parallax-slow">
              <div
                key={focus}
                className="font-ed-display font-extrabold leading-none tracking-[-0.06em] text-[clamp(120px,12vw,210px)] ed-outline animate-fade-in"
                style={{ opacity: 1 }}
              >
                {String(focusIndex + 1).padStart(2, "0")}
              </div>
              <div className="ed-label mt-4 text-gray-400">
                {t(`cards.${focus}.eyebrow`).replace(/^\d+\s*·\s*/, "")}
              </div>
              <div className="mt-6 h-px w-full bg-gray-800">
                <div
                  className="h-px bg-black transition-[width] duration-500 ease-out"
                  style={{ width: `${((focusIndex + 1) / KEYS.length) * 100}%` }}
                />
              </div>
              <div className="ed-label mt-2 text-gray-400 tabular-nums">
                {String(focusIndex + 1).padStart(2, "0")} / {KEYS.length}
              </div>
            </div>
          </div>

          <ol className="col-span-12 lg:col-span-9 border-t border-gray-100/35" onMouseLeave={() => setHover(open ?? "apps")}>
            {KEYS.map((key, i) => {
              const isOpen = open === key
              const chips = (t.raw(`cards.${key}`) as { chips?: string[] }).chips ?? []
              const btnId = `${baseId}-b-${key}`
              const panelId = `${baseId}-p-${key}`
              return (
                <li key={key} className="border-b border-gray-800" onMouseEnter={() => setHover(key)}>
                  <h3>
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        setOpen(isOpen ? null : key)
                        setHover(key)
                      }}
                      className="group relative grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 lg:py-7 text-left focus-visible:outline-none"
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-green transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                          isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                        }`}
                      />
                      <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`font-ed-display font-medium tracking-[-0.03em] leading-[1.05] text-[clamp(24px,3.1vw,48px)] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                          isOpen ? "lg:translate-x-3" : "group-hover:lg:translate-x-3"
                        }`}
                      >
                        {t(`cards.${key}.title`)}
                      </span>
                      <span
                        aria-hidden
                        className={`font-ed-display text-2xl leading-none transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 pb-8 lg:grid-cols-[2.5rem_1fr_1fr] lg:gap-x-10">
                        <span />
                        <p className="font-ed-sans text-[17px] leading-[1.55] text-gray-300 max-w-[52ch]">
                          {t(`cards.${key}.desc`)}
                        </p>
                        <div className="col-start-2 mt-5 lg:col-start-3 lg:mt-0 flex flex-col justify-between gap-5">
                          {chips.length > 0 && (
                            <p className="ed-label text-gray-100 leading-[1.9]">{chips.join("  /  ")}</p>
                          )}
                          <a href="#contacto" className="group/cta inline-flex items-center gap-2 self-start font-ed-sans text-[15px] font-semibold text-gray-100 ed-link">
                            {t("verMas")}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" strokeWidth={2} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Platforms: secondary message, set as a line of text, not chips */}
        <Reveal className="mt-20 lg:mt-28 grid grid-cols-12 gap-x-6 gap-y-6 border-t border-gray-100/35 pt-8">
          <div className="ed-rise col-span-12 lg:col-span-3">
            <p className="ed-label text-gray-400">{t("platformsTitle")}</p>
          </div>
          <div className="ed-rise col-span-12 lg:col-span-9" style={{ ["--i" as string]: 1 }}>
            <p className="font-ed-display font-light text-[clamp(22px,2.6vw,40px)] leading-[1.25] tracking-[-0.02em]">
              {platforms.map((p, i) => (
                <span key={p}>
                  {p}
                  {i < platforms.length - 1 && <span className="text-gray-600"> / </span>}
                </span>
              ))}
            </p>
            <p className="mt-5 max-w-[60ch] font-ed-sans text-[15px] leading-[1.55] text-gray-300">{t("platformsSubtitle")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
