import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogIndex } from "@/components/blog/blog-index"
import { getAllPosts } from "@/lib/blog/service"
import { blogIndexOgImage, generateBlogIndexJsonLd } from "@/lib/blog/seo"
import { blogIndexUrl } from "@/lib/blog/urls"
import { routing } from "@/i18n/routing"

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
  const ogImage = blogIndexOgImage()

  return {
    title,
    description,
    alternates: {
      canonical: locale === "es" ? blogIndexUrl("es") : canonicalUrl,
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("blogUi")

  const posts = await getAllPosts({ locale: locale as (typeof routing.locales)[number] })
  const jsonLd = generateBlogIndexJsonLd(locale, t("metaTitle"), t("metaDescription"))

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#22F23A] selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />

      <main className="flex-1 pb-20 pt-24 sm:pt-32">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8">
          <div className="mb-12 max-w-[720px] space-y-4 border-b border-[#1A1A1A] py-8 sm:py-14">
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#22F23A]">{t("eyebrow")}</p>
            <h1 className="font-display text-3xl font-black leading-[1.1] tracking-tight text-[#F5F5F5] sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#B8B8B8] sm:text-lg">{t("heroSubtitle")}</p>
          </div>

          <BlogIndex initialPosts={posts} locale={locale} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
