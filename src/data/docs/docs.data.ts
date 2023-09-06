import matter from "gray-matter"
import { z } from "zod"

const projects = [{ id: "devtools", repo: "kevinwolfcr/devtools" }]

async function getFile(url: URL) {
  try {
    const request = await fetch(url, { next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 60 } })
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
        label: z.string(),
        items: z.array(z.object({ href: z.string(), label: z.string(), file: z.string() })),
      }),
    ),
  })

  const config = projectConfigSchema.parse(JSON.parse(await getFile(new URL("./config.json", baseUrl))))

  const pages: Record<
    string,
    {
      url: URL
      prev: z.infer<typeof projectConfigSchema>["menus"][number]["items"][number] | null
      next: z.infer<typeof projectConfigSchema>["menus"][number]["items"][number] | null
    }
  > = {}

  for (const [menuIndex, menu] of config.menus.entries()) {
    for (const [itemIndex, item] of menu.items.entries()) {
      pages[item.href] = {
        url: new URL(item.file, baseUrl),
        prev: menu.items[itemIndex - 1] || config.menus[menuIndex - 1]?.items.findLast(Boolean) || null,
        next: menu.items[itemIndex + 1] || config.menus[menuIndex + 1]?.items[0] || null,
      }
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
        params.push({ project: project.id, slug: item.href.split("/").filter(Boolean) })
      }
    }
  }

  return params
}

// eslint-disable-next-line sort-exports/sort-exports
export async function getDocsPage(projectId: string, slug: string[]) {
  const config = await getDocsConfig(projectId)
  if (!config) return null

  const page = config.pages[`/${slug.join("/")}`]
  if (!page) return null

  const { data, content } = matter(await getFile(page.url))

  const pageMetaSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
  })

  return {
    url: page.url,
    meta: pageMetaSchema.parse(data),
    content,
    prev: page.prev,
    next: page.next,
  }
}
