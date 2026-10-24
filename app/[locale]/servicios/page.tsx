import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"
import { Link } from "@/i18n/navigation"
import { ORG_ID } from "@/lib/company"
import { breadcrumbJsonLd, esOnlyMetadata, pageUrl } from "@/lib/pages"
import { SERVICIOS, SERVICIOS_PATH, servicioPath } from "@/lib/servicios"

interface PageProps {
  params: Promise<{ locale: string }>
}

const TITLE = "Servicios de desarrollo web, software y marketing en Argentina | PotenciApp"
const DESCRIPTION =
  "Páginas web, tiendas online, sistemas a medida, apps para iOS y Android, Meta Ads y Google Ads, Mercado Libre, IA, ciberseguridad e infraestructura. Con contrato, precio cerrado y factura."

export async function generateMetadata(): Promise<Metadata> {
  return esOnlyMetadata({ path: SERVICIOS_PATH, title: TITLE, description: DESCRIPTION })
}

/** Index of the national service pages; Spanish only like its children. */
export default async function ServiciosPage({ params }: PageProps) {
  const { locale } = await params
  if (locale !== "es") notFound()
  setRequestLocale(locale)

  const listLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${pageUrl(SERVICIOS_PATH, "es")}#catalog`,
    name: "Servicios de PotenciApp",
    provider: { "@id": ORG_ID },
    itemListElement: SERVICIOS.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name: s.name,
        serviceType: s.serviceType,
        url: pageUrl(servicioPath(s.slug), "es"),
        areaServed: { "@type": "Country", name: "Argentina" },
      },
    })),
  }
  const crumbs = breadcrumbJsonLd([
    ["Inicio", "/"],
    ["Servicios", SERVICIOS_PATH],
  ])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-ed-sans">
      {[listLd, crumbs].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Header />
      <main className="pt-24 lg:pt-32">
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 pb-16 lg:pb-24">
          <Reveal immediate className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="ed-rise col-span-12 lg:col-span-3">
              <SectionIndex n="§" label="Servicios" />
              <Link href="/" className="mt-4 inline-block ed-label text-gray-500 transition-colors hover:text-brand-green">
                ← Volver al inicio
              </Link>
            </div>
            <h1
              className="ed-rise col-span-12 lg:col-span-9 font-ed-display font-medium text-[clamp(32px,4.8vw,80px)] leading-[0.98] tracking-[-0.04em]"
              style={{ ["--i" as string]: 1 }}
            >
              Todo lo que tu negocio necesita para vender online. <span className="ed-mark">Con un solo equipo.</span>
            </h1>
            <p
              className="ed-rise col-span-12 lg:col-span-7 lg:col-start-4 font-ed-sans text-lg lg:text-xl leading-[1.55] text-gray-300 max-w-[62ch]"
              style={{ ["--i" as string]: 2 }}
            >
              Desarrollamos desde cero y también trabajamos sobre lo que ya tenés. Cada servicio se contrata con alcance,
              fechas y precio cerrado por escrito, para negocios de todo el país.
            </p>
          </Reveal>
        </section>
        <section className="bg-gray-900 border-y border-gray-800">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 lg:py-16">
            <ul className="border-t border-gray-100/35">
              {SERVICIOS.map((s, i) => (
                <li key={s.slug} className="border-b border-gray-800">
                  <Link href={servicioPath(s.slug)} className="group grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2 py-7 items-baseline">
                    <span className="md:col-span-1 ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="md:col-span-4 font-ed-display text-xl lg:text-2xl font-medium tracking-[-0.02em] group-hover:underline decoration-brand-green decoration-[3px] underline-offset-[6px]">
                      {s.name}
                    </h2>
                    <p className="md:col-span-6 font-ed-sans text-[16px] leading-[1.55] text-gray-300">{s.metaDescription}</p>
                    <ArrowUpRight className="hidden md:block md:col-span-1 h-5 w-5 justify-self-end text-gray-400 transition-all group-hover:text-brand-green" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
