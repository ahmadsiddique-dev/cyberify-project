"use client"

import * as React from "react"
import Link from "next/link"
import { IconArrowLeft } from "@tabler/icons-react"
import { ThemeSwitch } from "./ThemeSwitch"

interface AuthLayoutProps {
  children: React.ReactNode
  backLink: string
  backText: string
}

export function AuthLayout({ children, backLink, backText }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 font-sans text-foreground transition-colors duration-300 selection:bg-primary/30">
      <div className="pointer-events-none absolute top-0 left-1/2 h-150 w-full max-w-7xl -translate-x-1/2 overflow-hidden">
        <div className="absolute -top-50 left-1/4 h-150 w-150 rounded-full bg-orange-600/10 blur-[150px] dark:bg-orange-600/15" />
        <div className="absolute -top-25 right-1/4 h-125 w-125 rounded-full bg-amber-500/10 blur-[130px] dark:bg-amber-500/15" />
      </div>

      <header className="absolute top-0 flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={backLink}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconArrowLeft className="size-4" />
          <span>{backText}</span>
        </Link>
        <ThemeSwitch />
      </header>

      {children}

      <footer className="text-2xs mt-16 py-6 text-center text-muted-foreground">
        <span>Cyberify AI Support Desk built by Ahmad Siddique</span>
      </footer>
    </div>
  )
}
