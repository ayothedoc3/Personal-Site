import { NextRequest, NextResponse } from "next/server"
import { listAuditLeads } from "@/lib/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const FROM = process.env.CAMPAIGN_FROM_EMAIL || "Ayothedoc <onboarding@resend.dev>"

function authed(req: NextRequest): boolean {
  const auth = req.headers.get("authorization")
  return !!process.env.LEADS_API_KEY && auth === `Bearer ${process.env.LEADS_API_KEY}`
}

type ResendItem = { from: string; to: string[]; subject: string; html: string }

type LeadLike = { name?: string; email?: string; website?: string; businessType?: string }

// Replace {{token}} (case-insensitive, whitespace-tolerant) with this recipient's data.
function personalize(template: string, lead: LeadLike): string {
  const firstName = (lead.name || "").trim().split(/\s+/)[0] || "there"
  const map: Record<string, string> = {
    name: lead.name?.trim() || "there",
    firstname: firstName,
    first_name: firstName,
    businesstype: lead.businessType?.trim() || "business",
    business_type: lead.businessType?.trim() || "business",
    website: lead.website?.trim() || "",
    email: lead.email?.trim() || "",
  }
  return template.replace(/\{\{\s*([a-zA-Z_]+)\s*\}\}/g, (whole, key) => {
    const v = map[String(key).toLowerCase()]
    return v !== undefined ? v : whole
  })
}

async function sendBatch(items: ResendItem[]) {
  const resp = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(items),
  })
  let data: any = {}
  try {
    data = await resp.json()
  } catch {
    /* ignore */
  }
  return { ok: resp.ok, status: resp.status, data }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set on the server." }, { status: 400 })
  }

  let body: any = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const subject = String(body.subject || "").trim()
  const html = String(body.html || "").trim()
  if (!subject || !html) {
    return NextResponse.json({ error: "subject and html are required" }, { status: 400 })
  }

  // Test send: deliver a single email to the operator's own address (with sample personalization).
  if (body.testEmail) {
    const sample: LeadLike = { name: "there", email: String(body.testEmail), businessType: "your business", website: "" }
    const r = await sendBatch([
      { from: FROM, to: [String(body.testEmail)], subject: personalize(subject, sample), html: personalize(html, sample) },
    ])
    if (!r.ok) {
      return NextResponse.json(
        { error: r.data?.message || `Resend error (HTTP ${r.status})`, detail: r.data, from: FROM },
        { status: 502 },
      )
    }
    return NextResponse.json({ test: true, sentTo: body.testEmail, from: FROM })
  }

  // Real campaign: send to leads (all, or opted-in only), personalized per recipient.
  const leads = (await listAuditLeads()) ?? []
  const pool = body.audience === "optedin" ? leads.filter((l) => l.optin_marketing) : leads

  // De-duplicate by email, keeping the first lead record per address.
  const byEmail = new Map<string, LeadLike>()
  for (const l of pool) {
    if (l.email && !byEmail.has(l.email)) byEmail.set(l.email, l)
  }
  const recipients = Array.from(byEmail.values())

  if (recipients.length === 0) {
    return NextResponse.json({ sent: 0, failed: 0, total: 0, message: "No recipients match this audience." })
  }

  let sent = 0
  let failed = 0
  let lastError: string | null = null

  for (let i = 0; i < recipients.length; i += 100) {
    const chunk = recipients.slice(i, i + 100).map((l) => ({
      from: FROM,
      to: [l.email as string],
      subject: personalize(subject, l),
      html: personalize(html, l),
    }))
    const r = await sendBatch(chunk)
    if (r.ok) {
      sent += chunk.length
    } else {
      failed += chunk.length
      lastError = r.data?.message || `Resend error (HTTP ${r.status})`
    }
  }

  return NextResponse.json({ sent, failed, total: recipients.length, from: FROM, error: lastError })
}
