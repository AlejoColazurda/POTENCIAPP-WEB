import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getAllPosts } from "@/lib/blog/service"
import { formatBlogDate } from "@/lib/blog/urls"
import type { Locale } from "@/i18n/routing"

export async function BlogTeaser({ locale }: { locale: string }) {
  const posts = (await getAllPosts({ locale: locale as Locale })).slice(0, 3)
  if (posts.length === 0) return null

  const t = await getTranslations("blogTeaser")
  const tUi = await getTranslations("blogUi")

  return (
    <section className="bg-[#0A0A0A] py-20 lg:py-24" aria-labelledby="blog-teaser-heading">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-wider text-[#22F23A]">{t("eyebrow")}</p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="blog-teaser-heading"
            className="max-w-[720px] font-display text-3xl font-bold tracking-tight text-[#F5F5F5] sm:text-4xl"
          >
            {t("title")}
          </h2>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-[#22F23A] underline-offset-4 hover:underline"
          >
            {t("cta")}
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex h-full min-h-11 flex-col rounded-2xl border border-[#1A1A1A] bg-[#111111] p-5 transition-colors hover:border-[#22F23A]/50"
              >
                <span className="text-xs font-semibold text-[#22F23A]">
                  {tUi(`categories.${post.category}.short`)}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[#F5F5F5]">
                  {post.title}
                </h3>
                <time className="mt-3 text-sm text-[#B8B8B8]" dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt, locale)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
