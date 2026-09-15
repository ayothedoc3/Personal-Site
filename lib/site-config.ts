// Central hostname configuration. One Next app serves two sites, keyed by host.
// Pure data only (no next/* imports) so it is safe on client and server.

export type SiteKey = "healthcare" | "aios"

export interface SiteInfo {
  key: SiteKey
  name: string
  descriptor: string
  host: string
  url: string
  contactEmail: string
  analyticsPrefix: string
}

export const sites: Record<SiteKey, SiteInfo> = {
  healthcare: {
    key: "healthcare",
    name: "Ayothedoc",
    descriptor: "Healthcare AI Design & Implementation",
    host: "ayothedoc.com",
    url: "https://ayothedoc.com",
    contactEmail: "hello@ayothedoc.com",
    analyticsPrefix: "healthtech",
  },
  aios: {
    key: "aios",
    name: "AIOS by Ayothedoc",
    descriptor: "AI Operations Systems for Agencies, Consultants and Service Businesses",
    host: "aios.ayothedoc.com",
    url: "https://aios.ayothedoc.com",
    contactEmail: "aios@ayothedoc.com",
    analyticsPrefix: "aios",
  },
}

// Kept alongside the hostname configuration so page-level metadata can reuse
// the same social card without accidentally dropping the image when overriding
// Open Graph fields.
export const siteSocialImages = {
  healthcare: {
    url: "/social/ayothedoc-healthcare.png",
    width: 1200,
    height: 630,
    alt: "Ayothedoc healthcare AI design and implementation",
  },
  aios: {
    url: "/social/aios.png",
    width: 1200,
    height: 630,
    alt: "AIOS by Ayothedoc managed AI operations",
  },
} as const satisfies Record<SiteKey, { url: string; width: number; height: number; alt: string }>

// Resolve which site a hostname belongs to. Anything on the `aios.` host is the
// AIOS site; everything else (apex, www, previews, localhost) is healthcare.
export function siteFromHost(host?: string | null): SiteKey {
  const h = (host ?? "").split(":")[0].toLowerCase()
  if (h === sites.aios.host || h.startsWith("aios.")) return "aios"
  return "healthcare"
}

export function siteInfoFromHost(host?: string | null): SiteInfo {
  return sites[siteFromHost(host)]
}

// Path prefixes that belong to exactly one site. Enforced in middleware.ts.
export const AIOS_ONLY_PREFIXES = [
  "/offer",
  "/demo",
  "/lead-engine",
  "/audit",
  "/automation",
  "/refund",
]

export const HEALTHCARE_ONLY_PREFIXES = [
  "/solutions",
  "/who-we-help",
  "/method",
  "/case-studies",
  "/insights",
  "/ayo",
  "/medical-disclaimer",
  "/tools",
]

export function pathMatchesPrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))
}
