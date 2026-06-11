import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

import { getProviderKey } from "@/lib/secrets"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Sandboxed Lead Engine demo. The visitor plays the lead: we draft the same
 * kind of reply the real engine sends, but nothing is emailed and nothing is
 * stored. Costs real tokens, so it is rate-limited per IP and (when configured)
 * captcha-gated like the contact form.
 */

const DEMO_MODEL = process.env.DEMO_CLAUDE_MODEL || "claude-opus-4-7"

// --- in-memory IP rate limit (per container; resets on redeploy) ---
const WINDOW_MS = 60 * 60 * 1000
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
  if (!secret) return true
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

// Same job and rules as the live engine's prompt, pointed at Ayothedoc itself.
const SYSTEM_PROMPT = `You write the first reply to a new inbound lead for Ayothedoc.

Ayothedoc installs and runs AI Operating Systems for small agencies and
consultants. Its wedge offer: a free 60-Second Lead Engine that replies to
every inbound lead in under a minute, personalized, in the client's voice,
with their booking link.

Your job: turn a cold inbound enquiry into a booked conversation, fast. Write a
short, genuinely helpful first response that a busy founder would be happy to send.

Brand voice and rules:
- Plain, human, anti-hype. Short sentences. No jargon, no exclamation marks.
- Never use an em dash. Use commas, colons, or periods.
- Address the person by first name if available.
- Acknowledge their specific enquiry in one sentence (reference what they wrote).
- Be concise: 3 to 5 short sentences. No filler, no "I hope this email finds you well".
- Give one small piece of genuine value or reassurance relevant to their message.
- Invite them to take the next step and include this exact link: https://ayothedoc.com/contact
- Never invent facts, prices, availability, or promises. If you don't know, keep it general.

Return ONLY a JSON object, no code fences, exactly:
{"subject": "short specific subject line, no Re: prefix", "body_html": "the email body as simple HTML using only <p> and <a> tags"}`

function parseReply(text: string): { subject: string; body_html: string } | null {
  try {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    const obj = JSON.parse(match[0])
    if (typeof obj.subject === "string" && typeof obj.body_html === "string") {
      // Belt and braces: the model is instructed to emit only <p> and <a>;
      // strip anything that could execute regardless.
      const safe = obj.body_html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/\son\w+="[^"]*"/gi, "")
        .replace(/javascript:/gi, "")
      return { subject: obj.subject, body_html: safe }
    }
    return null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Demo limit reached for now. Want it on your real leads instead? The first build is free." },
      { status: 429 },
    )
  }

  let body: any = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!(await captchaOk(String(body.turnstileToken || ""), ip))) {
    return NextResponse.json({ error: "Captcha verification failed. Please try again." }, { status: 403 })
  }

  const name = String(body.name || "").trim().slice(0, 80)
  const company = String(body.company || "").trim().slice(0, 120)
  const message = String(body.message || "").trim().slice(0, 1200)
  if (!message) {
    return NextResponse.json({ error: "Type a message first, anything a real lead might send." }, { status: 400 })
  }

  const apiKey = await getProviderKey("anthropic")
  if (!apiKey) {
    return NextResponse.json({ error: "Demo is not configured right now." }, { status: 503 })
  }

  const firstName = name.split(" ")[0] || "there"
  const userBlock =
    `A new inbound lead just arrived:\n` +
    `- Name: ${name || "unknown"}\n` +
    `- First name: ${firstName}\n` +
    `- Company: ${company || "unknown"}\n` +
    `- Their message: ${message}\n` +
    `- Source: live website demo`

  const started = Date.now()
  try {
    const client = new Anthropic({ apiKey })
    const resp = await client.messages.create({
      model: DEMO_MODEL,
      max_tokens: 600,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: userBlock }],
    })
    const text = resp.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
    const reply = parseReply(text)
    if (!reply) {
      return NextResponse.json({ error: "The engine hiccuped. Try once more." }, { status: 502 })
    }
    return NextResponse.json({
      ok: true,
      subject: reply.subject,
      bodyHtml: reply.body_html,
      elapsedMs: Date.now() - started,
    })
  } catch (e) {
    console.error("demo draft failed:", e)
    return NextResponse.json({ error: "The engine hiccuped. Try once more." }, { status: 502 })
  }
}
