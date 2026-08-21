"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import ChromaGrid, { type ChromaItem } from "@/components/reactbits/ChromaGrid"
import AnimatedContent from "@/components/reactbits/AnimatedContent"

const DEMOS_INDEX = "https://demo.potenciapp.com"

type ProjectKey =
  | "maxikiosco" | "lachola" | "newbaby" | "losincreibles" | "terrazas" | "cprem"
  | "jazcal" | "pss" | "sportivo" | "lmt" | "hidradock" | "fussinato"

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
    key: "losincreibles",
    url: `${DEMOS_INDEX}/distribuidora-losincreibles/catalog`,
    image: "/demos/losincreibles.webp",
    handle: "DEMO",
    tags: ["POS", "ERP", "PWA"],
  },
  {
    key: "terrazas",
    url: `${DEMOS_INDEX}/web/terrazas-al-rio/`,
    image: "/demos/terrazas.webp",
    handle: "DEMO",
    tags: ["Booking", "Admin", "WhatsApp API"],
  },
  {
    key: "cprem",
    url: `${DEMOS_INDEX}/web/cprem/`,
    image: "/demos/cprem.webp",
    handle: "DEMO",
    tags: ["E-commerce", "Checkout", "WhatsApp API"],
  },
  {
    key: "jazcal",
    url: `${DEMOS_INDEX}/web/jazcal-software/`,
    image: "/demos/jazcal.webp",
    handle: "DEMO",
    tags: ["CMMS", "Auth", "RBAC"],
  },
  {
    key: "pss",
    url: `${DEMOS_INDEX}/web/pss-innovaciones/`,
    image: "/demos/pss.webp",
    handle: "DEMO",
    tags: ["B2B", "Checkout", "WhatsApp API"],
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

export function PortfolioSection() {
  const t = useTranslations("portfolio")

  const items: ChromaItem[] = PROJECTS.map((p) => ({
    image: p.image,
    title: t(`items.${p.key}.title`),
    subtitle: t(`items.${p.key}.category`),
    location: t(`items.${p.key}.desc`),
    handle: p.handle,
    url: p.url,
    badge: p.live ? t("live") : undefined,
    tags: p.tags,
    borderColor: p.live ? "#22F23A" : "#2A2A2A",
    gradient: p.live
      ? "linear-gradient(160deg, rgba(34,242,58,0.16), #0A0A0A 62%)"
      : "linear-gradient(160deg, #1A1A1A, #0A0A0A 62%)",
  }))

  return (
    <section
      id="proyectos"
      className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-1/3 left-[6%] w-[420px] h-[420px] rounded-full bg-brand-green/[0.05] blur-[140px] pointer-events-none"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8">
        <AnimatedContent distance={60} duration={0.9} threshold={0.15}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                  {t("eyebrow")}
                </span>
              </span>
              <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-gray-100 max-w-[640px]">
                {t("title")}
              </h2>
            </div>
            <p className="text-base text-gray-300 max-w-[420px] md:text-right leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </AnimatedContent>

        {/* ChromaGrid desaturates everything outside the cursor spotlight, so the
            project the visitor is pointing at is the only one in full colour. */}
        <ChromaGrid items={items} radius={340} damping={0.4} fadeOut={0.5} />

        <div className="mt-12 flex justify-center">
          <Link
            href={DEMOS_INDEX}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-gray-700 text-gray-100 font-display font-semibold text-sm hover:border-brand-green hover:text-brand-green transition-all duration-300"
          >
            {t("allDemos")}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
