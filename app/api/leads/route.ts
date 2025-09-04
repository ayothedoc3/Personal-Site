import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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

    const dataDir = path.join(process.cwd(), 'data')
    const leadsFile = path.join(dataDir, 'audit-leads.json')
    
    // Check if file exists
    if (!fs.existsSync(leadsFile)) {
      return NextResponse.json({
        leads: [],
        count: 0,
        message: 'No leads found yet'
      })
    }
    
    // Read and return leads
    const leadsData = fs.readFileSync(leadsFile, 'utf8')
    const leads = JSON.parse(leadsData)
    
    // Sort by timestamp (newest first)
    leads.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
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
      const dataDir = path.join(process.cwd(), 'data')
      const leadsFile = path.join(dataDir, 'audit-leads.json')
      
      if (!fs.existsSync(leadsFile)) {
        return NextResponse.json({
          error: 'No leads found'
        }, { status: 404 })
      }
      
      const leadsData = fs.readFileSync(leadsFile, 'utf8')
      const leads = JSON.parse(leadsData)
      
      // Convert to CSV
      const csvHeaders = 'ID,Name,Email,Website,Business Type,Time Spent Daily,Current Challenges,Timestamp\n'
      const csvRows = leads.map((lead: any) => 
        `"${lead.id}","${lead.name}","${lead.email}","${lead.website}","${lead.businessType}","${lead.timeSpentDaily}","${lead.currentChallenges?.replace(/"/g, '""')}","${lead.timestamp}"`
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