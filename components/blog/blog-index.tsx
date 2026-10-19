"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { Search } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { whatsAppUrl } from "@/lib/site"
import { PUBLIC_BLOG_CATEGORIES } from "@/lib/blog/categories"
import type { BlogCategory, BlogPost } from "@/lib/blog/types"
import { BlogCard } from "./blog-card"

interface BlogIndexProps {
  initialPosts: BlogPost[]
  locale: string
}

export function BlogIndex({ initialPosts }: BlogIndexProps) {
  const t = useTranslations("blogUi")
  const tBlog = useTranslations("blog")
  const tNav = useTranslations("nav")
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      if (selectedCategory !== "all" && post.category !== selectedCategory) {
        return false
      }

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim()
        const inTitle = post.title.toLowerCase().includes(q)
        const inSummary = post.summary.toLowerCase().includes(q)
        const inTags = post.tags.some((tag) => tag.toLowerCase().includes(q))
        if (!inTitle && !inSummary && !inTags) return false
      }

      return true
    })
  }, [initialPosts, selectedCategory, searchQuery])

  const categoryKeys = PUBLIC_BLOG_CATEGORIES.filter((key) =>
    initialPosts.some((post) => post.category === key),
  )

  const featured =
    filteredPosts.find((post) => post.featured) ?? filteredPosts[0] ?? null
  const rest = featured ? filteredPosts.filter((post) => post.slug !== featured.slug) : []

  if (initialPosts.length === 0) {
    return (
      <Empty className="rounded-2xl border border-[#1A1A1A] bg-[#111111]">
        <EmptyHeader>
          <EmptyTitle className="text-[#F5F5F5]">{t("emptyCatalogTitle")}</EmptyTitle>
          <EmptyDescription className="text-[#B8B8B8]">{t("emptyCatalogBody")}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="min-h-11 bg-[#22F23A] text-black hover:bg-[#1AD832]">
              <Link href="/#contacto">{tNav("ctaLong")}</Link>
            </Button>
            <Button asChild variant="outline" className="min-h-11 border-[#1A1A1A] text-[#F5F5F5]">
              <a href={whatsAppUrl(tBlog("waGreeting"))} target="_blank" rel="noopener noreferrer">
                {t("whatsapp")}
              </a>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-10 space-y-6">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B8B8B8]" aria-hidden />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-11 min-h-11 w-full rounded-xl border-[#1A1A1A] bg-[#111111] pl-10 text-[#F5F5F5] placeholder:text-[#B8B8B8]"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 inline-flex h-11 min-w-11 -translate-y-1/2 items-center justify-center text-sm text-[#B8B8B8] hover:text-[#F5F5F5]"
            >
              {t("clear")}
            </button>
          ) : null}
        </div>

        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-xl border px-4 text-sm font-semibold transition ${
              selectedCategory === "all"
                ? "border-[#22F23A] bg-[#22F23A] text-black"
                : "border-[#1A1A1A] bg-[#111111] text-[#B8B8B8] hover:text-[#F5F5F5]"
            }`}
          >
            {t("all")}
          </button>

          {categoryKeys.map((catKey) => {
            const isSelected = selectedCategory === catKey
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-xl border px-4 text-sm font-semibold transition ${
                  isSelected
                    ? "border-[#22F23A] bg-[#22F23A] text-black"
                    : "border-[#1A1A1A] bg-[#111111] text-[#B8B8B8] hover:text-[#F5F5F5]"
                }`}
              >
                {t(`categories.${catKey}.short`)}
              </button>
            )
          })}
        </div>
      </div>

      {filteredPosts.length > 0 && featured ? (
        <div className="space-y-8">
          <BlogCard post={featured} featured />
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <Empty className="rounded-2xl border border-[#1A1A1A] bg-[#111111]">
          <EmptyHeader>
            <EmptyTitle className="text-[#F5F5F5]">{t("emptyTitle")}</EmptyTitle>
            <EmptyDescription className="text-[#B8B8B8]">{t("emptyBody")}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              type="button"
              onClick={() => {
                setSelectedCategory("all")
                setSearchQuery("")
              }}
              className="min-h-11 bg-[#22F23A] text-black hover:bg-[#1AD832]"
            >
              {t("resetFilters")}
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
