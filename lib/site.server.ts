import "server-only"
import { headers } from "next/headers"
import { siteFromHost, siteInfoFromHost, sites, type SiteInfo, type SiteKey } from "./site-config"

// Server-only helpers to resolve the current site from the request host.
// Use in server components, layouts, generateMetadata, sitemap and robots.

export async function getSiteKey(): Promise<SiteKey> {
  const h = await headers()
  return siteFromHost(h.get("host"))
}

export async function getSite(): Promise<SiteInfo> {
  const h = await headers()
  return siteInfoFromHost(h.get("host"))
}

export { sites }
export type { SiteInfo, SiteKey }
