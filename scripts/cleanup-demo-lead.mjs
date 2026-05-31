#!/usr/bin/env node
/**
 * One-shot cleanup for the polluted audit demo lead.
 *
 * Deletes the lead row created during the 2026-05-28 live demo run
 * (Sarah Chen / metalab.com / Agency / elev8matrix+aiosdemo@gmail.com).
 *
 * Usage:
 *   DATABASE_URL="postgres://..." node scripts/cleanup-demo-lead.mjs           # dry run, shows what would be deleted
 *   DATABASE_URL="postgres://..." node scripts/cleanup-demo-lead.mjs --confirm # actually deletes
 *
 * Delete this file after running. It's a one-off cleanup, not a permanent admin tool.
 */
import pg from 'pg'

const TARGET_EMAIL = 'elev8matrix+aiosdemo@gmail.com'
const CONFIRM = process.argv.includes('--confirm')

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!databaseUrl) {
  console.error('Set DATABASE_URL (or POSTGRES_URL) before running.')
  process.exit(1)
}

const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
})

try {
  const found = await pool.query(
    'SELECT id, name, email, website, business_type, inserted_at FROM audit_leads WHERE email = $1',
    [TARGET_EMAIL],
  )

  if (found.rows.length === 0) {
    console.log(`No row found for ${TARGET_EMAIL}. Nothing to do.`)
    process.exit(0)
  }

  console.log(`Found ${found.rows.length} row(s) matching ${TARGET_EMAIL}:`)
  console.table(found.rows)

  if (!CONFIRM) {
    console.log('\nDry run (no rows deleted). Re-run with --confirm to actually delete.')
    process.exit(0)
  }

  const result = await pool.query('DELETE FROM audit_leads WHERE email = $1', [TARGET_EMAIL])
  console.log(`\nDeleted ${result.rowCount} row(s).`)
} catch (err) {
  console.error('Error:', err)
  process.exit(1)
} finally {
  await pool.end()
}
