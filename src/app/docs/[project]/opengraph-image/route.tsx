import { OgImage } from "@/components/og-image"
import { getDocsConfig, getDocsPage } from "@/data/docs"
import { ogImageResponse } from "@/utils/og"

export async function GET(req: Request, { params: { project } }: { params: { project: string } }) {
  try {
    const docs = await getDocsConfig(project)
    if (!docs) throw new Error(`Docs not found for project: ${project}`)

    const page = await getDocsPage(project, (new URL(req.url).searchParams.get("path") || "").split("/"))
    if (!page || !page.meta.imgSrc || !page.meta.imgAlt) throw new Error(`Can not handle path.`)

    return ogImageResponse(
      <OgImage className="flex-row items-center justify-center gap-5">
        <div className="w-[420px] flex flex-col gap-5">
          <span className="h-auto typography-9 font-bold">{page.meta.title || docs.title}</span>
          <span className="typography-5 text-dimmed">{page.meta.description || docs.description}</span>
        </div>
        <div
          className={`w-[400px] h-[400px] flex bg-[url(${new URL(
            page.meta.imgSrc,
            page.url,
          ).toString()})] bg-[length:400px_400px]`}
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
  } catch (err) {
    return new Response(err instanceof Error ? err.message : "Unknown error")
  }
}
