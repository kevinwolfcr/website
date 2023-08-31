import type { ReactNode } from "react"

import { Fragment } from "react"

import { about } from "@/data/about"
import { mergeMetadata, siteUrl } from "@/utils/seo"

import { SiteAside } from "./_components/site-aside"
import { SiteNav } from "./_components/site-nav"

export const metadata = mergeMetadata({
  metadataBase: new URL(siteUrl()),
  icons: { icon: "/icon" },
  title: { default: `${about.name} - ${about.position}`, template: `%s | ${about.name} - ${about.position}` },
  description: about.description,
  openGraph: {
    images: [
      { url: "/opengraph-image", alt: `${about.name} website image`, width: 1200, height: 630, type: "image/png" },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
})

// eslint-disable-next-line sort-exports/sort-exports
export type SiteLayoutProps = {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <Fragment>
      <SiteNav />
      <div className="relative z-20 flex-auto flex flex-col lg:flex-row-reverse">
        {children}
        <SiteAside />
      </div>
    </Fragment>
  )
}
