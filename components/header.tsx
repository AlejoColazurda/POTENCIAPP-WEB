"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { BrandWordmark } from "@/components/brand"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const t = useTranslations("nav")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { key: "soluciones", href: "#soluciones" },
    { key: "casos", href: "#casos" },
    { key: "proceso", href: "#proceso" },
    { key: "faq", href: "#faq" },
  ] as const

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
            <BrandWordmark size="md" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-gray-100 transition-colors duration-200"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher compact />
            <Link
              href="#contacto"
              className="inline-flex items-center gap-2 px-4 lg:px-5 h-10 lg:h-11 rounded-lg bg-brand-green text-black font-semibold text-sm hover:bg-green-hover hover:shadow-[0_0_24px_rgba(34,242,58,0.4)] transition-all duration-300 active:scale-[0.98]"
            >
              {t("ctaLong")}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher compact />
            <button
              type="button"
              className="p-2 text-gray-100"
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
          "md:hidden absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-4 py-4 gap-2" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-gray-300 hover:text-gray-100 py-3 border-b border-gray-800 last:border-b-0"
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-brand-green text-black font-semibold"
          >
            {t("ctaLong")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
