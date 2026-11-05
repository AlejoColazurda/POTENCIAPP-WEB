import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"
import { Link } from "@/i18n/navigation"
import { COMPANY, TRUST_PATH, faqJsonLd } from "@/lib/company"
import { pageMetadata } from "@/lib/pages"
import { whatsAppUrl } from "@/lib/site"

type Item = { ask: string; answer: string; tag: string }

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "confianza" })
  return pageMetadata({
    path: TRUST_PATH,
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
  })
}

/**
 * The nine things any careful buyer (or the AI they ask) demands from a
 * software vendor, answered one by one. Same checklist ChatGPT writes when
 * asked "is this company trustworthy?", so the answer is on the record
 * before the question is asked. Typeset as a ruled, numbered sheet like the
 * contract clauses on the home page.
 */
export default async function TrustPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "confianza" })

  // Legal identity and warranty term come from lib/company.ts; until the
  // founder confirms them the copy falls back to a neutral sentence.
  const identity =
    COMPANY.legalName && COMPANY.cuit
      ? t("identity", { legalName: COMPANY.legalName, cuit: COMPANY.cuit })
      : COMPANY.legalName
        ? t("identityName", { legalName: COMPANY.legalName })
        : t("identityPending")
  const warranty = COMPANY.warrantyYears
    ? t("warranty", { years: COMPANY.warrantyYears })
    : t("warrantyPending")

  const items = (t.raw("items") as Item[]).map((item) => ({
    ...item,
    answer: item.answer.replace("{identity}", identity).replace("{warranty}", warranty),
  }))

  const jsonLd = faqJsonLd(
    locale,
    items.map((item) => ({ q: item.ask, a: item.answer })),
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-ed-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="pt-24 lg:pt-32">
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 pb-16 lg:pb-24">
          <Reveal immediate className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="ed-rise col-span-12 lg:col-span-3">
              <SectionIndex n="§" label={t("eyebrow")} />
              <Link
                href="/"
                className="mt-4 inline-block ed-label text-gray-500 transition-colors hover:text-brand-green"
              >
                {t("backHome")}
              </Link>
            </div>
            <h1
              className="ed-rise col-span-12 lg:col-span-9 font-ed-display font-medium text-[clamp(32px,4.6vw,76px)] leading-[0.98] tracking-[-0.04em]"
              style={{ ["--i" as string]: 1 }}
            >
              {t("title")} <span className="ed-mark">{t("accent")}</span>
            </h1>
            <p
              className="ed-rise col-span-12 lg:col-span-6 lg:col-start-4 font-ed-sans text-lg lg:text-xl leading-[1.5] text-gray-300 max-w-[58ch]"
              style={{ ["--i" as string]: 2 }}
            >
              {t("intro")}
            </p>
          </Reveal>
        </section>

        {/* The sheet */}
        <section className="bg-gray-900 border-y border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
            <div className="flex items-baseline justify-between border-b border-gray-100/35 pb-4">
              <span className="ed-label text-gray-100">PotenciApp® — {t("listLabel")}</span>
              <span className="ed-label text-gray-400 tabular-nums">
                {String(items.length).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>

            <ol>
              {items.map((item, i) => (
                <li key={item.ask} className="border-b border-gray-800">
                  <Reveal className="grid grid-cols-12 gap-x-6 gap-y-4 py-8 lg:py-12">
                    <div className="ed-rise col-span-12 lg:col-span-1">
                      <div className="font-ed-display text-3xl lg:text-4xl font-medium tracking-[-0.04em] tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="ed-rise col-span-12 lg:col-span-4" style={{ ["--i" as string]: 1 }}>
                      <p className="ed-label text-gray-400">{t("askLabel")}</p>
                      <h2 className="mt-2 font-ed-display text-xl lg:text-2xl font-medium tracking-[-0.02em] leading-[1.15]">
                        {item.ask}
                      </h2>
                    </div>
                    <div className="ed-rise col-span-12 lg:col-span-7" style={{ ["--i" as string]: 2 }}>
                      <p className="ed-label text-gray-400">{t("answerLabel")}</p>
                      <p className="mt-2 font-ed-sans text-[16px] lg:text-[17px] leading-[1.6] text-gray-100 max-w-[62ch]">
                        {item.answer}
                      </p>
                      <p className="mt-4 ed-label text-gray-100 inline-flex items-center gap-2">
                        <span aria-hidden className="inline-block h-1.5 w-1.5 bg-brand-green" />
                        {item.tag}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* One message asks for all of it */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-20 lg:py-32">
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
            <h2
              className="ed-rise col-span-12 lg:col-span-7 font-ed-display font-medium text-[clamp(28px,3.6vw,56px)] leading-[1.02] tracking-[-0.035em]"
            >
              {t("ctaTitle")}
            </h2>
            <div className="col-span-12 lg:col-span-5">
              <p className="ed-rise font-ed-sans text-lg leading-[1.5] text-gray-300 max-w-[44ch]" style={{ ["--i" as string]: 1 }}>
                {t("ctaBody")}
              </p>
              <div className="ed-rise mt-8 flex flex-col sm:flex-row flex-wrap gap-4" style={{ ["--i" as string]: 2 }}>
                <a
                  href={whatsAppUrl(t("waMessage"))}
                  data-ga-cta="pedir_propuesta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-brand-green px-5 py-4 font-ed-sans font-semibold text-ink transition-colors duration-300 hover:bg-green-hover"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t("ctaButton")}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </a>
                <Link
                  href="/#proyectos"
                  className="group inline-flex items-center gap-2 border border-gray-700 px-5 py-4 font-ed-sans font-semibold text-gray-100 transition-colors hover:border-gray-100"
                >
                  {t("seeProjects")}
                  <ArrowUpRight className="h-5 w-5 text-gray-400 transition-all group-hover:text-brand-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  )
}
