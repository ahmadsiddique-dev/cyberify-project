"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import {
  IconLayoutDashboard,
  IconTicket,
  IconUsers,
  IconBook,
  IconSettings,
} from "@tabler/icons-react"

export function SidebarMenuLinks() {
  const pathname = usePathname()

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      tooltip: "Dashboard",
      icon: IconLayoutDashboard,
    },
    {
      href: "/dashboard/tickets",
      label: "Tickets Queue",
      tooltip: "Tickets Queue",
      icon: IconTicket,
    },
    {
      href: "/dashboard/customers",
      label: "Customers",
      tooltip: "Customers",
      icon: IconUsers,
    },
    {
      href: "/dashboard/knowledge-base",
      label: "Knowledge Base",
      tooltip: "Knowledge Base",
      icon: IconBook,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      tooltip: "Settings",
      icon: IconSettings,
    },
  ]

  return (
    <>
      {links.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href

        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton tooltip={link.tooltip} isActive={isActive} asChild>
              <Link href={link.href}>
                <Icon className="size-5! transition-all duration-200 ease-linear group-data-[collapsible=icon]:size-4!" />
                <span className="whitespace-nowrap text-xs transition-all duration-200 ease-linear opacity-100 max-w-[150px] group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:opacity-0 overflow-hidden">
                  {link.label}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </>
  )
}
