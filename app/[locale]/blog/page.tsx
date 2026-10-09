import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { BlogCta, BlogShell } from "@/components/blog-shell"
import { formatPostDate, getAllPosts } from "@/lib/blog"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blog" })
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === "es" ? "/blog" : `/${locale}/blog`,
      languages: { es: "/blog", en: "/en/blog", pt: "/pt/blog", fr: "/fr/blog", "x-default": "/blog" },
    },
    openGraph: { title: t("metaTitle"), description: t("metaDescription"), type: "website" },
  }
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "blog" })
  const posts = getAllPosts()

  return (
    <BlogShell locale={locale}>
      <div className="mx-auto max-w-[960px] px-4 py-16 md:px-8 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">{t("eyebrow")}</span>
        </span>
        <h1 className="mt-5 max-w-[720px] font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-[640px] text-lg leading-relaxed text-gray-300">{t("subtitle")}</p>
        {t("spanishOnly") && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-gray-500">{t("spanishOnly")}</p>
        )}

        <ul className="mt-12 grid gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-gray-500">
                  <span className="text-brand-green">{post.tag}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
                  <span aria-hidden>·</span>
                  <span>{t("minutes", { n: post.readingMinutes })}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-gray-100 sm:text-[26px]">
                  {post.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-gray-300">{post.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-all group-hover:gap-2.5">
                  {t("readMore")}
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <BlogCta locale={locale} />
      </div>
    </BlogShell>
  )
}
