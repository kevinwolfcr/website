import type { Metadata } from "next"

export function mergeMetadata(metadata: Metadata): Metadata {
  return {
    ...metadata,
    openGraph: {
      title: metadata.title !== null ? metadata.title : undefined,
      description: metadata.description !== null ? metadata.description : undefined,
      ...metadata.openGraph,
    },
    twitter: {
      title: metadata.title !== null ? metadata.title : undefined,
      description: metadata.description !== null ? metadata.description : undefined,
      ...metadata.twitter,
    },
  }
}

export function siteUrl(url: string) {
  const vercelUrl = process.env.VERCEL_URL
  const base = vercelUrl ? `https://${vercelUrl}` : `http://localhost:${process.env.PORT || 3000}`
  return `${base}/${url}`
}
