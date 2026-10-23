import { CONTACT_EMAIL, SITE_URL, WA_PHONE } from "@/lib/site"

/**
 * Legal and local identity of the company, in one place. Everything an
 * evaluator (a person or an answer engine) asks before hiring us reads from
 * here: footer, /legal, /antes-de-contratarnos, /baradero and the JSON-LD.
 *
 * `null` means "not yet confirmed by the founder": the UI falls back to a
 * neutral sentence and the structured data omits the field. Fill it, do not
 * invent it — every figure on the site must be verifiable.
 */
export const COMPANY = {
  brand: "PotenciApp",
  /** Razón social as it appears on the invoice (monotributo: the founder). */
  legalName: "Vladimir Gonzalez" as string | null,
  /** CUIT with dashes, e.g. "30-12345678-9". */
  cuit: "20-44113706-1" as string | null,
  /** Post-delivery warranty term, in years, as written in every contract. */
  warrantyYears: 2 as number | null,
  founder: "Vladimir Gonzalez",
  address: {
    locality: "Baradero",
    region: "Buenos Aires",
    postalCode: "2942",
    country: "AR",
    countryName: "Argentina",
  },
  /** Centre of Baradero; the office has no public street address. */
  geo: { latitude: -33.8097, longitude: -59.5083 },
  /**
   * ARCA "Data Fiscal" (Formulario 960/D). Both values come from the
   * founder's ARCA account: the QR image goes in /public (imagePath) and the
   * link is the one the QR encodes (http://qr.afip.gob.ar/?qr=…). The footer
   * shows the badge only when both are set.
   */
  dataFiscal: {
    imagePath: null as string | null,
    qrUrl: null as string | null,
  },
  /** Public profiles that back the identity (LinkedIn, Maps, demos). */
  sameAs: ["https://demo.potenciapp.com"] as string[],
  mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=PotenciApp+Baradero",
} as const

/** Routes of the trust pages, locale-prefixed by next-intl `Link`. */
export const TRUST_PATH = "/antes-de-contratarnos"
export const BARADERO_PATH = "/baradero"

/** Stable @id so every page's JSON-LD points at the same entity. */
export const ORG_ID = `${SITE_URL}/#organization`

/**
 * ProfessionalService (a LocalBusiness, which is an Organization): what a
 * local "web developer in Baradero" query resolves against.
 */
export function organizationJsonLd(description: string) {
  const { address } = COMPANY
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
    "@id": ORG_ID,
    name: COMPANY.brand,
    ...(COMPANY.legalName ? { legalName: COMPANY.legalName } : {}),
    ...(COMPANY.cuit ? { taxID: COMPANY.cuit, vatID: COMPANY.cuit } : {}),
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: `+${WA_PHONE}`,
    description,
    founder: { "@type": "Person", name: COMPANY.founder },
    address: {
      "@type": "PostalAddress",
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Baradero" },
      { "@type": "State", name: "Buenos Aires" },
      { "@type": "Country", name: "Argentina" },
      "Worldwide",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${WA_PHONE}`,
        email: CONTACT_EMAIL,
        availableLanguage: ["es", "en", "pt", "fr"],
      },
    ],
    sameAs: COMPANY.sameAs,
    knowsAbout: [
      "Desarrollo de aplicaciones móviles",
      "E-commerce",
      "Desarrollo de software a medida",
      "Diseño y desarrollo de sitios web",
      "Tiendanube",
      "Empretienda",
      "Shopify",
      "WooCommerce",
      "WordPress",
      "Mercado Libre",
      "Mercado Libre Ads",
      "Meta Ads",
      "Google Ads",
      "Marketing digital",
      "Sistemas internos y ERPs",
      "Inteligencia artificial aplicada",
      "Automatización de procesos",
      "Ciberseguridad",
      "Arquitectura de software",
      "Docker",
      "AWS",
      "Servidores VPS",
      "Redes",
      "Mantenimiento de infraestructura",
    ],
  }
}

/** FAQPage block for a list of Q&A pairs (quoted verbatim by answer engines). */
export function faqJsonLd(locale: string, items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }
}
