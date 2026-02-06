import { Pool } from 'pg'

let pool: Pool | null = null

function getConnectionString(): string | null {
  const conn = process.env.POSTGRES_URL || process.env.DATABASE_URL || null
  return conn
}

export function getPgPool(): Pool | null {
  if (pool) return pool
  const connectionString = getConnectionString()
  if (!connectionString) return null
  // Enable SSL when deployed behind managed Postgres that requires it
  const sslRequired = /sslmode=require/i.test(connectionString) || process.env.POSTGRES_SSL === 'true'
  pool = new Pool({ connectionString, ssl: sslRequired ? { rejectUnauthorized: false } : undefined })
  return pool
}

async function ensureAuditLeadsTable(p: Pool): Promise<void> {
  await p.query(`
    create table if not exists audit_leads (
      id bigserial primary key,
      name text not null,
      email text not null,
      website text not null,
      business_type text not null,
      current_challenges text,
      time_spent_daily int,
      optin_marketing boolean default false,
      source text,
      inserted_at timestamp with time zone default now()
    );
  `)
}

export async function insertAuditLead(data: {
  name: string
  email: string
  website: string
  businessType: string
  currentChallenges: string
  timeSpentDaily: number
  optin_marketing?: boolean
}): Promise<boolean> {
  const p = getPgPool()
  if (!p) return false

  await ensureAuditLeadsTable(p)

  const res = await p.query(
    `insert into audit_leads
      (name, email, website, business_type, current_challenges, time_spent_daily, optin_marketing, source)
     values ($1,$2,$3,$4,$5,$6,$7,$8)
     returning id`,
    [
      data.name,
      data.email,
      data.website,
      data.businessType,
      data.currentChallenges,
      data.timeSpentDaily,
      !!data.optin_marketing,
      'Business Audit Form',
    ],
  )
  return !!res.rows?.length
}

export type AuditLead = {
  id: string
  name: string
  email: string
  website: string
  businessType: string
  currentChallenges: string
  timeSpentDaily: number
  optin_marketing: boolean
  timestamp: string
  source: string | null
}

export async function listAuditLeads(limit: number = 1000): Promise<AuditLead[] | null> {
  const p = getPgPool()
  if (!p) return null

  await ensureAuditLeadsTable(p)

  const res = await p.query(
    `select
       id,
       name,
       email,
       website,
       business_type as "businessType",
       coalesce(current_challenges, '') as "currentChallenges",
       coalesce(time_spent_daily, 0) as "timeSpentDaily",
       coalesce(optin_marketing, false) as "optin_marketing",
       inserted_at as "timestamp",
       source
     from audit_leads
     order by inserted_at desc
     limit $1`,
    [limit],
  )

  return res.rows.map((row: any) => ({
    id: String(row.id),
    name: String(row.name ?? ''),
    email: String(row.email ?? ''),
    website: String(row.website ?? ''),
    businessType: String(row.businessType ?? ''),
    currentChallenges: String(row.currentChallenges ?? ''),
    timeSpentDaily: Number(row.timeSpentDaily ?? 0),
    optin_marketing: Boolean(row.optin_marketing),
    timestamp: row.timestamp ? new Date(row.timestamp).toISOString() : new Date().toISOString(),
    source: row.source ?? null,
  }))
}

