"use client"

import { motion } from "motion/react"
import { Clock, Sparkles, ArrowUpRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog/types"
import { getCategoryInfo } from "@/lib/blog/categories"

interface BlogCardProps {
  post: BlogPost
  onSelect: (post: BlogPost) => void
}

export function BlogCard({ post, onSelect }: BlogCardProps) {
  const categoryInfo = getCategoryInfo(post.category)

  return (
    <motion.article
      layoutId={`card-container-${post.slug}`}
      onClick={() => onSelect(post)}
      className="group relative flex flex-col h-full bg-[#111111] hover:bg-[#151515] rounded-2xl border border-[#1A1A1A] hover:border-[#22F23A]/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(34,242,58,0.15)] focus:outline-none focus:ring-2 focus:ring-[#22F23A]"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(post)
        }
      }}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-950">
        <motion.img
          layoutId={`card-image-${post.slug}`}
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/10"
            style={{
              backgroundColor: `${categoryInfo.color}18`,
              color: categoryInfo.color,
              borderColor: `${categoryInfo.color}40`,
            }}
          >
            {categoryInfo.labelShort}
          </span>
        </div>

        {/* Author / Agent Badge */}
        <div className="absolute top-3 right-3">
          {post.author.isAgent ? (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/70 backdrop-blur-md text-[#22F23A] border border-[#22F23A]/40">
              <Sparkles className="w-3 h-3 text-[#22F23A]" />
              <span>Agente IA</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/70 backdrop-blur-md text-gray-300 border border-white/10">
              <span>{post.author.name}</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-grow p-5 sm:p-6 justify-between">
        <div>
          {/* Metadata info */}
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{post.readingTime}</span>
            </span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </div>

          {/* Title */}
          <motion.h3
            layoutId={`card-title-${post.slug}`}
            className="text-lg sm:text-xl font-bold text-white group-hover:text-[#22F23A] transition-colors duration-200 font-display line-clamp-2 mb-2.5 leading-snug"
          >
            {post.title}
          </motion.h3>

          {/* Summary / Excerpt */}
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Bottom CTA / Author footer */}
        <div className="flex items-center justify-between pt-5 mt-4 border-t border-[#1A1A1A]">
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-700"
            />
            <span className="text-xs text-gray-300 font-medium truncate max-w-[150px]">
              {post.author.name}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-[#22F23A] group-hover:translate-x-0.5 transition-transform">
            <span>Leer</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
