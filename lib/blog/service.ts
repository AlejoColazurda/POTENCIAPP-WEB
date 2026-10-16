import type { BlogPost, BlogFilterOptions, BlogCategory } from "./types"
import { SEED_BLOG_POSTS } from "./data/seed-posts"

// In-memory runtime cache for dynamically added posts by AI Agents or API ingestion
let runtimePosts: BlogPost[] = [...SEED_BLOG_POSTS]

export async function getAllPosts(options?: BlogFilterOptions): Promise<BlogPost[]> {
  let posts = [...runtimePosts]

  if (options?.locale) {
    posts = posts.filter((p) => p.locale === options.locale || !p.locale)
  }

  if (options?.category && options.category !== "all") {
    posts = posts.filter((p) => p.category === options.category)
  }

  if (options?.tag) {
    posts = posts.filter((p) => p.tags.map((t) => t.toLowerCase()).includes(options.tag!.toLowerCase()))
  }

  if (options?.searchQuery && options.searchQuery.trim().length > 0) {
    const q = options.searchQuery.toLowerCase().trim()
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  // Sort descending by date
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getPostBySlug(slug: string, locale?: string): Promise<BlogPost | null> {
  const post = runtimePosts.find((p) => p.slug === slug)
  if (!post) return null
  return post
}

export async function getFeaturedPost(locale?: string): Promise<BlogPost | null> {
  const posts = await getAllPosts({ locale: locale as any })
  const featured = posts.find((p) => p.featured)
  return featured || posts[0] || null
}

export async function savePostFromAgent(newPost: BlogPost): Promise<{ success: boolean; post: BlogPost }> {
  // If post with same slug exists, update it; otherwise prepend it
  const existingIndex = runtimePosts.findIndex((p) => p.slug === newPost.slug)
  if (existingIndex >= 0) {
    runtimePosts[existingIndex] = {
      ...runtimePosts[existingIndex],
      ...newPost,
      updatedAt: new Date().toISOString(),
    }
  } else {
    runtimePosts.unshift(newPost)
  }
  return { success: true, post: newPost }
}

export async function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 2): Promise<BlogPost[]> {
  return runtimePosts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit)
}
