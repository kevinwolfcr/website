import matter from "gray-matter"
import { z } from "zod"

const projects = [{ id: "devtools", repo: "kevinwolfcr/devtools" }]

async function getFile(url: URL) {
  try {
    const request = await fetch(url)
    return await request.text()
  } catch (err) {
    throw new Error(`Error fetching ${url.toString()}: ${err instanceof Error ? err.message : "Unknown error"}`)
  }
}

export async function getDocsConfig(projectId: string) {
  const project = projects.find((project) => project.id === projectId)
  if (!project) return null

  const baseUrl = new URL(
    process.env.LOCAL_DOCS
      ? `${process.env.LOCAL_DOCS}/${project.repo}/docs/`
      : `https://raw.githubusercontent.com/${project.repo}/main/docs/`,
  )

  const projectConfigSchema = z.object({
    title: z.string(),
    description: z.string(),
    menus: z.array(
      z.object({
        href: z.string(),
        label: z.string(),
        items: z.array(z.object({ href: z.string(), label: z.string(), file: z.string() })),
      }),
    ),
  })

  const config = projectConfigSchema.parse(JSON.parse(await getFile(new URL("./config.json", baseUrl))))
  const pages: Record<string, URL> = {}

  for (const menu of config.menus) {
    for (const item of menu.items) {
      pages[menu.href.concat(item.href).replace(/^\//, "")] = new URL(item.file, baseUrl)
    }
  }

  return {
    baseUrl,
    ...project,
    ...config,
    pages,
  }
}

// eslint-disable-next-line sort-exports/sort-exports
export async function getDocsPage(projectId: string, slug: string[]) {
  const config = await getDocsConfig(projectId)
  if (!config) return null

  const url = config.pages[slug.join("/")]
  if (!url) return null

  const { data, content } = matter(await getFile(url))

  const pageMetaSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
  })

  return {
    url,
    meta: pageMetaSchema.parse(data),
    content,
  }
}
