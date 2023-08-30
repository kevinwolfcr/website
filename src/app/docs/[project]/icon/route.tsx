import { IconBook } from "@tabler/icons-react"

import { ogImageResponse } from "@/utils/og"

export function GET(req: Request) {
  return ogImageResponse(<IconBook className="w-[32px] h-[32px] text-base" />, { req, width: 32, height: 32 })
}
