"use client"

import { Workflow, Link2, TrendingUp, Target, Check } from "lucide-react"

const values = [
  {
    icon: Workflow,
    title: "Automatización de Procesos",
    description: "Eliminamos tareas repetitivas con flujos automatizados que ahorran tiempo y reducen errores.",
  },
  {
    icon: Link2,
    title: "Integración con Sistemas Existentes",
    description: "Conectamos tu nuevo sistema con las herramientas que ya utilizás, sin fricciones.",
  },
  {
    icon: TrendingUp,
    title: "Escalabilidad Garantizada",
    description: "Arquitecturas diseñadas para crecer con tu negocio sin comprometer la performance.",
  },
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description: "Cada decisión técnica está orientada a generar impacto real en tu negocio.",
  },
]

export function ValueSection() {
  return (
    <section id="proceso" className="relative scroll-mt-24 py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-[#7CFF3A] tracking-wide uppercase mb-4">
              Por qué elegirnos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Tecnología que{" "}
              <span className="bg-gradient-to-r from-[#7CFF3A] to-[#5ACC2A] bg-clip-text text-transparent">
                impulsa negocios
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              No solo construimos software, creamos sistemas que transforman la forma en que operás y competís en el mercado.
            </p>

            {/* Value Points */}
            <div className="space-y-4">
              {["Reducción de costos operativos", "Mayor velocidad de ejecución", "Decisiones basadas en datos", "Ventaja competitiva sostenible"].map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#7CFF3A]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-[#7CFF3A]" />
                  </div>
                  <span className="text-foreground font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ValueCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType
  title: string
  description: string
  index: number
}) {
  return (
    <div
      className={`group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-[#7CFF3A]/30 hover:shadow-[0_0_30px_rgba(124,255,58,0.1)] transition-all duration-500 ${
        index === 0 ? "sm:-translate-y-4" : index === 3 ? "sm:translate-y-4" : ""
      }`}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#7CFF3A]/10 text-[#7CFF3A] mb-4 group-hover:bg-[#7CFF3A]/20 transition-colors duration-300">
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[#7CFF3A] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
