import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BackgroundBlur } from "@/components/elements/BackgroundBlur"
import { IconArrowLeft, IconArrowRight, IconSparkles } from "@tabler/icons-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Demo — Hackdesk",
  description:
    "Watch a 5-minute walkthrough of Hackdesk: AI-powered ticket automation, RAG knowledge bases, and instant agent reply drafts in action.",
}

export default function DemoPage() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/30">
      <BackgroundBlur />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <IconArrowLeft className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex animate-pulse items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-4 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
            <IconSparkles className="size-3.5" />
            <span>5-Minute Product Demo</span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            See HackDesk{" "}
            <span className="bg-linear-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              in Action
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Watch how Hackdesk automates ticket summarization, drafts instant
            agent replies, and self-solves customer issues using RAG knowledge bases.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/40 bg-card/30 shadow-2xl backdrop-blur-md">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 size-full"
              src="https://youtu.be/shb3h5idkl4"
              title="Hackdesk — Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            Ready to transform your customer support?
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-linear-to-r from-orange-600 to-amber-500 px-8 font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-orange-500 hover:to-amber-400"
          >
            <Link href="/signup">
              Get Started For Free
              <IconArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
