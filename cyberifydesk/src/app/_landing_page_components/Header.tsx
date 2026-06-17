import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeSwitch } from "@/components/elements/ThemeSwitch"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Cyberify Desk Logo"
            width={32}
            height={32}
            className="size-8 object-contain"
          />
          <span className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-xl font-bold tracking-tight">
            Cyberify Desk
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a
            href="#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a href="#demo" className="transition-colors hover:text-foreground">
            Interactive Demo
          </a>
          <a
            href="#testimonials"
            className="transition-colors hover:text-foreground"
          >
            Testimonials
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <Button
            variant="ghost"
            asChild
            className="hidden rounded-full text-sm font-semibold sm:inline-flex"
          >
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-linear-to-r from-orange-600 to-amber-500 px-5 font-semibold text-white shadow-md shadow-orange-500/10 hover:from-orange-500 hover:to-amber-400"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
