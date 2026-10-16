import { NextResponse } from "next/server"
import { generateMonthlyRoundup } from "@/lib/blog-drafts"
import { isSupabaseConfigured } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 120

/**
 * Vercel Cron (vercel.json) calls this on the 1st of each month to leave a
 * draft with the previous month's news in /admin. Same auth as
 * /api/cron/blog-drafts: `Authorization: Bearer <CRON_SECRET>`. Never publishes.
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
    const slug = await generateMonthlyRoundup()
    return NextResponse.json({ created: slug ? [slug] : [], skipped: slug ? undefined : "already exists" })
  } catch (err) {
    console.error("monthly roundup failed", err)
    return NextResponse.json({ error: err instanceof Error ? err.message : "failed" }, { status: 500 })
  }
}
