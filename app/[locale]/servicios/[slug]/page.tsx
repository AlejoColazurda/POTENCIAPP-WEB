import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"
import { Link } from "@/i18n/navigation"
import { BARADERO_PATH, COMPANY, ORG_ID, TRUST_PATH, faqJsonLd } from "@/lib/company"
import { breadcrumbJsonLd, esOnlyMetadata, pageUrl } from "@/lib/pages"
import { PROJECTS } from "@/lib/projects"
import { BOOKING_URL, whatsAppUrl } from "@/lib/site"
import { SERVICIOS, SERVICIOS_PATH, getServicio, servicioPath } from "@/lib/servicios"
import { ARGENTINA_PATH, ZONAS, zonaPath } from "@/lib/zonas"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (params.locale !== "es") return []
  return SERVICIOS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const s = getServicio(slug)
  if (!s) return {}
  return esOnlyMetadata({ path: servicioPath(s.slug), title: s.metaTitle, description: s.metaDescription })
}

const chip =
  "inline-flex border border-gray-700 px-4 py-2 font-ed-sans text-[15px] text-gray-100 transition-colors hover:border-brand-green"

/**
 * National service page. One per service for all of Argentina; towns link
 * here instead of repeating the service on every local page.
 * Schema: Service (areaServed: Argentina) + FAQPage + breadcrumb.
 */
export default async function ServicioPage({ params }: PageProps) {
  const { locale, slug } = await params
  if (locale !== "es") notFound()
  const s = getServicio(slug)
  if (!s) notFound()
  setRequestLocale(locale)
  const tPortfolio = await getTranslations({ locale, namespace: "portfolio" })

  const url = pageUrl(servicioPath(s.slug), "es")
  const projects = PROJECTS.filter((p) => p.live && s.projects.includes(p.key))
  const others = SERVICIOS.filter((o) => o.slug !== s.slug)

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.metaDescription,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Argentina" },
    url,
    ...(projects.length
      ? {
          subjectOf: projects.map((p) => ({
            "@type": "CreativeWork",
            name: tPortfolio(`items.${p.key}.title`),
            url: p.url,
          })),
        }
      : {}),
  }
  const crumbs = breadcrumbJsonLd([
    ["Inicio", "/"],
    ["Servicios", SERVICIOS_PATH],
    [s.name, servicioPath(s.slug)],
  ])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-ed-sans">
      {[serviceLd, faqJsonLd("es", s.faq), crumbs].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Header />

      <main className="pt-24 lg:pt-32">
        {/* Hero */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 pb-16 lg:pb-24">
          <Reveal immediate className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="ed-rise col-span-12 lg:col-span-3">
              <SectionIndex n="§" label={s.name} />
              <nav aria-label="Ruta" className="mt-4 ed-label text-gray-500">
                <Link href="/" className="transition-colors hover:text-brand-green">Inicio</Link>
                {" / "}
                <Link href={SERVICIOS_PATH} className="transition-colors hover:text-brand-green">Servicios</Link>
                {" / "}
                <span className="text-gray-300">{s.name}</span>
              </nav>
            </div>
            <h1
              className="ed-rise col-span-12 lg:col-span-9 font-ed-display font-medium text-[clamp(32px,4.8vw,80px)] leading-[0.98] tracking-[-0.04em]"
              style={{ ["--i" as string]: 1 }}
            >
              {s.h1} <span className="ed-mark">{s.accent}</span>
            </h1>
            <p
              className="ed-rise col-span-12 lg:col-span-7 lg:col-start-4 font-ed-sans text-lg lg:text-xl leading-[1.55] text-gray-300 max-w-[64ch]"
              style={{ ["--i" as string]: 2 }}
            >
              {s.intro}
            </p>
            <div
              className="ed-rise col-span-12 lg:col-span-9 lg:col-start-4 flex flex-col sm:flex-row flex-wrap gap-4"
              style={{ ["--i" as string]: 3 }}
            >
              <a
                href={whatsAppUrl(s.waGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-brand-green px-5 py-4 font-ed-sans font-semibold text-ink transition-colors duration-300 hover:bg-green-hover"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Pedir propuesta
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-gray-700 px-5 py-4 font-ed-sans font-semibold text-gray-100 transition-colors hover:border-gray-100"
              >
                <CalendarDays className="h-5 w-5 text-brand-green" strokeWidth={1.75} />
                Agendar una reunión
              </a>
            </div>
          </Reveal>
        </section>

        {/* What it includes */}
        <section className="bg-gray-900 border-y border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="ed-rise col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
                <SectionIndex n="01" label="Qué incluye" />
              </div>
              <ol className="col-span-12 lg:col-span-8 border-t border-gray-100/35">
                {s.includes.map((it, i) => (
                  <li
                    key={it.title}
                    className="ed-rise grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-gray-800 py-6"
                    style={{ ["--i" as string]: i + 1 }}
                  >
                    <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 className="font-ed-display text-lg lg:text-[22px] font-medium tracking-[-0.02em] leading-[1.2]">
                        {it.title}
                      </h2>
                      <p className="mt-2 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[62ch]">{it.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* For whom */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
          <Reveal>
            <div className="ed-rise">
              <SectionIndex n="02" label="Para quién es" />
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 border-t border-gray-100/35 pt-8">
              {s.forWho.map((f, i) => (
                <div key={f.title} className="ed-rise" style={{ ["--i" as string]: i + 1 }}>
                  <h2 className="font-ed-display text-xl lg:text-2xl font-medium tracking-[-0.02em] leading-[1.15]">
                    {f.title}
                  </h2>
                  <p className="mt-3 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[40ch]">{f.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* How we hire */}
        <section className="bg-gray-900 border-y border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-14 lg:py-20">
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-6 items-baseline">
              <div className="ed-rise col-span-12 lg:col-span-4">
                <SectionIndex n="03" label="Cómo contratamos" />
              </div>
              <p className="ed-rise col-span-12 lg:col-span-8 font-ed-display text-xl lg:text-3xl font-medium tracking-[-0.02em] leading-[1.25]" style={{ ["--i" as string]: 1 }}>
                Contrato con alcance, etapas y fechas. Precio cerrado. Factura de {COMPANY.legalName} por cada pago,
                CUIT {COMPANY.cuit}. Pagos contra entregas que podés probar
                {s.warranty ? `, y ${COMPANY.warrantyYears} años de garantía por escrito sobre lo entregado.` : "."}{" "}
                <Link href={TRUST_PATH} className="ed-link text-brand-green">Ver todos los detalles</Link>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Live projects for this service */}
        {projects.length > 0 && (
          <section className="bg-black border-b border-gray-800">
            <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
              <Reveal>
                <div className="ed-rise flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <SectionIndex n="04" label="Proyectos en vivo" />
                  <p className="ed-label text-gray-400">Abrilos y probalos antes de contratarnos.</p>
                </div>
                <ul className="mt-8 border-t border-gray-100/35">
                  {projects.map((p, i) => (
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
                          {tPortfolio(`items.${p.key}.desc`)}
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
        )}

        {/* FAQ */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="ed-rise col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
              <SectionIndex n="05" label={`Preguntas sobre ${s.name.toLowerCase()}`} />
            </div>
            <dl className="col-span-12 lg:col-span-8 border-t border-gray-100/35">
              {s.faq.map((f, i) => (
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

        {/* Other services + where */}
        <section className="bg-gray-900 border-t border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-14 lg:py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionIndex n="06" label="Otros servicios" />
              <ul className="mt-6 flex flex-wrap gap-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={servicioPath(o.slug)} className={chip}>{o.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionIndex n="07" label="Dónde trabajamos" />
              <p className="mt-6 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[52ch]">
                A distancia con todo el país, y en persona desde nuestra oficina de {COMPANY.address.street}, Baradero.
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                <li><Link href={BARADERO_PATH} className={chip}>Baradero</Link></li>
                {ZONAS.map((z) => (
                  <li key={z.slug}><Link href={zonaPath(z.slug)} className={chip}>{z.name}</Link></li>
                ))}
                <li><Link href={ARGENTINA_PATH} className={chip}>Todo el país</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
