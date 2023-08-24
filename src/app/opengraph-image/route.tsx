import { OgImage } from "@/components/og-image"
import { ogImageResponse } from "@/utils/og"
import { siteUrl } from "@/utils/seo"

export const runtime = "edge"

// eslint-disable-next-line sort-exports/sort-exports
export function GET(req: Request) {
  return ogImageResponse(
    <OgImage className="flex-row items-center justify-center gap-6">
      <div className="w-[380px] flex flex-col gap-7">
        <span className="text-9 tracking-9 leading-[1em] font-bold flex flex-wrap">
          Hola! I&apos;m <span className="text-accent">Kevin Wolf</span>.
        </span>
        <div className="flex flex-col typography-4 text-dimmed">
          <span className="flex">
            Crafting
            <span className="w-[6px]" />
            <span className="text-accent">digital experiences</span>, one commit at a
          </span>
          <span className="flex">
            time from
            <span className="w-[6px]" />
            <span className="text-accent">San José, Costa Rica</span>.
          </span>
        </div>
      </div>
      <div
        className={`w-[300px] h-[300px] flex bg-[url(${siteUrl("images/about/hero.png")})] bg-[length:300px_300px]`}
      />
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
