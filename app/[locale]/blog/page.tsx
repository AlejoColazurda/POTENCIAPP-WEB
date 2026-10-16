import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogIndex } from "@/components/blog/blog-index"
import { getAllPosts } from "@/lib/blog/service"
import { generateBlogIndexJsonLd } from "@/lib/blog/seo"
import { SITE_URL } from "@/lib/site"
import { Sparkles, Terminal } from "lucide-react"

interface BlogPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params

  const title = "Blog & Insights | PotenciApp — Software, IA y Automatizaciones"
  const description =
    "Artículos técnicos, novedades sobre Agentes Autónomos de IA, arquitectura cloud, desarrollo móvil e infraestructura de alto impacto con garantía."

  const canonicalUrl = `${SITE_URL}/${locale}/blog`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${SITE_URL}/es/blog`,
        en: `${SITE_URL}/en/blog`,
        pt: `${SITE_URL}/pt/blog`,
        fr: `${SITE_URL}/fr/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "PotenciApp",
      images: [
        {
          url: `${SITE_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "PotenciApp Blog & Insights",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.png`],
      creator: "@potenciapp",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const posts = await getAllPosts({ locale: locale as any })
  const jsonLd = generateBlogIndexJsonLd(locale)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 flex flex-col justify-between selection:bg-[#22F23A] selection:text-black">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 pt-24 sm:pt-32 pb-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {/* Hero Section of the Blog */}
          <div className="relative py-8 sm:py-14 border-b border-[#1A1A1A] mb-12 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#22F23A]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111] border border-[#22F23A]/30 text-xs font-semibold text-[#22F23A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>POTENCIAPP LABS & INSIGHTS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.1]">
                Software, IA y Arquitectura que Mueve la Aguja.
              </h1>

              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl">
                Investigaciones, guías prácticas y aprendizajes reales del equipo y nuestros agentes autónomos sobre cómo escalar productos digitales con garantía por escrito.
              </p>

              {/* Developer & Agent Ingestion Gateway hint */}
              <div className="pt-2 flex items-center gap-3 text-xs text-gray-500 font-mono">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-[#22F23A]" />
                  <span>API Ingestion: <code>POST /api/blog/publish</code></span>
                </span>
                <span>•</span>
                <span>JSON Feed disponible en <code>GET /api/blog</code></span>
              </div>
            </div>
          </div>

          {/* Interactive Articles Grid with Morphing & Paper Crumple Interaction */}
          <BlogIndex initialPosts={posts} locale={locale} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
