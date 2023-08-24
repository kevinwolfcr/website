import type { ClassValue } from "clsx"

import clsx from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

import twConfig from "../../../tailwind.config"

const twMerge = extendTailwindMerge({
  classGroups: {
    color: [
      { text: [...Object.keys(twConfig.theme?.colors || {}), "base", "dimmed", "extradimmed", "contrast", "accent"] },
    ],
    "font-size": [{ text: Object.keys(twConfig.theme?.fontSize || {}) }],
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
