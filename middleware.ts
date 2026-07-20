import { NextResponse, type NextRequest } from "next/server"
import {
  siteFromHost,
  pathMatchesPrefix,
  AIOS_ONLY_PREFIXES,
  HEALTHCARE_ONLY_PREFIXES,
} from "@/lib/site-config"

// Host-based routing. One app, two sites:
//  - aios.ayothedoc.com serves the AIOS routes; healthcare-only routes 404 here.
//  - ayothedoc.com (apex/www/previews) serves healthcare; AIOS-only routes 404 here.
// A blocked request is rewritten to /blocked, which renders the styled 404.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Never gate backend, static, or the 404 gate itself.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/blocked" ||
    pathname.startsWith("/admin")
  ) {
    return NextResponse.next()
  }

  const site = siteFromHost(req.headers.get("host"))
  const blocked =
    site === "healthcare"
      ? pathMatchesPrefix(pathname, AIOS_ONLY_PREFIXES)
      : pathMatchesPrefix(pathname, HEALTHCARE_ONLY_PREFIXES)

  if (blocked) {
    const url = req.nextUrl.clone()
    url.pathname = "/blocked"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml|mp4|webm)$).*)"],
}
