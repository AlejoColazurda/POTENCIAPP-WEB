import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { BlogHeader } from "@/components/blog/blog-header"
import { Footer } from "@/components/footer"
import { getPostBySlug, getAllPosts } from "@/lib/blog/service"
import { generateBlogPostingJsonLd } from "@/lib/blog/seo"
import { getCategoryInfo } from "@/lib/blog/categories"
import { SITE_URL, whatsAppUrl } from "@/lib/site"
import { SocialShareBar } from "@/components/blog/social-share-bar"
import { MarkdownContent } from "@/components/blog/markdown-content"
import { routing } from "@/i18n/routing"
import { ArrowLeft, Clock, Calendar, Sparkles, MessageCircle, ChevronRight } from "lucide-react"
import { Link } from "@/i18n/navigation"

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  )
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: "Artículo no encontrado | PotenciApp",
    }
  }

  const postUrl = `${SITE_URL}/${locale}/blog/${post.slug}`

  return {
    title: `${post.title} | Blog PotenciApp`,
    description: post.summary,
    alternates: {
      canonical: postUrl,
      languages: {
        es: `${SITE_URL}/es/blog/${post.slug}`,
        en: `${SITE_URL}/en/blog/${post.slug}`,
        pt: `${SITE_URL}/pt/blog/${post.slug}`,
        fr: `${SITE_URL}/fr/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: postUrl,
      siteName: "PotenciApp",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.coverImage],
      creator: post.author.handle || "@potenciapp",
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

  const jsonLd = generateBlogPostingJsonLd(post, locale)
  const categoryInfo = getCategoryInfo(post.category)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 flex flex-col justify-between selection:bg-[#22F23A] selection:text-black">
      {/* Schema.org BlogPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogHeader />

      <main className="flex-1 pt-24 sm:pt-32 pb-20">
        <article className="max-w-[880px] mx-auto px-4 sm:px-8 space-y-8">
          {/* Back link */}
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] text-xs font-semibold text-gray-300 hover:text-white transition group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#22F23A]" />
              <span>Volver a todos los artículos</span>
            </Link>
          </div>

          {/* Category & Metadata Header */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: `${categoryInfo.color}15`,
                color: categoryInfo.color,
                borderColor: `${categoryInfo.color}40`,
              }}
            >
              {categoryInfo.label}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{post.readingTime} de lectura</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>

            {post.author.isAgent && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#22F23A]/10 text-[#22F23A] border border-[#22F23A]/30">
                <Sparkles className="w-3 h-3" />
                <span>Publicado por Agente Autónomo</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author Card */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#22F23A]/40"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{post.author.name}</span>
                {post.author.handle && (
                  <span className="text-xs text-gray-400">{post.author.handle}</span>
                )}
              </div>
              <span className="text-xs text-gray-400">{post.author.role}</span>
            </div>
          </div>

          {/* Hero Cover Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#1A1A1A] shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Social Republication & Story Exporter */}
          <SocialShareBar post={post} />

          {/* Summary Callout Box */}
          <div className="p-5 rounded-2xl bg-[#111111] border-l-4 border-l-[#22F23A] border-y border-r border-[#1A1A1A] text-gray-300 font-medium leading-relaxed italic">
            {post.summary}
          </div>

          {/* Main Markdown Body Content */}
          <MarkdownContent content={post.content} />

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#1A1A1A]">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2">
              Temas:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#111111] text-gray-300 border border-[#1A1A1A]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Social Share Bar */}
          <div className="pt-2">
            <SocialShareBar post={post} />
          </div>

          {/* Conversion CTA to PotenciApp */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#111111] via-[#0E0E0E] to-[#0A0A0A] border border-[#22F23A]/30 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#22F23A]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#22F23A]/10 text-[#22F23A] border border-[#22F23A]/30">
                ⚡ SOFTWARE CON CONTRATO Y GARANTÍA
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white font-display">
                ¿Querés implementar esta tecnología en tu empresa?
              </h3>
              <p className="text-sm text-gray-400 max-w-xl">
                En PotenciApp desarrollamos aplicaciones móviles, sistemas a medida y soluciones de IA con alcance cerrado, contrato firmado y 90 días de garantía.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={whatsAppUrl(`Hola PotenciApp, leí el artículo "${post.title}" y quiero consultar por un proyecto.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22F23A] text-black font-bold hover:bg-[#1AD832] transition shadow-lg shadow-green-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hablar por WhatsApp</span>
                </a>
                <Link
                  href="/blog"
                  className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] text-sm font-semibold text-gray-200 transition"
                >
                  <span>Ver todos los artículos</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
