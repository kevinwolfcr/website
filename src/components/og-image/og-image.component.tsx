import type { ReactNode } from "react"

import { cn } from "@/utils/ui"

export type OgImageProps = {
  className?: string
  children: ReactNode
}

export function OgImage({ className, children }: OgImageProps) {
  return (
    <div className={cn("relative w-[1200px] h-[630px] flex", className)}>
      <div
        className="absolute inset-0 flex"
        style={{ backgroundImage: `url(${process.env.VERCEL_URL}/images/og-bg.png)` }}
      />
      <div className={cn("absolute inset-0 flex flex-col antialiased font-[Inter] typography-3 text-base", className)}>
        {children}
      </div>
    </div>
  )
}
