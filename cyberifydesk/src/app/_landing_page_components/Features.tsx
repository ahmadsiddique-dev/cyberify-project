import {
  IconBrain,
  IconMessage2,
  IconDatabase,
  IconGitCommit,
} from "@tabler/icons-react"

export function Features() {
  return (
    <section id="features" className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h2 className="mb-3 text-xs font-bold tracking-widest text-orange-600 uppercase dark:text-orange-400">
          Enterprise Power
        </h2>
        <p className="mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Everything you need to automate support.
        </p>
        <p className="text-sm text-muted-foreground sm:text-base">
          Say goodbye to manual categorization, typing boilerplate answers, and
          searching folders. Cyberify automates it all instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="group relative rounded-2xl border border-border/40 bg-card/30 p-6 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
          <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-transform group-hover:scale-110 dark:text-orange-400">
            <IconBrain />
          </div>
          <h3 className="mb-2 text-lg font-bold">AI Ticket Assistant</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Automatically generates summaries, priority flags, and root cause
            analysis the second a ticket is made.
          </p>
        </div>

        <div className="group relative rounded-2xl border border-border/40 bg-card/30 p-6 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
          <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-transform group-hover:scale-110 dark:text-orange-400">
            <IconMessage2 />
          </div>
          <h3 className="mb-2 text-lg font-bold">One-Click AI Replies</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Empowers support agents to draft contextual, hyper-professional
            responses instantly.
          </p>
        </div>

        <div className="group relative rounded-2xl border border-border/40 bg-card/30 p-6 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
          <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-transform group-hover:scale-110 dark:text-orange-400">
            <IconDatabase />
          </div>
          <h3 className="mb-2 text-lg font-bold">Instant RAG Knowledge Base</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Deflects incoming tickets by answering user questions directly from
            uploaded PDF/TXT manuals.
          </p>
        </div>

        <div className="group relative rounded-2xl border border-border/40 bg-card/30 p-6 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
          <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-transform group-hover:scale-110 dark:text-orange-400">
            <IconGitCommit />
          </div>
          <h3 className="mb-2 text-lg font-bold">
            Transparent Ticket Timelines
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Complete activity logging tracking everything from creation to
            ultimate resolution.
          </p>
        </div>
      </div>
    </section>
  )
}
