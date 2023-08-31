import type { HTMLAttributes } from "react"

import Image from "next/image"

import { MDX } from "../mdx"

export type HeroProps = HTMLAttributes<HTMLElement> & {
  title: string
  subtitle: string
  imgSrc?: string
  imgAlt?: string
}

export function Hero({ title, subtitle, imgSrc, imgAlt, ...props }: HeroProps) {
  return (
    <header className="flex flex-col md:flex-row-reverse items-center gap-5" {...props}>
      {imgSrc && imgAlt ? (
        <Image priority src={imgSrc} alt={imgAlt} width={300} height={300} className="flex-shrink-0" />
      ) : null}
      <div className="flex-auto flex flex-col gap-3">
        <h1 className="typography-8 font-bold">
          <MDX
            className="text-base"
            source={title}
            components={{
              p: ({ children }) => children,
              strong: ({ children }) => <strong className="[font-weight:inherit] text-accent">{children}</strong>,
            }}
          />
        </h1>
        <MDX
          className="typography-4"
          source={subtitle}
          components={{
            p: ({ children }) => children,
            strong: ({ children }) => <strong className="[font-weight:inherit] text-accent">{children}</strong>,
          }}
        />
      </div>
    </header>
  )
}
