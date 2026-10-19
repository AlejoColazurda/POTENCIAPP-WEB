import "server-only"
import fs from "node:fs"
import path from "node:path"
import { routing, type Locale } from "@/i18n/routing"
import { publicClient } from "@/lib/supabase"
import { BLOG_CATEGORIES } from "./categories"
import type { BlogCategory, BlogFilterOptions, BlogPost } from "./types"

/**
 * Single read layer for the public blog. Posts come from two places, merged:
 *
 * 1. Markdown files in content/blog/: `<slug>.md` is the Spanish original and
 *    `<slug>.<en|pt|fr>.md` its translations (same frontmatter keys).
 * 2. Published rows of the Supabase `blog_posts` table, written from /admin,
 *    plus their rows in `blog_post_translations`. A DB post with the same slug
 *    as a file wins.
 *
 * Every function takes the locale to read in. A post without a translation for
 * that locale comes back in Spanish with `translated: false`, so the page can
 * say so and point its canonical at the Spanish URL.
 *
 * Nothing is kept in memory between requests: serverless instances don't share
 * it and lose it on every cold start.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog")
const TRANSLATED_LOCALES = routing.locales.filter((l) => l !== "es")

const DEFAULT_COVERS: Partial<Record<BlogCategory, string>> = {
  security: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
  news: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80",
}
const FALLBACK_COVER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80"

const TEAM_AVATAR = "/potenciapp-isologo.png"
const DEFAULT_AUTHOR = "Equipo PotenciApp"
const TEAM_NAME: Record<Locale, string> = {
  es: DEFAULT_AUTHOR,
  en: "PotenciApp team",
  pt: "Equipe PotenciApp",
  fr: "Équipe PotenciApp",
}

type Text = { title: string; summary: string; body: string }

type Source = Text & {
  slug: string
  tag: string
  category: string
  cover: string
  authorName: string
  aiAssisted: boolean
  publishedAt: string // ISO
  updatedAt?: string
  translations: Partial<Record<Locale, Text>>
}

function asCategory(value: string | undefined): BlogCategory {
  return value && value in BLOG_CATEGORIES ? (value as BlogCategory) : "security"
}

function toPost(s: Source, locale: Locale): BlogPost {
  const category = asCategory(s.category)
  const translation = locale === "es" ? undefined : s.translations[locale]
  const text = translation ?? s
  const words = text.body.split(/\s+/).filter(Boolean).length
  return {
    slug: s.slug,
    locale: translation ? locale : "es",
    title: text.title,
    summary: text.summary,
    content: text.body,
    coverImage: s.cover || DEFAULT_COVERS[category] || FALLBACK_COVER,
    category,
    tags: s.tag ? [s.tag] : [],
    publishedAt: s.publishedAt,
    updatedAt: s.updatedAt,
    readingTime: `${Math.max(1, Math.round(words / 200))} min`,
    author: {
      // The default byline is translated; a person's name is shown as is.
      name: !s.authorName || s.authorName === DEFAULT_AUTHOR ? TEAM_NAME[locale] : s.authorName,
      // Components show the translated role from `aiAssisted`; this is the fallback.
      role: s.aiAssisted ? "Redactado con IA y revisado por el equipo" : "PotenciApp",
      avatar: TEAM_AVATAR,
      isAgent: false,
    },
    status: "published",
    translated: locale === "es" || Boolean(translation),
    availableLocales: ["es", ...TRANSLATED_LOCALES.filter((l) => s.translations[l])],
    aiAssisted: s.aiAssisted,
    storyCard: {
      headline: text.title.slice(0, 60).toUpperCase(),
      tagline: text.summary.slice(0, 110),
      accentColor: BLOG_CATEGORIES[category].color,
      badgeText: "⚡ POTENCIAPP",
      stickers: s.tag ? [`#${s.tag.replace(/\s+/g, "")}`] : [],
    },
  }
}

// ---------- Markdown files ----------

const FILE_RE = /^([a-z0-9]+(?:-[a-z0-9]+)*)(?:\.(en|pt|fr))?\.md$/

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
  const files = fs.readdirSync(BLOG_DIR).filter((f) => FILE_RE.test(f))
  const originals = new Map<string, Source>()

  for (const file of files.filter((f) => !f.match(FILE_RE)![2])) {
    const { data, body } = parseFile(file)
    for (const key of ["title", "description", "date", "tag"]) {
      if (!data[key]) throw new Error(`content/blog/${file}: frontmatter "${key}" is required`)
    }
    const slug = file.match(FILE_RE)![1]
    originals.set(slug, {
      slug,
      title: data.title,
      summary: data.description,
      body,
      tag: data.tag,
      category: data.category ?? "security",
      cover: data.cover ?? "",
      authorName: data.author ?? "",
      aiAssisted: false,
      publishedAt: `${data.date}T12:00:00.000Z`,
      translations: {},
    })
  }

  for (const file of files) {
    const [, slug, locale] = file.match(FILE_RE)!
    const original = originals.get(slug)
    if (!locale || !original) continue
    const { data, body } = parseFile(file)
    if (!data.title) throw new Error(`content/blog/${file}: frontmatter "title" is required`)
    original.translations[locale as Locale] = { title: data.title, summary: data.description ?? "", body }
  }
  return [...originals.values()]
}

/** Slugs taken by Markdown files: the admin must not reuse them by accident. */
export function fileSlugs(): string[] {
  return fileSources().map((p) => p.slug)
}

// ---------- Supabase ----------

type Row = {
  id: string
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

type TranslationRow = { post_id: string; locale: Locale; title: string; description: string; body_md: string }

async function dbSources(): Promise<Source[]> {
  const db = publicClient()
  if (!db) return []
  const [posts, translations] = await Promise.all([
    db.from("blog_posts").select("*").eq("status", "published"),
    db.from("blog_post_translations").select("post_id,locale,title,description,body_md"),
  ])
  if (posts.error) {
    // The site must never go down because the blog DB is unreachable.
    console.error("blog_posts read failed", posts.error.message)
    return []
  }
  // Missing table (migration 004 not run yet) only means no translations.
  if (translations.error) console.error("blog_post_translations read failed", translations.error.message)

  const byPost = new Map<string, Partial<Record<Locale, Text>>>()
  for (const t of (translations.data ?? []) as TranslationRow[]) {
    const entry = byPost.get(t.post_id) ?? {}
    entry[t.locale] = { title: t.title, summary: t.description, body: t.body_md }
    byPost.set(t.post_id, entry)
  }

  return (posts.data as Row[]).map((r) => ({
    slug: r.slug,
    title: r.title,
    summary: r.description,
    body: r.body_md,
    tag: r.tag,
    category: r.category ?? "security",
    cover: r.cover_image ?? "",
    authorName: r.author_name ?? "",
    aiAssisted: r.origin === "ai",
    publishedAt: r.published_at ?? r.updated_at,
    updatedAt: r.updated_at,
    translations: byPost.get(r.id) ?? {},
  }))
}

async function allSources(): Promise<Source[]> {
  const bySlug = new Map<string, Source>()
  for (const s of fileSources()) bySlug.set(s.slug, s)
  for (const s of await dbSources()) bySlug.set(s.slug, s)
  return [...bySlug.values()].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

function asLocale(value: string | undefined): Locale {
  return routing.locales.includes(value as Locale) ? (value as Locale) : "es"
}

// ---------- public API ----------

export async function getAllPosts(options?: BlogFilterOptions): Promise<BlogPost[]> {
  const locale = asLocale(options?.locale)
  let posts = (await allSources()).map((s) => toPost(s, locale))

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

export async function getPostBySlug(slug: string, locale?: string): Promise<BlogPost | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  const source = (await allSources()).find((p) => p.slug === slug)
  return source ? toPost(source, asLocale(locale)) : null
}

export async function getRelatedPosts(
  currentSlug: string,
  category: BlogCategory,
  locale?: string,
  limit = 2,
): Promise<BlogPost[]> {
  return (await getAllPosts({ locale: asLocale(locale), category })).filter((p) => p.slug !== currentSlug).slice(0, limit)
}
