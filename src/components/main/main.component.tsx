import type { HTMLAttributes } from "react"

import { cn } from "@/utils/ui"

export type MainProps = HTMLAttributes<HTMLDivElement>

export function Main({ className, ...props }: MainProps) {
  return (
    <main
      className={cn("[grid-area:_main] mx-auto w-full max-w-[800px] flex flex-col px-7 py-9 gap-6", className)}
      {...props}
    />
  )
}
