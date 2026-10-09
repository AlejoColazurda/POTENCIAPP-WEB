import fs from "node:fs"
import path from "node:path"
import { Marked } from "marked"
import { publicClient } from "@/lib/supabase"

/**
 * Blog content comes from two places, merged:
 *
 * 1. Markdown files in content/blog/ (frontmatter `key: value`), committed to
 *    the repo.
 * 2. Published rows of the Supabase `blog_posts` table, written from /admin
 *    (including AI drafts once approved). A DB post with the same slug as a
 *    file wins.
 *
 * Articles are written in Spanish; the /en, /pt and /fr blog routes list the
 * same articles and point their canonical at the Spanish URL.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  tag: string
  readingMinutes: number
}

export type Post = PostMeta & { html: string }

// Raw HTML in Markdown is escaped, never rendered: DB posts can carry text an
// AI drafted from third-party pages, so nothing in them may become markup.
const md = new Marked({
  renderer: {
    html({ text }) {
      return escapeHtml(text)
    },
  },
})

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export function renderMarkdown(body: string): string {
  const html = md.parse(body, { async: false })
  // Links to other sites open in a new tab and pass no referrer/opener.
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"')
}

function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 200))
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

function filePosts(): (PostMeta & { body: string })[] {
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
        description: data.description,
        date: data.date,
        tag: data.tag,
        readingMinutes: readingMinutes(body),
        body,
      }
    })
}

// ---------- Supabase ----------

type Row = {
  slug: string
  title: string
  description: string
  tag: string
  body_md: string
  published_at: string | null
}

async function dbPosts(): Promise<(PostMeta & { body: string })[]> {
  const db = publicClient()
  if (!db) return []
  const { data, error } = await db
    .from("blog_posts")
    .select("slug,title,description,tag,body_md,published_at")
    .eq("status", "published")
  if (error) {
    // The site must never go down because the blog DB is unreachable.
    console.error("blog_posts read failed", error.message)
    return []
  }
  return (data as Row[]).map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    tag: r.tag,
    date: (r.published_at ?? new Date().toISOString()).slice(0, 10),
    readingMinutes: readingMinutes(r.body_md),
    body: r.body_md,
  }))
}

async function allWithBody() {
  const bySlug = new Map<string, PostMeta & { body: string }>()
  for (const p of filePosts()) bySlug.set(p.slug, p)
  for (const p of await dbPosts()) bySlug.set(p.slug, p)
  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date))
}

export async function getAllPosts(): Promise<PostMeta[]> {
  return (await allWithBody()).map(({ body: _body, ...meta }) => meta)
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  const post = (await allWithBody()).find((p) => p.slug === slug)
  if (!post) return null
  const { body, ...meta } = post
  return { ...meta, html: renderMarkdown(body) }
}

/** Slugs taken by Markdown files: the admin must not reuse them by accident. */
export function fileSlugs(): string[] {
  return filePosts().map((p) => p.slug)
}

export function formatPostDate(date: string, locale: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
