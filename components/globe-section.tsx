"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"
import { useTranslations } from "next-intl"

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [-34.6037, -58.3816], size: 0.14 }, // Buenos Aires
  { location: [40.4168, -3.7038], size: 0.12 },   // Madrid
  { location: [-23.5505, -46.6333], size: 0.1 },  // São Paulo
  { location: [19.4326, -99.1332], size: 0.09 },  // CDMX
  { location: [40.7128, -74.006], size: 0.1 },    // NYC
  { location: [4.711, -74.0721], size: 0.07 },    // Bogotá
  { location: [-12.0464, -77.0428], size: 0.07 }, // Lima
  { location: [-33.4489, -70.6693], size: 0.07 }, // Santiago
  { location: [48.8566, 2.3522], size: 0.08 },    // Paris
]

export function GlobeSection() {
  const t = useTranslations("globe")

  return (
    <section className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800 overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full bg-brand-green/[0.06] blur-[160px] pointer-events-none"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {t("eyebrow")}
              </span>
            </span>

            <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.02em] text-gray-100">
              {t("title")} <span className="text-brand-green">{t("accent")}</span>
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-[480px] leading-relaxed">
              {t("subtitle")}
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {(["s1", "s2", "s3"] as const).map((k) => (
                <div key={k}>
                  <dt className="font-display font-bold text-3xl lg:text-4xl text-gray-100 tracking-tight">
                    {t(`stats.${k}.value`)}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gray-500">
                    {t(`stats.${k}.label`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * cobe v2: caller drives the animation loop via globe.update().
 * Square aspect ratio, ResizeObserver-driven width, infinite slow phi rotation.
 */
function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let phi = 0
    let width = canvas.offsetWidth

    const onResize = () => {
      width = canvas.offsetWidth
    }
    window.addEventListener("resize", onResize)

    // ResizeObserver catches container reflows the resize event misses
    const ro = new ResizeObserver(() => onResize())
    ro.observe(canvas)

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [34 / 255, 242 / 255, 58 / 255],
      glowColor: [0.15, 0.15, 0.15],
      markers: MARKERS,
    })

    let raf = 0
    const tick = () => {
      if (!pointerInteracting.current) {
        phi += 0.003
      }
      globe.update({
        phi: phi + pointerInteractionMovement.current / 200,
        width: width * 2,
        height: width * 2,
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Fade in once we have at least one frame painted
    const fadeIn = window.setTimeout(() => {
      canvas.style.opacity = "1"
    }, 50)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fadeIn)
      globe.destroy()
      ro.disconnect()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 560,
        aspectRatio: "1",
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = "grab"
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = "grab"
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  )
}
