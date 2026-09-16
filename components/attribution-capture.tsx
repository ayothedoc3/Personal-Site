"use client"

import { useEffect } from "react"

const STORAGE_KEY = "ayothedoc-lead-attribution"

export type LeadAttribution = {
  landingPage: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
}

function safeReferrer(): string {
  if (!document.referrer) return ""
  try {
    const url = new URL(document.referrer)
    return `${url.origin}${url.pathname}`.slice(0, 300)
  } catch {
    return ""
  }
}

export function AttributionCapture() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      const hasCampaign = ["utm_source", "utm_medium", "utm_campaign"].some((key) => url.searchParams.has(key))
      const existing = sessionStorage.getItem(STORAGE_KEY)

      if (!existing || hasCampaign) {
        const attribution: LeadAttribution = {
          landingPage: url.pathname.slice(0, 300),
          referrer: safeReferrer(),
          utmSource: (url.searchParams.get("utm_source") || "").slice(0, 100),
          utmMedium: (url.searchParams.get("utm_medium") || "").slice(0, 100),
          utmCampaign: (url.searchParams.get("utm_campaign") || "").slice(0, 150),
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
      }
    } catch {
      // Attribution is helpful but must never block the site or a form.
    }
  }, [])

  return null
}

export function getLeadAttribution(): LeadAttribution {
  const fallback: LeadAttribution = {
    landingPage: typeof window === "undefined" ? "" : window.location.pathname,
    referrer: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
  }

  if (typeof window === "undefined") return fallback

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return fallback
    const parsed = JSON.parse(stored) as Partial<LeadAttribution>
    return {
      landingPage: String(parsed.landingPage || fallback.landingPage).slice(0, 300),
      referrer: String(parsed.referrer || "").slice(0, 300),
      utmSource: String(parsed.utmSource || "").slice(0, 100),
      utmMedium: String(parsed.utmMedium || "").slice(0, 100),
      utmCampaign: String(parsed.utmCampaign || "").slice(0, 150),
    }
  } catch {
    return fallback
  }
}
