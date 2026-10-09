import { getAllPosts } from "@/lib/blog"
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

/**
 * /llms.txt — a plain-Markdown summary for AI assistants and answer engines
 * (ChatGPT, Perplexity, Claude, Gemini). Cheap to serve; keep it factual and
 * in sync with the site: every claim here must be one the site also makes.
 */
export function GET() {
  const posts = getAllPosts()
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
    .join("\n")

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

## Cómo trabaja

- Contrato firmado con alcance, hitos y fechas antes de empezar.
- Precio cerrado; los cambios de alcance se cotizan aparte y por escrito.
- Empresa registrada, con factura por cada pago.
- Garantía post-entrega sobre lo desarrollado.
- Trabajo remoto con clientes de Argentina y del exterior.

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
