import type { NextRequest } from "next/server"

import { NextResponse } from "next/server"

import { siteUrl } from "./utils/seo"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
}

export function middleware(req: NextRequest) {
  const currentUrl = siteUrl().replace(/^https?:\/\//, "")
  const baseUrl = "kevinwolf.cr"
  const url = req.headers.get("host")!.replace(currentUrl, baseUrl)
  const docsProject = url.replace(new RegExp(`^(?:([^.]+)\\.)?${baseUrl.replace(/\./g, "\\.")}$`), "$1") || ""
  if (docsProject) return NextResponse.rewrite(new URL(`/docs/${docsProject}${req.nextUrl.pathname}`, req.url))
}
