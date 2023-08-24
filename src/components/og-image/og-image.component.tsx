import type { ReactNode } from "react"

import { cn } from "@/utils/ui"

export type OgImageProps = {
  className?: string
  children: ReactNode
}

export function OgImage({ className, children }: OgImageProps) {
  return (
    <div
      className={cn(
        "w-[1200px] h-[630px] bg-[#0c1820] flex flex-col antialiased font-[Inter] typography-3 text-base",
        className,
      )}
    >
      {children}
    </div>
  )
}
