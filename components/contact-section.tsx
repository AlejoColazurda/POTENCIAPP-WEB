"use client"

import { Check, Mail, MessageCircle, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import AnimatedContent from "@/components/reactbits/AnimatedContent"
import Magnet from "@/components/reactbits/Magnet"
import { CONTACT_EMAIL, openFloatingChat, whatsAppUrl } from "@/lib/site"

/**
 * Compact closing CTA. The long multi-field form it replaces asked for budget
 * and billing before the visitor ever talked to anyone — the floating assistant
 * and WhatsApp carry that conversation now.
 */
export function ContactSection() {
  const t = useTranslations("contact")
  const perks = t.raw("perks") as string[]

  return (
    <section
      id="contacto"
      className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] rounded-full bg-brand-green/[0.07] blur-[160px] pointer-events-none"
      />

      <div className="relative max-w-[880px] mx-auto px-4 md:px-8 text-center">
        <AnimatedContent distance={60} duration={0.9} threshold={0.15}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
              {t("eyebrow")}
            </span>
          </span>

          <h2 className="mt-5 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-gray-100">
            {t("title")} <span className="text-brand-green">{t("accent")}</span>
          </h2>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-[600px] mx-auto">
            {t("subtitle")}
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {perks.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 text-sm text-gray-300">
                <Check className="h-4 w-4 text-brand-green" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Magnet padding={90} magnetStrength={5} wrapperClassName="inline-flex">
              <a
                href={whatsAppUrl(t("waGreeting"))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-lg bg-brand-green text-black font-display font-bold text-base hover:bg-green-hover hover:shadow-[0_0_32px_rgba(34,242,58,0.5)] transition-all duration-300 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
                {t("ctaWhatsApp")}
              </a>
            </Magnet>

            <button
              type="button"
              onClick={openFloatingChat}
              className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-lg border border-brand-green text-brand-green font-display font-bold text-base hover:bg-brand-green/10 transition-all duration-300"
            >
              <Sparkles className="h-5 w-5" strokeWidth={2.5} />
              {t("ctaAssistant")}
            </button>
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-gray-500 hover:text-brand-green transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            {CONTACT_EMAIL}
          </a>
        </AnimatedContent>
      </div>
    </section>
  )
}
