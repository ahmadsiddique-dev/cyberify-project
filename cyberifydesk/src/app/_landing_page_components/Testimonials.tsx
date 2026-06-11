import { IconStar } from "@tabler/icons-react"

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "VP of Support, VeloPay",
    quote:
      "Before Cyberify Desk, our support agents were drowning in duplicate queries. Integrating our API docs took 3 minutes, and now the AI successfully self-solves 42% of our tickets. The productivity boost has been unbelievable.",
    metric: "42% Deflection",
    initials: "SJ",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "David Chen",
    role: "Support Lead, DevFlow",
    quote:
      "The One-Click AI Replies are a game-changer. It gets the context of the ticket instantly and drafts responses with 95%+ accuracy. Our team's average response time dropped from 3 hours to under 2 minutes.",
    metric: "-85% Response Time",
    initials: "DC",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Elena Rostova",
    role: "Customer Success Manager, CloudScale",
    quote:
      "We sync all of our technical manuals to the vector base, and the RAG engine answers complex technical questions with zero hallucination. Our clients get answers immediately instead of waiting for engineering.",
    metric: "Zero Hallucination",
    initials: "ER",
    gradient: "from-rose-500 to-orange-500",
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-border/40 py-20 md:py-28"
    >
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h2 className="mb-3 text-xs font-bold tracking-widest text-orange-600 uppercase dark:text-orange-400">
          Testimonials
        </h2>
        <p className="mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Trusted by fast-growing customer teams.
        </p>
        <p className="text-sm text-muted-foreground sm:text-base">
          See how companies are automating deflection, dropping response times,
          and delighting customers.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="group relative flex flex-col justify-between rounded-3xl border border-border/40 bg-card/30 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5"
          >
            <div className="absolute top-0 right-6 -translate-y-1/2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[10px] font-bold tracking-wider text-orange-600 uppercase backdrop-blur-sm dark:text-orange-400">
              {t.metric}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar
                    key={i}
                    className="size-4 fill-orange-500 text-orange-500"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-border/40 pt-6">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${t.gradient} text-xs font-bold text-white`}
              >
                {t.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">{t.name}</h4>
                <span className="text-2xs text-muted-foreground">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
