import { Header } from "./_landing_page_components/Header"
import { Hero } from "./_landing_page_components/Hero"
import { Features } from "./_landing_page_components/Features"
import { Demo } from "./_landing_page_components/Demo"
import { Testimonials } from "./_landing_page_components/Testimonials"
import { CTA } from "./_landing_page_components/CTA"
import { Footer } from "./_landing_page_components/Footer"

import { BackgroundBlur } from "@/components/elements/BackgroundBlur"

export default function Page() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground transition-colors duration-300 selection:bg-primary/30">
      <BackgroundBlur />

      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Features />
        <Demo />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
