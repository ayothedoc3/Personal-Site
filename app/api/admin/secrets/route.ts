import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { addSecret, deleteSecret, encryptionConfigured, isProvider, listSecrets } from "@/lib/secrets"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Admin BYOK management. All routes require the admin bearer (LEADS_API_KEY).
 * Responses only ever contain masked metadata, the plaintext key is write-only
 * from the client's perspective and can never be read back through the API.
 */

// Timing-safe bearer check so the admin key can't be brute-forced by latency.
function authed(req: NextRequest): boolean {
  const expected = process.env.LEADS_API_KEY
  if (!expected) return false
  const header = req.headers.get("authorization") || ""
  const presented = header.startsWith("Bearer ") ? header.slice(7) : ""
  const a = Buffer.from(presented)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const secrets = (await listSecrets()) ?? []
    return NextResponse.json({ encryptionConfigured: encryptionConfigured(), secrets })
  } catch (e) {
    console.error("secrets list error:", e)
    return NextResponse.json({ error: "Failed to load keys" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!encryptionConfigured()) {
    return NextResponse.json(
      { error: "SECRETS_ENCRYPTION_KEY is not configured on the server. Add it before storing keys." },
      { status: 503 },
    )
  }
  let body: any = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  const provider = String(body.provider || "").trim()
  const value = String(body.value || "")
  const label = body.label != null ? String(body.label) : null
  if (!isProvider(provider)) {
    return NextResponse.json({ error: "Unknown provider" }, { status: 400 })
  }
  if (!value.trim()) {
    return NextResponse.json({ error: "Key value is required" }, { status: 400 })
  }
  try {
    const record = await addSecret({ provider, value, label })
    return NextResponse.json({ ok: true, secret: record })
  } catch (e) {
    console.error("secrets add error:", e)
    return NextResponse.json({ error: "Failed to store key" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const id = req.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })
  try {
    const ok = await deleteSecret(id)
    return NextResponse.json({ ok })
  } catch (e) {
    console.error("secrets delete error:", e)
    return NextResponse.json({ error: "Failed to delete key" }, { status: 500 })
  }
}
