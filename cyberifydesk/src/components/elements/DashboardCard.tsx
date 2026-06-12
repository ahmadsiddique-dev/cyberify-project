"use client"

import * as React from "react"
import { useUserStore } from "../../store/user"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import {
  IconUser,
  IconMail,
  IconShield,
  IconLogout,
  IconCircleCheck,
} from "@tabler/icons-react"

export function DashboardCard() {
  const user = useUserStore((state) => state.user)
  const clearAuth = useUserStore((state) => state.clearAuth)
  const router = useRouter()
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  const handleLogout = () => {
    clearAuth()
    router.push("/signin")
  }

  if (!hydrated) {
    return null
  }

  return (
    <div className="relative w-full max-w-lg rounded-2xl border border-border/40 bg-card/30 p-8 shadow-2xl backdrop-blur-md">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 mb-4">
          <IconCircleCheck className="size-8 animate-pulse" />
        </div>
        <h1 className="mb-2 text-2xl font-extrabold tracking-tight">
          Agent Workspace
        </h1>
        <p className="text-xs text-muted-foreground">
          Welcome back to your Cyberify Desk command center
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border/40 bg-background/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <IconUser className="size-5" />
            </div>
            <div>
              <p className="text-3xs font-semibold uppercase tracking-wider text-muted-foreground">
                Agent Name
              </p>
              <p className="text-sm font-bold text-foreground">
                {user.fullName || "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/40 bg-background/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <IconMail className="size-5" />
            </div>
            <div>
              <p className="text-3xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </p>
              <p className="text-sm font-bold text-foreground">
                {user.email || "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/40 bg-background/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <IconShield className="size-5" />
            </div>
            <div>
              <p className="text-3xs font-semibold uppercase tracking-wider text-muted-foreground">
                System Role
              </p>
              <p className="text-sm font-bold text-foreground capitalize">
                {user.role || "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full rounded-full border-border/80 font-semibold hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-300"
        >
          <IconLogout className="mr-1.5 size-4" />
          <span>Disconnect Session</span>
        </Button>
      </div>
    </div>
  )
}
