import fs from "node:fs"
import path from "node:path"
import { marked } from "marked"

/**
 * File-based blog: one Markdown file per article in content/blog/, with a
 * small `key: value` frontmatter block. Everything is read at build time —
 * pages are statically generated, so no Markdown parser ships to the browser.
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

function parse(file: string): { data: Record<string, string>; body: string } {
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

function toMeta(file: string, data: Record<string, string>, body: string): PostMeta {
  for (const key of ["title", "description", "date", "tag"]) {
    if (!data[key]) throw new Error(`content/blog/${file}: frontmatter "${key}" is required`)
  }
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    description: data.description,
    date: data.date,
    tag: data.tag,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  }
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, body } = parse(f)
      return toMeta(f, data, body)
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(BLOG_DIR, file))) return null
  const { data, body } = parse(file)
  return { ...toMeta(file, data, body), html: marked.parse(body, { async: false }) }
}

export function formatPostDate(date: string, locale: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
