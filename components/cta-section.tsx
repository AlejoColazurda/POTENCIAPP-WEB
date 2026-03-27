"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section id="precios" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#7CFF3A]/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#7CFF3A]/10 rounded-full blur-[120px]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,255,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,255,58,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-card/30 backdrop-blur-xl border border-[#7CFF3A]/20 rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7CFF3A]/10 via-transparent to-transparent rounded-3xl" />
          
          <div className="relative">
            {/* Icon */}
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#7CFF3A]/20 mb-8 animate-glow-pulse">
              <Sparkles className="h-8 w-8 text-[#7CFF3A]" />
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Llevá tu negocio al{" "}
              <span className="bg-gradient-to-r from-[#7CFF3A] to-[#5ACC2A] bg-clip-text text-transparent">
                siguiente nivel
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Conversemos sobre tu proyecto y descubramos juntos cómo la tecnología puede transformar tu negocio. Sin compromiso, con ideas concretas.
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-[#7CFF3A] text-background hover:bg-[#6EE832] font-bold text-lg h-16 px-10 shadow-[0_0_40px_rgba(124,255,58,0.5)] hover:shadow-[0_0_60px_rgba(124,255,58,0.7)] transition-all duration-300 animate-glow-pulse"
            >
              Hablemos de tu proyecto
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>

            {/* Trust note */}
            <p className="text-sm text-muted-foreground mt-6">
              Respuesta en menos de 24 horas • Sin compromiso
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
