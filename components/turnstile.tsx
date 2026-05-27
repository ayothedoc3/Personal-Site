"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    turnstile?: any
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js"

/**
 * Cloudflare Turnstile widget. Renders only when NEXT_PUBLIC_TURNSTILE_SITE_KEY
 * is set, so the form works before keys are configured (the server route still
 * applies the honeypot + rate limit). Calls onToken with the solved token.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const ref = useRef<HTMLDivElement>(null)
  const rendered = useRef(false)

  useEffect(() => {
    if (!siteKey || !ref.current) return

    const renderWidget = () => {
      if (!window.turnstile || !ref.current || rendered.current) return
      rendered.current = true
      window.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: (token: string) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      })
    }

    if (window.turnstile) {
      renderWidget()
      return
    }
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script")
      s.src = SRC
      s.async = true
      s.defer = true
      s.onload = renderWidget
      document.head.appendChild(s)
      return
    }
    const id = setInterval(() => {
      if (window.turnstile) {
        clearInterval(id)
        renderWidget()
      }
    }, 200)
    return () => clearInterval(id)
  }, [siteKey, onToken])

  if (!siteKey) return null
  return <div ref={ref} className="mt-2" />
}
