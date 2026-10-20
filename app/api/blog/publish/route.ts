import { createHash, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { z } from "zod"
import { BLOG_CATEGORIES } from "@/lib/blog/categories"
import { fileSlugs } from "@/lib/blog/service"
import { isSupabaseConfigured, serviceClient } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Ingestion endpoint for external agents and automations. It does NOT publish:
 * it leaves a draft in /admin, and a person approves it there like any AI
 * draft (Google treats unreviewed mass AI content as "scaled content abuse").
 *
 * Auth: `Authorization: Bearer <AGENT_API_SECRET>`. With the variable unset the
 * endpoint is closed; there is no default secret.
 */

const PublishSchema = z.object({
  slug: z.string().min(3).max(80).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug: minúsculas, números y guiones"),
  title: z.string().min(5).max(160),
  summary: z.string().min(10).max(200),
  content: z.string().min(200),
  category: z.enum(Object.keys(BLOG_CATEGORIES) as [string, ...string[]]).default("security"),
  tag: z.string().max(40).default("Seguridad"),
  coverImage: z.string().url().startsWith("https://").optional(),
  sources: z.array(z.object({ title: z.string().max(300), url: z.string().url() })).max(20).default([]),
})

function authorized(request: Request) {
  const secret = process.env.AGENT_API_SECRET
  if (!secret || secret.length < 24) return false
  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? ""
  // Compare fixed-length digests so the check takes the same time for any input.
  const a = createHash("sha256").update(given).digest()
  const b = createHash("sha256").update(secret).digest()
  return timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 })
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "supabase not configured" }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: "invalid JSON" }, { status: 400 })
  }
  const parsed = PublishSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "validation failed", details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const post = parsed.data
  if (fileSlugs().includes(post.slug)) {
    return NextResponse.json({ success: false, error: "slug already used by a repository article" }, { status: 409 })
  }

  const { data, error } = await serviceClient()
    .from("blog_posts")
    .insert({
      slug: post.slug,
      title: post.title,
      description: post.summary,
      body_md: post.content,
      category: post.category,
      tag: post.tag,
      cover_image: post.coverImage ?? "",
      sources: post.sources,
      status: "draft",
      origin: "ai",
      created_by: "api",
      updated_by: "api",
    })
    .select("id")
    .single()

  if (error) {
    const status = error.code === "23505" ? 409 : 500
    return NextResponse.json({ success: false, error: status === 409 ? "slug already exists" : "insert failed" }, { status })
  }

  return NextResponse.json(
    { success: true, status: "draft", id: data.id, message: "Borrador creado. Se publica cuando alguien lo aprueba en /admin." },
    { status: 201 },
  )
}
