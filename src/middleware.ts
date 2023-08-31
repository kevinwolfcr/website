import type { NextRequest } from "next/server"

import { NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
}

export function middleware(req: NextRequest) {
  const baseUrl = "kevinwolf.cr"

  const docsProject =
    req.headers
      .get("host")!
      .replace(`localhost:${process.env.PORT}`, baseUrl)
      .replace(new RegExp(`^(?:([^.]+)\\.)?${baseUrl.replace(/\./g, "\\.")}$`), "$1") || ""

  if (docsProject) return NextResponse.rewrite(new URL(`/docs/${docsProject}${req.nextUrl.pathname}`, req.url))
}
