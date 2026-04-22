"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Layers, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7CFF3A]/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#7CFF3A]/5 rounded-full blur-[96px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,255,58,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,255,58,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7CFF3A]/10 border border-[#7CFF3A]/20 opacity-0 animate-fade-in-up">
              <Sparkles className="h-4 w-4 text-[#7CFF3A]" />
              <span className="text-sm font-medium text-[#7CFF3A]">Potenciado por IA</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1] opacity-0 animate-fade-in-up animation-delay-100">
              Desarrollo Web{" "}
              <span className="text-[#7CFF3A]">&</span>{" "}
              E-commerce{" "}
              <span className="bg-gradient-to-r from-[#7CFF3A] to-[#5ACC2A] bg-clip-text text-transparent">
                Potenciado por IA
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl opacity-0 animate-fade-in-up animation-delay-200">
              Creamos sistemas digitales de alto rendimiento que escalan tu negocio con automatización, datos e inteligencia aplicada.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animation-delay-300">
              <Button
                asChild
                size="lg"
                className="bg-[#7CFF3A] text-background hover:bg-[#6EE832] font-semibold text-base h-14 px-8 shadow-[0_0_30px_rgba(124,255,58,0.4)] hover:shadow-[0_0_50px_rgba(124,255,58,0.6)] transition-all duration-300 animate-glow-pulse"
              >
                <Link href="#contacto">
                  Empezar ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-secondary hover:text-foreground font-semibold text-base h-14 px-8 transition-all duration-300"
              >
                <Link href="#servicios">Ver soluciones</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4 opacity-0 animate-fade-in-up animation-delay-400">
              <TrustIndicator icon={Sparkles} text="Soluciones a medida" />
              <TrustIndicator icon={Layers} text="Arquitectura escalable" />
              <TrustIndicator icon={Zap} text="Automatización con IA" />
            </div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <div className="relative lg:pl-8 opacity-0 animate-fade-in-up animation-delay-300">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustIndicator({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-[#7CFF3A]/10 flex items-center justify-center">
        <Icon className="h-4 w-4 text-[#7CFF3A]" />
      </div>
      <span className="text-sm font-medium text-muted-foreground">{text}</span>
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="relative animate-float">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#7CFF3A]/20 to-transparent rounded-2xl blur-2xl" />
      
      {/* Main dashboard card */}
      <div className="relative bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#7CFF3A] shadow-[0_0_10px_rgba(124,255,58,0.5)]" />
            <span className="text-sm font-medium text-foreground">Dashboard</span>
          </div>
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard label="Ventas Totales" value="$124,592" change="+12.5%" positive />
          <StatCard label="Conversiones" value="2,847" change="+8.3%" positive />
        </div>

        {/* Chart Preview */}
        <div className="bg-secondary/50 rounded-xl p-4 mb-4">
          <div className="flex items-end justify-between h-24 gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-[#7CFF3A] to-[#7CFF3A]/40 rounded-t-sm transition-all duration-300 hover:from-[#7CFF3A] hover:to-[#7CFF3A]/60"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Mini Cards */}
        <div className="grid grid-cols-3 gap-3">
          <MiniCard icon="📦" label="Pedidos" value="156" />
          <MiniCard icon="👥" label="Usuarios" value="3.2k" />
          <MiniCard icon="⚡" label="API Calls" value="12k" />
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -right-4 top-1/4 bg-card border border-[#7CFF3A]/30 rounded-xl p-3 shadow-xl shadow-[#7CFF3A]/10 animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#7CFF3A]/20 flex items-center justify-center">
            <Zap className="h-4 w-4 text-[#7CFF3A]" />
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">IA Optimización</p>
            <p className="text-xs text-[#7CFF3A]">+23% rendimiento</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, change, positive }: { label: string; value: string; change: string; positive?: boolean }) {
  return (
    <div className="bg-secondary/50 rounded-xl p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className={`text-xs font-medium ${positive ? 'text-[#7CFF3A]' : 'text-destructive'}`}>
        {change}
      </p>
    </div>
  )
}

function MiniCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-secondary/30 rounded-lg p-3 text-center">
      <span className="text-lg">{icon}</span>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}
