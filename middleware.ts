import { NextResponse, type NextRequest } from "next/server"
import {
  siteFromHost,
  pathMatchesPrefix,
  AIOS_ONLY_PREFIXES,
  HEALTHCARE_ONLY_PREFIXES,
  sites,
} from "@/lib/site-config"

// Host-based routing. One app, two sites:
//  - aios.ayothedoc.com serves AIOS; healthcare-only routes 404 here.
//  - ayothedoc.com (apex/www) serves healthcare; relocated AIOS routes 301 to
//    the AIOS host (preserving existing indexed URLs and backlinks).
// On non-production hosts (localhost, preview URLs) nothing is gated so both
// route sets can be tested.
const PROD_APEX = new Set(["ayothedoc.com", "www.ayothedoc.com"])

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/blocked" ||
    pathname.startsWith("/admin")
  ) {
    return NextResponse.next()
  }

  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase()
  const site = siteFromHost(host)

  // Apex (production) requests to relocated AIOS routes -> 301 to the AIOS host.
  if (site === "healthcare" && PROD_APEX.has(host) && pathMatchesPrefix(pathname, AIOS_ONLY_PREFIXES)) {
    return NextResponse.redirect(new URL(`${pathname}${search}`, sites.aios.url), 301)
  }

  // AIOS host requests to healthcare-only routes -> 404.
  if (site === "aios" && pathMatchesPrefix(pathname, HEALTHCARE_ONLY_PREFIXES)) {
    const url = req.nextUrl.clone()
    url.pathname = "/blocked"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml|mp4|webm)$).*)"],
}
