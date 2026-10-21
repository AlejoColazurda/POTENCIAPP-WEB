"use client"

import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { Line, Reveal } from "@/components/editorial/reveal"
import { BrandMark } from "@/components/brand"

/**
 * Editorial hero. The headline is the protagonist: three designed lines on a
 * 12-column grid, the last one underlined by the brand-green highlighter.
 * A real production site (La Chola) sits as a cropped plate the headline
 * runs into. One primary CTA, one quiet text link. POTENCIAMOS keeps drifting
 * as an outlined band at the foot (it must stay an infinite marquee).
 */
export function HeroSection() {
  const t = useTranslations("hero")
  const te = useTranslations("editorial")
  const tp = useTranslations("portfolio")
  const lines = te.raw("titleLines") as string[]
  const trust = t.raw("trustChips") as string[]

  return (
    <section className="relative bg-gray-950 text-gray-100 pt-16 lg:pt-20 overflow-hidden">
      <HeroBackdrop />

      {/* Meta row — the studio's colophon */}
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-8">
        <Reveal immediate className="ed-rise grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-1 border-b border-gray-800 py-4">
          <p className="ed-label text-gray-100 md:col-span-4">PotenciApp® — {te("studio")}</p>
          <p className="ed-label text-gray-400 md:col-span-4">{te("place")}</p>
          <p className="ed-label text-gray-400 col-span-2 md:col-span-4 md:text-right flex md:justify-end items-center gap-2">
            <span aria-hidden className="inline-block h-2 w-2 bg-brand-green" />
            {t("statusBadge")}
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="relative grid grid-cols-12 gap-x-6 pt-10 lg:pt-14">
          {/* Showcase: the strongest production sites, in a browser frame,
              crossfading. Desktop: pinned to the right of the headline. */}
          <Reveal
            immediate
            as="figure"
            className="relative col-span-12 order-2 mt-10 md:col-span-5 md:col-start-8 md:mt-0 md:row-start-1 md:self-end lg:order-none"
          >
            <HeroShowcase />
          </Reveal>

          <Reveal immediate as="div" className="relative z-10 col-span-12 md:col-span-7 md:row-start-1 md:self-end">
            <h1 className="font-ed-display font-bold uppercase text-gray-100 leading-[0.88] tracking-[-0.045em] text-[clamp(36px,10.2vw,60px)] md:text-[clamp(40px,5.6vw,64px)] lg:text-[clamp(64px,5.6vw,92px)] md:whitespace-nowrap">
              {lines.map((line, i) => (
                <Line key={line} i={i}>
                  {i === lines.length - 1 ? (
                    <span className="ed-mark">{line}</span>
                  ) : (
                    <span className={i === 1 ? "lg:pl-[1.1em]" : undefined}>{line}</span>
                  )}
                </Line>
              ))}
            </h1>
          </Reveal>
        </div>

        {/* Below the headline: lead, the contract terms, the one CTA */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 pt-12 pb-16 lg:pt-16 lg:pb-24">
          <Reveal immediate className="ed-rise col-span-12 md:col-span-6 lg:col-span-4" style={{ ["--i" as string]: 3 }}>
            <p
              className="font-ed-sans text-lg lg:text-xl leading-[1.45] text-gray-300 [&_strong]:font-semibold [&_strong]:text-gray-100"
              dangerouslySetInnerHTML={{
                __html: t.raw("subheading").replace(/<bold>/g, "<strong>").replace(/<\/bold>/g, "</strong>"),
              }}
            />
          </Reveal>

          <Reveal immediate className="ed-rise col-span-12 md:col-span-6 lg:col-span-3 lg:col-start-6" style={{ ["--i" as string]: 4 }}>
            <ol className="border-t border-gray-100/35">
              {trust.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 border-b border-gray-800 py-2.5">
                  <span className="ed-label text-gray-400 w-6 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-ed-sans text-[15px] text-gray-100">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal immediate className="ed-rise col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-end" style={{ ["--i" as string]: 5 }}>
            <a
              href="#contacto"
              className="group flex items-center justify-between gap-6 bg-brand-green px-6 py-6 text-ink transition-colors duration-300 hover:bg-green-hover"
            >
              <span className="font-ed-display text-xl lg:text-2xl font-semibold tracking-[-0.02em]">
                {t("ctaPrimary")}
              </span>
              <ArrowRight
                className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </a>
            <a href="#proyectos" className="mt-4 self-start font-ed-sans text-[15px] text-gray-100 ed-link">
              {t("ctaSecondary")} →
            </a>
          </Reveal>
        </div>

        {/* Figures, set like a table of record — both trace to real work */}
        <Reveal className="grid grid-cols-1 sm:grid-cols-3 border-t border-gray-100/35">
          {(["m1", "m2", "m3"] as const).map((k, i) => (
            <div
              key={k}
              className={`ed-rise py-6 lg:py-8 pr-4 border-b border-gray-800 sm:border-b-0 ${i > 0 ? "sm:border-l sm:border-gray-800 sm:pl-6" : ""}`}
              style={{ ["--i" as string]: i }}
            >
              <div className="font-ed-display text-4xl lg:text-5xl font-medium tracking-[-0.04em] text-gray-100 tabular-nums">
                {t(`metrics.${k}.value`)}
              </div>
              <div className="ed-label mt-2 text-gray-400">{t(`metrics.${k}.label`)}</div>
            </div>
          ))}
        </Reveal>
      </div>

      {/* POTENCIAMOS — outlined, drifting, full bleed */}
      <div aria-hidden className="border-y border-gray-800 mt-0 overflow-hidden select-none py-3 lg:py-5 bg-gray-950">
        <div className="marquee-track flex items-center" style={{ width: "max-content" }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="ed-outline pr-10 lg:pr-16 font-ed-display font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(56px,11vw,180px)] whitespace-nowrap"
            >
              {t("outline")}
              <span className="inline-block align-middle mx-6 lg:mx-10 h-[0.18em] w-[0.18em] bg-brand-green [-webkit-text-stroke:0]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Production sites worth leading with. Titles/categories come from the portfolio messages. */
const SHOWCASE = [
  { key: "maxikiosco", domain: "maxikiosco247.com.ar", url: "https://maxikiosco247.com.ar", image: "/demos/maxikiosco.webp" },
  { key: "losincreibles", domain: "losincreibles.com.ar", url: "https://www.losincreibles.com.ar", image: "/demos/losincreibles.webp" },
  { key: "gisbert", domain: "gisbertheladeras.com.ar", url: "https://www.gisbertheladeras.com.ar", image: "/demos/gisbert.webp" },
  { key: "newbaby", domain: "newbaby.com.ar", url: "https://www.newbaby.com.ar", image: "/demos/newbaby.webp" },
] as const

function HeroShowcase() {
  const t = useTranslations("hero.showcase")
  const te = useTranslations("editorial")
  const tp = useTranslations("portfolio")
  const [active, setActive] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Reduced motion: no reel, the poster still stands.
  useEffect(() => {
    const v = videoRef.current
    if (v && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause()
      v.removeAttribute("autoplay")
    }
  }, [])

  const slide = SHOWCASE[active]

  return (
    <>
      <div
        className="ed-mask relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span className="ml-3 flex min-w-0 items-center gap-2 truncate ed-label text-gray-300">
            <BrandMark size={14} />
            {slide.domain}
          </span>
          <span className="ml-auto flex items-center gap-1.5 ed-label text-brand-green">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
            {t("badge")}
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-gray-900">
          {/* Poster = first still; the reel takes over once it can play. */}
          <Image
            src={SHOWCASE[0].image}
            alt={tp(`items.${SHOWCASE[0].key}.title`)}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover object-top"
          />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden
            onTimeUpdate={(e) => {
              // "playing" can fire before hydration (autoplay in SSR HTML), so the
              // reveal is also armed here, on the first frames.
              e.currentTarget.setAttribute("data-ready", "true")
              // Keep the caption in step with the reel (4.5 s per site, 0.7 s crossfades).
              const i = Math.min(SHOWCASE.length - 1, Math.floor((e.currentTarget.currentTime + 0.35) / 3.8))
              if (i !== active) setActive(i)
            }}
            onPlaying={(e) => e.currentTarget.setAttribute("data-ready", "true")}
          >
            <source src="/videos/showcase-reel.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-gray-800 pt-2">
        <span className="ed-label text-gray-100">
          {te("fig")} {String(active + 1).padStart(2, "0")} — {tp(`items.${slide.key}.title`)}
        </span>
        <a
          href={slide.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ed-label ed-link inline-flex shrink-0 items-center gap-1 text-gray-400 hover:text-gray-100"
        >
          {slide.domain} <ArrowUpRight className="h-3 w-3" />
        </a>
      </figcaption>
    </>
  )
}

/**
 * Hero backdrop: the Remotion-rendered brand loop (grid, particles, outlined
 * POTENCIAMOS) at low opacity. Only attached on desktop with motion allowed,
 * and only after mount, so phones never download the 1.4 MB file.
 */
function HeroBackdrop() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const ok = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches
    if (!ok) return
    v.src = "/videos/hero-bg.mp4"
    v.play().catch(() => {})
  }, [])
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[78%]">
      <video
        ref={ref}
        className="h-full w-full object-cover opacity-0 transition-opacity duration-[1500ms] data-[ready=true]:opacity-60"
        muted
        loop
        playsInline
        preload="none"
        onTimeUpdate={(e) => e.currentTarget.setAttribute("data-ready", "true")}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/55 to-gray-950" />
    </div>
  )
}
