import "./styles.css"

import type { ReactNode } from "react"

import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"

import { about } from "@/data/about"
import { mergeMetadata, siteUrl } from "@/utils/seo"
import { cn } from "@/utils/ui"

import { Aside } from "./_components/aside"
import { Glass } from "./_components/glass"
import { Nav } from "./_components/nav"

export const metadata = mergeMetadata({
  metadataBase: new URL(siteUrl("/")),
  icons: {
    icon: "/icon",
  },
  title: {
    default: `${about.name} - ${about.position}`,
    template: `%s | ${about.name} - ${about.position}`,
  },
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

type LayoutProps = {
  children: ReactNode
}

const inter = Inter({ subsets: ["latin"] })

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className={cn(inter.className, "scroll-smooth")}>
      <body className="min-h-[100dvh] bg-accent-1 flex flex-col sm:flex-row antialiased typography-3 text-base selection:bg-accent-12 selection:text-accent-1">
        <Glass />
        <Nav />
        <div className="relative z-20 flex-auto flex flex-col lg:flex-row-reverse">
          {children}
          <Aside />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
