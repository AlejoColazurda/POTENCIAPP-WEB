import type { ReactNode } from "react"
import { BrandWordmark } from "@/components/brand"

/**
 * Branded full-screen message for 404s and errors (site, blog and /admin), so
 * no route ever falls back to Next's default black "This page could not be
 * found". Plain markup and props only: it renders inside server not-found
 * pages, client error boundaries and the bare root not-found alike.
 */
export function StatusPage({
  code,
  eyebrow,
  title,
  body,
  actions,
  logo,
}: {
  code: string
  eyebrow: string
  title: string
  body: string
  actions: ReactNode
  /** Where the logo links to; a plain <a> so it works outside next-intl. */
  logo?: ReactNode
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F5]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22F23A]/10 blur-[140px]"
      />
      <div className="relative w-full max-w-xl text-center">
        <div className="flex justify-center">
          {logo ?? (
            <a href="/" aria-label="PotenciApp">
              <BrandWordmark size="md" />
            </a>
          )}
        </div>

        <p
          aria-hidden
          className="mt-12 select-none font-display text-[96px] font-black leading-none tracking-tighter text-transparent sm:text-[140px]"
          style={{ WebkitTextStroke: "2px #22F23A" }}
        >
          {code}
        </p>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#22F23A]">{eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#B8B8B8]">{body}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{actions}</div>
      </div>
    </main>
  )
}

export const statusPrimary =
  "inline-flex h-11 items-center gap-2 rounded-lg bg-[#22F23A] px-5 text-sm font-semibold text-black transition hover:bg-[#1AD832]"
export const statusSecondary =
  "inline-flex h-11 items-center gap-2 rounded-lg border border-[#2A2A2A] px-5 text-sm font-semibold text-[#E5E5E5] transition hover:border-[#22F23A] hover:text-white"
