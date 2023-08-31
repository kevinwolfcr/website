import type { NextRequest } from "next/server"

import { revalidateTag } from "next/cache"

export function GET(req: NextRequest) {
  const tags = req.nextUrl.searchParams.getAll("tag")
  if (!tags.length) return new Response("Tags not specified")
  tags.forEach(revalidateTag)
  return new Response(`Successfuly revalidated tags: ${tags.join(", ")}.`)
}
