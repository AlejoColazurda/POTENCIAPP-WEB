import { NextResponse } from "next/server"
import { z } from "zod"
import { savePostFromAgent } from "@/lib/blog/service"
import type { BlogPost, BlogCategory } from "@/lib/blog/types"
import { SITE_URL } from "@/lib/site"

const PublishSchema = z.object({
  secret: z.string().min(1, "API secret is required"),
  post: z.object({
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
    title: z.string().min(5, "Title must be at least 5 chars"),
    summary: z.string().min(10, "Summary must be at least 10 chars"),
    content: z.string().min(20, "Content must be at least 20 chars"),
    coverImage: z.string().url("Valid cover image URL is required"),
    category: z.enum(["ai-agents", "mobile-apps", "web-engineering", "automation", "startups-scale"]),
    tags: z.array(z.string()).default([]),
    locale: z.enum(["es", "en", "pt", "fr"]).default("es"),
    readingTime: z.string().optional(),
    featured: z.boolean().optional().default(false),
    author: z.object({
      name: z.string(),
      role: z.string(),
      avatar: z.string(),
      isAgent: z.boolean().default(true),
      handle: z.string().optional(),
      bio: z.string().optional(),
    }),
    storyCard: z.object({
      headline: z.string(),
      tagline: z.string(),
      quote: z.string().optional(),
      accentColor: z.string().optional().default("#22F23A"),
      badgeText: z.string().optional().default("⚡ POTENCIAPP"),
      stickers: z.array(z.string()).optional().default([]),
    }).optional(),
    syndication: z.object({
      twitter: z.boolean().optional(),
      linkedin: z.boolean().optional(),
      discord: z.boolean().optional(),
      reddit: z.boolean().optional(),
      instagram: z.boolean().optional(),
      facebook: z.boolean().optional(),
    }).optional(),
  }),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = PublishSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.flatten(),
        },
        { status: 400 }
      )
    }

    const { secret, post: postData } = validation.data
    const expectedSecret = process.env.AGENT_API_SECRET || "potenciapp-agent-secret-2026"

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid secret key" },
        { status: 401 }
      )
    }

    // Auto-calculate reading time if missing (~200 words per minute)
    const words = postData.content.trim().split(/\s+/).length
    const calculatedReadingTime = postData.readingTime || `${Math.max(1, Math.ceil(words / 200))} min`

    const finalPost: BlogPost = {
      slug: postData.slug,
      locale: postData.locale,
      title: postData.title,
      summary: postData.summary,
      content: postData.content,
      coverImage: postData.coverImage,
      category: postData.category as BlogCategory,
      tags: postData.tags,
      publishedAt: new Date().toISOString(),
      readingTime: calculatedReadingTime,
      author: postData.author,
      featured: postData.featured,
      status: "published",
      storyCard: postData.storyCard || {
        headline: postData.title.slice(0, 50).toUpperCase(),
        tagline: postData.summary.slice(0, 90),
        accentColor: "#22F23A",
        badgeText: "⚡ AGENT POST",
        stickers: postData.tags.map((t) => `#${t.replace(/\s+/g, "")}`).slice(0, 3),
      },
      syndication: postData.syndication,
    }

    const saved = await savePostFromAgent(finalPost)

    const articleUrl = `${SITE_URL}/${finalPost.locale}/blog/${finalPost.slug}`

    return NextResponse.json({
      success: true,
      message: "Post successfully published to PotenciApp Blog by Agent",
      slug: saved.post.slug,
      url: articleUrl,
      socialSyndication: {
        twitterShareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(finalPost.title)}&url=${encodeURIComponent(articleUrl)}`,
        linkedinShareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
        storyCardReady: true,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    )
  }
}
