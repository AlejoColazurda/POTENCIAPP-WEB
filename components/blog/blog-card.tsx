"use client"

import { useLocale, useTranslations } from "next-intl"
import { ArrowUpRight, Clock } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/lib/blog/types"
import { formatBlogDate } from "@/lib/blog/urls"
import { BlogCover } from "./cover"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const t = useTranslations("blogUi")
  const locale = useLocale()
  const authorName = post.author.name?.trim() || t("roleTeam")

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full overflow-hidden rounded-2xl border border-[#1A1A1A] bg-[#111111] shadow-lg transition-colors hover:border-[#22F23A]/50 focus-visible:outline-none",
        featured && "lg:grid lg:grid-cols-2",
      )}
    >
      <BlogCover
        src={post.coverImage}
        alt={post.title}
        className={featured ? "lg:h-full lg:min-h-[280px]" : undefined}
        imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-[#B8B8B8]">
            <span className="rounded-full border border-[#22F23A]/30 bg-[#22F23A]/10 px-3 py-1 font-semibold text-[#22F23A]">
              {t(`categories.${post.category}.short`)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              <span>{t("readingTime", { time: post.readingTime })}</span>
            </span>
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale, featured ? "long" : "short")}</time>
          </div>

          <h3
            className={cn(
              "font-display font-bold leading-snug text-[#F5F5F5] transition-colors group-hover:text-[#22F23A]",
              featured ? "text-2xl sm:text-3xl" : "mb-2.5 line-clamp-2 text-lg sm:text-xl",
            )}
          >
            {post.title}
          </h3>

          <p className={cn("mt-3 text-sm leading-relaxed text-[#B8B8B8]", featured ? "line-clamp-3" : "line-clamp-2")}>
            {post.summary}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#1A1A1A] pt-5">
          <span className="truncate text-xs font-medium text-[#B8B8B8]">{authorName}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#22F23A]">
            {t("read")}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}
