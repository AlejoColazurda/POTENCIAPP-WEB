"use client"

import Link from "next/link"
import { ArrowRight, TrendingUp, Activity, Zap, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { BrandMark, BrandMarkAnimated } from "@/components/brand"
import Aurora from "@/components/reactbits/Aurora"
import SplitText from "@/components/reactbits/SplitText"
import RotatingText from "@/components/reactbits/RotatingText"
import CountUp from "@/components/reactbits/CountUp"
import ElectricBorder from "@/components/reactbits/ElectricBorder"
import Magnet from "@/components/reactbits/Magnet"
import ShinyText from "@/components/reactbits/ShinyText"

export function HeroSection() {
  const t = useTranslations("hero")
  const rotating = t.raw("rotating") as string[]

  return (
    <section className="relative isolate overflow-hidden bg-gray-950 pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* WebGL aurora in brand green — replaces the old background video */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[68%] opacity-35 pointer-events-none">
        <Aurora colorStops={["#062B0B", "#22F23A", "#062B0B"]} amplitude={0.75} blend={0.75} speed={0.35} />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/40 to-gray-950 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/4 right-[8%] w-[480px] h-[480px] rounded-full bg-brand-green/10 blur-[140px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
          <BrandMark size={32} glow />
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-800">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse-dot" />
            <ShinyText
              text={t("statusBadge")}
              speed={5}
              className="font-mono text-xs uppercase tracking-wider text-gray-300"
            />
          </span>
        </div>

        <h1 className="font-display font-bold leading-[0.85] tracking-[-0.04em] text-outline text-[18vw] sm:text-[16vw] lg:text-[clamp(96px,12vw,180px)] select-none animate-fade-in-up animation-delay-100">
          {t("outline")}
        </h1>

        <div className="mt-6 lg:mt-8 grid lg:grid-cols-[6fr_4fr] gap-12 lg:gap-16 items-start">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 animate-fade-in-up animation-delay-100">
              <Sparkles className="h-3.5 w-3.5 text-brand-green" strokeWidth={2.5} />
              <span className="font-mono text-xs uppercase tracking-wider text-brand-green">
                {t("partnerBadge")}
              </span>
            </div>

            {/* SplitText and RotatingText each own a line. Keeping them in
                separate blocks stops framer's layout animation from measuring
                against GSAP's in-flight transforms on the first line. */}
            <h2 className="font-display text-[40px] sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-gray-100">
              <SplitText
                text={t("h2_line1")}
                tag="span"
                className="block"
                splitType="chars"
                delay={28}
                duration={0.9}
                textAlign="left"
                from={{ opacity: 0, y: 48, rotateX: -60 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
              />
              <span className="block text-brand-green">
                <RotatingText
                  texts={rotating}
                  rotationInterval={3600}
                  staggerDuration={0.008}
                  staggerFrom="first"
                  splitBy="characters"
                  mainClassName="justify-start"
                  splitLevelClassName="overflow-hidden pb-1.5"
                  // Tween, not spring: a spring's settle time plus the per-char
                  // stagger outran the rotation interval, so most glyphs were
                  // still at opacity 0 when the next word swapped in.
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                />
              </span>
            </h2>

            <p
              className="text-lg text-gray-300 max-w-xl leading-relaxed animate-fade-in-up animation-delay-300"
              dangerouslySetInnerHTML={{
                __html: t
                  .raw("subheading")
                  .replace(/<bold>/g, '<strong class="text-gray-100 font-semibold">')
                  .replace(/<\/bold>/g, "</strong>"),
              }}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up animation-delay-400">
              <Magnet padding={90} magnetStrength={5} wrapperClassName="inline-flex">
                <Link
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-lg bg-brand-green text-black font-display font-bold text-base hover:bg-green-hover hover:shadow-[0_0_32px_rgba(34,242,58,0.5)] transition-all duration-300 active:scale-[0.98]"
                >
                  {t("ctaPrimary")}
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                </Link>
              </Magnet>
              <Link
                href="#proyectos"
                className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-lg border border-brand-green text-brand-green font-display font-bold text-base hover:bg-brand-green/10 transition-all duration-300"
              >
                {t("ctaSecondary")}
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-in-up animation-delay-300">
            <DashboardMockup />
          </div>
        </div>

        <div className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800 border border-gray-800 rounded-2xl overflow-hidden animate-fade-in-up animation-delay-500">
          {(["m1", "m2", "m3", "m4"] as const).map((k, i) => (
            <MetricItem key={k} mk={k} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Metric values live in the message files as display strings ("+340%", "99,98%",
 * "12k+"). Split off the numeric core so CountUp can animate it while the
 * prefix/suffix — and the locale's decimal mark — stay exactly as translated.
 */
function parseMetric(value: string) {
  const match = value.match(/^([^\d]*)([\d]+(?:[.,][\d]+)?)(.*)$/)
  if (!match) return null
  const [, prefix, rawNumber, suffix] = match
  const decimalSeparator = rawNumber.includes(",") ? "," : "."
  return {
    prefix,
    suffix,
    decimalSeparator,
    to: Number.parseFloat(rawNumber.replace(",", ".")),
  }
}

function MetricItem({ mk, index }: { mk: "m1" | "m2" | "m3" | "m4"; index: number }) {
  const t = useTranslations("hero.metrics")
  const value = t(`${mk}.value`)
  const parsed = parseMetric(value)

  return (
    <div className="bg-gray-950 px-6 py-6 lg:py-8 flex flex-col items-start gap-1">
      <span className="font-display font-bold text-3xl lg:text-4xl text-gray-100 tracking-tight tabular-nums">
        {parsed ? (
          <>
            {parsed.prefix}
            <CountUp
              to={parsed.to}
              duration={2.2}
              delay={index * 0.12}
              decimalSeparator={parsed.decimalSeparator}
            />
            {parsed.suffix}
          </>
        ) : (
          value
        )}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
        {t(`${mk}.label`)}
      </span>
    </div>
  )
}

function DashboardMockup() {
  const t = useTranslations("hero.dashboard")
  const locale = useLocale()
  const [revenue, setRevenue] = useState(0)
  const [tick, setTick] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf: number
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const target = 124812
          if (reduced) {
            setRevenue(target)
          } else {
            const start = performance.now()
            const duration = 2800
            const step = (now: number) => {
              const t = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - t, 3)
              setRevenue(Math.floor(eased * target))
              if (t < 1) raf = requestAnimationFrame(step)
            }
            raf = requestAnimationFrame(step)
          }
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(ref.current)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 8000)
    return () => clearInterval(id)
  }, [])

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 bg-brand-green/15 blur-[80px] pointer-events-none rounded-3xl"
      />

      <ElectricBorder color="#22F23A" speed={0.8} chaos={0.45} borderRadius={16}>
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-[0_24px_64px_-12px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
            <span className="ml-3 flex items-center gap-2 font-mono text-[11px] text-gray-300 truncate">
              <BrandMark size={16} />
              {t("url")}
            </span>
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
              {t("live")}
            </span>
          </div>

          <div className="p-5 space-y-4">
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                  {t("revenue")}
                </span>
                <span className="font-mono text-[11px] text-brand-green">▲ +18,4%</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="font-display text-3xl font-bold text-gray-100 tracking-tight tabular-nums">
                  ${revenue.toLocaleString(locale)}
                </span>
                <svg viewBox="0 0 80 28" className="w-24 h-7 flex-shrink-0">
                  <path
                    d="M0,22 L10,20 L20,18 L30,14 L40,16 L50,10 L60,12 L70,6 L80,4"
                    fill="none"
                    stroke="#22F23A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="80" cy="4" r="2.5" fill="#22F23A" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: t("kpi1"), value: "4,21%", delta: "+0,9" },
                { label: t("kpi2"), value: "8.412", delta: "+12%" },
                { label: t("kpi3"), value: "$328", delta: "−2,1%", down: true },
              ].map((k) => (
                <div key={k.label} className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                    {k.label}
                  </div>
                  <div className="mt-1 font-display text-base font-bold text-gray-100 tracking-tight">
                    {k.value}
                  </div>
                  <div
                    className={`mt-0.5 font-mono text-[11px] ${
                      k.down ? "text-red-400" : "text-brand-green"
                    }`}
                  >
                    {k.down ? "▼" : "▲"} {k.delta}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                  {t("revenueChart")}
                </span>
                <span className="font-mono text-[11px] text-gray-300">{t("vs")}</span>
              </div>
              <svg viewBox="0 0 280 90" className="w-full h-20" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hero-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#22F23A" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#22F23A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,72 C30,60 50,68 80,50 C110,28 140,42 170,30 C200,18 230,28 280,8 L280,90 L0,90 Z"
                  fill="url(#hero-grad)"
                />
                <path
                  d="M0,72 C30,60 50,68 80,50 C110,28 140,42 170,30 C200,18 230,28 280,8"
                  fill="none"
                  stroke="#22F23A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,82 C30,76 50,80 80,68 C110,56 140,62 170,52 C200,42 230,48 280,38"
                  fill="none"
                  stroke="#6B6B6B"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <circle cx="280" cy="8" r="3" fill="#22F23A" />
              </svg>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 font-mono text-[11px] space-y-1">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-brand-green">●</span>
                <span className="text-gray-300">{t("deployLine")}</span>
                <span className="text-gray-500">main · #{1842 + tick}</span>
                <span className="ml-auto text-brand-green">ready</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Zap className="h-3 w-3 text-brand-green" />
                <span>{t("agentLine")}</span>
                <span className="ml-auto text-gray-300">+12%</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Activity className="h-3 w-3 text-gray-500" />
                <span>{t("uptimeLine")}</span>
                <span className="ml-auto text-gray-300">24h</span>
              </div>
            </div>
          </div>
        </div>
      </ElectricBorder>

      <div className="hidden lg:block absolute -top-10 -right-6 pointer-events-none">
        <BrandMarkAnimated size={88} />
      </div>

      <div className="hidden lg:flex absolute -left-6 top-40 items-center gap-2 bg-gray-900 border border-brand-green/40 rounded-xl px-3 py-2 shadow-[0_0_32px_rgba(34,242,58,0.2)]">
        <Sparkles className="h-4 w-4 text-brand-green" />
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
            IA agent
          </div>
          <div className="font-display text-xs font-semibold text-gray-100">+23%</div>
        </div>
      </div>

      <div className="hidden lg:flex absolute -right-4 bottom-20 items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 shadow-lg">
        <TrendingUp className="h-4 w-4 text-brand-green" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">7d</span>
      </div>
    </div>
  )
}
