import "server-only"
import fs from "node:fs"
import path from "node:path"
import { publicClient } from "@/lib/supabase"
import { BLOG_CATEGORIES } from "./categories"
import type { BlogCategory, BlogFilterOptions, BlogPost } from "./types"

/**
 * Single read layer for the public blog. Posts come from two places, merged:
 *
 * 1. Markdown files in content/blog/ (frontmatter `key: value`), committed to
 *    the repo.
 * 2. Published rows of the Supabase `blog_posts` table, written from /admin
 *    (including AI drafts once a person approved them). A DB post with the same
 *    slug as a file wins.
 *
 * Nothing is kept in memory between requests: serverless instances don't share
 * it and lose it on every cold start. Articles are written in Spanish; every
 * locale lists the same articles and their canonical is the Spanish URL.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

const DEFAULT_COVERS: Partial<Record<BlogCategory, string>> = {
  security: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
  news: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80",
}
const FALLBACK_COVER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80"

const TEAM_AVATAR = "/potenciapp-isologo.png"

type Source = {
  slug: string
  title: string
  summary: string
  tag: string
  category: string
  cover: string
  authorName: string
  aiAssisted: boolean
  publishedAt: string // ISO
  updatedAt?: string
  body: string
}

function asCategory(value: string | undefined): BlogCategory {
  return value && value in BLOG_CATEGORIES ? (value as BlogCategory) : "security"
}

function toPost(s: Source): BlogPost {
  const category = asCategory(s.category)
  const words = s.body.split(/\s+/).filter(Boolean).length
  return {
    slug: s.slug,
    locale: "es",
    title: s.title,
    summary: s.summary,
    content: s.body,
    coverImage: s.cover || DEFAULT_COVERS[category] || FALLBACK_COVER,
    category,
    tags: s.tag ? [s.tag] : [],
    publishedAt: s.publishedAt,
    updatedAt: s.updatedAt,
    readingTime: `${Math.max(1, Math.round(words / 200))} min`,
    author: {
      name: s.authorName || "Equipo PotenciApp",
      // Said plainly: AI drafts are only published after a person reviewed them.
      role: s.aiAssisted ? "Redactado con IA y revisado por el equipo" : "PotenciApp",
      avatar: TEAM_AVATAR,
      isAgent: false,
    },
    status: "published",
    storyCard: {
      headline: s.title.slice(0, 60).toUpperCase(),
      tagline: s.summary.slice(0, 110),
      accentColor: BLOG_CATEGORIES[category].color,
      badgeText: "⚡ POTENCIAPP",
      stickers: s.tag ? [`#${s.tag.replace(/\s+/g, "")}`] : [],
    },
  }
}

// ---------- Markdown files ----------

function parseFile(file: string): { data: Record<string, string>; body: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8").replace(/\r\n/g, "\n")
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error(`content/blog/${file}: missing frontmatter`)

  const data: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":")
    if (i === -1) continue
    data[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^"(.*)"$/, "$1")
  }
  return { data, body: match[2] }
}

function fileSources(): Source[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, body } = parseFile(file)
      for (const key of ["title", "description", "date", "tag"]) {
        if (!data[key]) throw new Error(`content/blog/${file}: frontmatter "${key}" is required`)
      }
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        summary: data.description,
        tag: data.tag,
        category: data.category ?? "security",
        cover: data.cover ?? "",
        authorName: data.author ?? "",
        aiAssisted: false,
        publishedAt: `${data.date}T12:00:00.000Z`,
        body,
      }
    })
}

/** Slugs taken by Markdown files: the admin must not reuse them by accident. */
export function fileSlugs(): string[] {
  return fileSources().map((p) => p.slug)
}

// ---------- Supabase ----------

type Row = {
  slug: string
  title: string
  description: string
  tag: string
  body_md: string
  category: string | null
  cover_image: string | null
  author_name: string | null
  origin: "manual" | "ai"
  published_at: string | null
  updated_at: string
}

async function dbSources(): Promise<Source[]> {
  const db = publicClient()
  if (!db) return []
  const { data, error } = await db.from("blog_posts").select("*").eq("status", "published")
  if (error) {
    // The site must never go down because the blog DB is unreachable.
    console.error("blog_posts read failed", error.message)
    return []
  }
  return (data as Row[]).map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.description,
    tag: r.tag,
    category: r.category ?? "security",
    cover: r.cover_image ?? "",
    authorName: r.author_name ?? "",
    aiAssisted: r.origin === "ai",
    publishedAt: r.published_at ?? r.updated_at,
    updatedAt: r.updated_at,
    body: r.body_md,
  }))
}

async function allPosts(): Promise<BlogPost[]> {
  const bySlug = new Map<string, Source>()
  for (const s of fileSources()) bySlug.set(s.slug, s)
  for (const s of await dbSources()) bySlug.set(s.slug, s)
  return [...bySlug.values()]
    .map(toPost)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// ---------- public API ----------

export async function getAllPosts(options?: BlogFilterOptions): Promise<BlogPost[]> {
  let posts = await allPosts()

  if (options?.category && options.category !== "all") {
    posts = posts.filter((p) => p.category === options.category)
  }

  if (options?.tag) {
    const tag = options.tag.toLowerCase()
    posts = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag))
  }

  if (options?.searchQuery?.trim()) {
    const q = options.searchQuery.toLowerCase().trim()
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }

  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  return (await allPosts()).find((p) => p.slug === slug) ?? null
}

export async function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 2): Promise<BlogPost[]> {
  return (await allPosts()).filter((p) => p.slug !== currentSlug && p.category === category).slice(0, limit)
}
