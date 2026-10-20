"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface BlogCoverProps {
  src?: string
  alt: string
  className?: string
  imgClassName?: string
  /** Shown on the branded cover when the post has no image (or it fails to load). */
  label?: string
  /** Category accent color for the branded cover. */
  color?: string
}

/**
 * Article cover. Posts without an uploaded image get a branded cover instead
 * of a stock photo or an empty box: PotenciApp isotype, category color and
 * label. An image set from /admin (cover_image) always wins.
 */
export function BlogCover({ src, alt, className, imgClassName, label, color = "#22F23A" }: BlogCoverProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className={cn("relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[#0D0D0D]", className)}>
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={cn("h-full w-full object-cover", imgClassName)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={cn("absolute inset-0 flex items-end p-5 sm:p-6", imgClassName)}
          style={{
            backgroundImage: [
              `radial-gradient(ellipse 70% 90% at 85% 15%, ${color}33, transparent 60%)`,
              `radial-gradient(ellipse 50% 60% at 10% 110%, ${color}1f, transparent 70%)`,
              "linear-gradient(#ffffff08 1px, transparent 1px)",
              "linear-gradient(90deg, #ffffff08 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "100% 100%, 100% 100%, 28px 28px, 28px 28px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/branding/png/isotipo-dark-512.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 h-[70%] w-auto opacity-[0.14]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/branding/png/isotipo-dark-256.png"
            alt=""
            aria-hidden
            className="absolute left-5 top-5 h-9 w-9 sm:left-6 sm:top-6 sm:h-10 sm:w-10"
          />
          {label && (
            <span
              className="relative font-mono text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color }}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
