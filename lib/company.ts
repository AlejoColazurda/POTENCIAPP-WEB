import { CONTACT_EMAIL, SITE_URL, WA_PHONE } from "@/lib/site"

/**
 * Google Business Profile listing, by its permanent CID (ludocid). Share
 * links (share.google/…) are redirects; this form is stable and is what
 * search engines match against the LocalBusiness entity.
 */
const GBP_URL = "https://maps.google.com/?cid=13483901001912036634"

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
  /**
   * The one spelling of the brand: capital P, capital A, written together.
   * Google kept rewriting the query "potenciapp" to "potencia" because it
   * did not know the word as a name; every title, heading, profile and
   * mention must use exactly this form so the entity is unambiguous.
   */
  brand: "PotenciApp",
  /**
   * Spellings people actually type. Declared as `alternateName` in the
   * WebSite and Organization JSON-LD; never shown as the brand itself.
   */
  alternateNames: ["Potenciapp", "Potenci App", "potenciapp.com"] as string[],
  /** Square logo on a white background (Google's logo guidelines). */
  logo: { path: "/potenciapp-logo.png", width: 1024, height: 1024 },
  /** Razón social as it appears on the invoice (monotributo: the founder). */
  legalName: "Vladimir Gonzalez" as string | null,
  /** CUIT with dashes, e.g. "30-12345678-9". */
  cuit: "20-44113706-1" as string | null,
  /** Post-delivery warranty term, in years, as written in every contract. */
  warrantyYears: 2 as number | null,
  founder: "Vladimir Gonzalez",
  address: {
    /** Office (rented, open to clients). Not the founder's home. */
    street: "Anchorena 1294",
    locality: "Baradero",
    region: "Buenos Aires",
    /** CPA as Google Business Profile normalised it. */
    postalCode: "B2942DUN",
    country: "AR",
    countryName: "Argentina",
  },
  /** Same pin as the Google Business Profile listing. */
  geo: { latitude: -33.8104458, longitude: -59.5040689 },
  /**
   * ARCA "Data Fiscal" (Formulario 960/D) for the website, issued from the
   * founder's ARCA account under "Generación del F960/D para Sitios Web".
   * The logo is ARCA's official image (served over https to avoid mixed
   * content); the link is exactly the one ARCA issued for potenciapp.com.
   * It opens ARCA's consumer-complaint login, so it exposes no personal data.
   */
  dataFiscal: {
    imageUrl: "https://www.afip.gob.ar/images/f960/DATAWEB.jpg" as string | null,
    qrUrl: "http://qr.afip.gob.ar/?qr=CDdazRkwjFwFD1QFh63yPQ,," as string | null,
  },
  /**
   * Public profiles that back the identity (Maps, demos). Add the LinkedIn,
   * Instagram and Facebook page URLs here once they exist and are named
   * exactly "PotenciApp": sameAs is how Google ties them to this entity.
   */
  sameAs: [GBP_URL, "https://demo.potenciapp.com"] as string[],
  /** Opens the Google Business Profile listing (directions, reviews). */
  mapsSearchUrl: GBP_URL,
} as const

/** Routes of the trust pages, locale-prefixed by next-intl `Link`. */
export const TRUST_PATH = "/antes-de-contratarnos"
export const BARADERO_PATH = "/baradero"

/** Stable @id so every page's JSON-LD points at the same entity. */
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Absolute URL of the brand logo, as an ImageObject. */
function logoImageObject() {
  return {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}${COMPANY.logo.path}`,
    contentUrl: `${SITE_URL}${COMPANY.logo.path}`,
    width: COMPANY.logo.width,
    height: COMPANY.logo.height,
    caption: COMPANY.brand,
  }
}

/**
 * WebSite block for the home page. Google reads `name` (and falls back to
 * `alternateName`) to pick the site name shown in results; it is also the
 * strongest on-site signal that "PotenciApp" is a name, not a typo of
 * "potencia". Google only reads it on the home page, so render it there.
 */
export function websiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: COMPANY.brand,
    alternateName: COMPANY.alternateNames,
    url: `${SITE_URL}/`,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  }
}

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
    alternateName: COMPANY.alternateNames,
    ...(COMPANY.legalName ? { legalName: COMPANY.legalName } : {}),
    ...(COMPANY.cuit ? { taxID: COMPANY.cuit, vatID: COMPANY.cuit } : {}),
    url: `${SITE_URL}/`,
    logo: logoImageObject(),
    image: `${SITE_URL}${COMPANY.logo.path}`,
    email: CONTACT_EMAIL,
    telephone: `+${WA_PHONE}`,
    description,
    founder: { "@type": "Person", name: COMPANY.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
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
    hasMap: COMPANY.mapsSearchUrl,
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
