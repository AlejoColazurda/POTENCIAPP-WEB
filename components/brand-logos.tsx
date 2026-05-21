"use client"

import Image from "next/image"

export type BrandLogo = {
  slug: string
  name: string
  /** if true, served from /public/logos/{slug}.svg (used for brands not in the CDN) */
  local?: boolean
}

export const BRAND_LOGOS: BrandLogo[] = [
  { slug: "anthropic", name: "Anthropic" },
  { slug: "openai", name: "OpenAI", local: true },
  { slug: "claude", name: "Claude" },
  { slug: "make", name: "Make", local: true },
  { slug: "n8n", name: "n8n" },
  { slug: "zapier", name: "Zapier" },
  { slug: "vercel", name: "Vercel" },
  { slug: "supabase", name: "Supabase" },
  { slug: "stripe", name: "Stripe" },
  { slug: "shopify", name: "Shopify" },
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "react", name: "React" },
]

/**
 * Logo de marca conocida. CDN tints externos (cdn.simpleicons.org/{slug}/{hex})
 * o SVG local en /public/logos/{slug}.svg (color via CSS filter).
 */
export function BrandLogo({ logo }: { logo: BrandLogo }) {
  if (logo.local) {
    return (
      <div
        className="inline-flex items-center gap-3 shrink-0 group/logo cursor-default select-none px-2"
        title={logo.name}
      >
        {/* Local SVG: monochrome black source, filter to brand gray then white on hover */}
        <Image
          src={`/logos/${logo.slug}.svg`}
          alt={logo.name}
          width={32}
          height={32}
          unoptimized
          className="h-7 lg:h-8 w-auto opacity-75 group-hover/logo:opacity-100 transition-all duration-300"
          style={{
            filter:
              "invert(46%) sepia(0%) saturate(0%) hue-rotate(190deg) brightness(95%) contrast(85%)",
          }}
        />
        <span className="font-display font-semibold text-base lg:text-lg text-gray-500 group-hover/logo:text-gray-100 transition-colors duration-300 whitespace-nowrap">
          {logo.name}
        </span>
      </div>
    )
  }

  return (
    <div
      className="inline-flex items-center gap-3 shrink-0 group/logo cursor-default select-none px-2"
      title={logo.name}
    >
      <Image
        src={`https://cdn.simpleicons.org/${logo.slug}/6b6b6b`}
        alt={logo.name}
        width={32}
        height={32}
        unoptimized
        className="h-7 lg:h-8 w-auto opacity-80 group-hover/logo:opacity-100 group-hover/logo:brightness-[2.4] group-hover/logo:contrast-[1.3] transition-all duration-300"
      />
      <span className="font-display font-semibold text-base lg:text-lg text-gray-500 group-hover/logo:text-gray-100 transition-colors duration-300 whitespace-nowrap">
        {logo.name}
      </span>
    </div>
  )
}
