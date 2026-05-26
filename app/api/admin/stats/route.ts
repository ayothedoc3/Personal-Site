import { NextRequest, NextResponse } from "next/server"
import { listAuditLeads } from "@/lib/db"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function authed(request: NextRequest): boolean {
  const auth = request.headers.get("authorization")
  return !!process.env.LEADS_API_KEY && auth === `Bearer ${process.env.LEADS_API_KEY}`
}

export async function GET(request: NextRequest) {
  if (!authed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const leads = (await listAuditLeads()) ?? []
    const now = Date.now()
    const DAY = 24 * 60 * 60 * 1000

    const within = (days: number) =>
      leads.filter((l) => now - new Date(l.timestamp).getTime() <= days * DAY).length

    const optedIn = leads.filter((l) => l.optin_marketing).length
    // "High intent" = self-reported 3+ hours/day on repetitive work
    const highIntent = leads.filter((l) => (l.timeSpentDaily || 0) >= 3).length
    const totalHoursReported = leads.reduce((sum, l) => sum + (l.timeSpentDaily || 0), 0)

    return NextResponse.json({
      total: leads.length,
      last7d: within(7),
      last30d: within(30),
      optedIn,
      highIntent,
      avgHoursPerDay: leads.length ? Math.round((totalHoursReported / leads.length) * 10) / 10 : 0,
      latest: leads.slice(0, 5).map((l) => ({
        name: l.name,
        email: l.email,
        businessType: l.businessType,
        timeSpentDaily: l.timeSpentDaily,
        timestamp: l.timestamp,
      })),
    })
  } catch (error) {
    console.error("stats error:", error)
    return NextResponse.json({ error: "Failed to compute stats" }, { status: 500 })
  }
}
