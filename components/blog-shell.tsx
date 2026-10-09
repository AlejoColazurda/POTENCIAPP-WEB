import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { BrandWordmark } from "@/components/brand"
import { Footer } from "@/components/footer"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { whatsAppUrl } from "@/lib/site"

/**
 * Chrome for /blog pages. The home Header is built around in-page anchors and
 * scroll-spy, which mean nothing here, so the blog gets a slim bar instead.
 */
export async function BlogShell({ locale, children }: { locale: string; children: React.ReactNode }) {
  const t = await getTranslations({ locale, namespace: "blog" })
  const tNav = await getTranslations({ locale, namespace: "nav" })

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="PotenciApp" className="inline-flex items-center">
              <BrandWordmark size="md" priority />
            </Link>
            <span className="hidden h-5 w-px bg-gray-800 sm:block" />
            <Link
              href="/blog"
              className="hidden font-mono text-[12px] uppercase tracking-wider text-gray-300 transition-colors hover:text-brand-green sm:block"
            >
              {tNav("blog")}
            </Link>
          </div>
          <Link
            href={{ pathname: "/", hash: "contacto" }}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-black transition-colors hover:bg-green-hover"
          >
            {tNav("ctaShort")}
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  )
}

/** End-of-article / end-of-list CTA: the reason the blog exists. */
export async function BlogCta({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blog" })
  return (
    <aside className="mt-16 rounded-2xl border border-brand-green/30 bg-gray-900 p-6 shadow-[0_0_60px_-24px_rgba(34,242,58,0.55)] sm:p-8">
      <h2 className="font-display text-2xl font-bold tracking-tight text-gray-100">{t("ctaTitle")}</h2>
      <p className="mt-3 text-base leading-relaxed text-gray-300">{t("ctaBody")}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={{ pathname: "/", hash: "contacto" }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-green px-6 font-display font-bold text-black transition-colors hover:bg-green-hover"
        >
          {t("ctaPrimary")}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
        <a
          href={whatsAppUrl(t("waGreeting"))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-700 px-6 font-display font-bold text-gray-100 transition-colors hover:border-[#25D366]/60"
        >
          <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
          {t("ctaWhatsApp")}
        </a>
      </div>
    </aside>
  )
}
