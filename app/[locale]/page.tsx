import { getTranslations, setRequestLocale } from "next-intl/server"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ValueSection } from "@/components/value-section"
import { ServicesSection } from "@/components/services-section"
import { StoresSection } from "@/components/stores-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { MarqueeBand } from "@/components/marquee-band"
import { GarantiaSection } from "@/components/garantia-section"
import { ProcesoSection } from "@/components/proceso-section"
import { PorQueSection } from "@/components/porque-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

/**
 * Section order follows the trust arc: promise (hero, value) → what we build
 * (services, stores) → proof you can click (portfolio) → the commitments behind
 * it (garantía) → how and why (proceso, por qué) → contact.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  // FAQPage structured data: the same Q&A the FAQ section renders, so search
  // and answer engines can quote it directly.
  const tFaq = await getTranslations({ locale, namespace: "faq" })
  const faqItems = tFaq.raw("items") as { q: string; a: string }[]
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <HeroSection />
        <ValueSection />
        <ServicesSection />
        <StoresSection />
        <PortfolioSection />
        <MarqueeBand />
        <GarantiaSection />
        <ProcesoSection />
        <PorQueSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
