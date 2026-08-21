import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import ClickSpark from "@/components/reactbits/ClickSpark"
import { FloatingChat } from "@/components/floating-chat"
import "../globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
})


const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PotenciApp",
  url: "https://potenciapp.com",
  email: "contacto@potenciapp.com",
  telephone: "+5493329613035",
  description:
    "Empresa de software: aplicaciones iOS y Android, e-commerce, sistemas internos, IA aplicada, ciberseguridad, arquitectura de software e infraestructura cloud (Docker, AWS, VPS, redes, mantenimiento). Contrato con hitos y fechas, precio cerrado, factura y 90 días de garantía.",
  areaServed: ["AR", "Worldwide"],
  sameAs: ["https://demo.potenciapp.com"],
  knowsAbout: [
    "Desarrollo de aplicaciones móviles",
    "E-commerce",
    "Sistemas internos y ERPs",
    "Inteligencia artificial aplicada",
    "Automatización de procesos",
    "Ciberseguridad",
    "Arquitectura de software",
    "Docker",
    "AWS",
    "Servidores VPS",
    "Redes",
    "Mantenimiento de infraestructura",
  ],
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta" })
  return {
    metadataBase: new URL("https://potenciapp.com"),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "es" ? "/" : `/${locale}`,
      languages: { es: "/", en: "/en", pt: "/pt", fr: "/fr", "x-default": "/" },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale,
      siteName: "PotenciApp",
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-gray-950 text-gray-100"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <NextIntlClientProvider messages={messages}>
          {/* Brand-green spark burst on every click, page-wide */}
          <ClickSpark sparkColor="#22F23A" sparkSize={11} sparkRadius={22} sparkCount={9} duration={430}>
            {children}
          </ClickSpark>
          <FloatingChat />
          <Toaster richColors theme="dark" position="top-center" />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
