"use client"

import type { HTMLAttributes } from "react"

import { cn } from "@/utils/ui"

export type SectionProps = HTMLAttributes<HTMLElement> & {
  title?: string
  subtitle?: string
  contentClassName?: string
}

export function Section({ className, title, subtitle, contentClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn("scroll-mt-[120px] md:scroll-mt-9 flex flex-col gap-7", className)} {...props}>
      {title || subtitle ? (
        <div className="flex flex-col gap-2">
          {title ? <h2 className="typography-7 font-semibold">{title}</h2> : null}
          {subtitle ? <p className="typography-4 text-dimmed">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className={cn("flex flex-col gap-7", contentClassName)}>{children}</div>
    </section>
  )
}
