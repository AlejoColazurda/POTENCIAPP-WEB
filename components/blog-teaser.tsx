import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getAllPosts } from "@/lib/blog/service"
import { formatBlogDate } from "@/lib/blog/urls"
import type { Locale } from "@/i18n/routing"
import { SectionIndex } from "@/components/editorial/reveal"

/** Latest three articles, set as a ruled reading list. */
export async function BlogTeaser({ locale }: { locale: string }) {
  const posts = (await getAllPosts({ locale: locale as Locale })).slice(0, 3)
  if (posts.length === 0) return null

  const t = await getTranslations("blogTeaser")
  const tUi = await getTranslations("blogUi")

  return (
    <section className="bg-gray-950 text-gray-100 border-t border-gray-100/35" aria-labelledby="blog-teaser-heading">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 lg:col-span-3">
            <SectionIndex n="08" label={t("eyebrow")} />
          </div>
          <h2
            id="blog-teaser-heading"
            className="col-span-12 lg:col-span-6 font-ed-display font-medium text-[clamp(28px,3.2vw,50px)] leading-[1.05] tracking-[-0.035em]"
          >
            {t("title")}
          </h2>
          <div className="col-span-12 lg:col-span-3 lg:text-right self-end">
            <Link href="/blog" className="inline-flex min-h-11 items-center font-ed-sans text-[15px] font-semibold ed-link">
              {t("cta")} →
            </Link>
          </div>
        </div>

        <ol className="mt-14 border-t border-gray-100/35">
          {posts.map((post, i) => (
            <li key={post.slug} className="border-b border-gray-800">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-[2.5rem_10rem_1fr_auto] md:gap-x-6"
              >
                <span className="ed-label text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="ed-label text-gray-100 md:order-none order-3 col-start-2 md:col-start-auto">
                  {tUi(`categories.${post.category}.short`)}
                </span>
                <span className="font-ed-display text-xl lg:text-2xl font-medium tracking-[-0.02em] leading-[1.2] group-hover:underline decoration-brand-green decoration-[3px] underline-offset-[6px]">
                  {post.title}
                </span>
                <time className="ed-label text-gray-400 col-start-2 md:col-start-auto" dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt, locale)}
                </time>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
