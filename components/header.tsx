"use client"

import { useState, useEffect, useMemo } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { BrandWordmark } from "@/components/brand"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SectionNav } from "@/components/section-nav"
import { routing } from "@/i18n/routing"

/**
 * Feature branches flip their key to true when the route exists.
 * Do not add hrefs while the flag is false — those URLs 404.
 */
export const NAV_PAGE_LINKS = {
  precios: false,
  equipo: false,
  blog: true,
} as const

const SECTION_ITEMS = [
  { key: "soluciones", id: "soluciones" },
  { key: "proyectos", id: "proyectos" },
  { key: "faq", id: "faq" },
] as const

const PAGE_ITEMS = [
  { key: "precios", href: "/precios" },
  { key: "equipo", href: "/equipo" },
  { key: "blog", href: "/blog" },
] as const

export function homeSectionHref(pathname: string, locale: string, id: string) {
  if (pathname === "/") return `#${id}`
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`
  return `${prefix}/#${id}`
}

function isHashHref(href: string) {
  return href.includes("#")
}

export function Header() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = useMemo(() => {
    const sections = SECTION_ITEMS.map((item) => ({
      label: t(item.key),
      href: homeSectionHref(pathname, locale, item.id),
    }))
    const pages = PAGE_ITEMS.filter((item) => NAV_PAGE_LINKS[item.key]).map((item) => ({
      label: t(item.key),
      href: item.href,
    }))
    return [sections[0], sections[1], ...pages, sections[2]]
  }, [t, pathname, locale])

  const contactoHref = homeSectionHref(pathname, locale, "contacto")
  const mobileLinkClass =
    "flex min-h-11 items-center text-base font-medium text-gray-300 hover:text-brand-green py-3 border-b border-gray-800 last:border-b-0 transition-colors"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-gray-950/80 backdrop-blur-xl border-b border-gray-800"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="PotenciApp"
            className="group inline-flex items-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <BrandWordmark size="md" theme="dark" priority />
          </Link>

          <nav className="hidden lg:block" aria-label="Principal">
            <SectionNav items={navItems} />
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher compact />
            <a
              href={contactoHref}
              className="inline-flex items-center justify-center gap-2 px-4 lg:px-5 min-h-11 h-11 rounded-lg bg-brand-green text-black font-semibold text-sm hover:bg-green-hover hover:shadow-[0_0_24px_rgba(34,242,58,0.4)] transition-all duration-300 active:scale-[0.98]"
            >
              {t("ctaLong")}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher compact />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center text-gray-100"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? t("close") : t("menu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-4 py-4 gap-2" aria-label="Mobile">
          {navItems.map((item) =>
            isHashHref(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  mobileLinkClass,
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-brand-green font-semibold"
                    : null,
                )}
              >
                {item.label}
              </Link>
            ),
          )}
          <a
            href={contactoHref}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-brand-green text-black font-semibold"
          >
            {t("ctaLong")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
