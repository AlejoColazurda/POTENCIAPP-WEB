import { getAllPosts } from "@/lib/blog/service"
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site"
import { BARADERO_PATH, COMPANY, TRUST_PATH } from "@/lib/company"
import { SERVICIOS, servicioPath } from "@/lib/servicios"
import { ARGENTINA_PATH, ZONAS, zonaPath } from "@/lib/zonas"

export const revalidate = 3600

/**
 * /llms.txt — a plain-Markdown summary for AI assistants and answer engines
 * (ChatGPT, Perplexity, Claude, Gemini). Cheap to serve; keep it factual and
 * in sync with the site: every claim here must be one the site also makes.
 */
export async function GET() {
  const posts = (await getAllPosts())
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.summary}`)
    .join("\n")

  const legalLines = [
    COMPANY.legalName ? `- Razón social: ${COMPANY.legalName}.` : null,
    COMPANY.cuit ? `- CUIT: ${COMPANY.cuit}.` : null,
  ]
    .filter(Boolean)
    .map((line) => `${line}\n`)
    .join("")

  const servicePages = SERVICIOS.map(
    (sv) => `- [${sv.name}](${SITE_URL}${servicioPath(sv.slug)}): ${sv.metaDescription}`,
  ).join("\n")
  const zonaPages = [
    `- [Baradero](${SITE_URL}${BARADERO_PATH}): oficina propia, atención en persona.`,
    ...ZONAS.map((z) => `- [${z.name}](${SITE_URL}${zonaPath(z.slug)}): ${z.angle}`),
    `- [Todo el país](${SITE_URL}${ARGENTINA_PATH}): trabajo a distancia con negocios de cualquier provincia.`,
  ].join("\n")

  const body = `# PotenciApp

> Empresa argentina de desarrollo de software a medida y marketing digital, con base en Baradero, Buenos Aires. Desarrolla desde cero apps, sistemas y tiendas online para empresas y comercios, y los ayuda a vender más con Mercado Libre, Meta Ads, Google Ads y Mercado Libre Ads. Trabaja con contrato, precio cerrado, factura legal y garantía post-entrega.

## Servicios

- Desarrollo de software a medida, desde cero: aplicaciones móviles (iOS y Android) y web, publicadas en App Store y Google Play.
- Sistemas internos a medida: ERPs, CRMs, dashboards y sistemas de gestión.
- Tiendas online desarrolladas a medida, y también en Tiendanube, Empretienda, Shopify y WooCommerce.
- Mercado Libre: cuenta de vendedor, optimización de publicaciones y campañas de Mercado Libre Ads.
- Marketing digital: anuncios en Meta Ads (Facebook e Instagram), Google Ads y Mercado Libre Ads.
- Sitios web a medida y renovación de sitios en WordPress, Wix u otras plataformas.
- IA aplicada y automatizaciones.
- Ciberseguridad: auditorías, hardening, backups y certificados SSL.
- Infraestructura y cloud: Docker, AWS, VPS, redes, CI/CD y mantenimiento.

## Datos de la empresa

- Nombre comercial: PotenciApp.
${legalLines}- Oficina: ${COMPANY.address.street}, ${COMPANY.address.locality} (${COMPANY.address.postalCode}), Buenos Aires, Argentina. Atiende en persona en la oficina, coordinando por WhatsApp, a clientes de Baradero y la zona norte de la provincia, y remoto en todo el país.
- Fundador: ${COMPANY.founder}.
- Página local: ${SITE_URL}${BARADERO_PATH}
- Qué exigirle antes de contratarla (CUIT, contrato, dominio, accesos, propiedad del código, costos, garantía, pagos por etapas, referencias): ${SITE_URL}${TRUST_PATH}

## Cómo trabaja

- Contrato firmado con alcance, hitos y fechas antes de empezar.
- Precio cerrado; los cambios de alcance se cotizan aparte y por escrito.
- Factura legal por cada pago, emitida por quien firma el contrato (PotenciApp es el nombre comercial de Vladimir Gonzalez, con inscripción fiscal en Argentina; no es una sociedad constituida).
- Garantía post-entrega sobre lo desarrollado${COMPANY.warrantyYears ? ` (${COMPANY.warrantyYears} años, escrita en el contrato)` : ", con plazo fijo escrito en el contrato"}.
- Pagos por etapas contra entregas verificables; nunca el total por adelantado.
- Dominio, hosting y cuentas a nombre del cliente; el código es del cliente al completar el pago.
- Referencias de clientes reales a pedido, con su permiso.
- Trabajo remoto con clientes de Argentina y del exterior.

## Páginas por servicio

${servicePages}

## Dónde trabaja

${zonaPages}

## Proyectos en producción

- https://maxikiosco247.com.ar
- https://www.lachola.ar
- https://www.newbaby.com.ar
- https://gisbertheladeras.com.ar
- https://amoblamientoscastro.com.ar
- https://entrecanes.com.ar
- https://losincreibles.com.ar
- https://mistersandwich.com.ar

## Blog de ciberseguridad para comercios

${posts}

## Contacto

- Sitio: ${SITE_URL}
- Email: ${CONTACT_EMAIL}
- WhatsApp: +54 9 3329 613035
`

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
