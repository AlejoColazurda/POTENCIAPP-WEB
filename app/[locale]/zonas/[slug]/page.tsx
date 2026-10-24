import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "lucide-react"
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
import { ARGENTINA_PATH, ZONAS, getZona, zonaPath } from "@/lib/zonas"
import { SERVICIOS, servicioPath } from "@/lib/servicios"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

/** Spanish only: one static page per town, nothing else under /zonas. */
export const dynamicParams = false

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (params.locale !== "es") return []
  return ZONAS.map((z) => ({ slug: z.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const zona = getZona(slug)
  if (!zona) return {}
  return esOnlyMetadata({
    path: zonaPath(zona.slug),
    title: zona.metaTitle,
    description: zona.metaDescription,
  })
}

const STEPS = [
  {
    title: "Diagnóstico sin costo",
    desc: "Nos juntamos en tu negocio o en nuestra oficina de Baradero. Salís con una propuesta escrita: alcance, etapas, fechas y precio cerrado.",
  },
  {
    title: "Contrato y construcción",
    desc: "Se firma y se arranca. Cada etapa termina con algo funcionando que podés abrir y probar, y se paga contra esa entrega.",
  },
  {
    title: "Entrega y garantía",
    desc: "Publicamos, te damos todos los accesos a tu nombre y te capacitamos. Desde ahí corren los 2 años de garantía por escrito.",
  },
]

/**
 * Local landing for a zona norte town. Its angle, use cases and FAQ are
 * specific to the town (lib/zonas.ts); the process and the live projects are
 * shared. Schema: WebPage + Service (areaServed: City) + FAQPage + breadcrumb.
 */
export default async function ZonaPage({ params }: PageProps) {
  const { locale, slug } = await params
  if (locale !== "es") notFound()
  const zona = getZona(slug)
  if (!zona) notFound()
  setRequestLocale(locale)
  const tPortfolio = await getTranslations({ locale, namespace: "portfolio" })

  const url = pageUrl(zonaPath(zona.slug), "es")
  const live = PROJECTS.filter((p) => p.live)
  const others = ZONAS.filter((z) => z.slug !== zona.slug)

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Diseño web y desarrollo de software en ${zona.name}`,
    serviceType: "Diseño web, tiendas online, sistemas a medida y apps",
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: zona.name,
      containedInPlace: { "@type": "State", name: "Buenos Aires" },
    },
    url,
  }
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: zona.metaTitle,
    description: zona.metaDescription,
    inLanguage: "es",
    about: { "@id": ORG_ID },
    mainEntity: { "@id": `${url}#service` },
  }
  const crumbs = breadcrumbJsonLd([
    ["Inicio", "/"],
    ["Argentina", ARGENTINA_PATH],
    [zona.name, zonaPath(zona.slug)],
  ])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-ed-sans">
      {[webPageLd, serviceLd, faqJsonLd("es", zona.faq), crumbs].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Header />

      <main className="pt-24 lg:pt-32">
        {/* Hero */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 pb-16 lg:pb-24">
          <Reveal immediate className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="ed-rise col-span-12 lg:col-span-3">
              <SectionIndex n="§" label={`${zona.name}, Buenos Aires`} />
              <nav aria-label="Ruta" className="mt-4 ed-label text-gray-500">
                <Link href="/" className="transition-colors hover:text-brand-green">Inicio</Link>
                {" / "}
                <Link href={ARGENTINA_PATH} className="transition-colors hover:text-brand-green">Argentina</Link>
                {" / "}
                <span className="text-gray-300">{zona.name}</span>
              </nav>
            </div>
            <h1
              className="ed-rise col-span-12 lg:col-span-9 font-ed-display font-medium text-[clamp(32px,4.8vw,80px)] leading-[0.98] tracking-[-0.04em]"
              style={{ ["--i" as string]: 1 }}
            >
              Diseño web y software en {zona.name}. <span className="ed-mark">{zona.angle}</span>
            </h1>
            <p
              className="ed-rise col-span-12 lg:col-span-7 lg:col-start-4 font-ed-sans text-lg lg:text-xl leading-[1.55] text-gray-300 max-w-[64ch]"
              style={{ ["--i" as string]: 2 }}
            >
              {zona.intro}
            </p>
            <div
              className="ed-rise col-span-12 lg:col-span-9 lg:col-start-4 flex flex-col sm:flex-row flex-wrap gap-4"
              style={{ ["--i" as string]: 3 }}
            >
              <a
                href={whatsAppUrl(zona.waGreeting)}
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

        {/* Town-specific use cases */}
        <section className="bg-gray-900 border-y border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="ed-rise col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
                <SectionIndex n="01" label={zona.useCasesTitle} />
              </div>
              <ol className="col-span-12 lg:col-span-8 border-t border-gray-100/35">
                {zona.useCases.map((u, i) => (
                  <li
                    key={u.title}
                    className="ed-rise grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-gray-800 py-6 lg:py-8"
                    style={{ ["--i" as string]: i + 1 }}
                  >
                    <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 className="font-ed-display text-lg lg:text-[22px] font-medium tracking-[-0.02em] leading-[1.2]">
                        {u.title}
                      </h2>
                      <p className="mt-2 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[62ch]">{u.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* How we work from Baradero */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
          <Reveal>
            <div className="ed-rise flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
              <SectionIndex n="02" label={`Cómo trabajamos con negocios de ${zona.name}`} />
              <p className="ed-label text-gray-400 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-green" strokeWidth={1.75} />
                Oficina en {COMPANY.address.street}, Baradero, {zona.route}.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 border-t border-gray-100/35 pt-8">
              {STEPS.map((s, i) => (
                <div key={s.title} className="ed-rise" style={{ ["--i" as string]: i + 1 }}>
                  <p className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 font-ed-display text-xl lg:text-2xl font-medium tracking-[-0.02em] leading-[1.15]">
                    {s.title}
                  </h2>
                  <p className="mt-3 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[40ch]">{s.desc}</p>
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
                <SectionIndex n="03" label="Proyectos en vivo" />
                <p className="ed-label text-gray-400">Sitios funcionando hoy. Abrilos antes de contratarnos.</p>
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

        {/* Town FAQ */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="ed-rise col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
              <SectionIndex n="04" label={`Preguntas frecuentes en ${zona.name}`} />
              <p className="mt-6 font-ed-sans text-[16px] text-gray-300">
                <Link href={TRUST_PATH} className="font-semibold text-gray-100 ed-link">
                  Qué exigirnos antes de contratarnos →
                </Link>
              </p>
            </div>
            <dl className="col-span-12 lg:col-span-8 border-t border-gray-100/35">
              {zona.faq.map((f, i) => (
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

        {/* Services + other towns */}
        <section className="bg-gray-900 border-t border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-14 lg:py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionIndex n="05" label="Servicios" />
              <ul className="mt-6 flex flex-wrap gap-3">
                {SERVICIOS.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={servicioPath(s.slug)}
                      className="inline-flex border border-gray-700 px-4 py-2 font-ed-sans text-[15px] text-gray-100 transition-colors hover:border-brand-green"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionIndex n="06" label="También atendemos en" />
              <ul className="mt-6 flex flex-wrap gap-3">
                <li>
                  <Link
                    href={BARADERO_PATH}
                    className="inline-flex border border-gray-700 px-4 py-2 font-ed-sans text-[15px] text-gray-100 transition-colors hover:border-brand-green"
                  >
                    Baradero
                  </Link>
                </li>
                {others.map((z) => (
                  <li key={z.slug}>
                    <Link
                      href={zonaPath(z.slug)}
                      className="inline-flex border border-gray-700 px-4 py-2 font-ed-sans text-[15px] text-gray-100 transition-colors hover:border-brand-green"
                    >
                      {z.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={ARGENTINA_PATH}
                    className="inline-flex border border-gray-700 px-4 py-2 font-ed-sans text-[15px] text-gray-100 transition-colors hover:border-brand-green"
                  >
                    Todo el país
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
