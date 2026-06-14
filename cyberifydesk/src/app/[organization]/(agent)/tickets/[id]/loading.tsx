import * as React from "react"
import { BackgroundBlur } from "@/components/elements/BackgroundBlur"

export default function Loading() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans text-foreground transition-colors duration-300">
      <BackgroundBlur />
      <div className="border-b border-border/40 bg-card/25 h-16 w-full" />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-1 h-137.5 rounded-2xl border border-border/40 bg-card/10 p-5 flex flex-col gap-4 animate-pulse">
          <div className="h-8 w-1/3 bg-muted rounded-md" />
          <div className="h-6 w-full bg-muted rounded-md" />
          <div className="h-24 w-full bg-muted rounded-md mt-4" />
        </div>
        <div className="lg:col-span-3 h-137.5 rounded-2xl border border-border/40 bg-card/10 p-5 flex flex-col justify-between animate-pulse">
          <div className="h-8 w-1/4 bg-muted rounded-md" />
          <div className="flex flex-col gap-4 flex-1 py-8">
            <div className="h-10 w-1/3 bg-muted rounded-xl self-end" />
            <div className="h-10 w-1/2 bg-muted rounded-xl self-start" />
            <div className="h-10 w-1/4 bg-muted rounded-xl self-end" />
          </div>
          <div className="h-12 w-full bg-muted rounded-xl" />
        </div>
      </main>
    </div>
  )
}
