import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

import { listAuditLeads, findAuditLeadsByEmail, deleteAuditLeadsByEmail } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Lead = {
  id: string
  name: string
  email: string
  website: string
  businessType: string
  currentChallenges: string
  timeSpentDaily: number
  optin_marketing?: boolean
  timestamp: string
  source?: string | null
}

function sortLeads(leads: Lead[]): Lead[] {
  return [...leads].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

async function loadLeadsFromAirtable(): Promise<Lead[] | null> {
  const baseId = process.env.AIRTABLE_BASE_ID
  const apiKey = process.env.AIRTABLE_API_KEY
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Audit Leads'

  if (!baseId || !apiKey || !tableName) return null

  const baseUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`

  const records: any[] = []
  let offset: string | undefined

  for (let i = 0; i < 10; i++) {
    const url = new URL(baseUrl)
    url.searchParams.set('pageSize', '100')
    if (offset) url.searchParams.set('offset', offset)

    const resp = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (!resp.ok) {
      const text = await resp.text()
      throw new Error(`Airtable fetch failed: ${resp.status} ${text}`)
    }

    const data = await resp.json()
    if (Array.isArray(data.records)) records.push(...data.records)
    offset = data.offset

    if (!offset) break
  }

  const leads: Lead[] = records.map((record) => {
    const fields = record.fields || {}
    const timestampRaw = fields.Timestamp || record.createdTime

    return {
      id: String(record.id ?? ''),
      name: String(fields.Name ?? ''),
      email: String(fields.Email ?? ''),
      website: String(fields.Website ?? ''),
      businessType: String(fields['Business Type'] ?? ''),
      currentChallenges: String(fields['Current Challenges'] ?? ''),
      timeSpentDaily: Number(fields['Time Spent Daily'] ?? 0),
      optin_marketing: Boolean(fields['Opt-in Marketing']),
      timestamp: timestampRaw ? new Date(timestampRaw).toISOString() : new Date().toISOString(),
      source: String(fields.Source ?? 'Airtable'),
    }
  })

  return sortLeads(leads)
}

async function loadLeadsFromFile(): Promise<Lead[]> {
  const dataDir = path.join(process.cwd(), 'data')
  const leadsFile = path.join(dataDir, 'audit-leads.json')

  if (!fs.existsSync(leadsFile)) return []

  const leadsData = fs.readFileSync(leadsFile, 'utf8')
  const leads = JSON.parse(leadsData) as Lead[]

  return sortLeads(leads)
}

async function loadLeads(): Promise<Lead[]> {
  try {
    const pgLeads = await listAuditLeads()
    if (pgLeads) return sortLeads(pgLeads as Lead[])
  } catch (error) {
    console.error('Postgres lead retrieval failed:', error)
  }

  try {
    const airtableLeads = await loadLeadsFromAirtable()
    if (airtableLeads) return airtableLeads
  } catch (error) {
    console.error('Airtable lead retrieval failed:', error)
  }

  return loadLeadsFromFile()
}

export async function GET(request: NextRequest) {
  try {
    // Simple authentication check (you can enhance this)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.LEADS_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const leads = await loadLeads()
    
    return NextResponse.json({
      leads,
      count: leads.length,
      message: `Found ${leads.length} audit leads`
    })

  } catch (error) {
    console.error('Error retrieving leads:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve leads' },
      { status: 500 }
    )
  }
}

// Optional: Add export endpoint for CSV
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.LEADS_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { format } = await request.json()
    
    if (format === 'csv') {
      const leads = await loadLeads()

      if (leads.length === 0) {
        return NextResponse.json({
          error: 'No leads found'
        }, { status: 404 })
      }
      
      // Convert to CSV
      const csvHeaders = 'ID,Name,Email,Website,Business Type,Time Spent Daily,Current Challenges,Opt-in Marketing,Timestamp,Source\n'
      const csvRows = leads.map((lead: any) => 
        `"${String(lead.id ?? '').replace(/\"/g, '""')}","${String(lead.name ?? '').replace(/\"/g, '""')}","${String(lead.email ?? '').replace(/\"/g, '""')}","${String(lead.website ?? '').replace(/\"/g, '""')}","${String(lead.businessType ?? '').replace(/\"/g, '""')}","${String(lead.timeSpentDaily ?? '').replace(/\"/g, '""')}","${String(lead.currentChallenges ?? '').replace(/\"/g, '""')}","${lead.optin_marketing ? 'true' : 'false'}","${String(lead.timestamp ?? '').replace(/\"/g, '""')}","${String(lead.source ?? '').replace(/\"/g, '""')}"`
      ).join('\n')
      
      const csv = csvHeaders + csvRows
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="audit-leads.csv"'
        }
      })
    }

    return NextResponse.json(
      { error: 'Invalid format requested' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Error exporting leads:', error)
    return NextResponse.json(
      { error: 'Failed to export leads' },
      { status: 500 }
    )
  }
}

// Delete audit leads by email. Preview-first by default: pass `confirm=1` to
// actually delete. Gated by LEADS_API_KEY. Useful for one-off cleanups and
// for GDPR-style "delete my data" requests.
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.LEADS_API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const email = (searchParams.get('email') || '').trim()
    const confirm = searchParams.get('confirm') === '1'

    if (!email) {
      return NextResponse.json({ error: 'email query param is required' }, { status: 400 })
    }

    const matches = await findAuditLeadsByEmail(email)
    if (matches === null) {
      return NextResponse.json({ error: 'Postgres not configured' }, { status: 500 })
    }

    if (matches.length === 0) {
      return NextResponse.json({ found: 0, deleted: 0, message: 'No matching leads' })
    }

    if (!confirm) {
      return NextResponse.json({
        found: matches.length,
        preview: matches,
        message: 'Preview only. Add &confirm=1 to delete.',
      })
    }

    const deleted = await deleteAuditLeadsByEmail(email)
    return NextResponse.json({
      deleted: deleted?.length ?? 0,
      rows: deleted ?? [],
    })
  } catch (error) {
    console.error('Error deleting leads:', error)
    return NextResponse.json({ error: 'Failed to delete leads' }, { status: 500 })
  }
}
