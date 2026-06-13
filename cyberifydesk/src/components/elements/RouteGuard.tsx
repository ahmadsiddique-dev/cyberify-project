"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useUserStore } from "@/store/user"
import { useApi } from "@/hooks/apiClient"
import { api } from "@/lib/api"
import { BackgroundBlur } from "./BackgroundBlur"
import { IconLoader2 } from "@tabler/icons-react"

interface RouteGuardProps {
  children: React.ReactNode
}

const authRoutes = ["/signin", "/signup", "/forgot-password"]
const protectedPrefixes = ["/dashboard"]

export function RouteGuard({ children }: RouteGuardProps) {
  const accessToken = useUserStore((state) => state.accessToken)
  const setAuth = useUserStore((state) => state.setAuth)
  const clearAuth = useUserStore((state) => state.clearAuth)
  const router = useRouter()
  const pathname = usePathname()

  const [hydrated, setHydrated] = React.useState(false)
  const [verifying, setVerifying] = React.useState(true)
  const verifiedRef = React.useRef(false)

  const { execute: verifySession } = useApi(
    React.useCallback(
      () =>
        api
          .post("/api/auth/agent/verify")
          .then((res) => res.data),
      []
    )
  )

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return

    const checkAuth = async () => {
      const isAuthRoute = authRoutes.includes(pathname)
      const isProtectedRoute = protectedPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
      )

      if (!isAuthRoute && !isProtectedRoute) {
        setVerifying(false)
        return
      }

      if (!accessToken) {
        verifiedRef.current = false
        if (isProtectedRoute) {
          clearAuth()
          router.push("/signin")
        } else {
          setVerifying(false)
        }
        return
      }

      if (verifiedRef.current) {
        if (isAuthRoute) {
          router.push("/dashboard")
        } else {
          setVerifying(false)
        }
        return
      }

      const res = await verifySession()
      if (res && res.success) {
        const newAccessToken = res.accessToken || accessToken
        setAuth(newAccessToken, res.user)
        verifiedRef.current = true

        if (isAuthRoute) {
          router.push("/dashboard")
        } else {
          setVerifying(false)
        }
      } else {
        clearAuth()
        if (isProtectedRoute) {
          router.push("/signin")
        } else {
          setVerifying(false)
        }
      }
    }

    setVerifying(true)
    checkAuth()
  }, [pathname, accessToken, hydrated, verifySession, clearAuth, setAuth, router])

  if (!hydrated) {
    return null
  }

  const isAuthRoute = authRoutes.includes(pathname)
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  )

  if (verifying && (isProtectedRoute || (isAuthRoute && accessToken))) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 font-sans text-foreground transition-colors duration-300 selection:bg-primary/30">
        <BackgroundBlur />
        <div className="z-10 flex flex-col items-center gap-4 py-8 px-12 rounded-2xl border border-border/40 bg-card/30 p-8 shadow-2xl backdrop-blur-md">
          <IconLoader2 className="size-8 animate-spin text-orange-500" />
          <p className="text-xs text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
