"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function GoogleAnalyticsPageView({ measurementId }: { measurementId: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!measurementId) return
    if (typeof window === "undefined") return
    if (typeof window.gtag !== "function") return

    const qs = searchParams?.toString()
    const pagePath = `${pathname}${qs ? `?${qs}` : ""}`

    window.gtag("config", measurementId, {
      page_path: pagePath,
    })
  }, [measurementId, pathname, searchParams])

  return null
}

