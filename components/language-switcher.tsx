"use client"

import { useState, useRef, useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Globe, Check, ChevronDown } from "lucide-react"
import { routing, type Locale } from "@/i18n/routing"
import { useRouter, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const FLAG: Record<Locale, string> = {
  es: "🇦🇷",
  en: "🇺🇸",
  pt: "🇧🇷",
  fr: "🇫🇷",
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale
  const t = useTranslations("lang")
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) {
      document.addEventListener("mousedown", onClick)
      document.addEventListener("keydown", onKey)
    }
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  function switchTo(next: Locale) {
    if (next === locale) {
      setOpen(false)
      return
    }
    // next-intl's locale-aware router: pathname here is already
    // without the locale prefix. Passing `locale` rewrites correctly,
    // including back to the default locale.
    router.replace(pathname, { locale: next })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("switcherLabel")}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-3 h-10 text-sm text-gray-300 hover:text-gray-100 hover:border-gray-700 transition-colors",
          compact && "h-9 px-2.5",
        )}
      >
        <Globe className="h-4 w-4 text-gray-500" />
        {!compact && (
          <span className="font-mono text-xs uppercase tracking-wider">{locale}</span>
        )}
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-gray-500 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("switcherLabel")}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 rounded-xl border border-gray-800 bg-gray-900 p-1.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] animate-fade-in"
        >
          {routing.locales.map((code) => {
            const active = code === locale
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => switchTo(code)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-gray-800 text-gray-100"
                      : "text-gray-300 hover:bg-gray-800 hover:text-gray-100",
                  )}
                >
                  <span className="text-base leading-none" aria-hidden>
                    {FLAG[code]}
                  </span>
                  <span className="flex-1 text-left">{t(code)}</span>
                  {active && <Check className="h-4 w-4 text-brand-green" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
