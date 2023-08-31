"use client"

import type { getDocsConfig } from "@/data/docs"

import { IconBrandGithub } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Nav } from "@/components/nav"
import { Tooltip } from "@/components/tooltip"

export type DocsNavProps = {
  title: string
  repo: string
  menus: NonNullable<Awaited<ReturnType<typeof getDocsConfig>>>["menus"]
}

export function DocsNav({ title, repo, menus }: DocsNavProps) {
  const pathname = usePathname()

  return (
    <Nav
      className="sm:w-[280px] sm:flex-shrink-0 sm:justify-start sm:items-start p-0 gap-0"
      headerClassName="p-4 sm:py-5"
      header={
        <div className="mr-4 sm:mr-0 flex-auto flex items-center justify-between typography-4 font-semibold">
          {title}
          <Tooltip delay={0} side="bottom" content="View on GitHub">
            <a
              href={`https://github.com/${repo}`}
              aria-label="view on github"
              target="_blank"
              rel="noopener noreferrer"
              className="text-extradimmed hover:text-base transition-colors"
            >
              <IconBrandGithub strokeWidth={1} />
            </a>
          </Tooltip>
        </div>
      }
      navClassName="w-full border-t border-accent-6/50 px-4 py-5"
    >
      {({ setIsExpanded }) =>
        menus.map((menu) => (
          <div key={menu.href} className="w-full flex flex-col gap-2 mb-3">
            <h4 className="typography-2 font-medium">{menu.label}</h4>
            {menu.items.map((item) => {
              const href = menu.href.concat(item.href)

              return (
                <Link
                  key={item.href}
                  href={href}
                  aria-current={href === pathname ? "page" : undefined}
                  aria-label={item.label}
                  className="typography-2 text-dimmed hover:text-base aria-[current=page]:text-accent transition-colors"
                  onClick={() => setIsExpanded(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))
      }
    </Nav>
  )
}
