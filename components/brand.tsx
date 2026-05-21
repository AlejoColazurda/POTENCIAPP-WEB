"use client"

import Image from "next/image"
import { Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

type Tone = "dark" | "solid" | "outline"

/**
 * BrandMark — el isologo (cohete dentro del anillo verde).
 *
 *  tone="dark"     anillo verde · centro gray-950 (default, dark mode)
 *  tone="solid"    relleno verde + cohete negro (versión "marcada", para CTAs claros)
 *  tone="outline"  solo contorno verde, transparente adentro
 */
export function BrandMark({
  size = 40,
  tone = "dark",
  className = "",
  glow = false,
  spin = false,
}: {
  size?: number
  tone?: Tone
  className?: string
  glow?: boolean
  spin?: boolean
}) {
  // outer ring thickness 15% of size
  const ringInset = Math.round(size * 0.15)

  const outerBg =
    tone === "outline" ? "transparent" : tone === "solid" ? "var(--brand-green)" : "var(--brand-green)"
  const innerBg =
    tone === "outline" ? "transparent" : tone === "solid" ? "var(--brand-green)" : "var(--gray-950)"
  const rocketColor =
    tone === "solid" ? "var(--brand-black)" : "var(--brand-green)"
  const outerBorder =
    tone === "outline" ? "2px solid var(--brand-green)" : "none"

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden",
        glow && "shadow-[0_0_24px_rgba(34,242,58,0.45)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* Outer ring */}
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: outerBg, border: outerBorder }}
      />
      {/* Inner disc */}
      <span
        className="absolute rounded-full"
        style={{
          inset: ringInset,
          background: innerBg,
        }}
      />
      {/* Rocket */}
      <Rocket
        className={cn("relative transition-transform duration-500", spin && "group-hover:rotate-12")}
        style={{
          width: size * 0.48,
          height: size * 0.48,
          color: rocketColor,
        }}
        strokeWidth={2.4}
      />
    </span>
  )
}

/**
 * BrandWordmark — wordmark oficial Potenciapp.
 * Renderiza el PNG original a resolución máxima (943×133, aspect ~7.09:1) desde
 * /public/branding/png/wordmark-{theme}-full.png — fuente única de verdad para
 * que cualquier update del asset se refleje sin tocar tamaños intermedios.
 * Convención del branding (ver public/branding/README.md):
 *   theme="dark"  → POTENCI en blanco, para fondos oscuros (default — el sitio es negro)
 *   theme="light" → POTENCI en negro, para fondos claros
 */
const WORDMARK_W = 943
const WORDMARK_H = 133

export function BrandWordmark({
  size = "md",
  theme = "dark",
  className = "",
  priority = false,
}: {
  size?: "sm" | "md" | "lg" | "xl"
  theme?: "light" | "dark"
  className?: string
  priority?: boolean
  /** Deprecated: el wordmark oficial ya incluye su composición. */
  withMark?: boolean
}) {
  const heights = { sm: 22, md: 28, lg: 40, xl: 64 } as const
  const h = heights[size]
  const w = Math.round((h * WORDMARK_W) / WORDMARK_H)
  const src = `/branding/png/wordmark-${theme}-full.png`

  return (
    <Image
      src={src}
      alt="PotenciApp"
      width={w}
      height={h}
      priority={priority}
      sizes={`${w}px`}
      className={cn("inline-block select-none", className)}
      style={{ height: h, width: "auto" }}
    />
  )
}

/**
 * BrandMarkAnimated — versión "hero" con anillo expansivo y rocket que bobblea.
 */
export function BrandMarkAnimated({
  size = 88,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Expansive ring 1 */}
      <span
        className="absolute inset-0 rounded-full border border-brand-green/40"
        style={{ animation: "ring-expand 8s ease-out infinite" }}
      />
      {/* Expansive ring 2 */}
      <span
        className="absolute inset-0 rounded-full border border-brand-green/30"
        style={{ animation: "ring-expand 8s ease-out 4s infinite" }}
      />
      <BrandMark size={size * 0.85} glow />
    </span>
  )
}
