import { Button } from "@/components/ui/button"
import {
  IconSparkles,
  IconArrowRight,
  IconFileText,
  IconRobot,
  IconBrain,
  IconMessage2,
} from "@tabler/icons-react"

export function Hero() {
  return (
    <section className="flex flex-col items-center py-20 text-center md:py-32">
      <div className="mb-6 inline-flex animate-pulse items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-4 py-1.5 text-xs font-semibold text-orange-600 backdrop-blur-sm dark:text-orange-400">
        <IconSparkles className="size-3.5" />
        <span>Introducing Agent Autopilot 2.0</span>
      </div>

      <h1 className="mb-6 max-w-4xl text-5xl leading-[1.05] font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
        Customer Support, <br />
        <span className="bg-linear-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
          Supercharged by AI.
        </span>
      </h1>

      <p className="mb-10 max-w-2xl text-base leading-relaxed font-normal text-muted-foreground sm:text-lg md:text-xl">
        A SaaS-style helpdesk that automates ticket summarization, drafts
        instant agent replies, and self-solves issues using RAG knowledge bases.
      </p>

      <div className="mb-20 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          size="lg"
          className="w-full rounded-full bg-linear-to-r from-orange-600 to-amber-500 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-orange-500 hover:to-amber-400 sm:w-auto"
        >
          Get Started For Free
          <IconArrowRight className="size-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full rounded-full border-border/80 bg-background/50 px-8 py-6 text-base font-semibold hover:bg-muted sm:w-auto"
        >
          Watch 5m Demo
        </Button>
      </div>

      <div className="w-full max-w-5xl rounded-2xl border border-border/40 bg-card/30 p-2 shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-1 divide-y divide-border/40 overflow-hidden rounded-xl border border-border/50 bg-background/90 text-left md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500" />
                <span className="size-3 rounded-full bg-amber-500" />
                <span className="size-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Client Portal
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-border/40 bg-card/40 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-500 uppercase">
                    New Support Ticket
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ID: #4092
                  </span>
                </div>
                <h3 className="mb-1 text-sm font-semibold">
                  RAG Knowledge Base failed to parse custom PDF manual
                </h3>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  Uploaded our 200-page service manual in PDF format, but
                  queries about Section 4 return empty answers.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  RAG Knowledge Attachment
                </span>
                <div className="flex items-center justify-between rounded-lg border border-dashed border-border/60 bg-muted/20 p-3">
                  <div className="flex items-center gap-2">
                    <IconFileText className="size-5 text-orange-500" />
                    <span className="text-xs font-medium">
                      kb_manual_v2.pdf
                    </span>
                  </div>
                  <span className="text-2xs rounded-full bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-500">
                    Uploaded
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border/40 pt-2 text-xs text-muted-foreground">
                <span>Priority: Urgent</span>
                <span>Status: Auto-Deflecting...</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-muted/5 p-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div className="flex items-center gap-2">
                <IconRobot className="size-4.5 text-orange-500" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  Cyberify AI Copilot
                </span>
              </div>
              <span className="text-2xs rounded-full bg-orange-500/15 px-2.5 py-0.5 font-bold text-orange-500">
                Active
              </span>
            </div>

            <div className="flex flex-col gap-3.5">
              <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-3.5">
                <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
                  <IconBrain className="size-4" />
                  <span>AI Ticket Summary</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Client is experiencing zero-response RAG queries on Section 4
                  of document. Identified mismatch in parsing chunk overlaps.
                </p>
              </div>

              <div className="rounded-xl border border-border/40 bg-card/60 p-3.5">
                <div className="mb-2 flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-1">
                    <IconMessage2 className="size-4 text-orange-500" />
                    <span>Suggested Reply Draft</span>
                  </div>
                  <span className="text-2xs text-muted-foreground">
                    98% confidence
                  </span>
                </div>
                <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                  Hello Ahmad, it looked like your PDF parsing failed due to
                  overlapping layout boundaries. We recommend re-indexing with
                  layout-aware configurations.
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    size="xs"
                    variant="outline"
                    className="text-2xs rounded-full font-semibold"
                  >
                    Refine
                  </Button>
                  <Button
                    size="xs"
                    className="text-2xs rounded-full bg-orange-600 font-semibold text-white hover:bg-orange-500"
                  >
                    Insert Draft
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
