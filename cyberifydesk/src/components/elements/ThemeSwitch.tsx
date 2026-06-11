"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { IconSun, IconMoon } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import React from "react"

export const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div>
      {mounted && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="rounded-full hover:bg-muted"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <IconSun className="size-5 text-yellow-400" />
              ) : (
                <IconMoon className="size-5 text-orange-950" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Press{" "}
            <kbd className="text-2xs rounded bg-muted/20 px-1 py-0.5 font-sans font-bold">
              D
            </kbd>{" "}
            to toggle theme
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
