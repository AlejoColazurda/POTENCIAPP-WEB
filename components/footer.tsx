"use client"

import { ArrowUpRight, CalendarDays } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { BrandWordmark } from "@/components/brand"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { BOOKING_URL, CONTACT_EMAIL, WA_PHONE } from "@/lib/site"
import { NAV_PAGE_LINKS, homeSectionHref } from "@/components/header"


export function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")
  const tContact = useTranslations("contact")
  const pathname = usePathname()
  const locale = useLocale()
  const year = new Date().getFullYear()
  const section = (id: string) => homeSectionHref(pathname, locale, id)

  const pageLinks = (
    [
      ["precios", "/precios"],
      ["equipo", "/equipo"],
      ["blog", "/blog"],
    ] as const
  )
    .filter(([key]) => NAV_PAGE_LINKS[key])
    .map(([key, href]) => ({ label: tNav(key), href }))

  const columns = [
    {
      title: t("soluciones"),
      links: [
        { label: tNav("soluciones"), href: section("soluciones") },
        { label: tNav("proyectos"), href: section("proyectos") },
      ],
    },
    {
      title: t("empresa"),
      links: [
        { label: tNav("garantia"), href: section("garantia") },
        { label: tNav("proceso"), href: section("proceso") },
        { label: tNav("faq"), href: section("faq") },
        ...pageLinks,
      ],
    },
    {
      title: t("recursos"),
      links: [
        { label: t("terms"), href: "/legal#terminos" },
        { label: t("privacy"), href: "/legal#privacidad" },
      ],
    },
  ]

  const linkClass = "font-ed-sans text-[15px] text-gray-300 hover:text-gray-100 transition-colors"

  return (
    <footer className="relative bg-black text-gray-100 border-t border-gray-800">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 pt-16 lg:pt-24">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-2 md:col-span-5">
            <Link href="/" aria-label="PotenciApp" className="inline-flex">
              <BrandWordmark size="lg" theme="dark" />
            </Link>
            <p className="mt-6 font-ed-sans text-lg leading-[1.45] text-gray-300 max-w-[40ch]">{t("tagline")}</p>
            <div className="mt-8 ed-label text-gray-400">
              {t("operamos")}
              <div className="mt-1 text-gray-300">{t("operamosValue")}</div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h2 className="ed-label text-gray-400 mb-5">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") || link.href.includes("/#") ? (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-12 lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-x-6 border-t border-gray-800">
            <h2 className="sr-only">{t("conecta")}</h2>
            <a
              href={`https://wa.me/${WA_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border-b border-gray-800 py-5 md:border-b-0"
            >
              <span className="flex items-center gap-3 font-ed-display text-xl lg:text-2xl font-medium tracking-[-0.02em]">
                <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
                WhatsApp
              </span>
              <ArrowUpRight className="h-5 w-5 text-gray-400 transition-all group-hover:text-brand-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex min-w-0 items-center justify-between gap-4 border-b border-gray-800 py-5 md:border-b-0 md:border-l md:border-gray-800 md:pl-6"
            >
              <span className="min-w-0 break-all font-ed-display text-base lg:text-lg font-medium tracking-[-0.02em]">
                {CONTACT_EMAIL}
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400 transition-all group-hover:text-brand-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border-t border-gray-800 py-5 md:border-t-0 md:border-l md:pl-6"
            >
              <span className="flex items-center gap-3 font-ed-display text-xl lg:text-2xl font-medium tracking-[-0.02em]">
                <CalendarDays className="h-6 w-6 text-brand-green" strokeWidth={1.75} />
                {tContact("ctaBooking")}
              </span>
              <ArrowUpRight className="h-5 w-5 text-gray-400 transition-all group-hover:text-brand-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-6 mb-20 flex flex-col gap-4 border-t border-gray-800 py-6 md:flex-row md:items-center md:justify-between">
          <p className="ed-label text-gray-400">{t("rights", { year })}</p>
          <p className="ed-label text-gray-300 flex items-center gap-2">
            <span aria-hidden className="inline-block h-2 w-2 bg-brand-green" />
            {t("availability")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/legal#terminos" className="ed-label text-gray-400 hover:text-gray-100">
              {t("terms")}
            </Link>
            <Link href="/legal#privacidad" className="ed-label text-gray-400 hover:text-gray-100">
              {t("privacy")}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
