import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog/service"
import type { BlogCategory } from "@/lib/blog/types"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") as BlogCategory | null
    const tag = searchParams.get("tag") || undefined
    const search = searchParams.get("search") || undefined
    const locale = (searchParams.get("locale") as any) || "es"
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined

    let posts = await getAllPosts({
      category: category || "all",
      tag,
      searchQuery: search,
      locale,
    })

    if (limit && limit > 0) {
      posts = posts.slice(0, limit)
    }

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts,
      documentation: "https://www.potenciapp.com/api/blog/publish",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}
