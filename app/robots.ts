import { MetadataRoute } from "next"
import { headers } from "next/headers"
import { siteFromHost, sites } from "@/lib/site-config"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers()
  const base = sites[siteFromHost(h.get("host"))].url

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/blocked"] },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/admin", "/api/", "/blocked"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
