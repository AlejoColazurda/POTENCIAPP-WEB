"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal, SectionIndex } from "@/components/editorial/reveal"

const DEMOS_INDEX = "https://demo.potenciapp.com"

type ProjectKey =
  | "maxikiosco" | "lachola" | "newbaby" | "gisbert"
  | "castro" | "entrecanes" | "losincreibles" | "mistersandwich"
  | "jazcal" | "sportivo" | "lmt" | "hidradock" | "fussinato"

type Project = {
  key: ProjectKey
  url: string
  image: string
  /** Live production site with real customers (vs. a demo build). */
  live?: boolean
  handle: string
  tags: string[]
}

/**
 * Real client work. `live: true` means a production site currently taking
 * orders; everything else is a public demo on demo.potenciapp.com.
 * Thumbnails in /public/demos are screenshots of the sites themselves.
 */
const PROJECTS: Project[] = [
  {
    key: "maxikiosco",
    url: "https://maxikiosco247.com.ar",
    image: "/demos/maxikiosco.webp",
    live: true,
    handle: "maxikiosco247.com.ar",
    tags: ["PWA", "E-commerce", "Mercado Pago"],
  },
  {
    key: "lachola",
    url: "https://www.lachola.ar",
    image: "/demos/lachola.webp",
    live: true,
    handle: "lachola.ar",
    tags: ["E-commerce", "Mercado Pago", "Next.js"],
  },
  {
    key: "newbaby",
    url: "https://www.newbaby.com.ar",
    image: "/demos/newbaby.webp",
    live: true,
    handle: "newbaby.com.ar",
    tags: ["E-commerce", "Mercado Pago", "Stock API"],
  },
  {
    key: "gisbert",
    url: "https://www.gisbertheladeras.com.ar",
    image: "/demos/gisbert.webp",
    live: true,
    handle: "gisbertheladeras.com.ar",
    tags: ["Catálogo", "Cotizador", "WhatsApp API"],
  },
  {
    key: "castro",
    url: "https://www.amoblamientoscastro.com.ar",
    image: "/demos/castro.webp",
    live: true,
    handle: "amoblamientoscastro.com.ar",
    tags: ["Corporativa", "Gallery", "WhatsApp API"],
  },
  {
    key: "entrecanes",
    url: "https://www.entrecanes.com.ar",
    image: "/demos/entrecanes.webp",
    live: true,
    handle: "entrecanes.com.ar",
    tags: ["Funnel", "Booking", "E-commerce"],
  },
  {
    key: "losincreibles",
    url: "https://www.losincreibles.com.ar",
    image: "/demos/losincreibles.webp",
    live: true,
    handle: "losincreibles.com.ar",
    tags: ["POS", "ERP", "PWA"],
  },
  {
    key: "mistersandwich",
    url: "https://www.mistersandwich.com.ar",
    image: "/demos/mistersandwich.webp",
    live: true,
    handle: "mistersandwich.com.ar",
    tags: ["Delivery", "E-commerce", "WhatsApp API"],
  },
  {
    key: "jazcal",
    url: `${DEMOS_INDEX}/web/jazcal-software/`,
    image: "/demos/jazcal.webp",
    handle: "DEMO",
    tags: ["CMMS", "Auth", "RBAC"],
  },
  {
    key: "sportivo",
    url: `${DEMOS_INDEX}/web/sportivo-baradero/`,
    image: "/demos/sportivo.webp",
    handle: "DEMO",
    tags: ["CMS", "Admin", "Menu"],
  },
  {
    key: "lmt",
    url: `${DEMOS_INDEX}/web/lmt-metalurgica/`,
    image: "/demos/lmt.webp",
    handle: "DEMO",
    tags: ["Landing", "SEO", "WhatsApp API"],
  },
  {
    key: "hidradock",
    url: `${DEMOS_INDEX}/web/hidradock/`,
    image: "/demos/hidradock.webp",
    handle: "DEMO",
    tags: ["Landing", "Gallery", "WhatsApp API"],
  },
  {
    key: "fussinato",
    url: `${DEMOS_INDEX}/web/muebleria-fussinato/`,
    image: "/demos/fussinato.webp",
    handle: "DEMO",
    tags: ["Showroom", "Gallery", "WhatsApp API"],
  },
]

/**
 * Plate layout for the production sites: an asymmetric 12-column rhythm
 * (wide/narrow, then a three-up with offsets) instead of equal cards.
 */
const PLATES: { span: string; offset: string; aspect: string }[] = [
  { span: "md:col-span-7", offset: "", aspect: "aspect-[16/10]" },
  { span: "md:col-span-5", offset: "md:mt-40", aspect: "aspect-[4/3]" },
  { span: "md:col-span-4", offset: "", aspect: "aspect-[4/3]" },
  { span: "md:col-span-4", offset: "md:mt-24", aspect: "aspect-[4/3]" },
  { span: "md:col-span-4", offset: "md:mt-10", aspect: "aspect-[4/3]" },
  { span: "md:col-span-5", offset: "", aspect: "aspect-[4/3]" },
  { span: "md:col-span-7", offset: "md:mt-20", aspect: "aspect-[16/10]" },
  { span: "md:col-span-6 md:col-start-4", offset: "", aspect: "aspect-[16/10]" },
]

export function PortfolioSection() {
  const t = useTranslations("portfolio")
  const te = useTranslations("editorial")
  const live = PROJECTS.filter((p) => p.live)
  const demos = PROJECTS.filter((p) => !p.live)

  return (
    <section id="proyectos" className="relative bg-black text-gray-100 scroll-mt-16">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-24 lg:py-36">
        <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="ed-rise col-span-12 lg:col-span-3">
            <SectionIndex n="04" label={t("eyebrow")} />
          </div>
          <h2
            className="ed-rise col-span-12 lg:col-span-6 font-ed-display font-medium text-[clamp(34px,5vw,84px)] leading-[0.98] tracking-[-0.04em]"
            style={{ ["--i" as string]: 1 }}
          >
            {t("title")}
          </h2>
          <p
            className="ed-rise col-span-12 md:col-span-8 lg:col-span-3 self-end font-ed-sans text-[17px] leading-[1.5] text-gray-300"
            style={{ ["--i" as string]: 2 }}
          >
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-16 lg:mt-24 flex items-baseline justify-between border-t border-gray-800 pt-4">
          <p className="ed-label text-gray-100">{t("liveGroup")}</p>
          <p className="ed-label text-gray-400 tabular-nums">{String(live.length).padStart(2, "0")}</p>
        </div>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-14 lg:gap-y-20">
          {live.map((p, i) => {
            const plate = PLATES[i % PLATES.length]
            return (
              <li key={p.key} className={`${plate.span} ${plate.offset}`}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                  {/* Observe an unclipped wrapper: IntersectionObserver ignores
                      targets whose own clip-path hides them entirely. */}
                  <Reveal className={`relative ${plate.aspect} bg-gray-900`}>
                    <div className="ed-mask absolute inset-0 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={t(`items.${p.key}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="ed-parallax-img object-cover object-top transition-[filter] duration-700 grayscale-[25%] group-hover:grayscale-0"
                    />
                    </div>
                    <span className="absolute left-3 top-3 ed-label bg-brand-green px-2 py-1 text-ink">
                      {t("live")}
                    </span>
                  </Reveal>
                  <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 border-t border-gray-800 pt-3">
                    <span className="ed-label text-gray-400 tabular-nums">
                      {te("fig")} {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-ed-display text-lg lg:text-xl font-medium tracking-[-0.02em]">
                      {t(`items.${p.key}.title`)}
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-gray-400 transition-all duration-300 group-hover:text-brand-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                    />
                    <span />
                    <span className="col-span-2 mt-1 ed-label text-gray-400">
                      {t(`items.${p.key}.category`)} — {p.handle}
                    </span>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Demos: a text index; the thumbnail surfaces on hover (desktop) */}
        <div className="mt-24 lg:mt-32 flex items-baseline justify-between border-t border-gray-800 pt-4">
          <p className="ed-label text-gray-100">{t("demoGroup")}</p>
          <p className="ed-label text-gray-400 tabular-nums">{String(demos.length).padStart(2, "0")}</p>
        </div>
        <ul className="mt-2">
          {demos.map((p, i) => (
            <li key={p.key} className="border-b border-gray-800">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[2.5rem_1.2fr_1fr_auto] items-center gap-x-4 py-5"
              >
                <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-ed-display text-xl lg:text-3xl font-medium tracking-[-0.03em] transition-colors duration-300 group-hover:text-brand-green">
                  {t(`items.${p.key}.title`)}
                </span>
                <span className="hidden md:block ed-label text-gray-400">{t(`items.${p.key}.category`)}</span>
                <span className="flex items-center gap-4">
                  <span className="relative hidden lg:block h-14 w-24 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Image src={p.image} alt="" fill sizes="96px" className="object-cover object-top" />
                  </span>
                  <span className="ed-label text-gray-300 inline-flex items-center gap-1 group-hover:text-gray-100">
                    {t("verDemo")} <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* The slot sells the next step instead of linking the raw demos index */}
        <div className="mt-16 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-ed-sans text-lg text-gray-300">{t("ctaLine")}</p>
          <a
            href="#contacto"
            className="group inline-flex items-center justify-between gap-6 border border-gray-100/35 px-5 py-4 font-ed-sans font-semibold text-gray-100 transition-colors duration-300 hover:bg-brand-green hover:border-brand-green hover:text-ink"
          >
            {t("ctaButton")}
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
