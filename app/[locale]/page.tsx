import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ValueSection } from "@/components/value-section"
import { ServicesSection } from "@/components/services-section"
import { CasesSection } from "@/components/cases-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { GlobeSection } from "@/components/globe-section"
import { ProcesoSection } from "@/components/proceso-section"
import { PorQueSection } from "@/components/porque-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ChatSection } from "@/components/chat-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default async function HomePage({
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
        <HeroSection />
        <ValueSection />
        <ServicesSection />
        <PortfolioSection />
        <CasesSection />
        <GlobeSection />
        <ProcesoSection />
        <PorQueSection />
        <TestimonialsSection />
        <ChatSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
