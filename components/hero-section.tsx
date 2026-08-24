"use client"

import Link from "next/link"
import { ArrowDown, ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { BrandMark } from "@/components/brand"
import Aurora from "@/components/reactbits/Aurora"
import SplitText from "@/components/reactbits/SplitText"
import RotatingText from "@/components/reactbits/RotatingText"
import CountUp from "@/components/reactbits/CountUp"
import Magnet from "@/components/reactbits/Magnet"
import ShinyText from "@/components/reactbits/ShinyText"

export function HeroSection() {
  const t = useTranslations("hero")
  const rotating = t.raw("rotating") as string[]
  const trustChips = t.raw("trustChips") as string[]

  // WebGL aurora only where it earns its cost: desktop, motion allowed.
  const [showAurora, setShowAurora] = useState(false)
  useEffect(() => {
    setShowAurora(
      window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches,
    )
  }, [])

  return (
    <section className="relative isolate overflow-hidden bg-gray-950 pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* WebGL aurora in brand green — replaces the old background video */}
      {showAurora && (
        <div aria-hidden className="absolute inset-x-0 top-0 h-[68%] opacity-35 pointer-events-none">
          <Aurora colorStops={["#062B0B", "#22F23A", "#062B0B"]} amplitude={0.75} blend={0.75} speed={0.35} />
        </div>
      )}
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

        {/* Infinite marquee: the word never clips, it drifts. 4 identical
            copies with trailing padding; -50% lands exactly on copy 3. */}
        <h1
          aria-label={t("outline")}
          className="relative -mx-4 md:-mx-8 overflow-hidden select-none animate-fade-in-up animation-delay-100"
        >
          <div aria-hidden className="marquee-track-fast flex items-center" style={{ width: "max-content" }}>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="pr-12 lg:pr-20 font-display font-bold leading-[0.85] tracking-[-0.04em] text-outline text-[clamp(64px,14vw,170px)] whitespace-nowrap"
              >
                {t("outline")}
              </span>
            ))}
          </div>
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

            {/* Risk-inversion strip: Fragor-style trust chips, except every one
                of these is contractual, not marketing copy. */}
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 animate-fade-in-up animation-delay-500">
              {trustChips.map((chip) => (
                <li key={chip} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-brand-green" strokeWidth={3} />
                  <span className="text-[13px] text-gray-300">{chip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-fade-in-up animation-delay-300">
            <ProductShowcase />
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

/** Production projects cycled by the hero carousel. Names and categories come
 *  from the portfolio translations so both stay in sync. */
const SHOWCASE_SLIDES = [
  { key: "lachola", domain: "www.lachola.ar", image: "/demos/lachola.webp" },
  { key: "gisbert", domain: "gisbertheladeras.com.ar", image: "/demos/gisbert.webp" },
  { key: "maxikiosco", domain: "maxikiosco247.com.ar", image: "/demos/maxikiosco.webp" },
  { key: "newbaby", domain: "www.newbaby.com.ar", image: "/demos/newbaby.webp" },
] as const

function ProductShowcase() {
  const t = useTranslations("hero.showcase")
  const tPortfolio = useTranslations("portfolio")
  const beforeItems = t.raw("beforeItems") as string[]
  const milestones = [t("m1"), t("m2"), t("m3")] as const

  const [active, setActive] = useState(0)

  // Fast rotation, paused while the visitor hovers the frame.
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % SHOWCASE_SLIDES.length), 2600)
    return () => clearInterval(id)
  }, [paused])

  const slide = SHOWCASE_SLIDES[active]

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-10 bg-brand-green/[0.07] blur-[100px] pointer-events-none rounded-3xl"
      />

      {/* ANTES — the mess this software replaces */}
      <div className="relative mb-4 flex items-center gap-3">
        <div className="flex-1 rounded-xl border border-gray-800 bg-gray-900/80 px-4 py-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
            {t("before")}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
            {beforeItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-xs text-gray-500 line-through decoration-gray-700">
                {item}
              </span>
            ))}
          </div>
        </div>
        <ArrowDown aria-hidden className="h-5 w-5 shrink-0 text-brand-green" strokeWidth={2.5} />
      </div>

      {/* DESPUÉS — a real product PotenciApp built, in a clean browser frame.
          Apple-style restraint: hairline border, deep shadow, faint glow. */}
      <div className="relative rounded-2xl p-px bg-gradient-to-b from-white/15 via-gray-800 to-gray-800/40 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.9),0_0_48px_-12px_rgba(34,242,58,0.18)]">
        <div className="relative overflow-hidden rounded-[15px] bg-gray-900">
          <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
            <span className="ml-3 flex items-center gap-2 truncate font-mono text-[11px] text-gray-300">
              <BrandMark size={16} />
              {slide.domain}
            </span>
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
              {t("badge")}
            </span>
          </div>

          <div
            className="relative aspect-[16/10]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* All slides stay mounted; opacity crossfades between them. */}
            {SHOWCASE_SLIDES.map((sl, i) => (
              <Image
                key={sl.key}
                src={sl.image}
                alt={tPortfolio(`items.${sl.key}.title`)}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className={`object-cover object-top transition-opacity duration-700 ease-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Legibility scrim for the caption strip */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-950/95 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div key={slide.key} className="animate-fade-in">
                <div className="font-display text-base font-semibold text-gray-100">
                  {tPortfolio(`items.${slide.key}.title`)}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-gray-300">
                  {tPortfolio(`items.${slide.key}.category`)}
                </div>
              </div>
              <div className="flex items-center gap-1.5 pb-1">
                {SHOWCASE_SLIDES.map((sl, i) => (
                  <span
                    key={sl.key}
                    aria-hidden
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-4 bg-brand-green" : "w-1 bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery milestones — one quiet strip, no boxes */}
      <div className="relative mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {milestones.map((m) => (
          <span key={m} className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-brand-green" strokeWidth={2.5} />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">{m}</span>
          </span>
        ))}
        <span aria-hidden className="hidden sm:block h-3 w-px bg-gray-800" />
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-green" strokeWidth={2.5} />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-green">
            {t("m4")}
          </span>
        </span>
      </div>

      <p className="relative mt-3 text-center text-[13px] text-gray-500">
        {t("caption")}</p>

    </div>
  )
}
