"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Check, Mail, Minus } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { SectionHeading } from "@/components/services-section"
import AnimatedContent from "@/components/reactbits/AnimatedContent"
import { CONTACT_EMAIL, whatsAppUrl } from "@/lib/site"
import { homeSectionHref } from "@/components/header"

const PROCESS_KEYS = ["s1", "s2", "s3"] as const
const BAND_IDS = ["sitio", "tienda", "sistema", "app", "ciber"] as const
const PROCESS_NUM = ["01", "02", "03"] as const

type RateRow = { band: string; from: string }
type Rates = {
  enabled: boolean
  eyebrow: string
  note: string
  rows: RateRow[]
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])
  return reduced
}

function showRates(rates: Rates) {
  return rates.enabled === true && rates.rows.some((row) => row.from.trim() !== "")
}

const PLATE_SRC = "/studio/plates/plate-precios-16x9.jpg"

function useOptionalImage(src: string) {
  const [exists, setExists] = useState(false)
  useEffect(() => {
    let cancelled = false
    const img = new window.Image()
    img.onload = () => {
      if (!cancelled) setExists(true)
    }
    img.onerror = () => {
      if (!cancelled) setExists(false)
    }
    img.src = src
    return () => {
      cancelled = true
    }
  }, [src])
  return exists
}

export function PreciosPage() {
  const t = useTranslations("precios")
  const tNav = useTranslations("nav")
  const locale = useLocale()
  const reducedMotion = useReducedMotion()
  const hasPlate = useOptionalImage(PLATE_SRC)
  const drivers = t.raw("drivers.items") as string[]
  const faq = t.raw("faq") as { q: string; a: string }[]
  const rates = t.raw("rates") as Rates
  const contactoHref = homeSectionHref("/precios", locale, "contacto")
  const faqHomeHref = homeSectionHref("/precios", locale, "faq")
  const visibleRates = showRates(rates)
    ? rates.rows.filter((row) => row.from.trim() !== "")
    : []

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gray-950 pt-32 pb-16 lg:pt-40 lg:pb-24">
        {hasPlate ? (
          <Image
            src={PLATE_SRC}
            alt="Fondo de estudio, sin texto"
            fill
            priority
            sizes="100vw"
            className="object-cover pointer-events-none"
            style={{ opacity: reducedMotion ? 0.3 : 0.32 }}
          />
        ) : null}
        <div aria-hidden className="absolute inset-0 bg-gray-950/80 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 md:px-8">
          <div className="max-w-[720px]">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {t("eyebrow")}
              </span>
            </span>
            <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-gray-100">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-[720px]">{t("lead")}</p>
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-green" />
      </section>

      <section className="relative bg-gray-950 py-20 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <SectionHeading eyebrow={t("process.eyebrow")} title={t("process.eyebrow")} />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {PROCESS_KEYS.map((key, i) => (
              <AnimatedContent key={key} distance={40} duration={0.8} delay={i * 0.08} threshold={0.15}>
                <p className="font-display font-bold text-5xl text-gray-700 leading-none tracking-[-0.04em] select-none">
                  {PROCESS_NUM[i]}
                </p>
                <h3 className="mt-4 font-display font-semibold text-2xl text-gray-100">
                  {t(`process.${key}.title`)}
                </h3>
                <p className="mt-3 text-base text-gray-300 leading-relaxed max-w-[360px]">
                  {t(`process.${key}.body`)}
                </p>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <SectionHeading eyebrow={t("drivers.eyebrow")} title={t("drivers.title")} />
          <ul className="mt-10 flex flex-col sm:flex-wrap sm:flex-row gap-3">
            {drivers.map((item) => (
              <li
                key={item}
                className="inline-flex items-center rounded-full border border-gray-800 bg-gray-900 px-4 py-2.5 text-sm text-gray-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {BAND_IDS.map((id, i) => {
              const includes = t.raw(`bands.${id}.includes`) as string[]
              const excludes = t.raw(`bands.${id}.excludes`) as string[]
              return (
                <AnimatedContent key={id} distance={40} duration={0.7} delay={(i % 2) * 0.06} threshold={0.12}>
                  <article className="h-full rounded-2xl border border-gray-800 bg-gray-900 p-6 lg:p-8">
                    <h3 className="font-display font-semibold text-2xl text-gray-100">
                      {t(`bands.${id}.title`)}
                    </h3>
                    <p className="mt-2 text-base text-gray-300 leading-relaxed">{t(`bands.${id}.line`)}</p>
                    <Separator className="my-6 bg-gray-800" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-mono text-[11px] uppercase tracking-wider text-gray-100 mb-3">
                          {t("bands.includesLabel")}
                        </h4>
                        <ul className="space-y-2">
                          {includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-100">
                              <Check
                                className="h-4 w-4 shrink-0 mt-0.5 text-brand-green"
                                strokeWidth={2.5}
                                aria-hidden
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-mono text-[11px] uppercase tracking-wider text-gray-100 mb-3">
                          {t("bands.excludesLabel")}
                        </h4>
                        <ul className="space-y-2">
                          {excludes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                              <Minus className="h-4 w-4 shrink-0 mt-0.5 text-gray-300" strokeWidth={2.5} aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </AnimatedContent>
              )
            })}
          </div>
        </div>
      </section>

      {visibleRates.length > 0 ? (
        <section className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8">
            <SectionHeading eyebrow={rates.eyebrow} title={rates.eyebrow} />
            <div className="mt-10 overflow-x-auto">
              <table className="w-full caption-bottom text-left border-collapse">
                <caption className="mt-4 text-sm text-gray-300 text-left">{rates.note}</caption>
                <tbody>
                  {visibleRates.map((row) => (
                    <tr key={row.band} className="border-b border-gray-800">
                      <th
                        scope="row"
                        className="py-4 pr-6 font-display font-semibold text-gray-100 whitespace-nowrap"
                      >
                        {t(`bands.${row.band}.title`)}
                      </th>
                      <td className="py-4 text-gray-100 font-mono text-sm">{row.from}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <Card className="border-gray-800 bg-gray-900 rounded-2xl py-10 lg:py-14">
            <CardContent className="px-6 md:px-12 text-center">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-gray-100">
                {t("cta.title")}
              </h2>
              <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-[640px] mx-auto">
                {t("cta.body")}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={contactoHref}
                  className="inline-flex items-center justify-center min-h-11 h-12 px-7 rounded-lg bg-brand-green text-black font-display font-bold text-base hover:bg-green-hover hover:shadow-[0_0_32px_rgba(34,242,58,0.5)] transition-all duration-300"
                >
                  {t("cta.primary")}
                </a>
                <a
                  href={whatsAppUrl(t("waGreeting"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-11 h-12 px-7 rounded-lg border border-brand-green text-brand-green font-display font-bold text-base hover:bg-brand-green/10 transition-all duration-300"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t("cta.whatsapp")}
                </a>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-gray-300 hover:text-brand-green transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {CONTACT_EMAIL}
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800">
        <div className="max-w-[800px] mx-auto px-4 md:px-8">
          <Accordion type="single" collapsible defaultValue="item-0" className="border-y border-gray-800">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-gray-800">
                <AccordionTrigger className="min-h-11 py-6 text-left font-display font-semibold text-lg text-gray-100 hover:no-underline hover:text-brand-green">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-300 leading-relaxed pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-8">
            <a
              href={faqHomeHref}
              className="inline-flex min-h-11 items-center text-brand-green font-semibold hover:underline underline-offset-4"
            >
              {tNav("faq")}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
