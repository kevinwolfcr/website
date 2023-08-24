import type { VariantProps } from "cva"
import type { HTMLAttributes } from "react"

import { Slot } from "@radix-ui/react-slot"
import { cva } from "cva"
import { forwardRef } from "react"

import { cn } from "@/utils/ui"

const buttonVariants = cva(
  "min-w-7 min-h-7 rounded-md inline-flex items-center justify-center px-3 gap-1 text-2 font-medium cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-base-12 text-contrast active:translate-y-[2px]",
        secondary:
          "border border-accent-6 hover:border-accent-7 active:border-accent-8 bg-accent-3 hover:bg-accent-4 text-base",
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
