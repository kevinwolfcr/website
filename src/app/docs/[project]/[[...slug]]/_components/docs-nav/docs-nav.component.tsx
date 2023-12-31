"use client"

import type { getDocsConfig } from "@/data/docs"

import { IconBrandGithub } from "@tabler/icons-react"
import Link from "next/link"

import { Nav } from "@/components/nav"
import { Tooltip } from "@/components/tooltip"

export type DocsNavProps = {
  title: string
  repo: string
  slug: string
  menus: NonNullable<Awaited<ReturnType<typeof getDocsConfig>>>["menus"]
}

export function DocsNav({ title, repo, slug, menus }: DocsNavProps) {
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
      navClassName="w-full border-t border-base-6/50 px-4 py-5"
    >
      {({ setIsExpanded }) =>
        menus.map((menu) => (
          <div key={menu.label} className="w-full flex flex-col mb-3">
            <h4 className="mb-1 typography-2 font-medium">{menu.label}</h4>
            {menu.items.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.href === slug ? "page" : undefined}
                  aria-label={item.label}
                  className="border-l border-base-6 aria-[current=page]:border-accent-8 typography-2 text-dimmed hover:text-base aria-[current=page]:text-base aria-[current=page]:font-medium py-1 pl-3 transition-colors"
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
