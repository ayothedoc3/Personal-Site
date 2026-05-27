import crypto from "crypto"
import { getPgPool } from "@/lib/db"

/**
 * BYOK (bring-your-own-key) secret store.
 *
 * Provider API keys (Anthropic, OpenAI, OpenRouter, Gemini, Stripe …) are
 * encrypted at rest with AES-256-GCM and stored in Postgres. The master key
 * lives ONLY in the SECRETS_ENCRYPTION_KEY env var, never in the database or
 * the repo, so a database dump alone can never reveal a usable key.
 *
 * Hard rules enforced here:
 *  - Plaintext keys are decrypted only server-side, on demand, for outbound
 *    provider calls. They are NEVER returned to the browser.
 *  - listSecrets() returns masked metadata only (provider, label, hint, last4).
 *  - getProviderKey() falls back to the conventional env var when no stored key
 *    exists, so existing features keep working during/after migration.
 */

export const PROVIDERS = ["anthropic", "openai", "openrouter", "gemini", "stripe"] as const
export type Provider = (typeof PROVIDERS)[number]

export const PROVIDER_LABELS: Record<Provider, string> = {
  anthropic: "Anthropic (Claude)",
  openai: "OpenAI",
  openrouter: "OpenRouter",
  gemini: "Google Gemini",
  stripe: "Stripe",
}

// Conventional env var consulted when no key is stored for a provider.
const ENV_FALLBACK: Record<Provider, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  openrouter: "OPENROUTER_API_KEY",
  gemini: "GEMINI_API_KEY",
  stripe: "STRIPE_SECRET_KEY",
}

export function isProvider(v: string): v is Provider {
  return (PROVIDERS as readonly string[]).includes(v)
}

// --- master key handling -------------------------------------------------

function masterKey(): Buffer {
  const raw = process.env.SECRETS_ENCRYPTION_KEY
  if (!raw) {
    throw new Error("SECRETS_ENCRYPTION_KEY is not configured")
  }
  // Accept 64-char hex or 32-byte base64.
  if (/^[0-9a-fA-F]{64}$/.test(raw)) return Buffer.from(raw, "hex")
  const b = Buffer.from(raw, "base64")
  if (b.length === 32) return b
  throw new Error("SECRETS_ENCRYPTION_KEY must be 32 bytes (64 hex chars or base64)")
}

export function encryptionConfigured(): boolean {
  try {
    masterKey()
    return true
  } catch {
    return false
  }
}

// --- AES-256-GCM ----------------------------------------------------------

function encrypt(plaintext: string): string {
  const key = masterKey()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const ct = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()])
  const tag = cipher.getAuthTag()
  return `v1.${iv.toString("base64")}.${tag.toString("base64")}.${ct.toString("base64")}`
}

function decrypt(blob: string): string {
  const key = masterKey()
  const parts = blob.split(".")
  if (parts.length !== 4 || parts[0] !== "v1") throw new Error("Malformed ciphertext")
  const iv = Buffer.from(parts[1], "base64")
  const tag = Buffer.from(parts[2], "base64")
  const ct = Buffer.from(parts[3], "base64")
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8")
}

// Masked preview for the UI, never the real key.
function mask(plaintext: string): { hint: string; last4: string } {
  const k = plaintext.trim()
  const last4 = k.slice(-4)
  const hint = k.length > 12 ? `${k.slice(0, 6)}…${last4}` : `…${last4}`
  return { hint, last4 }
}

// --- schema ---------------------------------------------------------------

async function ensureTable(): Promise<ReturnType<typeof getPgPool>> {
  const p = getPgPool()
  if (!p) return null
  await p.query(`
    create table if not exists app_secrets (
      id           bigserial primary key,
      provider     text not null,
      label        text,
      ciphertext   text not null,
      hint         text not null,
      last4        text not null,
      is_active    boolean not null default true,
      created_at   timestamptz not null default now(),
      updated_at   timestamptz not null default now(),
      last_used_at timestamptz
    );
  `)
  await p.query(
    `create index if not exists app_secrets_provider_active_idx on app_secrets (provider) where is_active;`,
  )
  return p
}

// --- public surface -------------------------------------------------------

export type SecretRecord = {
  id: string
  provider: Provider
  label: string | null
  hint: string
  last4: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastUsedAt: string | null
}

/** Masked metadata for every stored secret. Never includes the plaintext key. */
export async function listSecrets(): Promise<SecretRecord[] | null> {
  const p = await ensureTable()
  if (!p) return null
  const res = await p.query(
    `select id, provider, label, hint, last4, is_active,
            created_at, updated_at, last_used_at
       from app_secrets
      order by provider asc, created_at desc`,
  )
  return res.rows.map((r: any) => ({
    id: String(r.id),
    provider: r.provider,
    label: r.label ?? null,
    hint: String(r.hint),
    last4: String(r.last4),
    isActive: Boolean(r.is_active),
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
    lastUsedAt: r.last_used_at ? new Date(r.last_used_at).toISOString() : null,
  }))
}

/**
 * Encrypt and store a key. Existing active keys for the same provider are
 * deactivated so getProviderKey() always resolves to the newest one (the old
 * rows are soft-kept for audit, not returned in plaintext anywhere).
 */
export async function addSecret(input: {
  provider: Provider
  value: string
  label?: string | null
}): Promise<SecretRecord> {
  const p = await ensureTable()
  if (!p) throw new Error("Database not configured")
  const value = input.value.trim()
  if (!value) throw new Error("Empty key")

  const { hint, last4 } = mask(value)
  const ciphertext = encrypt(value)

  await p.query(`update app_secrets set is_active = false, updated_at = now() where provider = $1 and is_active`, [
    input.provider,
  ])
  const res = await p.query(
    `insert into app_secrets (provider, label, ciphertext, hint, last4)
     values ($1, $2, $3, $4, $5)
     returning id, provider, label, hint, last4, is_active, created_at, updated_at, last_used_at`,
    [input.provider, input.label?.trim() || null, ciphertext, hint, last4],
  )
  const r = res.rows[0]
  return {
    id: String(r.id),
    provider: r.provider,
    label: r.label ?? null,
    hint: String(r.hint),
    last4: String(r.last4),
    isActive: Boolean(r.is_active),
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
    lastUsedAt: null,
  }
}

export async function deleteSecret(id: string): Promise<boolean> {
  const p = await ensureTable()
  if (!p) return false
  const res = await p.query(`delete from app_secrets where id = $1`, [id])
  return (res.rowCount ?? 0) > 0
}

/**
 * Resolve a usable plaintext key for a provider: newest stored key first, then
 * the conventional env var. Returns null if neither exists. Server-side only.
 */
export async function getProviderKey(provider: Provider): Promise<string | null> {
  try {
    const p = await ensureTable()
    if (p && encryptionConfigured()) {
      const res = await p.query(
        `select id, ciphertext from app_secrets where provider = $1 and is_active order by created_at desc limit 1`,
        [provider],
      )
      if (res.rows.length) {
        const key = decrypt(res.rows[0].ciphertext)
        // best-effort usage timestamp; never block the call path on it
        p.query(`update app_secrets set last_used_at = now() where id = $1`, [res.rows[0].id]).catch(() => {})
        return key
      }
    }
  } catch (e) {
    console.error(`getProviderKey(${provider}) store lookup failed, falling back to env:`, e)
  }
  return process.env[ENV_FALLBACK[provider]] || null
}
