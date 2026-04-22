"use client"

import Link from "next/link"
import { ShoppingCart, Brain, Code, ArrowUpRight } from "lucide-react"

const services = [
  {
    icon: ShoppingCart,
    title: "Desarrollo E-commerce",
    description: "Plataformas robustas listas para vender, integradas con pagos, stock y escalabilidad real.",
    features: ["Pasarelas de pago", "Gestión de inventario", "Escalabilidad"],
    highlighted: false,
  },
  {
    icon: Brain,
    title: "IA & Automatización",
    description: "Implementamos inteligencia artificial para optimizar procesos, generar contenido y tomar decisiones con datos.",
    features: ["Machine Learning", "Automatización", "Análisis predictivo"],
    highlighted: true,
  },
  {
    icon: Code,
    title: "Desarrollo Web a Medida",
    description: "Sistemas personalizados con arquitectura limpia, performance optimizada y UX profesional.",
    features: ["Arquitectura limpia", "Performance", "UX profesional"],
    highlighted: false,
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="relative scroll-mt-24 py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-sm font-semibold text-[#7CFF3A] tracking-wide uppercase mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Soluciones digitales de{" "}
            <span className="text-[#7CFF3A]">alto impacto</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Combinamos tecnología de vanguardia con estrategia de negocio para crear sistemas que realmente funcionan.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  highlighted,
}: {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  highlighted: boolean
}) {
  return (
    <div
      className={`group relative rounded-2xl p-6 lg:p-8 transition-all duration-500 ${
        highlighted
          ? "bg-gradient-to-br from-[#7CFF3A]/10 via-card to-card border-2 border-[#7CFF3A]/30 shadow-[0_0_40px_rgba(124,255,58,0.15)] hover:shadow-[0_0_60px_rgba(124,255,58,0.25)] md:col-span-2 lg:col-span-1"
          : "bg-card/50 backdrop-blur-sm border border-border hover:border-[#7CFF3A]/30 hover:shadow-[0_0_30px_rgba(124,255,58,0.1)]"
      }`}
    >
      {/* Highlight badge for AI card */}
      {highlighted && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-[#7CFF3A] text-background text-xs font-bold rounded-full">
          DESTACADO
        </div>
      )}

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center h-14 w-14 rounded-xl mb-6 transition-all duration-300 ${
          highlighted
            ? "bg-[#7CFF3A] text-background shadow-[0_0_20px_rgba(124,255,58,0.4)]"
            : "bg-secondary text-[#7CFF3A] group-hover:bg-[#7CFF3A]/20"
        }`}
      >
        <Icon className="h-7 w-7" />
      </div>

      {/* Content */}
      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-[#7CFF3A] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-6">
        {features.map((feature, i) => (
          <span
            key={i}
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              highlighted
                ? "bg-[#7CFF3A]/20 text-[#7CFF3A]"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {feature}
          </span>
        ))}
      </div>

      {/* CTA Link */}
      <Link
        href="#contacto"
        className="flex items-center gap-2 text-sm font-semibold text-[#7CFF3A] group-hover:gap-3 transition-all duration-300"
      >
        <span>Más información</span>
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
