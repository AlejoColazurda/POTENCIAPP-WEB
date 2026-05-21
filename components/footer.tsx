"use client"

import Link from "next/link"
import { Linkedin, Twitter, Instagram, Github, MessageCircle, Rocket } from "lucide-react"
import { useTranslations } from "next-intl"
import { BrandWordmark } from "@/components/brand"

const social = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "GitHub", href: "#", Icon: Github },
  { label: "WhatsApp", href: "#chat", Icon: MessageCircle },
]

export function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")
  const year = new Date().getFullYear()

  const columns = [
    {
      title: t("soluciones"),
      links: [
        { label: tNav("soluciones"), href: "#soluciones" },
        { label: t("recursos"), href: "#" },
      ],
    },
    {
      title: t("empresa"),
      links: [
        { label: tNav("casos"), href: "#casos" },
        { label: tNav("proceso"), href: "#proceso" },
        { label: tNav("faq"), href: "#faq" },
      ],
    },
    {
      title: t("recursos"),
      links: [
        { label: t("terms"), href: "#" },
        { label: t("privacy"), href: "#" },
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
              <BrandWordmark size="lg" />
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-xs leading-relaxed">{t("tagline")}</p>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-wider text-gray-500">
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
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-100 transition-colors"
                    >
                      {link.label}
                    </Link>
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
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-100 transition-colors group"
                  >
                    <Icon className="h-4 w-4 group-hover:text-brand-green transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-xs text-gray-500">{t("rights", { year })}</p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800 self-start md:self-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
              {t("availability")}
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs text-gray-500">
            <Link href="#" className="hover:text-gray-100 transition-colors">
              {t("terms")}
            </Link>
            <Link href="#" className="hover:text-gray-100 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="#" className="hover:text-gray-100 transition-colors">
              {t("cookies")}
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
