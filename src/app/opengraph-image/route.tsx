import { Logo } from "@/components/logo"
import { OgImage } from "@/components/og-image"
import { about } from "@/data/about"
import { ogImageResponse } from "@/utils/og"

export function GET(req: Request) {
  return ogImageResponse(
    <OgImage className="items-center justify-center gap-5 text-center">
      <div className="w-[150px] h-[150px] rounded-full bg-base-1 flex items-center justify-center">
        <Logo className="w-[75px] h-[100px]" />
      </div>
      <div className="flex flex-col items-center">
        <span className="typography-5 font-semibold">{about.name}</span>
        <span className="typography-4 text-dimmed">{about.position}</span>
      </div>
      <p color="base" className="typography-3 text-base w-[580px]">
        {about.description}
      </p>
    </OgImage>,
    {
      req,
      width: 1200,
      height: 630,
      fonts: [
        ["Inter-Thin", "Inter-ThinItalic"],
        ["Inter-ExtraLight", "Inter-ExtraLightItalic"],
        ["Inter-Light", "Inter-LightItalic"],
        ["Inter-Regular", "Inter-Italic"],
        ["Inter-Medium", "Inter-MediumItalic"],
        ["Inter-SemiBold", "Inter-SemiBoldItalic"],
        ["Inter-Bold", "Inter-BoldItalic"],
        ["Inter-ExtraBold", "Inter-ExtraBoldItalic"],
        ["Inter-Black", "Inter-BlackItalic"],
      ]
        .map((font, i) => {
          const weight = ((i + 1) * 100) as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
          return (["normal", "italic"] as const).map((style, i) => ({
            name: "Inter",
            url: new URL(`${font[i]}.otf?v=3.19`, "https://rsms.me/inter/font-files/"),
            weight,
            style,
          }))
        })
        .flat(),
    },
  )
}

export const runtime = "edge"
