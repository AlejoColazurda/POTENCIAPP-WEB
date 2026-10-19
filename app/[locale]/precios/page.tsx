import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreciosPage } from "@/components/precios-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "precios" })
  const og = "/og.png"
  const canonical = locale === "es" ? "/precios" : `/${locale}/precios`

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        es: "/precios",
        en: "/en/precios",
        pt: "/pt/precios",
        fr: "/fr/precios",
        "x-default": "/precios",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      locale,
      siteName: "PotenciApp",
      images: [{ url: og, width: 1200, height: 630, alt: "PotenciApp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [og],
    },
  }
}

export default async function PreciosRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main>
        <PreciosPage />
      </main>
      <Footer />
    </div>
  )
}
