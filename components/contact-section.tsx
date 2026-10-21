"use client"

import { ArrowUpRight, CalendarDays } from "lucide-react"
import { useTranslations } from "next-intl"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { Line, Reveal, SectionIndex } from "@/components/editorial/reveal"
import { BOOKING_URL, CONTACT_EMAIL, openFloatingChat, whatsAppUrl } from "@/lib/site"

/**
 * Closing statement on ink: one word set at poster scale, the WhatsApp CTA
 * as a full-width bar that floods green on hover, the assistant and the
 * email as secondary lines. Flows straight into the footer.
 */
export function ContactSection() {
  const t = useTranslations("contact")
  const tNav = useTranslations("nav")
  const perks = t.raw("perks") as string[]

  return (
    <section id="contacto" className="relative bg-black text-gray-100 scroll-mt-16">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 pt-24 lg:pt-36 pb-16">
        <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="ed-rise col-span-12 lg:col-span-3">
            <SectionIndex n="10" label={t("eyebrow")} />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <p className="ed-rise font-ed-sans text-lg lg:text-xl leading-[1.45] text-gray-300 max-w-[52ch]">
              {t("title")} <span className="text-gray-100">{t("accent")}</span> {t("subtitle")}
            </p>
          </div>
        </Reveal>

        {/* The word plus its green period must never leave the column: size is
            the cap or whatever fits the container (0.82em ≈ Unbounded caps advance). */}
        <div className="mt-12 lg:mt-16 [container-type:inline-size]">
          <Reveal
            as="h2"
            className="ed-parallax-slow font-ed-display font-extrabold uppercase leading-[0.86] tracking-[-0.055em]"
            style={{ fontSize: `min(clamp(40px, 10.4vw, 200px), calc(100cqw / (0.82 * ${tNav("ctaShort").length + 0.6})))` }}
          >
            <Line>
              {tNav("ctaShort")}
              <span className="text-brand-green">.</span>
            </Line>
          </Reveal>
        </div>

        <Reveal className="mt-10 lg:mt-14">
          <a
            href={whatsAppUrl(t("waGreeting"))}
            target="_blank"
            rel="noopener noreferrer"
            className="ed-rise group relative flex items-center justify-between gap-6 overflow-hidden border-y border-gray-100/35 px-5 py-6 lg:px-8 lg:py-8"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 bg-brand-green transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
            <span className="relative flex items-center gap-4 lg:gap-6 font-ed-display text-2xl lg:text-5xl font-medium tracking-[-0.03em] transition-colors duration-300 group-hover:text-ink">
              <WhatsAppIcon className="h-7 w-7 lg:h-10 lg:w-10 text-[#25D366] transition-colors group-hover:text-ink" />
              {t("ctaWhatsApp")}
            </span>
            <ArrowUpRight
              className="relative h-8 w-8 lg:h-12 lg:w-12 shrink-0 transition-all duration-300 group-hover:text-ink group-hover:-translate-y-1 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </a>

          {/* Second bar: a commercial meeting on the calendar, same weight as WhatsApp. */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ed-rise group relative flex items-center justify-between gap-6 overflow-hidden border-b border-gray-100/35 px-5 py-6 lg:px-8 lg:py-8"
            style={{ ["--i" as string]: 1 }}
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 bg-brand-green transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
            <span className="relative flex min-w-0 items-center gap-4 lg:gap-6 transition-colors duration-300 group-hover:text-ink">
              <CalendarDays className="h-7 w-7 lg:h-10 lg:w-10 shrink-0 text-brand-green transition-colors group-hover:text-ink" strokeWidth={1.75} />
              <span className="min-w-0">
                <span className="block font-ed-display text-2xl lg:text-5xl font-medium tracking-[-0.03em]">{t("ctaBooking")}</span>
                <span className="mt-1 block ed-label text-gray-400 transition-colors group-hover:text-ink/70">{t("ctaBookingHint")}</span>
              </span>
            </span>
            <ArrowUpRight
              className="relative h-8 w-8 lg:h-12 lg:w-12 shrink-0 transition-all duration-300 group-hover:text-ink group-hover:-translate-y-1 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </a>

          <div className="ed-rise grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6 pt-8" style={{ ["--i" as string]: 2 }}>
            <button
              type="button"
              onClick={openFloatingChat}
              className="md:col-span-4 flex items-center justify-between border-b border-gray-800 pb-4 text-left font-ed-sans text-lg font-semibold hover:text-brand-green transition-colors"
            >
              {t("ctaAssistant")}
              <span aria-hidden>→</span>
            </button>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="md:col-span-4 flex items-center justify-between border-b border-gray-800 pb-4 font-ed-sans text-lg font-semibold hover:text-brand-green transition-colors"
            >
              {CONTACT_EMAIL}
              <span aria-hidden>→</span>
            </a>
            <ul className="md:col-span-4 flex flex-col gap-1.5">
              {perks.map((p) => (
                <li key={p} className="ed-label text-gray-400 flex items-center gap-2">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 bg-brand-green" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
