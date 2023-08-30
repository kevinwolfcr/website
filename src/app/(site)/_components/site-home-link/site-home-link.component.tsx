"use client"

import type { HTMLAttributes } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { forwardRef } from "react"

export type SiteHomeLinkProps = HTMLAttributes<HTMLAnchorElement> & { href: string }

export const SiteHomeLink = forwardRef<HTMLAnchorElement, SiteHomeLinkProps>((props, ref) => {
  const pathname = usePathname()
  const Wrapper = pathname === "/" ? "a" : Link

  return <Wrapper ref={ref} {...props} />
})
