import { existsSync } from "node:fs"
import { join } from "node:path"

/**
 * Locked public paths for the Higgsfield studio kit.
 * Build-time / server `existsSync` only — never fetch or generate at runtime.
 * Missing files must fall back (Aurora, `/og.png`, `#0A0A0A`); do not invent assets.
 */
export const STUDIO = {
  hero: {
    webm: "/studio/hero/por-escrito.webm",
    poster: "/studio/hero/por-escrito-poster.jpg",
    source: "/studio/hero/por-escrito.source.mp4",
  },
  plates: {
    precios: "/studio/plates/plate-precios-16x9.jpg",
    equipo: "/studio/plates/plate-equipo-16x9.jpg",
    blog: "/studio/plates/plate-blog-16x9.jpg",
  },
  covers: {
    seguridad: "/studio/covers/cover-seguridad-16x9.jpg",
    tiendas: "/studio/covers/cover-tiendas-16x9.jpg",
    resumen: "/studio/covers/cover-resumen-16x9.jpg",
  },
  og: {
    home: "/studio/og/og-home-1200x630.jpg",
    precios: "/studio/og/og-precios-1200x630.jpg",
    equipo: "/studio/og/og-equipo-1200x630.jpg",
    blog: "/studio/og/og-blog-1200x630.jpg",
  },
  frames: {
    laptop: "/studio/frames/frame-laptop-empty.png",
    phone: "/studio/frames/frame-phone-empty.png",
  },
} as const

export const FALLBACK_OG = "/og.png"

export type StudioHeroMedia = {
  poster: string | null
  video: string | null
}

const PUBLIC_DIR = join(process.cwd(), "public")

export function publicAssetExists(urlPath: string): boolean {
  if (!urlPath.startsWith("/") || urlPath.includes("..") || urlPath.includes("\\")) {
    return false
  }
  return existsSync(join(PUBLIC_DIR, urlPath.slice(1)))
}

/** Poster is required before the webm may mount. No poster → no `<video>`. */
export function getStudioHeroMedia(): StudioHeroMedia {
  const poster = publicAssetExists(STUDIO.hero.poster) ? STUDIO.hero.poster : null
  const webm = publicAssetExists(STUDIO.hero.webm) ? STUDIO.hero.webm : null
  return {
    poster,
    video: poster && webm ? webm : null,
  }
}

export type StudioOgPage = keyof typeof STUDIO.og

/** Home / precios / equipo / blog: curated JPG if present, else `/og.png`. */
export function studioOgImage(page: StudioOgPage): string {
  const src = STUDIO.og[page]
  return publicAssetExists(src) ? src : FALLBACK_OG
}

export function studioPlateSrc(page: keyof typeof STUDIO.plates): string | null {
  const src = STUDIO.plates[page]
  return publicAssetExists(src) ? src : null
}

export function studioCoverSrc(category: keyof typeof STUDIO.covers): string | null {
  const src = STUDIO.covers[category]
  return publicAssetExists(src) ? src : null
}

export function studioFrameSrc(kind: keyof typeof STUDIO.frames): string | null {
  const src = STUDIO.frames[kind]
  return publicAssetExists(src) ? src : null
}

export function studioPortraitSrc(id: string): string | null {
  if (!/^[a-z0-9-]+$/.test(id)) return null
  const src = `/studio/portraits/${id}-4x5.jpg`
  return publicAssetExists(src) ? src : null
}
