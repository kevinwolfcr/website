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
