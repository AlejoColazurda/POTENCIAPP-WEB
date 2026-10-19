"use client"

import { Mail, Rocket } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { BrandWordmark } from "@/components/brand"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { CONTACT_EMAIL, WA_PHONE } from "@/lib/site"
import { NAV_PAGE_LINKS, homeSectionHref } from "@/components/header"

const social = [
  { label: "WhatsApp", href: `https://wa.me/${WA_PHONE}`, Icon: WhatsAppIcon, iconClass: "text-[#25D366]" },
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, Icon: Mail, iconClass: "group-hover:text-brand-green" },
]

export function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")
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

  return (
    <footer className="relative bg-gray-950 border-t border-gray-800 pt-20 lg:pt-32 pb-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12">
          <div className="col-span-2 md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center group transition-transform duration-300 hover:scale-[1.02]"
            >
              <BrandWordmark size="lg" theme="dark" />
            </Link>
            <p className="mt-4 text-sm text-gray-300 max-w-xs leading-relaxed">{t("tagline")}</p>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-wider text-gray-300">
              {t("operamos")}
              <div className="mt-1 text-gray-300">{t("operamosValue")}</div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-gray-100 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") || link.href.includes("/#") ? (
                      <a
                        href={link.href}
                        className="text-sm text-gray-300 hover:text-gray-100 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-300 hover:text-gray-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-gray-100 mb-4">
              {t("conecta")}
            </h4>
            <ul className="space-y-3">
              {social.map(({ label, href, Icon, iconClass }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-gray-100 transition-colors group"
                  >
                    <Icon className={`h-4 w-4 transition-colors ${iconClass}`} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-xs text-gray-300">{t("rights", { year })}</p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800 self-start md:self-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
              {t("availability")}
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs text-gray-300">
            <Link href="/legal#terminos" className="hover:text-gray-100 transition-colors">
              {t("terms")}
            </Link>
            <Link href="/legal#privacidad" className="hover:text-gray-100 transition-colors">
              {t("privacy")}
            </Link>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Rocket
            className="h-6 w-6 text-gray-800"
            style={{ transform: "rotate(45deg)" }}
            aria-hidden
          />
        </div>
      </div>
    </footer>
  )
}
