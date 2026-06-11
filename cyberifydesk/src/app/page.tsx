import { Header } from "./_landing_page_components/Header"
import { Hero } from "./_landing_page_components/Hero"
import { Features } from "./_landing_page_components/Features"
import { Demo } from "./_landing_page_components/Demo"
import { Testimonials } from "./_landing_page_components/Testimonials"
import { CTA } from "./_landing_page_components/CTA"
import { Footer } from "./_landing_page_components/Footer"

export default function Page() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground transition-colors duration-300 selection:bg-primary/30">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-full max-w-7xl -translate-x-1/2 overflow-hidden">
        <div className="absolute top-[-200px] left-1/4 h-[600px] w-[600px] rounded-full bg-orange-600/10 blur-[150px] dark:bg-orange-600/15" />
        <div className="absolute top-[-100px] right-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[130px] dark:bg-amber-500/15" />
      </div>

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
