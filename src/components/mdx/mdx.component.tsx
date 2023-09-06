import type { PackageManager } from "@/components/mdx/package-manager-command"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import type { ComponentProps, HTMLAttributes, ReactElement } from "react"

import { IconExternalLink } from "@tabler/icons-react"
import { Code } from "bright"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"

import { cn } from "@/utils/ui"

import theme from "./mdx.theme.json"
import { PackageManagerCommand } from "./package-manager-command"

export type MDXProps = MDXRemoteProps & {
  className?: string
}

export function MDX({ className, components, ...props }: MDXProps) {
  return (
    <div className={cn("text-dimmed [&>:first-child]:mt-0", className)}>
      <MDXRemote
        {...props}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="mt-8 typography-8 text-base font-semibold" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="mt-7 border-b border-base-6 pb-2 typography-7 text-base font-semibold" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="mt-6 typography-6 text-base font-semibold" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="mt-5 typography-5 text-base font-semibold" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className="mt-5 typography-4 text-base font-semibold" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className="mt-5 typography-3 text-base font-semibold" {...props}>
              {children}
            </h6>
          ),
          p: ({ children, ...props }) => (
            <p className="mt-5" {...props}>
              {children}
            </p>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-medium text-base" {...props}>
              {children}
            </strong>
          ),
          a: ({ ref, href, children, ...props }) => {
            if (!href) return null
            const isExternal = href.startsWith("http://") || href.startsWith("https://")
            const Wrapper = isExternal ? "a" : Link

            if (isExternal) {
              Object.assign(props, { target: "_blank", rel: "noopener noreferrer" })
            }

            return (
              <Wrapper
                href={href}
                className="inline-flex items-center gap-1 font-medium text-base hover:underline transition-colors"
                {...props}
              >
                {children}
                {isExternal ? <IconExternalLink className="w-[1em] h-[1em]" /> : null}
              </Wrapper>
            )
          },
          ul: ({ children, ...props }) => (
            <ul className="mt-5 pl-[1em] list-disc" {...props}>
              {children}
            </ul>
          ),
          li: ({ children, ...props }) => <li {...props}>{children}</li>,
          pre: (props) => {
            const { className, children } = (props.children as ReactElement<HTMLAttributes<HTMLElement>>).props

            return (
              <Code
                theme={theme as ComponentProps<typeof Code>["theme"]}
                className="!m-0 !mt-5 border border-base-6"
                codeClassName="max-h-[420px] typography-2"
              >
                <code className={className}>{children}</code>
              </Code>
            )
          },
          code: (props) => <code className="rounded bg-base-3 p-[0.25em_0.5em] text-[0.8em] text-base" {...props} />,
          PackageManagerCommand: (props: Record<PackageManager, "string">) => (
            <PackageManagerCommand
              content={Object.entries(props).reduce(
                (content, [packageManager, command]) => ({
                  ...content,
                  [packageManager]: <MDX source={["```sh", command, "```"].join("\n")} />,
                }),
                {},
              )}
            />
          ),
          ...components,
        }}
      />
    </div>
  )
}
