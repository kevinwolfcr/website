"use client"

import type { HTMLAttributes } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { forwardRef } from "react"

export type HomeLinkProps = HTMLAttributes<HTMLAnchorElement> & { href: string }

export const HomeLink = forwardRef<HTMLAnchorElement, HomeLinkProps>((props, ref) => {
  const pathname = usePathname()
  const Wrapper = pathname === "/" ? "a" : Link

  return <Wrapper ref={ref} {...props} />
})
