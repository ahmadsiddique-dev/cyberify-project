"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconArrowLeft, IconCalendar, IconSparkles, IconInfoCircle } from "@tabler/icons-react"
import { formatDate } from "@/lib/formatDate"
import { cn } from "@/lib/utils"

interface TicketDetailsSidebarProps {
  orgSlug: string
  ticket: {
    _id: string
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

export function TicketDetailsSidebar({ orgSlug, ticket, insight }: TicketDetailsSidebarProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<"details" | "ai-insight">("details")

  return (
    <div className="flex flex-col h-137.5 gap-5 rounded-2xl border border-border/40 bg-card/30 p-5 shadow-xl backdrop-blur-md overflow-hidden">
      <div className="flex items-center gap-2 pb-4 border-b border-border/20">
        <Button
          onClick={() => router.push(`/${orgSlug}/tickets`)}
          variant="ghost"
          size="icon"
          className="size-8 rounded-full hover:bg-muted border border-border/20 text-muted-foreground hover:text-foreground"
        >
          <IconArrowLeft className="size-4" />
        </Button>
        <Badge className="font-mono text-[9.5px] border-orange-500/20 bg-orange-500/10 text-orange-500 rounded-full hover:bg-orange-500/10 px-2 py-0.5 h-5 flex items-center whitespace-nowrap shrink-0">
          #{ticket._id}
        </Badge>
      </div>

      <div className="flex border border-border/40 p-0.5 bg-muted/30 rounded-lg shrink-0">
        <button
          onClick={() => setActiveTab("details")}
          className={cn(
            "flex-1 py-1 text-[11px] font-bold rounded-md transition-all flex items-center justify-center gap-1.5",
            activeTab === "details"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <IconInfoCircle className="size-3.5" />
          <span>Details</span>
        </button>
        <button
          onClick={() => setActiveTab("ai-insight")}
          className={cn(
            "flex-1 py-1 text-[11px] font-bold rounded-md transition-all flex items-center justify-center gap-1.5",
            activeTab === "ai-insight"
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <IconSparkles className="size-3.5 text-orange-500" />
          <span>AI Insight</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === "details" ? (
          <div className="flex flex-col gap-3.5 text-2xs h-full overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-semibold">Status</span>
              <Badge
                variant={
                  ticket.status === "open"
                    ? "default"
                    : ticket.status === "pending"
                    ? "secondary"
                    : "outline"
                }
                className={cn(
                  "text-3xs px-2 py-0.5 rounded-full capitalize font-semibold tracking-wide border",
                  ticket.status === "open"
                    ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
                    : ticket.status === "pending"
                    ? "border-blue-500/20 bg-blue-500/10 text-blue-500"
                    : "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                )}
              >
                {ticket.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-semibold">Priority</span>
              <Badge
                variant={ticket.priority === "high" ? "destructive" : "outline"}
                className={cn(
                  "text-3xs px-2 py-0.5 rounded-full capitalize font-semibold tracking-wide border",
                  ticket.priority === "high"
                    ? "border-destructive/20 bg-destructive/10 text-destructive"
                    : ticket.priority === "medium"
                    ? "border-amber-500/20 bg-amber-500/10 text-amber-500"
                    : "border-border/40 bg-muted text-muted-foreground"
                )}
              >
                {ticket.priority}
              </Badge>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                <IconCalendar className="size-3.5" />
                <span>Submitted</span>
              </span>
              <span className="text-foreground font-semibold">{formatDate(ticket.createdAt)}</span>
            </div>

            <div className="flex flex-col gap-1.5 border-t border-border/20 pt-3 flex-1 overflow-hidden">
              <span className="text-muted-foreground font-semibold">Description</span>
              <ScrollArea className="flex-1 bg-muted/20 border border-border/10 rounded-lg p-2.5" hideScrollbar>
                <div className="text-foreground leading-relaxed wrap-break-word whitespace-pre-wrap text-xs">
                  {ticket.description || "No description provided."}
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full bg-muted/20 border border-border/10 rounded-lg p-3 text-sm" >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-orange-500 font-bold tracking-wide uppercase text-sm">Summary</span>
                <p className="text-foreground leading-relaxed font-medium">
                  {insight.summary}
                </p>
              </div>

              <div className="flex flex-col gap-1 border-t border-border/20 pt-3">
                <span className="text-orange-500 font-bold tracking-wide uppercase text-sm">Root Cause</span>
                <p className="text-foreground leading-relaxed font-medium">
                  {insight.rootCause}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 border-t border-border/20 pt-3">
                <span className="text-orange-500 font-bold tracking-wide uppercase text-sm">Suggested Solutions</span>
                <ol className="list-decimal pl-3.5 flex flex-col gap-2 text-foreground font-medium">
                  {insight.solution}
                </ol>
              </div>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
