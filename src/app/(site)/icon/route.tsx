import { Logo } from "@/components/logo"
import { ogImageResponse } from "@/utils/og"

export function GET(req: Request) {
  return ogImageResponse(
    <div className="w-[32px] h-[32px] flex items-center justify-center">
      <Logo className="h-[32px] w-[24px]" />
    </div>,
    { req, width: 32, height: 32 },
  )
}
