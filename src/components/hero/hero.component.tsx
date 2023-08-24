import type { HTMLAttributes } from "react"

import Image from "next/image"

import { MDX } from "../mdx"

export type HeroProps = HTMLAttributes<HTMLElement> & {
  title: string
  subtitle: string
  imgSrc: string
  imgAlt: string
}

export function Hero({ title, subtitle, imgSrc, imgAlt, ...props }: HeroProps) {
  return (
    <header className="flex flex-col md:flex-row-reverse items-center gap-5 md:px-2" {...props}>
      <Image priority src={imgSrc} alt={imgAlt} width={300} height={300} className="flex-shrink-0" />
      <div className="flex flex-col gap-3 md:gap-5">
        <h1 className="typography-8 sm:typography-9 font-bold">
          <MDX
            source={title}
            components={{
              p: ({ children }) => children,
              strong: ({ children }) => <strong className="[font-weight:inherit] text-accent">{children}</strong>,
            }}
          />
        </h1>
        <p className="typography-4 text-dimmed">
          <MDX
            source={subtitle}
            components={{
              p: ({ children }) => children,
              strong: ({ children }) => <strong className="[font-weight:inherit] text-accent">{children}</strong>,
            }}
          />
        </p>
      </div>
    </header>
  )
}
