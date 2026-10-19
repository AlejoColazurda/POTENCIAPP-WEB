import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { BlogHeader } from "@/components/blog/blog-header"
import { Footer } from "@/components/footer"
import { BlogIndex } from "@/components/blog/blog-index"
import { getAllPosts } from "@/lib/blog/service"
import { generateBlogIndexJsonLd } from "@/lib/blog/seo"
import { blogIndexUrl } from "@/lib/blog/urls"
import { SITE_URL } from "@/lib/site"
import { routing } from "@/i18n/routing"
import { ShieldCheck } from "lucide-react"

export const revalidate = 300

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blogUi" })
  const title = t("metaTitle")
  const description = t("metaDescription")
  const canonicalUrl = blogIndexUrl(locale)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, blogIndexUrl(l)])),
        "x-default": blogIndexUrl("es"),
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "PotenciApp",
      locale,
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.png`],
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("blogUi")

  // Each post in this locale when translated, in Spanish otherwise.
  const posts = await getAllPosts({ locale: locale as (typeof routing.locales)[number] })
  const jsonLd = generateBlogIndexJsonLd(locale, t("metaTitle"), t("metaDescription"))

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 flex flex-col justify-between selection:bg-[#22F23A] selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <BlogHeader />

      <main className="flex-1 pt-24 sm:pt-32 pb-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="relative py-8 sm:py-14 border-b border-[#1A1A1A] mb-12 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#22F23A]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111] border border-[#22F23A]/30 text-xs font-semibold text-[#22F23A]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t("eyebrow")}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.1]">
                {t("heroTitle")}
              </h1>

              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl">{t("heroSubtitle")}</p>
            </div>
          </div>

          <BlogIndex initialPosts={posts} locale={locale} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
