import matter from "gray-matter"
import { z } from "zod"

type Project = {
  id: string
  repo: string
}

export type Docs = NonNullable<Awaited<ReturnType<typeof getDocs>>>

const projects: Project[] = [{ id: "devtools", repo: "kevinwolfcr/devtools" }]

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

const pageMetaSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  imgSrc: z.string().optional(),
  imgAlt: z.string().optional(),
})

async function getFile(url: URL) {
  try {
    const request = await fetch(url)
    return await request.text()
  } catch (err) {
    throw new Error(`Error fetching ${url.toString()}: ${err instanceof Error ? err.message : "Unknown error"}`)
  }
}

async function getConfig(project: Project) {
  const baseUrl = new URL(
    process.env.LOCAL_DOCS
      ? `${process.env.LOCAL_DOCS}/${project.repo}/docs/`
      : `https://raw.githubusercontent.com/${project.repo}/main/docs/`,
  )

  const configUrl = new URL("./config.json", baseUrl)
  const config = projectConfigSchema.parse(JSON.parse(await getFile(configUrl)))

  return {
    configUrl,
    ...config,
  }
}

export async function getDocs(projectId: string) {
  const project = projects.find((project) => project.id === projectId)
  if (!project) return null

  const { configUrl, ...config } = await getConfig(project)
  const pages: Record<string, { url: string; meta: z.infer<typeof pageMetaSchema>; content: string }> = {}

  for (const menu of config.menus) {
    for (const item of menu.items) {
      const url = new URL(item.file, configUrl)
      const { data, content } = matter(await getFile(url))

      pages[menu.href.concat(item.href).replace(/^\//, "")] = {
        url: url.toString(),
        meta: pageMetaSchema.parse(data),
        content,
      }
    }
  }

  return {
    ...project,
    ...config,
    pages,
  }
}

export async function getDocsParams() {
  const params: { project: string; slug: string[] }[] = []

  for (const project of projects) {
    for (const menu of (await getConfig(project)).menus || []) {
      for (const item of menu.items) {
        params.push({ project: project.id, slug: menu.href.concat(item.href).replace(/^\//, "").split("/") })
      }
    }
  }

  return params
}
