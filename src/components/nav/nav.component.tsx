"use client"

import type { Dispatch, ReactNode, SetStateAction } from "react"

import { IconMenu2, IconX } from "@tabler/icons-react"
import { Fragment, useEffect, useRef, useState } from "react"

import { Paper } from "@/components/paper"
import { cn } from "@/utils/ui"

export type NavProps = {
  isCentered?: boolean
  className?: string
  headerClassName?: string
  header: ReactNode
  navClassName?: string
  children: (actions: { setIsExpanded: Dispatch<SetStateAction<boolean>> }) => ReactNode
}

export function Nav({ isCentered, className, headerClassName, header, navClassName, children }: NavProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const [collapsedNavHeight, setCollapsedNavHeight] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    window.document.body.style.overflow = isExpanded ? "hidden" : ""

    if (!isExpanded && navRef.current) {
      setCollapsedNavHeight(navRef.current.offsetHeight)
    }
  }, [isExpanded])

  return (
    <Fragment>
      {isExpanded ? <div className="sm:hidden" style={{ height: collapsedNavHeight }} /> : null}
      <Paper
        ref={navRef}
        shape="square"
        className={cn(
          "sticky top-0 sm:h-[100dvh] border-x-0 border-t-0 sm:border-b-0 sm:border-r backdrop-blur-lg flex flex-col sm:items-center p-4",
          isCentered ? "justify-between" : "gap-6",
          isExpanded && "fixed sm:sticky inset-0 h-[100dvh]",
          className,
        )}
      >
        <div className={cn("w-full flex items-center justify-between sm:justify-center", headerClassName)}>
          {header}
          <button
            aria-label={isExpanded ? "close menu" : "open menu"}
            className="sm:hidden w-6 h-6 flex items-center justify-center"
            onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
          >
            <IconMenu2 className={cn(isExpanded && "hidden")} />
            <IconX className={cn("hidden", isExpanded && "block")} />
          </button>
        </div>
        {isCentered ? <div className="flex-auto" /> : null}
        <nav
          className={cn(
            isExpanded ? "flex" : "hidden",
            "sm:flex flex-col sm:items-center gap-5 sm:gap-3",
            navClassName,
          )}
        >
          {children({ setIsExpanded })}
        </nav>
        {isCentered ? <div className="flex-auto" /> : null}
      </Paper>
    </Fragment>
  )
}
