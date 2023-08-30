import type { Metadata, ResolvedMetadata } from "next"

import merge from "ts-deepmerge"

export function mergeMetadata(metadata: Metadata, parent?: ResolvedMetadata): Metadata {
  return merge(parent || {}, {
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
  })
}

export function siteUrl(url?: string) {
  const vercelUrl = process.env.VERCEL_URL
  const base = vercelUrl ? `https://${vercelUrl}` : `http://localhost:${process.env.PORT || 3000}`
  return [base, url].filter(Boolean).join("/")
}
