"use client"

import type { TooltipContentProps } from "@radix-ui/react-tooltip"
import type { ReactNode } from "react"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/utils/ui"

export type TooltipProps = {
  delay?: number
  content: ReactNode
  children: ReactNode
} & Omit<TooltipContentProps, "content">

export function Tooltip({ delay = 0, sideOffset = 4, content, className, children, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={delay}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={sideOffset}
          className={cn(
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "bg-base-12 text-[12px] text-base-1 font-medium leading-[1] select-none rounded px-[8px] py-[4px] will-change-[transform,opacity]",
            className,
          )}
          {...props}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
