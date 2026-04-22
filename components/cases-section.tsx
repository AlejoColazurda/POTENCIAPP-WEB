"use client"

import { ShoppingBag, Settings, Brain, ArrowUpRight } from "lucide-react"

const cases = [
  {
    icon: ShoppingBag,
    category: "E-commerce",
    title: "Tienda Online Optimizada",
    problem: "E-commerce con alta tasa de abandono de carrito y tiempos de carga lentos que afectaban las conversiones.",
    solution: "Rediseño completo con Next.js, optimización de imágenes, checkout simplificado y recomendaciones personalizadas.",
    result: "+156% en conversiones",
    resultDetail: "Reducción del 40% en abandono de carrito",
    tags: ["Next.js", "Stripe", "Performance"],
  },
  {
    icon: Settings,
    category: "Sistemas Internos",
    title: "Sistema de Operaciones",
    problem: "Procesos manuales que consumían 20+ horas semanales del equipo en tareas administrativas repetitivas.",
    solution: "Dashboard centralizado con automatización de reportes, gestión de inventario en tiempo real e integraciones API.",
    result: "85% menos tiempo manual",
    resultDetail: "ROI positivo en 3 meses",
    tags: ["React", "Node.js", "Automatización"],
  },
  {
    icon: Brain,
    category: "Inteligencia Artificial",
    title: "Asistente IA para Atención",
    problem: "Equipo de soporte saturado con consultas repetitivas que retrasaban la atención de casos complejos.",
    solution: "Chatbot con IA entrenado en la base de conocimiento del negocio, con escalamiento inteligente a agentes.",
    result: "70% consultas automatizadas",
    resultDetail: "Satisfacción del cliente +35%",
    tags: ["OpenAI", "NLP", "Integración"],
  },
]

export function CasesSection() {
  return (
    <section id="casos" className="relative scroll-mt-24 py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-background to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-sm font-semibold text-[#7CFF3A] tracking-wide uppercase mb-4">
            Casos de Éxito
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Resultados que{" "}
            <span className="text-[#7CFF3A]">hablan solos</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Proyectos reales con impacto medible. Cada solución está diseñada para resolver problemas específicos y generar valor tangible.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {cases.map((caseItem, index) => (
            <CaseCard key={index} {...caseItem} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({
  icon: Icon,
  category,
  title,
  problem,
  solution,
  result,
  resultDetail,
  tags,
}: {
  icon: React.ElementType
  category: string
  title: string
  problem: string
  solution: string
  result: string
  resultDetail: string
  tags: string[]
}) {
  return (
    <div className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-[#7CFF3A]/30 hover:shadow-[0_0_40px_rgba(124,255,58,0.1)] transition-all duration-500">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7CFF3A]/10 rounded-full">
            <Icon className="h-4 w-4 text-[#7CFF3A]" />
            <span className="text-xs font-semibold text-[#7CFF3A]">{category}</span>
          </div>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-[#7CFF3A] transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-[#7CFF3A] transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 pt-2 space-y-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Problema</p>
          <p className="text-sm text-foreground/80 leading-relaxed">{problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Solución</p>
          <p className="text-sm text-foreground/80 leading-relaxed">{solution}</p>
        </div>
      </div>

      {/* Result Banner */}
      <div className="mx-6 mb-6 p-4 bg-gradient-to-r from-[#7CFF3A]/10 to-transparent border border-[#7CFF3A]/20 rounded-xl">
        <p className="text-2xl font-bold text-[#7CFF3A]">{result}</p>
        <p className="text-sm text-muted-foreground">{resultDetail}</p>
      </div>

      {/* Tags */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-medium bg-secondary text-muted-foreground rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
