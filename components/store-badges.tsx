"use client"

import { BadgeCheck } from "lucide-react"

/**
 * Store badges — App Store / Google Play.
 *
 * Marks are drawn inline (no external CDN) so they stay crisp at any size and
 * survive the CSP. The Play triangle keeps its official 4-gradient palette; the
 * Apple mark stays monochrome white, which is how Apple's own dark badge ships.
 */

function AppleMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

function PlayMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <defs>
        <linearGradient id="gp-spine" x1="12" y1="0.5" x2="2" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00A0FF" />
          <stop offset="100%" stopColor="#00E3FF" />
        </linearGradient>
        <linearGradient id="gp-tip" x1="22.3" y1="12" x2="12.6" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE000" />
          <stop offset="100%" stopColor="#FF9C00" />
        </linearGradient>
        <linearGradient id="gp-bottom" x1="14.8" y1="12.9" x2="0.6" y2="22.4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF3A44" />
          <stop offset="100%" stopColor="#C31162" />
        </linearGradient>
        <linearGradient id="gp-top" x1="2.1" y1="0.2" x2="8.4" y2="6.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#32A071" />
          <stop offset="100%" stopColor="#00E676" />
        </linearGradient>
      </defs>
      <path fill="url(#gp-spine)" d="M1.4.5a2 2 0 0 0-.4 1.2v20.6a2 2 0 0 0 .4 1.2l.1.1L13 12.1v-.2L1.5.4l-.1.1z" />
      <path fill="url(#gp-tip)" d="M16.8 15.9 13 12.1v-.2l3.8-3.8.1.1 4.5 2.6c1.3.7 1.3 1.9 0 2.6l-4.6 2.5z" />
      <path fill="url(#gp-bottom)" d="M16.9 15.8 13 12 1.4 23.5c.4.5 1.1.5 1.9.1l13.6-7.8" />
      <path fill="url(#gp-top)" d="M16.9 8.2 3.3.4C2.5-.1 1.8 0 1.4.5L13 12l3.9-3.8z" />
    </svg>
  )
}

function StoreBadge({
  mark,
  top,
  name,
  verified,
}: {
  mark: React.ReactNode
  top: string
  name: string
  verified: string
}) {
  return (
    <div className="group relative inline-flex select-none">
      {/* Gradient hairline that lights up green on hover */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gray-700 to-gray-800 opacity-80 transition-all duration-300 group-hover:from-brand-green/70 group-hover:to-brand-green/10 group-hover:opacity-100"
      />
      <div className="relative flex items-center gap-3.5 rounded-2xl bg-gray-950 pl-4 pr-5 py-3 min-w-[210px] transition-shadow duration-300 group-hover:shadow-[0_0_32px_-6px_rgba(34,242,58,0.35)]">
        <span className="flex h-8 w-8 items-center justify-center text-gray-100">{mark}</span>
        <span className="flex flex-col leading-none">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">
            {top}
          </span>
          <span className="mt-1 font-display text-lg font-semibold tracking-tight text-gray-100">
            {name}
          </span>
        </span>
        <span
          title={verified}
          className="ml-auto flex items-center text-brand-green transition-transform duration-300 group-hover:scale-110"
        >
          <BadgeCheck className="h-[18px] w-[18px]" strokeWidth={2.5} />
          <span className="sr-only">{verified}</span>
        </span>
      </div>
    </div>
  )
}

export function AppStoreBadge({ top, name, verified }: { top: string; name: string; verified: string }) {
  return <StoreBadge mark={<AppleMark className="h-7 w-7" />} top={top} name={name} verified={verified} />
}

export function PlayStoreBadge({ top, name, verified }: { top: string; name: string; verified: string }) {
  return <StoreBadge mark={<PlayMark className="h-6 w-6" />} top={top} name={name} verified={verified} />
}

export { AppleMark, PlayMark }
