"use client"

import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { Line, Reveal, SectionIndex } from "@/components/editorial/reveal"
import { CONTACT_EMAIL, openFloatingChat, whatsAppUrl } from "@/lib/site"

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

        <Reveal as="h2" className="ed-parallax-slow mt-12 lg:mt-16 font-ed-display font-extrabold uppercase leading-[0.86] tracking-[-0.055em] text-[clamp(40px,10.4vw,200px)]">
          <Line>
            {tNav("ctaShort")}
            <span className="text-brand-green">.</span>
          </Line>
        </Reveal>

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

          <div className="ed-rise grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6 pt-8" style={{ ["--i" as string]: 1 }}>
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
