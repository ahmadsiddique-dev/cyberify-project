"use client"

import * as React from "react"
import { useUserStore } from "@/store/user"
import { useRouter } from "next/navigation"
import { ThemeSwitch } from "@/components/elements/ThemeSwitch"
import { Button } from "@/components/ui/button"
import { useApi } from "@/hooks/apiClient"
import { api } from "@/lib/api"
import { IconLogout, IconUser } from "@tabler/icons-react"

interface AgentHeaderMenuProps {
  fullName: string
  role: string
}

export function AgentHeaderMenu({ fullName, role }: AgentHeaderMenuProps) {
  const clearAuth = useUserStore((state) => state.clearAuth)
  const router = useRouter()

  const { execute: executeLogout } = useApi(
    React.useCallback(
      () => api.post("/api/auth/agent/logout").then((res) => res.data),
      []
    )
  )

  const handleLogout = async () => {
    clearAuth()
    await executeLogout()
    router.push("/signin")
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs">
        <IconUser className="size-3.5 text-muted-foreground" />
        <span className="font-semibold text-foreground">{fullName}</span>
        <span className="text-muted-foreground text-3xs capitalize px-1.5 py-0.5 rounded-full bg-muted">
          {role}
        </span>
      </div>
      <ThemeSwitch />
      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className="rounded-full border-border/80 text-xs font-semibold hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
      >
        <IconLogout className="mr-1.5 size-3.5" />
        <span>Disconnect</span>
      </Button>
    </div>
  )
}
