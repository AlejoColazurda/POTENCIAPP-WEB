"use client"

import { useState } from "react"
import { Share2, Check, Copy, MessageSquare, Instagram } from "lucide-react"
import type { BlogPost } from "@/lib/blog/types"
import { SITE_URL } from "@/lib/site"
import { StoryExportModal } from "./story-export-modal"

interface SocialShareBarProps {
  post: BlogPost
  className?: string
}

export function SocialShareBar({ post, className = "" }: SocialShareBarProps) {
  const [copied, setCopied] = useState(false)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)

  const articleUrl = `${SITE_URL}/${post.locale}/blog/${post.slug}`
  const encodedUrl = encodeURIComponent(articleUrl)
  const encodedTitle = encodeURIComponent(post.title)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyDiscordFormat = () => {
    const discordText = `**${post.title}**\n${post.summary}\n🔗 Leer en PotenciApp: ${articleUrl}`
    navigator.clipboard.writeText(discordText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div
        className={`flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-gray-900/90 border border-gray-800 backdrop-blur-md shadow-lg ${className}`}
      >
        <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <Share2 className="w-3.5 h-3.5 text-[#22F23A]" />
          <span>Sindicación:</span>
        </div>

        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=potenciapp`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 hover:text-white transition"
          title="Compartir en Twitter / X"
        >
          <span>𝕏 Twitter</span>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 hover:text-white transition"
          title="Compartir en LinkedIn"
        >
          <span>in LinkedIn</span>
        </a>

        {/* Discord Formatter */}
        <button
          onClick={handleCopyDiscordFormat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 hover:text-white transition"
          title="Copiar texto listo para Discord"
        >
          <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
          <span>Discord</span>
        </button>

        {/* Reddit */}
        <a
          href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 hover:text-white transition"
          title="Compartir en Reddit"
        >
          <span className="text-orange-400">🔴 Reddit</span>
        </a>

        {/* Instagram / Facebook Story Exporter */}
        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/40 text-xs font-medium text-pink-300 transition"
          title="Crear Historia para Instagram y Facebook"
        >
          <Instagram className="w-3.5 h-3.5 text-pink-400" />
          <span>Publicar Historia (9:16)</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 hover:text-white transition ml-auto"
          title="Copiar enlace directo"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#22F23A]" />
              <span className="text-[#22F23A]">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Enlace</span>
            </>
          )}
        </button>
      </div>

      {/* Story Creator Modal */}
      <StoryExportModal
        post={post}
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />
    </>
  )
}
