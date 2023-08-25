import type { Style } from "@react-pdf/types"
import type { NextApiRequest, NextApiResponse } from "next"

import { Document, Font, Page, renderToBuffer, Text, View } from "@react-pdf/renderer"

import { about } from "@/data/about"
import { contact } from "@/data/contact"
import { experience } from "@/data/experience"
import { stack } from "@/data/stack"
import { createTailwindConverter } from "@/utils/ui"

export const dynamic = "force-dynamic"

export default async function Resume(_req: NextApiRequest, res: NextApiResponse) {
  const tw = (await createTailwindConverter()) as (
    ...args: Parameters<Awaited<ReturnType<typeof createTailwindConverter>>>
  ) => Style | Style[]

  ;[
    ["Inter-Thin", "Inter-ThinItalic"],
    ["Inter-ExtraLight", "Inter-ExtraLightItalic"],
    ["Inter-Light", "Inter-LightItalic"],
    ["Inter-Regular", "Inter-Italic"],
    ["Inter-Medium", "Inter-MediumItalic"],
    ["Inter-SemiBold", "Inter-SemiBoldItalic"],
    ["Inter-Bold", "Inter-BoldItalic"],
    ["Inter-ExtraBold", "Inter-ExtraBoldItalic"],
    ["Inter-Black", "Inter-BlackItalic"],
  ].forEach((font, i) => {
    const fontWeight = (i + 1) * 100
    ;(["normal", "italic"] as const).forEach((fontStyle, i) => {
      Font.register({
        family: "Inter",
        src: new URL(`${font[i]}.otf?v=3.19`, "https://rsms.me/inter/font-files/").toString(),
        fontWeight,
        fontStyle,
      })
    })
  })

  const buffer = await renderToBuffer(
    <Document title={`${about.name}'s Résumé`} author={about.name} language="en">
      <Page size="A4" style={tw("bg-accent-1 flex flex-col gap-[32px] p-[24px] font-[Inter] font-normal text-base")}>
        <View style={tw("flex flex-col")}>
          <Text style={tw("text-[16px] font-semibold text-accent")}>{about.name}</Text>
          <Text style={tw("mt-[4px] text-[12px] text-dimmed")}>{about.position}</Text>
          <Text style={tw("mt-[12px] text-[10px] leading-[1.5] text-dimmed")}>{about.description}</Text>
        </View>
        <Text style={tw("text-[14px] font-semibold")}>Work Experience</Text>
        <View>
          {experience.items.map((item, i) => (
            <View key={item.id} style={tw("flex flex-row gap-[16px]")}>
              <View style={tw("relative")}>
                <View style={tw("w-[8px] h-[8px] rounded-full bg-accent-9")} />
                {i < experience.items.length - 1 ? (
                  <View style={tw("absolute top-[8px] bottom-0 left-1/2 w-[1px] bg-accent-5")} />
                ) : null}
              </View>
              <View style={tw("w-full flex flex-col gap-[12px] pb-[24px]")}>
                <View style={tw("flex flex-col gap-[4px]")}>
                  <Text style={tw("leading-[1] uppercase text-[8px] font-medium text-dimmed")}>
                    {item.startDate} - {item.endDate}
                  </Text>
                  <Text style={tw("text-[12px] font-medium text-base")}>
                    {item.position} @ {item.company}
                  </Text>
                </View>
                <Text style={tw("text-[10px] leading-[1.5] text-dimmed")}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={tw("text-[14px] font-semibold")}>Stack</Text>
        <View style={tw("flex flex-col gap-[24px]")}>
          {stack.groups.map((group) => (
            <View key={group.id} style={tw("flex flex-col gap-[12px]")}>
              <Text style={tw("text-[12px] font-medium")}>{group.title}</Text>
              <View style={tw("flex flex-row flex-wrap")}>
                {group.items.map((item) => (
                  <View key={item.id} style={tw("w-[25%] flex flex-row items-center gap-[4px] pb-[4px]")}>
                    <View style={tw("w-[4px] h-[4px] rounded-full bg-accent-9")} />
                    <Text style={tw("text-[10px] text-dimmed")}>{item.title}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={tw("border-t border-[#132f3d] flex flex-col gap-[4px] pt-[24px]")}>
          {[
            contact.social.email,
            `https://github.com/${contact.social.github}`,
            `https://x.com/${contact.social.x}`,
            contact.social.website,
          ].map((item) => (
            <Text key={item} style={tw("text-[10px] text-extradimmed")}>
              {item}
            </Text>
          ))}
        </View>
      </Page>
    </Document>,
  )

  res.status(200).setHeader("Content-Type", "application/pdf").send(buffer)
}
