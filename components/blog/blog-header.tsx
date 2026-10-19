"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Menu, X, ArrowRight, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { BrandWordmark } from "@/components/brand"
import { LanguageSwitcher } from "@/components/language-switcher"
import { cn } from "@/lib/utils"

export function BlogHeader() {
  const t = useTranslations("nav")
  const tb = useTranslations("blogUi")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-gray-950/85 backdrop-blur-xl border-b border-gray-800"
          : "bg-gray-950/60 backdrop-blur-md border-b border-gray-800/60",
      )}
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          {/* Logo & Sector Badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label={tb("homeAria")}
              className="group inline-flex items-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <BrandWordmark size="md" priority />
            </Link>
            <span className="text-gray-700 hidden sm:inline select-none">/</span>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22F23A]/10 border border-[#22F23A]/30 text-xs font-bold text-[#22F23A] tracking-wider uppercase transition hover:bg-[#22F23A]/20"
            >
              <Sparkles className="w-3 h-3 text-[#22F23A]" />
              <span>Blog</span>
            </Link>
          </div>

          {/* Desktop Nav: Distinct navigation for the Blog Sector */}
          <nav className="hidden md:flex items-center gap-2" aria-label={tb("navAria")}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-gray-800 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-[#22F23A]" />
              <span>{tb("backToSite")}</span>
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium text-[#22F23A] bg-[#22F23A]/10 border border-[#22F23A]/20 transition-all"
            >
              {tb("allArticles")}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher compact />
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-4 lg:px-5 h-10 lg:h-11 rounded-lg bg-brand-green text-black font-semibold text-sm hover:bg-green-hover hover:shadow-[0_0_24px_rgba(34,242,58,0.4)] transition-all duration-300 active:scale-[0.98]"
            >
              {t("ctaLong")}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>

          {/* Mobile Actions */}
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

      {/* Mobile Drawer */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-[24rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-4 py-4 gap-3" aria-label={tb("navAria")}>
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 text-base font-semibold text-white hover:text-brand-green py-3 border-b border-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-brand-green" />
            <span>{tb("backToSite")}</span>
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-brand-green py-3 border-b border-gray-800 transition-colors"
          >
            {tb("allArticles")}
          </Link>
          <Link
            href="/#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-brand-green text-black font-semibold"
          >
            {t("ctaLong")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
