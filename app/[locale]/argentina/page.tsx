import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowRight, CalendarDays } from "lucide-react"
import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"
import { Link } from "@/i18n/navigation"
import { BARADERO_PATH, COMPANY, ORG_ID, TRUST_PATH, faqJsonLd } from "@/lib/company"
import { breadcrumbJsonLd, esOnlyMetadata, pageUrl } from "@/lib/pages"
import { BOOKING_URL, whatsAppUrl } from "@/lib/site"
import { SERVICIOS, servicioPath } from "@/lib/servicios"
import { ARGENTINA_PATH, ZONAS, zonaPath } from "@/lib/zonas"

interface PageProps {
  params: Promise<{ locale: string }>
}

const TITLE = "Desarrollo de software y páginas web en toda Argentina | PotenciApp"
const DESCRIPTION =
  "Estudio de software argentino con oficina en Baradero: páginas web, tiendas online, sistemas, apps y marketing para negocios de todo el país, a distancia o en persona. Contrato, precio cerrado, factura y 2 años de garantía."

export async function generateMetadata(): Promise<Metadata> {
  return esOnlyMetadata({ path: ARGENTINA_PATH, title: TITLE, description: DESCRIPTION })
}

const REMOTE = [
  {
    title: "Una videollamada de diagnóstico",
    desc: "Nos contás tu negocio y salís con una propuesta escrita: alcance, etapas, fechas y precio cerrado. No tiene costo.",
  },
  {
    title: "Contrato antes de empezar",
    desc: "Te lo mandamos para que lo revises con quien quieras antes de firmar. La factura sale a tu nombre, estés en la provincia que estés.",
  },
  {
    title: "Avances que podés abrir",
    desc: "Cada etapa termina con algo funcionando en un link que probás vos mismo, y se paga contra esa entrega.",
  },
  {
    title: "WhatsApp directo con quien construye",
    desc: "Sin intermediarios ni tickets: hablás con la persona que está haciendo tu proyecto, en horario argentino.",
  },
]

const FAQ = [
  {
    q: "¿Trabajan con negocios de cualquier provincia?",
    a: "Sí. Trabajamos a distancia con negocios de toda Argentina por WhatsApp y videollamada, y en persona en Baradero y la zona norte de Buenos Aires.",
  },
  {
    q: "¿Tengo que viajar a Baradero?",
    a: "No. Todo el proceso, del diagnóstico a la capacitación final, se puede hacer a distancia. Si estás cerca, también te recibimos en nuestra oficina de Anchorena 1294, Baradero.",
  },
  {
    q: "¿Cómo sé que son confiables si no los conozco?",
    a: "Publicamos razón social y CUIT, firmamos contrato antes de cobrar, facturamos cada pago, cobramos por etapas contra entregas y tenemos sitios en vivo que podés abrir. Y si lo pedís, te pasamos el contacto de clientes. Todo está detallado en la página Antes de contratarnos.",
  },
  {
    q: "¿Qué pasa si después quiero cambiar de proveedor?",
    a: "Al completar el pago el código es tuyo y el dominio, el hosting y las cuentas quedan a tu nombre. Te podés ir cuando quieras, sin pedir permiso.",
  },
]

/**
 * National hub: the page that answers "who can build my website/system in
 * Argentina" for search and answer engines, and links every service page and
 * every zona page. Spanish only.
 */
export default async function ArgentinaPage({ params }: PageProps) {
  const { locale } = await params
  if (locale !== "es") notFound()
  setRequestLocale(locale)

  const url = pageUrl(ARGENTINA_PATH, "es")
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "es",
    about: { "@id": ORG_ID },
    mainEntity: { "@id": ORG_ID },
    hasPart: [
      ...SERVICIOS.map((s) => ({ "@type": "WebPage", name: s.name, url: pageUrl(servicioPath(s.slug), "es") })),
      ...ZONAS.map((z) => ({ "@type": "WebPage", name: z.name, url: pageUrl(zonaPath(z.slug), "es") })),
    ],
  }
  const crumbs = breadcrumbJsonLd([
    ["Inicio", "/"],
    ["Argentina", ARGENTINA_PATH],
  ])
  const chip =
    "inline-flex border border-gray-700 px-4 py-2 font-ed-sans text-[15px] text-gray-100 transition-colors hover:border-brand-green"

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-ed-sans">
      {[webPageLd, faqJsonLd("es", FAQ), crumbs].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Header />

      <main className="pt-24 lg:pt-32">
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 pb-16 lg:pb-24">
          <Reveal immediate className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="ed-rise col-span-12 lg:col-span-3">
              <SectionIndex n="§" label="Argentina" />
              <Link href="/" className="mt-4 inline-block ed-label text-gray-500 transition-colors hover:text-brand-green">
                ← Volver al inicio
              </Link>
            </div>
            <h1
              className="ed-rise col-span-12 lg:col-span-9 font-ed-display font-medium text-[clamp(32px,4.8vw,80px)] leading-[0.98] tracking-[-0.04em]"
              style={{ ["--i" as string]: 1 }}
            >
              Software, páginas web y tiendas online para toda Argentina.{" "}
              <span className="ed-mark">Con contrato y factura, desde cualquier provincia.</span>
            </h1>
            <p
              className="ed-rise col-span-12 lg:col-span-7 lg:col-start-4 font-ed-sans text-lg lg:text-xl leading-[1.55] text-gray-300 max-w-[64ch]"
              style={{ ["--i" as string]: 2 }}
            >
              PotenciApp es un estudio de desarrollo de software con oficina en {COMPANY.address.street}, Baradero,
              Buenos Aires. Trabajamos en persona con negocios de la zona norte y a distancia con todo el país, con el
              mismo contrato, el mismo precio cerrado y la misma garantía de {COMPANY.warrantyYears} años por escrito.
            </p>
            <div
              className="ed-rise col-span-12 lg:col-span-9 lg:col-start-4 flex flex-col sm:flex-row flex-wrap gap-4"
              style={{ ["--i" as string]: 3 }}
            >
              <a
                href={whatsAppUrl("Hola PotenciApp, quiero una propuesta para mi negocio.")}
                data-ga-cta="pedir_propuesta"
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
                Agendar una videollamada
              </a>
            </div>
          </Reveal>
        </section>

        {/* Services */}
        <section className="bg-gray-900 border-y border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="ed-rise col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
                <SectionIndex n="01" label="Qué hacemos" />
              </div>
              <ul className="col-span-12 lg:col-span-8 border-t border-gray-100/35">
                {SERVICIOS.map((s, i) => (
                  <li key={s.slug} className="ed-rise border-b border-gray-800" style={{ ["--i" as string]: i + 1 }}>
                    <Link href={servicioPath(s.slug)} className="group grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
                      <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block font-ed-display text-lg lg:text-[22px] font-medium tracking-[-0.02em] group-hover:underline decoration-brand-green decoration-[3px] underline-offset-[6px]">
                          {s.name}
                        </span>
                        <span className="mt-1 block font-ed-sans text-[15px] leading-[1.55] text-gray-300">{s.intro}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Remote process */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
          <Reveal>
            <div className="ed-rise">
              <SectionIndex n="02" label="Cómo trabajamos a distancia" />
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 border-t border-gray-100/35 pt-8">
              {REMOTE.map((r, i) => (
                <div key={r.title} className="ed-rise" style={{ ["--i" as string]: i + 1 }}>
                  <p className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 font-ed-display text-xl font-medium tracking-[-0.02em] leading-[1.15]">{r.title}</h2>
                  <p className="mt-3 font-ed-sans text-[16px] leading-[1.6] text-gray-300">{r.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* In person */}
        <section className="bg-black border-y border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-14 lg:py-20">
            <SectionIndex n="03" label="Donde atendemos en persona" />
            <p className="mt-6 font-ed-sans text-[16px] leading-[1.6] text-gray-300 max-w-[60ch]">
              Desde nuestra oficina de {COMPANY.address.street}, Baradero, vamos a tu negocio en la zona norte de la
              provincia de Buenos Aires.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              <li><Link href={BARADERO_PATH} className={chip}>Baradero</Link></li>
              {ZONAS.map((z) => (
                <li key={z.slug}><Link href={zonaPath(z.slug)} className={chip}>{z.name}</Link></li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 lg:py-24">
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="ed-rise col-span-12 lg:col-span-4 lg:sticky lg:top-28 self-start">
              <SectionIndex n="04" label="Preguntas frecuentes" />
              <p className="mt-6 font-ed-sans text-[16px] text-gray-300">
                <Link href={TRUST_PATH} className="font-semibold text-gray-100 ed-link">
                  Qué exigirnos antes de contratarnos →
                </Link>
              </p>
            </div>
            <dl className="col-span-12 lg:col-span-8 border-t border-gray-100/35">
              {FAQ.map((f, i) => (
                <div
                  key={f.q}
                  className="ed-rise grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-gray-800 py-6"
                  style={{ ["--i" as string]: i + 1 }}
                >
                  <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <dt className="font-ed-display text-lg lg:text-[22px] font-medium tracking-[-0.02em] leading-[1.25]">{f.q}</dt>
                    <dd className="mt-3 font-ed-sans text-[16px] leading-[1.65] text-gray-300 max-w-[68ch]">{f.a}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  )
}
