import localFont from "next/font/local"

/**
 * Self-hosted latin variable fonts, shared by every root layout.
 *
 * next/font/google fetches the CSS at build time, and Google Fonts now and then
 * answers with extensionless `/l/font?kit=` URLs that Turbopack cannot resolve
 * ("next/font/google queries have exactly one entry", vercel/next.js#99114),
 * which fails the deploy at random. Serving the files from the repo removes the
 * network from the build. Files come from fonts.gstatic.com (latin subset).
 */

export const inter = localFont({
  src: "./inter-latin.woff2",
  variable: "--font-inter",
  weight: "400 600",
  display: "swap",
})

export const spaceGrotesk = localFont({
  src: "./space-grotesk-latin.woff2",
  variable: "--font-space-grotesk",
  weight: "500 700",
  display: "swap",
})

export const jetbrainsMono = localFont({
  src: "./jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400 500",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
  adjustFontFallback: false,
})

// Editorial system (home): Unbounded for display, Inter Tight for reading.
export const unbounded = localFont({
  src: "./unbounded-latin.woff2",
  variable: "--font-unbounded",
  weight: "300 800",
  display: "swap",
})

export const interTight = localFont({
  src: "./inter-tight-latin.woff2",
  variable: "--font-inter-tight",
  weight: "400 600",
  display: "swap",
})
