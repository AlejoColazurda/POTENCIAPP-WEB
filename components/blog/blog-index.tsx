"use client"

import { useState, useMemo } from "react"
import { Search, Sparkles, Filter, Newspaper } from "lucide-react"
import type { BlogPost, BlogCategory } from "@/lib/blog/types"
import { BLOG_CATEGORIES } from "@/lib/blog/categories"
import { BlogCard } from "./blog-card"
import { ExpandedArticleModal } from "./expanded-article-modal"

interface BlogIndexProps {
  initialPosts: BlogPost[]
  locale: string
}

export function BlogIndex({ initialPosts }: BlogIndexProps) {
  const [posts] = useState<BlogPost[]>(initialPosts)
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAgentOnly, setFilterAgentOnly] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category match
      if (selectedCategory !== "all" && post.category !== selectedCategory) {
        return false
      }

      // Agent-only filter
      if (filterAgentOnly && !post.author.isAgent) {
        return false
      }

      // Search query match
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim()
        const inTitle = post.title.toLowerCase().includes(q)
        const inSummary = post.summary.toLowerCase().includes(q)
        const inTags = post.tags.some((t) => t.toLowerCase().includes(q))
        if (!inTitle && !inSummary && !inTags) return false
      }

      return true
    })
  }, [posts, selectedCategory, filterAgentOnly, searchQuery])

  const categoryKeys = Object.keys(BLOG_CATEGORIES) as BlogCategory[]

  return (
    <div className="w-full">
      {/* Header Controls: Search & Category Chips */}
      <div className="mb-10 space-y-6">
        {/* Search Bar & Quick Toggles */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema, tecnología o palabra clave..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border border-[#1A1A1A] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#22F23A] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* AI Agent Content Filter Toggle */}
          <button
            onClick={() => setFilterAgentOnly((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition shrink-0 ${
              filterAgentOnly
                ? "bg-[#22F23A]/15 border-[#22F23A] text-[#22F23A]"
                : "bg-[#111111] border-[#1A1A1A] text-gray-400 hover:text-white hover:border-gray-700"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#22F23A]" />
            <span>Creado por Agentes IA</span>
          </button>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedCategory === "all"
                ? "bg-white text-black border-white shadow-sm"
                : "bg-[#111111] text-gray-400 border-[#1A1A1A] hover:text-white hover:border-gray-700"
            }`}
          >
            Todos ({posts.length})
          </button>

          {categoryKeys.map((catKey) => {
            const cat = BLOG_CATEGORIES[catKey]
            const count = posts.filter((p) => p.category === catKey).length
            const isSelected = selectedCategory === catKey

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  isSelected
                    ? "bg-[#22F23A]/15 border-[#22F23A] text-[#22F23A]"
                    : "bg-[#111111] text-gray-400 border-[#1A1A1A] hover:text-white hover:border-gray-700"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.labelShort}</span>
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid of Articles */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <div key={post.slug} className="h-full">
              <BlogCard post={post} onSelect={setSelectedPost} />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#111111] border border-[#1A1A1A] space-y-4">
          <Newspaper className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No encontramos artículos para este filtro</h3>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            Probá quitando los filtros de búsqueda o categoría para ver todos los artículos disponibles.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all")
              setFilterAgentOnly(false)
              setSearchQuery("")
            }}
            className="px-4 py-2 rounded-xl bg-[#22F23A] text-black text-xs font-bold hover:bg-[#1AD832] transition"
          >
            Restablecer Filtros
          </button>
        </div>
      )}

      {/* Expanded Article Modal (Screen Eating Morph + Paper Crumple Swipe) */}
      <ExpandedArticleModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  )
}
