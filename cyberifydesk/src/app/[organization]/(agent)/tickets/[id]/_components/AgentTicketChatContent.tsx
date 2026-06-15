"use client"

import * as React from "react"
import { TicketDetailsSidebar } from "./TicketDetailsSidebar"
import { TicketChatArea } from "./TicketChatArea"

interface AgentTicketChatContentProps {
  orgSlug: string
  ticket: {
    _id: string
    customer: string
    title: string
    status: string
    priority: string
    createdAt: string
    description?: string
  }
  insight: {
    summary: string
    rootCause: string
    solution: string
  }
}

export function AgentTicketChatContent({ orgSlug, ticket, insight }: AgentTicketChatContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start animate-in duration-300 fade-in slide-in-from-bottom-3">
      <div className="lg:col-span-1">
        <TicketDetailsSidebar insight={insight} orgSlug={orgSlug} ticket={ticket} />
      </div>
      <div className="lg:col-span-3">
        <TicketChatArea
          ticketId={ticket._id}
          customerName={ticket.customer}
          ticketTitle={ticket.title}
          ticketDescription={ticket.description}
          ticketCreatedAt={ticket.createdAt}
          ticketStatus={ticket.status}
        />
      </div>
    </div>
  )
}
