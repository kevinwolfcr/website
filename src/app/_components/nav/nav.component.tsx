"use client"

import * as Icons from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { Logo } from "@/components/logo"
import { Paper } from "@/components/paper"
import { Tooltip } from "@/components/tooltip"
import { about } from "@/data/about"
import { contact } from "@/data/contact"
import { experience } from "@/data/experience"
import { projects } from "@/data/projects"
import { stack } from "@/data/stack"
import { cn } from "@/utils/ui"

import { HomeLink } from "../home-link"

const NAV_ITEMS = [about, experience, stack, projects, contact].map(({ id, icon, label }) => ({
  href: `#${id}`,
  icon,
  label,
}))

export function Nav() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeHref, setActiveHref] = useState<string | null>(null)

  useEffect(() => {
    window.document.body.style.overflow = isExpanded ? "hidden" : ""
  }, [isExpanded])

  useEffect(() => {
    const onScroll = () => {
      const fromTop = window.scrollY
      for (const item of NAV_ITEMS) {
        const section = document.querySelector<HTMLDivElement>(item.href)
        if (section) {
          const isActive =
            section.offsetTop - (parseFloat(getComputedStyle(section).scrollMarginTop) || 0) <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
          if (isActive) {
            setActiveHref(item.href)
            break
          }
        }
      }
    }

    document.addEventListener("scroll", onScroll)
    return () => document.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <Paper
      shape="square"
      className={cn(
        "sticky top-0 sm:h-[100dvh] border-x-0 border-t-0 sm:border-b-0 sm:border-r backdrop-blur-lg flex flex-col justify-between sm:items-center p-4",
        isExpanded && "h-[100dvh]",
      )}
    >
      <div className="flex items-center justify-between">
        <HomeLink href="/#" aria-label="Go to homepage">
          <Logo className="w-6" />
        </HomeLink>
        <button
          aria-label={isExpanded ? "close menu" : "open menu"}
          className="sm:hidden w-6 h-6 flex items-center justify-center"
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        >
          <Icons.IconMenu2 className={cn(isExpanded && "hidden")} />
          <Icons.IconX className={cn("hidden", isExpanded && "block")} />
        </button>
      </div>
      <div className="flex-auto" />
      <nav className={cn(isExpanded ? "flex" : "hidden", "sm:flex flex-col sm:items-center gap-5 sm:gap-3")}>
        {NAV_ITEMS.map((item, i) => (
          <Tooltip key={item.href} delay={0} side="right" content={item.label}>
            <HomeLink
              href={item.href}
              aria-current={item.href === activeHref || (!activeHref && i === 0) ? "page" : undefined}
              aria-label={item.label}
              className={cn(
                "sm:w-7 sm:h-7 rounded-md sm:hover:bg-accent-4 flex items-center sm:justify-center gap-3 sm:text-dimmed sm:hover:text-base transition-colors",
                "sm:aria-[current=page]:bg-accent-9 sm:aria-[current=page]:text-contrast",
              )}
              onClick={() => setIsExpanded(false)}
            >
              <item.icon strokeWidth={1} />
              <span className="sm:hidden">{item.label}</span>
            </HomeLink>
          </Tooltip>
        ))}
      </nav>
      <div className="flex-auto" />
    </Paper>
  )
}
