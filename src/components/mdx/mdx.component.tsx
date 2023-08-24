import type { MDXRemoteProps } from "next-mdx-remote/rsc"

import { IconExternalLink } from "@tabler/icons-react"
import { MDXRemote } from "next-mdx-remote/rsc"

export type MDXProps = MDXRemoteProps

export function MDX({ components, ...props }: MDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{
        // eslint-disable-next-line jsx-a11y/heading-has-content
        h1: (props) => <h1 className="typography-8 font-semibold" {...props} />,
        // eslint-disable-next-line jsx-a11y/heading-has-content
        h2: (props) => <h2 className="typography-7 font-semibold" {...props} />,
        strong: (props) => <strong className="font-medium text-base" {...props} />,
        a: ({ children, ...props }) => {
          const isExternal = props.href && (props.href.startsWith("http://") || props.href.startsWith("https://"))

          return (
            <a
              className="inline-flex items-center gap-1 font-medium text-base hover:text-accent transition-colors"
              {...props}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {children}
              {isExternal ? <IconExternalLink className="w-[1em] h-[1em]" /> : null}
            </a>
          )
        },
        ...components,
      }}
    />
  )
}
