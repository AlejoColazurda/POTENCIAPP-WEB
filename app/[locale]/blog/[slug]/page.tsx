import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { BlogCta, BlogShell } from "@/components/blog-shell"
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog"
import { SITE_URL } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  const slugs = getAllPosts().map((p) => p.slug)
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | PotenciApp`,
    description: post.description,
    // Articles are Spanish-only: every locale's copy points search engines at /blog/<slug>.
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      locale: "es",
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const post = getPost(slug)
  if (!post) notFound()
  const t = await getTranslations({ locale, namespace: "blog" })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "es",
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    image: `${SITE_URL}/og.png`,
    author: { "@type": "Organization", name: "PotenciApp", url: SITE_URL },
    publisher: { "@type": "Organization", name: "PotenciApp", url: SITE_URL },
  }

  return (
    <BlogShell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article lang="es" className="mx-auto max-w-[720px] px-4 py-12 md:px-8 lg:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-wider text-gray-500 transition-colors hover:text-brand-green"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("back")}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-gray-500">
          <span className="text-brand-green">{post.tag}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
          <span aria-hidden>·</span>
          <span>{t("minutes", { n: post.readingMinutes })}</span>
        </div>
        <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-gray-300">{post.description}</p>
        <p className="mt-4 text-sm text-gray-500">{t("author")}</p>

        <div className="blog-prose mt-10 border-t border-gray-800 pt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

        <BlogCta locale={locale} />
      </article>
    </BlogShell>
  )
}
