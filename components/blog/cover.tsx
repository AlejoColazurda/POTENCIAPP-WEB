"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface BlogCoverProps {
  src?: string
  alt: string
  className?: string
  imgClassName?: string
}

export function BlogCover({ src, alt, className, imgClassName }: BlogCoverProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className={cn("relative aspect-[16/9] w-full overflow-hidden bg-[#111111]", className)}>
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={cn("h-full w-full object-cover", imgClassName)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="h-full w-full bg-[#111111]" role="img" aria-label={alt} />
      )}
    </div>
  )
}
