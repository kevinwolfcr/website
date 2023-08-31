import matter from "gray-matter"
import { z } from "zod"

const projects = [{ id: "devtools", repo: "kevinwolfcr/devtools" }]

async function getFile(url: URL, projectId: string) {
  try {
    const request = await fetch(url, { next: { tags: [`docs:${projectId}`] } })
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

  const config = projectConfigSchema.parse(JSON.parse(await getFile(new URL("./config.json", baseUrl), projectId)))
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

export async function getDocsParams() {
  const params: { project: string; slug: string[] }[] = []

  for (const project of projects) {
    for (const menu of (await getDocsConfig(project.id))?.menus || []) {
      for (const item of menu.items) {
        params.push({ project: project.id, slug: menu.href.concat(item.href).replace(/^\//, "").split("/") })
      }
    }
  }

  return params
}

// eslint-disable-next-line sort-exports/sort-exports
export async function getDocsPage(projectId: string, slug: string[]) {
  const config = await getDocsConfig(projectId)
  if (!config) return null

  const url = config.pages[slug.join("/")]
  if (!url) return null

  const { data, content } = matter(await getFile(url, projectId))

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
