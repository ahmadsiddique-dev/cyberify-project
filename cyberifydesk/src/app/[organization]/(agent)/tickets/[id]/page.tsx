import * as React from "react"
import { checkAgentAuth } from "@/lib/auth-check"
import { DashboardHeader } from "@/app/[organization]/(agent)/_components/DashboardHeader"
import { BackgroundBlur } from "@/components/elements/BackgroundBlur"
import Footer from "../../_components/Footer"
import { fetchSingleTicket } from "./_lib/get_ticket"
import { AgentTicketChatContent } from "./_components/AgentTicketChatContent"
import { IconAlertCircle } from "@tabler/icons-react"
import Link from "next/link"

export default async function TicketDetailsPage({
  params,
}: {
  params: Promise<{ organization: string; id: string }>
}) {
  const user = await checkAgentAuth()
  const { organization, id } = await params

  const ticket = await fetchSingleTicket(id, organization)

  if (!ticket) {
    return (
      <div className="relative flex min-h-screen flex-col bg-background font-sans text-foreground transition-colors duration-300">
        <BackgroundBlur />
        <DashboardHeader title="Ticket Details" user={user} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center min-h-75 gap-4 rounded-2xl border border-border/40 bg-card/30 p-8 text-center backdrop-blur-md max-w-md">
            <IconAlertCircle className="size-12 text-destructive animate-pulse" />
            <h3 className="text-lg font-bold text-foreground">Ticket Not Found</h3>
            <p className="text-xs text-muted-foreground">
              We couldn't find the ticket you are looking for in your organization workspace queue.
            </p>
            <Link
              href={`/${organization}/tickets`}
              className="rounded-full px-5 py-2 text-xs font-semibold border border-border hover:bg-muted transition-colors"
            >
              Back to Queue
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans text-foreground transition-colors duration-300">
      <BackgroundBlur />
      <DashboardHeader title="Ticket Workspace" user={user} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <AgentTicketChatContent orgSlug={organization} ticket={ticket} />
      </main>

    </div>
  )
}
