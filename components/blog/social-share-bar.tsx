"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Check, Copy } from "lucide-react"
import type { BlogPost } from "@/lib/blog/types"
import { blogPostUrl } from "@/lib/blog/urls"
import { whatsAppUrl } from "@/lib/site"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

interface SocialShareBarProps {
  post: BlogPost
  className?: string
}

const shareBtn =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#1A1A1A] bg-[#111111] px-3 text-sm font-medium text-[#F5F5F5] transition hover:border-[#22F23A]/40 hover:text-white"

export function SocialShareBar({ post, className = "" }: SocialShareBarProps) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations("blogUi")
  const locale = useLocale()
  const articleUrl = blogPostUrl(post.slug, locale)
  const encodedUrl = encodeURIComponent(articleUrl)

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(articleUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button type="button" onClick={handleCopyLink} className={shareBtn} title={t("copyLink")}>
        {copied ? (
          <>
            <Check className="h-4 w-4 text-[#22F23A]" aria-hidden />
            <span className="text-[#22F23A]">{t("copied")}</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" aria-hidden />
            <span>{t("copyLink")}</span>
          </>
        )}
      </button>

      <a
        href={whatsAppUrl(t("waMessage", { title: post.title }))}
        target="_blank"
        rel="noopener noreferrer"
        className={shareBtn}
      >
        <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
        <span>{t("whatsapp")}</span>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={shareBtn}
        title={t("shareOn", { network: "LinkedIn" })}
      >
        LinkedIn
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={shareBtn}
        title={t("shareOn", { network: "Facebook" })}
      >
        Facebook
      </a>
    </div>
  )
}
