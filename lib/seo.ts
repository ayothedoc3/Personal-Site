import type { Metadata } from "next"

import { sites, siteSocialImages, type SiteKey } from "@/lib/site-config"

type SocialImage = {
  url: string
  width?: number
  height?: number
  alt?: string
}

type BuildMetadataOptions = {
  site: SiteKey
  path: string
  title: string
  description: string
  type?: "website" | "article"
  image?: SocialImage
  robots?: Metadata["robots"]
}

export function buildMetadata({
  site,
  path,
  title,
  description,
  type = "website",
  image,
  robots,
}: BuildMetadataOptions): Metadata {
  const info = sites[site]
  const url = new URL(path, `${info.url}/`).toString()
  const socialImage = image ?? siteSocialImages[site]

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: info.name,
      locale: "en_GB",
      type,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
    ...(robots ? { robots } : {}),
  }
}
