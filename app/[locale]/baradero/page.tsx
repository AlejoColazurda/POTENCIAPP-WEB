import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"
import { Link } from "@/i18n/navigation"
import { BARADERO_PATH, COMPANY, ORG_ID, TRUST_PATH, faqJsonLd } from "@/lib/company"
import { pageMetadata, pageUrl } from "@/lib/pages"
import { PROJECTS } from "@/lib/projects"
import { BOOKING_URL, whatsAppUrl } from "@/lib/site"
import { SERVICIOS, servicioPath } from "@/lib/servicios"
import { ARGENTINA_PATH, ZONAS, zonaPath } from "@/lib/zonas"

type Card = { title: string; desc: string }
type Faq = { q: string; a: string }

const CHIP =
  "inline-flex border border-gray-700 px-4 py-2 font-ed-sans text-[15px] text-gray-100 transition-colors hover:border-brand-green"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "baradero" })
  return pageMetadata({
    path: BARADERO_PATH,
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
  })
}

/**
 * Local landing for the query people actually type ("página web en
 * Baradero"). The home page says Baradero once, in a FAQ; this page says it
 * in the title, the copy, the FAQ and the structured data, and ties the
 * live portfolio to the place.
 */
export default async function BaraderoPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "baradero" })
  const tPortfolio = await getTranslations({ locale, namespace: "portfolio" })

  const services = t.raw("services") as Card[]
  const local = t.raw("local") as Card[]
  // {address} in the copy is the office street, kept in lib/company.ts.
  const withAddress = (text: string) => text.replaceAll("{address}", COMPANY.address.street)
  const faq = (t.raw("faq") as Faq[]).map((f) => ({ q: f.q, a: withAddress(f.a) }))
  const live = PROJECTS.filter((p) => p.live)

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl(BARADERO_PATH, locale)}#webpage`,
    url: pageUrl(BARADERO_PATH, locale),
    name: t("metaTitle"),
    description: t("metaDescription"),
    inLanguage: locale,
    about: { "@id": ORG_ID },
    mainEntity: { "@id": ORG_ID },
  }
  const faqLd = faqJsonLd(locale, faq)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-ed-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />

      <main className="pt-24 lg:pt-32">
        {/* Hero */}
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
              className="ed-rise col-span-12 lg:col-span-9 font-ed-display font-medium text-[clamp(32px,4.8vw,80px)] leading-[0.98] tracking-[-0.04em]"
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
            <div
              className="ed-rise col-span-12 lg:col-span-9 lg:col-start-4 flex flex-col sm:flex-row flex-wrap gap-4"
              style={{ ["--i" as string]: 3 }}
            >
              <a
                href={whatsAppUrl(t("waGreeting"))}
                data-ga-cta="pedir_propuesta"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-brand-green px-5 py-4 font-ed-sans font-semibold text-ink transition-colors duration-300 hover:bg-green-hover"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t("ctaPrimary")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-gray-700 px-5 py-4 font-ed-sans font-semibold text-gray-100 transition-colors hover:border-gray-100"
              >
                <CalendarDays className="h-5 w-5 text-brand-green" strokeWidth={1.75} />
                {t("ctaSecondary")}
              </a>
            </div>
          </Reveal>
        </section>

        {/* Services for local businesses */}
        <section className="bg-gray-900 border-y border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="ed-rise col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
                <SectionIndex n="01" label={t("servicesLabel")} />
              </div>
              <ol className="col-span-12 lg:col-span-8 border-t border-gray-100/35">
                {services.map((s, i) => (
                  <li
                    key={s.title}
                    className="ed-rise grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-gray-800 py-6 lg:py-7"
                    style={{ ["--i" as string]: i + 1 }}
                  >
                    <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 className="font-ed-display text-lg lg:text-[22px] font-medium tracking-[-0.02em] leading-[1.2]">
                        {s.title}
                      </h2>
                      <p className="mt-2 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[60ch]">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* Why local */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
          <Reveal>
            <div className="ed-rise">
              <SectionIndex n="02" label={t("localLabel")} />
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 border-t border-gray-100/35 pt-8">
              {local.map((item, i) => (
                <div key={item.title} className="ed-rise" style={{ ["--i" as string]: i + 1 }}>
                  <h2 className="font-ed-display text-xl lg:text-2xl font-medium tracking-[-0.02em] leading-[1.15]">
                    {item.title}
                  </h2>
                  <p className="mt-3 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[40ch]">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Live projects */}
        <section className="bg-black border-y border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
            <Reveal>
              <div className="ed-rise flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <SectionIndex n="03" label={t("projectsLabel")} />
                <p className="ed-label text-gray-400">{t("projectsHint")}</p>
              </div>
              <ul className="mt-8 border-t border-gray-100/35">
                {live.map((p, i) => (
                  <li key={p.key} className="ed-rise border-b border-gray-800" style={{ ["--i" as string]: i + 1 }}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-1 py-5 items-baseline"
                    >
                      <span className="md:col-span-4 font-ed-display text-lg lg:text-xl font-medium tracking-[-0.02em] group-hover:underline decoration-brand-green decoration-[3px] underline-offset-[6px]">
                        {tPortfolio(`items.${p.key}.title`)}
                      </span>
                      <span className="md:col-span-5 font-ed-sans text-[15px] text-gray-300">
                        {tPortfolio(`items.${p.key}.category`)}
                      </span>
                      <span className="md:col-span-3 flex items-center justify-between gap-3 ed-label text-gray-400">
                        {p.handle}
                        <ArrowUpRight className="h-4 w-4 transition-all group-hover:text-brand-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Local FAQ */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="ed-rise col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
              <SectionIndex n="04" label={t("faqLabel")} />
              <p className="mt-6 font-ed-sans text-[16px] text-gray-300">
                <Link href={TRUST_PATH} className="font-semibold text-gray-100 ed-link">
                  {t("trustLink")} →
                </Link>
              </p>
            </div>
            <dl className="col-span-12 lg:col-span-8 border-t border-gray-100/35">
              {faq.map((f, i) => (
                <div
                  key={f.q}
                  className="ed-rise grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-gray-800 py-6"
                  style={{ ["--i" as string]: i + 1 }}
                >
                  <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <dt className="font-ed-display text-lg lg:text-[22px] font-medium tracking-[-0.02em] leading-[1.25]">
                      {f.q}
                    </dt>
                    <dd className="mt-3 font-ed-sans text-[16px] leading-[1.65] text-gray-300 max-w-[68ch]">{f.a}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Where */}
        <section className="bg-gray-900 border-t border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-14 lg:py-20">
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-6 items-center">
              <div className="ed-rise col-span-12 lg:col-span-8">
                <SectionIndex n="05" label={t("mapsLabel")} />
                <p className="mt-4 flex items-start gap-3 font-ed-display text-xl lg:text-3xl font-medium tracking-[-0.02em] leading-[1.2]">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-brand-green" strokeWidth={1.75} />
                  <span>
                    {withAddress(t.raw("mapsText") as string)}
                  </span>
                </p>
              </div>
              <div className="ed-rise col-span-12 lg:col-span-4 lg:text-right" style={{ ["--i" as string]: 1 }}>
                <a
                  href={COMPANY.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-gray-700 px-5 py-4 font-ed-sans font-semibold text-gray-100 transition-colors hover:border-gray-100"
                >
                  {t("mapsLink")}
                  <ArrowUpRight className="h-5 w-5 text-gray-400 transition-all group-hover:text-brand-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
        {/* Spanish only: links to the national service pages and nearby towns. */}
        {locale === "es" && (
          <section className="border-t border-gray-800">
            <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-14 lg:py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <SectionIndex n="06" label="Servicios" />
                <ul className="mt-6 flex flex-wrap gap-3">
                  {SERVICIOS.map((sv) => (
                    <li key={sv.slug}>
                      <Link href={servicioPath(sv.slug)} className={CHIP}>{sv.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <SectionIndex n="07" label="También atendemos en" />
                <ul className="mt-6 flex flex-wrap gap-3">
                  {ZONAS.map((z) => (
                    <li key={z.slug}>
                      <Link href={zonaPath(z.slug)} className={CHIP}>{z.name}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href={ARGENTINA_PATH} className={CHIP}>Todo el país</Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
