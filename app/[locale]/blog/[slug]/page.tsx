import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Calendar, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllPosts, getPostBySlug } from "@/lib/blog/service"
import { blogPostOgImage, generateBlogPostingJsonLd } from "@/lib/blog/seo"
import { blogPostUrl, formatBlogDate } from "@/lib/blog/urls"
import { whatsAppUrl } from "@/lib/site"
import { SocialShareBar } from "@/components/blog/social-share-bar"
import { MarkdownContent } from "@/components/blog/markdown-content"
import { BlogCover } from "@/components/blog/cover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { routing } from "@/i18n/routing"
import { Link } from "@/i18n/navigation"

export const revalidate = 300

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    })),
  )
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    const t = await getTranslations({ locale, namespace: "blogUi" })
    return { title: `${t("notFound")} | PotenciApp` }
  }

  const canonical = blogPostUrl(post.slug, "es")
  const languages = Object.fromEntries(routing.locales.map((l) => [l, blogPostUrl(post.slug, l)]))
  const og = blogPostOgImage(post.coverImage, post.title)

  return {
    title: `${post.title} | Blog PotenciApp`,
    description: post.summary,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": blogPostUrl(post.slug, "es") },
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: canonical,
      siteName: "PotenciApp",
      locale: post.locale,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [og.url],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  const t = await getTranslations("blogUi")
  const jsonLd = generateBlogPostingJsonLd(post)
  const authorName = post.author.name?.trim() || t("roleTeam")

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#22F23A] selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />

      <main className="flex-1 px-4 pb-20 pt-24 sm:px-8 sm:pt-32">
        <article className="mx-auto max-w-3xl space-y-8">
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[#B8B8B8]">
              <li>
                <Link href="/blog" className="underline-offset-4 hover:text-[#22F23A] hover:underline">
                  {t("eyebrow")}
                </Link>
              </li>
              <li aria-hidden className="text-[#1A1A1A]">
                /
              </li>
              <li className="text-[#F5F5F5]">{post.title}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#22F23A]/30 bg-[#22F23A]/10 px-3 py-1 text-xs font-semibold text-[#22F23A]">
              {t(`categories.${post.category}.label`)}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-[#B8B8B8]">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              <span>{t("readingTime", { time: post.readingTime })}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#B8B8B8]">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale)}</time>
            </div>
          </div>

          <h1 className="font-display text-3xl font-black leading-tight tracking-tight text-[#F5F5F5] sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="text-sm text-[#B8B8B8]">
            <p className="font-semibold text-[#F5F5F5]">{authorName}</p>
            <p>{t(post.aiAssisted ? "roleAi" : "roleTeam")}</p>
          </div>

          <BlogCover
            src={post.coverImage}
            alt={post.title}
            label={t(`categories.${post.category}.label`)}
            className="rounded-2xl border border-[#1A1A1A]"
          />

          {!post.translated ? (
            <p className="rounded-xl border border-[#1A1A1A] bg-[#111111] px-4 py-3 text-sm text-[#B8B8B8]">
              {t("onlySpanish")}
            </p>
          ) : null}

          <p className="rounded-2xl border border-[#1A1A1A] border-l-4 border-l-[#22F23A] bg-[#111111] p-5 text-base leading-relaxed text-[#B8B8B8]">
            {post.summary}
          </p>

          <MarkdownContent content={post.content} className="text-[#B8B8B8]" />

          {post.tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-[#1A1A1A] pt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#1A1A1A] bg-[#111111] px-3 py-1 text-xs font-medium text-[#B8B8B8]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <SocialShareBar post={post} />

          <Card className="border-[#1A1A1A] bg-[#111111]">
            <CardContent className="space-y-4 p-6 sm:p-8">
              <Badge className="border-transparent bg-[#22F23A] text-black">{t("ctaBadge")}</Badge>
              <h2 className="font-display text-xl font-bold text-[#F5F5F5] sm:text-2xl">{t("ctaTitle")}</h2>
              <p className="max-w-xl text-sm text-[#B8B8B8]">{t("ctaBody")}</p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild className="min-h-11 bg-[#22F23A] text-black hover:bg-[#1AD832]">
                  <a
                    href={whatsAppUrl(t("waMessage", { title: post.title }))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {t("whatsapp")}
                  </a>
                </Button>
                <Button asChild variant="outline" className="min-h-11 border-[#2A2A2A] text-[#F5F5F5] hover:border-[#22F23A] hover:bg-[#1A1A1A] hover:text-[#F5F5F5]">
                  <Link href="/blog">{t("keepExploring")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </article>
      </main>

      <Footer />
    </div>
  )
}
