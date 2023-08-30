import type { PackageManager } from "@/components/mdx/package-manager-command"

import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { Fragment } from "react"

import { Hero } from "@/components/hero"
import { Main } from "@/components/main"
import { MDX } from "@/components/mdx"
import { PackageManagerCommandProvider } from "@/components/mdx/package-manager-command"
import { getDocs, getDocsParams } from "@/data/docs"
import { mergeMetadata, siteUrl } from "@/utils/seo"

import { DocsNav } from "./_components/docs-nav"

type DocsPageProps = {
  params: { project: string; slug: string[] }
}

export async function generateStaticParams(): Promise<DocsPageProps["params"][]> {
  return await getDocsParams()
}

export const revalidate = 10

// eslint-disable-next-line sort-exports/sort-exports
export async function generateMetadata({ params: { project, slug = [] } }: DocsPageProps) {
  const docs = await getDocs(project)
  if (!docs) return {}

  const path = slug.join("/") || ""
  const page = docs.pages[path]
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

// eslint-disable-next-line @typescript-eslint/require-await
async function handlePackageManagerChange(packageManager: PackageManager) {
  "use server"
  cookies().set("packageManager", packageManager)
}

export default async function DocsPage({ params: { project, slug = [] } }: DocsPageProps) {
  const docs = await getDocs(project)
  if (!docs) notFound()

  const page = docs.pages[slug.join("/")]
  if (!page) notFound()

  return (
    <Fragment>
      <DocsNav docs={docs} />
      <Main className="relative z-20">
        <PackageManagerCommandProvider
          initialValue={(cookies().get("packageManager")?.value || "pnpm") as PackageManager}
          onValueChange={handlePackageManagerChange}
        >
          <article className="flex flex-col gap-6">
            {page.meta.imgSrc && page.meta.imgAlt ? (
              <Hero
                title={page.meta.title || docs.title}
                subtitle={page.meta.description || docs.description}
                imgSrc={new URL(page.meta.imgSrc, page.url).toString()}
                imgAlt={page.meta.imgAlt}
              />
            ) : (
              <Fragment>
                <header className="flex flex-col gap-1">
                  <h1 className="typography-8 font-bold">{page.meta.title || docs.title}</h1>
                  <p className="typography-4 text-dimmed">{page.meta.description || docs.description}</p>
                </header>
              </Fragment>
            )}

            <MDX source={page.content} />
          </article>
        </PackageManagerCommandProvider>
      </Main>
    </Fragment>
  )
}
