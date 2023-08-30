import type { NextRequest } from "next/server"

import { NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
}

function getDocsProject(host: string) {
  const parts = host.split(".")

  if (
    (host.endsWith(`localhost:${process.env.PORT}`) && parts.length === 2) ||
    (host.endsWith(".vercel.app") && parts.length === 4) ||
    (host.endsWith("kevinwolf.cr") && parts.length === 3)
  ) {
    return parts[0]
  }

  return null
}

export function middleware(req: NextRequest) {
  const docsProject = getDocsProject(req.headers.get("host")!)
  if (docsProject) return NextResponse.rewrite(new URL(`/docs/${docsProject}${req.nextUrl.pathname}`, req.url))
}
