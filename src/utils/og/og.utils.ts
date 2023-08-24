import type { CSSProperties, ReactElement } from "react"
import type { TailwindConfig } from "tw-to-css"

import { Parser } from "html-to-react"
import { ImageResponse } from "next/server"
import { Children, cloneElement, isValidElement } from "react"
import { tailwindToCSS } from "tw-to-css"

type OgElement = ReactElement<{
  className?: string
  style?: CSSProperties
  children?: OgElement[]
}>

type ImageResponseOpts = NonNullable<ConstructorParameters<typeof ImageResponse>[1]>

export async function ogImageResponse(
  el: OgElement,
  {
    req,
    fonts,
    ...opts
  }: Omit<ImageResponseOpts, "fonts"> & {
    req?: Request
    fonts?: (Omit<NonNullable<ImageResponseOpts["fonts"]>[number], "data"> & { url: URL })[]
  } = {},
) {
  const { renderToStaticMarkup } = await import("react-dom/server")

  let twConfig = (await import("../../../tailwind.config")).default as TailwindConfig
  twConfig = {
    ...twConfig,
    plugins: [...twConfig.plugins!.slice(0, 1), ...twConfig.plugins!.slice(2)],
  }

  const { twj } = tailwindToCSS({ config: twConfig })

  const jsx = inlineTailwind(new Parser().parse(renderToStaticMarkup(el)) as OgElement)

  function inlineTailwind(el: OgElement): OgElement {
    const { className, children, ...props } = el.props
    let style: OgElement["props"]["style"] = {}

    if (className) {
      style = twj(className.split(" "))
    }

    return cloneElement(
      el,
      { ...props, style },
      Children.map(children || [], (child) => (isValidElement(child) ? inlineTailwind(child) : child)),
    )
  }

  if (req && new URL(req.url).searchParams.get("debug")) {
    let style = ""

    if (fonts) {
      style = [
        "<style>",
        ...fonts.map((font) =>
          [
            "@font-face {",
            `  font-family: '${font.name}';`,
            font.style && `  font-style: ${font.style};`,
            font.weight && `  font-weight: ${font.weight};`,
            `  src: url(${font.url.toString()});`,
            "}",
          ]
            .filter(Boolean)
            .join("\n"),
        ),
        "</style>",
      ].join("\n")
    }

    return new Response([style, renderToStaticMarkup(jsx)].filter(Boolean).join("\n"), {
      headers: { "content-type": "text/html" },
    })
  }

  return new ImageResponse(jsx, {
    ...opts,
    fonts: fonts
      ? await Promise.all(
          fonts?.map(async (font) => ({
            name: font.name,
            style: font.style,
            weight: font.weight,
            data: await fetch(font.url).then((res) => res.arrayBuffer()),
          })),
        )
      : undefined,
  })
}