"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { PublicMember } from "@/lib/equipo/types"

export function EquipoMedia({
  member,
  variant = "card",
}: {
  member: PublicMember
  variant?: "card" | "teaser"
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const showPhoto = Boolean(member.photoSrc) && !imgFailed
  const isCard = variant === "card"

  return (
    <div
      className={cn(
        "bg-[#111111]",
        isCard ? "relative aspect-[4/5] w-full overflow-hidden" : "size-14 overflow-hidden rounded-full",
      )}
    >
      {showPhoto ? (
        // Native img so a 404 falls back to initials; no remote avatars.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photoSrc ?? ""}
          alt={member.name}
          className="h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          role="img"
          aria-label={member.name}
        >
          <span
            className={cn(
              "font-display font-bold text-[#22F23A]",
              isCard ? "text-5xl lg:text-6xl" : "text-lg",
            )}
          >
            {member.initials}
          </span>
        </div>
      )}
    </div>
  )
}
