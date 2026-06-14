"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconShare, IconCopy, IconCheck, IconLink, IconExternalLink } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export function HelpCenterShareCard({ orgSlug }: { orgSlug: string }) {
  const [copied, setCopied] = React.useState(false)
  const [shareUrl, setShareUrl] = React.useState("")

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/${orgSlug}/hc`)
    }
  }, [orgSlug])

  const handleCopy = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {}
  }

  return (
    <Card className="border border-border/40 bg-card/30 backdrop-blur-md hover:border-border transition-all duration-300">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 shrink-0">
          <IconShare className="size-4.5" />
        </div>
        <div>
          <CardTitle className="text-sm font-bold text-foreground">
            Help Center Portal
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Share this link with your customers to receive support requests.
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border/40 bg-background/50 text-xs font-mono text-foreground select-all overflow-x-auto min-w-0 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          <IconLink className="size-3.5 text-muted-foreground shrink-0" />
          <span className="truncate">{shareUrl || "Loading portal URL..."}</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex-1 sm:flex-initial rounded-xl text-xs font-semibold px-4 h-9.5 border-border/60 hover:bg-muted"
          >
            {copied ? (
              <>
                <IconCheck className="mr-1.5 size-4 text-emerald-500" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <IconCopy className="mr-1.5 size-4 text-muted-foreground" />
                <span>Copy Link</span>
              </>
            )}
          </Button>
          <Button
            asChild
            variant="secondary"
            className="rounded-xl size-9.5 p-0 hover:bg-muted flex items-center justify-center border border-border/40"
          >
            <a href={shareUrl} target="_blank" rel="noopener noreferrer">
              <IconExternalLink className="size-4 text-foreground" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
