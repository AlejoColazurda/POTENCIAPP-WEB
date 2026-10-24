import type { BlogCategory, CategoryInfo, PublicBlogCategory } from "./types"

/** Categories shown as public pills. Empty ones stay hidden. */
export const PUBLIC_BLOG_CATEGORIES: readonly PublicBlogCategory[] = ["software", "security", "stores", "news"]

export const BLOG_CATEGORIES: Record<BlogCategory, CategoryInfo> = {
  software: {
    id: "software",
    label: "Contratar software",
    labelShort: "Contratar",
    description: "Precios, contratos, accesos y casos reales antes de pagarle a un programador o agencia.",
    color: "#FFB020",
  },
  security: {
    id: "security",
    label: "Seguridad",
    labelShort: "Seguridad",
    description: "Estafas, cuentas robadas y cómo proteger tu tienda y tus cobros.",
    color: "#EF4444",
  },
  stores: {
    id: "stores",
    label: "Tiendas",
    labelShort: "Tiendas",
    description: "Tiendas online: accesos, cobros y operación del panel.",
    color: "#22F23A",
  },
  news: {
    id: "news",
    label: "Resumen del mes",
    labelShort: "Resumen",
    description: "Las noticias del mes que le cambian algo a un comercio o pyme.",
    color: "#38BDF8",
  },
  "ai-agents": {
    id: "ai-agents",
    label: "Agentes de IA & Automatización",
    labelShort: "Agentes IA",
    description: "Sistemas autónomos, pipelines de IA y flujos de trabajo inteligentes.",
    color: "#22F23A",
  },
  "mobile-apps": {
    id: "mobile-apps",
    label: "Desarrollo Mobile (iOS & Android)",
    labelShort: "Apps Mobile",
    description: "Arquitectura nativa y cross-platform para aplicaciones de alto rendimiento.",
    color: "#3B9EFF",
  },
  "web-engineering": {
    id: "web-engineering",
    label: "Ingeniería Web & Cloud",
    labelShort: "Web & Cloud",
    description: "Next.js, infraestructura serverless, microservicios y escalabilidad.",
    color: "#A855F7",
  },
  automation: {
    id: "automation",
    label: "Automatizaciones de Negocio",
    labelShort: "Automatización",
    description: "Conexión de CRM, pasarelas de pago, WhatsApp API y analítica en tiempo real.",
    color: "#FFB020",
  },
  "startups-scale": {
    id: "startups-scale",
    label: "Crecimiento & Startups",
    labelShort: "Startups",
    description: "Estrategias de go-to-market, retención y métricas de tracción técnica.",
    color: "#EC4899",
  },
}

export function getCategoryInfo(categoryId: BlogCategory): CategoryInfo {
  return BLOG_CATEGORIES[categoryId] || BLOG_CATEGORIES.security
}

export function isPublicBlogCategory(category: BlogCategory): category is PublicBlogCategory {
  return (PUBLIC_BLOG_CATEGORIES as readonly string[]).includes(category)
}
