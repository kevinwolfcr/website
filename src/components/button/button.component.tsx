import type { VariantProps } from "cva"
import type { HTMLAttributes } from "react"

import { Slot } from "@radix-ui/react-slot"
import { cva } from "cva"
import { forwardRef } from "react"

import { cn } from "@/utils/ui"

const buttonVariants = cva(
  "min-w-7 min-h-7 rounded inline-flex items-center justify-center px-3 gap-1 text-2 font-medium cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-base-12 active:translate-y-[2px] text-contrast",
        secondary: "border border-base-7 hover:border-base-8 active:border-base-9 bg-base-3 hover:bg-base-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
)

export type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ asChild, variant, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return <Comp ref={ref} className={cn(buttonVariants({ variant, className }))} {...props} />
})
