import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog/service"
import type { BlogCategory } from "@/lib/blog/types"

export const revalidate = 300

/** Public JSON feed of published posts (drafts never appear here). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = (searchParams.get("category") as BlogCategory | null) ?? "all"
  const tag = searchParams.get("tag") || undefined
  const searchQuery = searchParams.get("search") || undefined
  const limit = Number.parseInt(searchParams.get("limit") ?? "", 10)

  let posts = await getAllPosts({ category, tag, searchQuery })
  if (limit > 0) posts = posts.slice(0, limit)

  return NextResponse.json({ success: true, count: posts.length, posts })
}
