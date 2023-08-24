import type { MDXRemoteProps } from "next-mdx-remote/rsc"

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
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        a: (props) => <a className="font-medium text-base hover:text-accent transition-colors" {...props} />,
        ...components,
      }}
    />
  )
}
