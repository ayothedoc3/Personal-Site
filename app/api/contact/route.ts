import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Receives the website contact form and forwards it to the Lead Engine (which
 * sends the lead a sub-60-second reply and alerts the operator). The Lead Engine
 * secret lives only here, never in the browser.
 *
 * Abuse protection: IP rate limit + honeypot + submit-timing + Cloudflare
 * Turnstile (captcha verified server-side once TURNSTILE_SECRET_KEY is set).
 */

// --- in-memory IP rate limit (per container; resets on redeploy) ---
const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

async function captchaOk(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // not configured yet — honeypot + rate limit still apply
  if (!token) return false
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(10_000),
    })
    const d: any = await r.json()
    return !!d.success
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const url = process.env.LEAD_ENGINE_URL
  const secret = process.env.LEAD_ENGINE_SECRET
  if (!url || !secret) {
    return NextResponse.json({ error: "Lead Engine is not configured" }, { status: 500 })
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  let body: any = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  // Honeypot: real users never fill this. Silent-drop bots (pretend success).
  if (String(body.website || "").trim() !== "") {
    return NextResponse.json({ ok: true })
  }
  // Timing: a submit < 3s after page load is almost always a bot.
  const started = Number(body.formStartTime || 0)
  if (started && Date.now() - started < 3000) {
    return NextResponse.json({ ok: true })
  }
  // Captcha (only enforced once TURNSTILE_SECRET_KEY is set).
  if (!(await captchaOk(String(body.turnstileToken || ""), ip))) {
    return NextResponse.json({ error: "Captcha verification failed. Please try again." }, { status: 403 })
  }

  const firstName = String(body.firstName || "").trim()
  const lastName = String(body.lastName || "").trim()
  const email = String(body.email || "").trim()
  const message = String(body.message || "").trim()
  if (!email || !message) {
    return NextResponse.json({ error: "email and message are required" }, { status: 400 })
  }

  const service = String(body.service || "").trim()
  const fullMessage = service ? `${message}\n\n[Interested in: ${service}]` : message

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Lead-Secret": secret },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`.trim() || undefined,
        email,
        message: fullMessage,
        company: String(body.company || "").trim() || undefined,
        phone: String(body.phone || "").trim() || undefined,
        source: "Website contact form",
      }),
      signal: AbortSignal.timeout(25_000),
    })
    if (!r.ok) {
      const t = await r.text().catch(() => "")
      console.error("Lead Engine forward failed:", r.status, t.slice(0, 200))
      return NextResponse.json({ error: "Could not deliver your message right now." }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("Lead Engine unreachable:", e)
    return NextResponse.json({ error: "Could not reach the messaging service." }, { status: 502 })
  }
}
