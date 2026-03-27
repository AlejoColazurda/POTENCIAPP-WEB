import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ValueSection } from "@/components/value-section"
import { CasesSection } from "@/components/cases-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ValueSection />
        <CasesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
