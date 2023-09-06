import "./styles.css"

import type { ReactNode } from "react"

import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"

import { cn } from "@/utils/ui"

import { Glass } from "./_components/glass"

const inter = Inter({ subsets: ["latin"] })

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn(inter.className, "scroll-smooth")}>
      <body className="min-h-[100dvh] bg-base-1 flex flex-col sm:flex-row antialiased typography-3 text-base selection:bg-base-12 selection:text-base-1">
        <Glass />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
