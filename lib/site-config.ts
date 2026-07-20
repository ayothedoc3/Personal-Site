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
    descriptor: "Healthcare Technology Implementation & Clinical Innovation",
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
  "/services",
  "/audit",
  "/automation",
  "/blog",
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
]

export function pathMatchesPrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))
}
