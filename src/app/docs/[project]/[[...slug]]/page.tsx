import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Fragment } from "react"

import { Hero } from "@/components/hero"
import { Main } from "@/components/main"
import { MDX } from "@/components/mdx"
import { getDocsConfig, getDocsPage, getDocsParams } from "@/data/docs"
import { mergeMetadata, siteUrl } from "@/utils/seo"
import { cn } from "@/utils/ui"

import { DocsNav } from "./_components/docs-nav"

type DocsPageProps = {
  params: { project: string; slug: string[] }
}

export async function generateStaticParams(): Promise<DocsPageProps["params"][]> {
  return await getDocsParams()
}

// eslint-disable-next-line sort-exports/sort-exports
export async function generateMetadata({ params: { project, slug = [] } }: DocsPageProps) {
  const docs = await getDocsConfig(project)
  if (!docs) return {}

  const path = slug.join("/") || ""
  const page = await getDocsPage(project, slug)
  if (!page) return {}

  const metadataBase = new URL(siteUrl())
  const iconUrl = new URL(`/docs/${project}/icon`, metadataBase)
  const ogImageUrl = new URL(`/docs/${project}/opengraph-image`, metadataBase)
  if (path && page.meta.imgSrc && page.meta.imgAlt) ogImageUrl.searchParams.append("path", path)

  return mergeMetadata({
    metadataBase,
    icons: { icon: iconUrl },
    title: [page.meta.title, docs.title].filter(Boolean).join(" | "),
    description: page.meta.description || docs.description,
    openGraph: {
      images: [
        {
          url: ogImageUrl,
          alt: `${docs.title} website image`,
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  })
}

export default async function DocsPage({ params: { project, slug = [] } }: DocsPageProps) {
  const config = await getDocsConfig(project)
  if (!config) notFound()

  const page = await getDocsPage(project, slug)
  if (!page) notFound()

  return (
    <Fragment>
      <DocsNav title={config.title} repo={config.repo} slug={`/${slug.join("/")}`} menus={config.menus} />
      <Main className="relative z-20">
        <Hero
          title={page.meta.title || config.title}
          subtitle={page.meta.description || config.description}
          imgSrc={page.meta.imgSrc ? new URL(page.meta.imgSrc, page.url).toString() : undefined}
          imgAlt={page.meta.imgAlt}
        />
        <MDX source={page.content} />
        <hr className="my-6 border-base-6" />
        <div className="flex justify-between">
          {page.prev ? <PageLink direction="prev" {...page.prev} /> : <div />}
          {page.next ? <PageLink direction="next" {...page.next} /> : <div />}
        </div>
      </Main>
    </Fragment>
  )
}

function PageLink({ direction, href, label }: { direction: "prev" | "next"; href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn("flex flex-col group relative justify-center", direction === "prev" ? "text-left" : "text-right")}
    >
      {direction === "prev" ? (
        <IconChevronLeft className="absolute hidden lg:block -translate-x-full group-hover:-translate-x-[150%] text-extradimmed opacity-0 group-hover:opacity-100 transition-all will-change-transform" />
      ) : null}
      <span className="typography-2 text-dimmed">{direction === "prev" ? "Previous" : "Next"}</span>
      <span className="text-base group-hover:text-accent transition-colors">{label}</span>
      {direction === "next" ? (
        <IconChevronRight className="absolute right-0 hidden lg:block translate-x-full group-hover:translate-x-[150%] text-extradimmed opacity-0 group-hover:opacity-100 transition-all will-change-transform" />
      ) : null}
    </Link>
  )
}
