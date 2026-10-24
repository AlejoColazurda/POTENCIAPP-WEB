/** Project list shared by the home portfolio and the Baradero landing. */
const DEMOS_INDEX = "https://demo.potenciapp.com"

export type ProjectKey =
  | "maxikiosco" | "lachola" | "newbaby" | "gisbert"
  | "castro" | "entrecanes" | "losincreibles" | "mistersandwich"
  | "jazcal" | "sportivo" | "lmt" | "hidradock" | "fussinato"

export type Project = {
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
export const PROJECTS: Project[] = [
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
