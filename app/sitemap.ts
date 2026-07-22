import { MetadataRoute } from "next"
import { headers } from "next/headers"
import { getProgrammaticSummaries } from "@/lib/programmatic-seo"
import { siteFromHost, sites } from "@/lib/site-config"
import { solutionSlugs } from "@/lib/solutions"
import { audienceSlugs } from "@/lib/audiences-detail"
import { insights } from "@/lib/insights"
import { verifiedCaseStudies } from "@/lib/case-studies"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers()
  const key = siteFromHost(h.get("host"))

  if (key === "aios") {
    const base = sites.aios.url
    const staticPaths = ["", "/services", "/offer", "/lead-engine", "/demo", "/audit", "/automation", "/blog", "/about", "/contact", "/privacy", "/terms", "/refund"]
    const staticPages: MetadataRoute.Sitemap = staticPaths.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: p === "" ? 1 : 0.7,
    }))
    const programmatic = await getProgrammaticSummaries()
    const automationPages: MetadataRoute.Sitemap = programmatic.map((page) => ({
      url: `${base}/automation/${page.slug}`,
      lastModified: page.datePublished ? new Date(page.datePublished) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
    return [...staticPages, ...automationPages]
  }

  // Healthcare
  const base = sites.healthcare.url
  const staticPaths = [
    "",
    "/solutions",
    "/who-we-help",
    "/method",
    "/case-studies",
    "/insights",
    "/about",
    "/contact",
    "/ayo",
    "/privacy",
    "/terms",
    "/medical-disclaimer",
  ]
  const pages: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }))
  const solutions = solutionSlugs.map((s) => ({ url: `${base}/solutions/${s}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }))
  const audiences = audienceSlugs.map((s) => ({ url: `${base}/who-we-help/${s}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }))
  const insightPages = insights.map((i) => ({ url: `${base}/insights/${i.slug}`, lastModified: new Date(i.date), changeFrequency: "monthly" as const, priority: 0.6 }))
  const cases = verifiedCaseStudies().map((c) => ({ url: `${base}/case-studies/${c.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }))
  return [...pages, ...solutions, ...audiences, ...insightPages, ...cases]
}
