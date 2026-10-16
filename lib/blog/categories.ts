import type { BlogCategory, CategoryInfo } from "./types"

export const BLOG_CATEGORIES: Record<BlogCategory, CategoryInfo> = {
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
  "automation": {
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
  return BLOG_CATEGORIES[categoryId] || BLOG_CATEGORIES["ai-agents"]
}
