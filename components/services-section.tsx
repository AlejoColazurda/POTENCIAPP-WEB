"use client"

import Link from "next/link"
import {
  Smartphone,
  BrainCircuit,
  ShoppingBag,
  Database,
  Workflow,
  Compass,
  ShieldCheck,
  Server,
  ArrowRight,
} from "lucide-react"
import { useTranslations } from "next-intl"
import SpotlightCard from "@/components/reactbits/SpotlightCard"
import AnimatedContent from "@/components/reactbits/AnimatedContent"

type CardKey =
  | "apps"
  | "ia"
  | "ecommerce"
  | "sistemas"
  | "automatizaciones"
  | "ciberseguridad"
  | "infraestructura"
  | "consultoria"

const ICONS: Record<CardKey, React.ReactNode> = {
  apps: <Smartphone className="h-6 w-6" />,
  ia: <BrainCircuit className="h-6 w-6" />,
  ecommerce: <ShoppingBag className="h-6 w-6" />,
  sistemas: <Database className="h-6 w-6" />,
  automatizaciones: <Workflow className="h-6 w-6" />,
  ciberseguridad: <ShieldCheck className="h-6 w-6" />,
  infraestructura: <Server className="h-6 w-6" />,
  consultoria: <Compass className="h-6 w-6" />,
}

/**
 * Eight divisions on a 12-col grid with no row-spans: the old featured card
 * spanned two rows and left a large hole under its content.
 */
export function ServicesSection() {
  const t = useTranslations("services")

  return (
    <section id="soluciones" className="relative bg-gray-950 py-20 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-12 gap-6">
          <SolutionCard cardKey="apps" className="md:col-span-7" featured />
          <SolutionCard cardKey="ia" className="md:col-span-5" delay={0.08} />
          <SolutionCard cardKey="ecommerce" className="md:col-span-4" delay={0.08} />
          <SolutionCard cardKey="sistemas" className="md:col-span-4" delay={0.16} />
          <SolutionCard cardKey="automatizaciones" className="md:col-span-4" delay={0.24} />
          <SolutionCard cardKey="ciberseguridad" className="md:col-span-6" delay={0.08} withChips />
          <SolutionCard cardKey="infraestructura" className="md:col-span-6" delay={0.16} withChips />
          <SolutionCard cardKey="consultoria" className="md:col-span-12" horizontal delay={0.24} />
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  center?: boolean
}) {
  return (
    <AnimatedContent distance={60} duration={0.9} threshold={0.15}>
      <div className={center ? "text-center" : ""}>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
            {eyebrow}
          </span>
        </span>
        <h2
          className={`mt-5 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-gray-100 ${
            center ? "max-w-[720px] mx-auto" : "max-w-[720px]"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-5 text-lg text-gray-300 leading-relaxed ${
              center ? "max-w-[640px] mx-auto" : "max-w-[640px]"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </AnimatedContent>
  )
}

function SolutionCard({
  cardKey,
  className = "",
  featured,
  horizontal,
  withChips,
  delay = 0,
}: {
  cardKey: CardKey
  className?: string
  featured?: boolean
  horizontal?: boolean
  /** Renders the card's `chips` message array as a mono tag row. */
  withChips?: boolean
  delay?: number
}) {
  const t = useTranslations(`services.cards.${cardKey}`)
  const tRoot = useTranslations("services")
  const chips = withChips || featured ? (t.raw("chips") as string[]) : null

  return (
    <AnimatedContent
      distance={50}
      duration={0.8}
      delay={delay}
      threshold={0.1}
      className={`h-full ${className}`}
    >
      <Link href="#contacto" className="group block h-full">
        <SpotlightCard
          className={`h-full bg-gray-900 border rounded-2xl p-8 transition-all duration-300 flex ${
            featured
              ? "border-brand-green/30 shadow-[0_0_60px_-24px_rgba(34,242,58,0.55)] hover:border-brand-green"
              : "border-gray-800 hover:border-brand-green hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]"
          } ${horizontal ? "flex-col md:flex-row md:items-center md:gap-8" : "flex-col"}`}
          spotlightColor="rgba(34, 242, 58, 0.18)"
        >
          <div
            className={`${horizontal ? "md:flex-shrink-0" : ""} h-12 w-12 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-gray-300 group-hover:text-brand-green group-hover:border-brand-green/30 transition-colors`}
          >
            {ICONS[cardKey]}
          </div>

          <div className={horizontal ? "flex-1 mt-6 md:mt-0" : "mt-6 flex-1"}>
            <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
              {t("eyebrow")}
            </div>
            <h3
              className={`mt-2 font-display font-semibold text-gray-100 tracking-tight ${
                featured ? "text-3xl lg:text-4xl" : horizontal ? "text-2xl lg:text-3xl" : "text-2xl"
              }`}
            >
              {t("title")}
            </h3>
            <p className="mt-3 text-base text-gray-300 leading-relaxed max-w-[560px]">
              {t("desc")}
            </p>

            {chips && (
              <div className="mt-5 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md border border-gray-800 bg-gray-950 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gray-300"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            className={`${horizontal ? "md:ml-auto md:flex-shrink-0" : "mt-6"} inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green group-hover:gap-2.5 transition-all`}
          >
            {tRoot("verMas")}
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </div>
        </SpotlightCard>
      </Link>
    </AnimatedContent>
  )
}
