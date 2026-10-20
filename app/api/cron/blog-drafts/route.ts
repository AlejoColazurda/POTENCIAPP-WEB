import { NextResponse } from "next/server"
import { generateDrafts } from "@/lib/blog-drafts"
import { isSupabaseConfigured } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 120

/**
 * Vercel Cron (vercel.json) calls this on a schedule to leave one new AI
 * draft in /admin. Vercel sends `Authorization: Bearer <CRON_SECRET>`; any
 * other caller is rejected. Drafts are never published from here.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "supabase not configured" }, { status: 503 })
  }

  try {
    const slugs = await generateDrafts(1)
    return NextResponse.json({ created: slugs })
  } catch (err) {
    console.error("blog draft generation failed", err)
    return NextResponse.json({ error: err instanceof Error ? err.message : "failed" }, { status: 500 })
  }
}
