import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { marked } from 'marked'
import fs from 'fs'
import path from 'path'

import { insertAuditLead } from '@/lib/db'
import { getProviderKey } from '@/lib/secrets'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Model is overridable via env so we can move between Claude versions without a deploy.
const AUDIT_MODEL = process.env.AUDIT_CLAUDE_MODEL || 'claude-opus-4-7'

// Resolves the Anthropic key from the BYOK store first, then ANTHROPIC_API_KEY.
async function getAnthropicClient(): Promise<Anthropic | null> {
  const apiKey = await getProviderKey('anthropic')
  if (!apiKey) return null
  return new Anthropic({ apiKey })
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  if (apiKey.includes('placeholder') || apiKey.includes('your_resend_api_key_here')) return null
  return new Resend(apiKey)
}

// Hard rule for Ayo: never emit em or en dashes. Belt-and-suspenders over the model.
function stripDashes(s: string): string {
  if (!s) return s
  return s.replace(/\s*—\s*/g, ', ').replace(/\s*–\s*/g, '-')
}

// Function to save user data for lead collection
async function saveUserData(userData: any) {
  try {
    // Prefer Postgres if configured (DATABASE_URL or POSTGRES_URL)
    try {
      const ok = await insertAuditLead({
        name: userData.name,
        email: userData.email,
        website: userData.website,
        businessType: userData.businessType,
        currentChallenges: userData.currentChallenges,
        timeSpentDaily: userData.timeSpentDaily ?? null,
        optin_marketing: !!userData.optin_marketing,
      })
      if (ok) {
        const slackUrl = process.env.AUDIT_SLACK_WEBHOOK_URL
        if (slackUrl) {
          try {
            await fetch(slackUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: `New Audit Lead: ${userData.name} <${userData.email}> - ${userData.website} (${userData.businessType})` })
            })
          } catch (e) {
            console.error('Slack notification failed:', e)
          }
        }
        console.log('Lead saved to Postgres for:', userData.email)
        return
      }
    } catch (err) {
      console.error('Postgres save error:', err)
    }

    // Fallback: Airtable if configured
    const baseId = process.env.AIRTABLE_BASE_ID
    const apiKey = process.env.AIRTABLE_API_KEY
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Audit Leads'
    if (baseId && apiKey && tableName) {
      try {
        const airtableUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`
        const fields: Record<string, any> = {
          Name: userData.name,
          Email: userData.email,
          Website: userData.website,
          'Business Type': userData.businessType,
          'Current Challenges': userData.currentChallenges,
          'Time Spent Daily': userData.timeSpentDaily ?? null,
          'Opt-in Marketing': !!userData.optin_marketing,
          Timestamp: new Date().toISOString(),
          Source: 'Business Audit Form',
        }
        const resp = await fetch(airtableUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ records: [{ fields }] }),
        })
        if (resp.ok) {
          console.log('Lead saved to Airtable for:', userData.email)
          return
        } else {
          const text = await resp.text()
          console.error('Airtable insert failed:', resp.status, text)
        }
      } catch (err) {
        console.error('Airtable error:', err)
        // fall through to file storage
      }
    }

    // Final fallback: local JSON file (dev only)
    const dataDir = path.join(process.cwd(), 'data')
    const leadsFile = path.join(dataDir, 'audit-leads.json')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    let leads: any[] = []
    if (fs.existsSync(leadsFile)) {
      const existingData = fs.readFileSync(leadsFile, 'utf8')
      leads = JSON.parse(existingData)
    }
    const newLead = { ...userData, timestamp: new Date().toISOString(), id: Date.now() + Math.random().toString(36).substr(2, 9) }
    leads.push(newLead)
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2))
    console.log('User data saved locally for:', userData.email)
  } catch (error) {
    console.error('Error saving user data:', error)
  }
}

function convertMarkdownToHtml(markdown: string): string {
  try {
    // Use marked to convert markdown to HTML
    let html = marked(markdown, {
      headerIds: false,
      mangle: false,
      breaks: true
    }) as string

    // Add inline styles to the HTML for email compatibility
    html = html
      .replace(/<h1>/g, '<h1 style="color: #1f2937; margin: 30px 0 15px 0; font-size: 28px; font-weight: 700; line-height: 1.2;">')
      .replace(/<h2>/g, '<h2 style="color: #374151; margin: 25px 0 12px 0; font-size: 22px; font-weight: 600; line-height: 1.3;">')
      .replace(/<h3>/g, '<h3 style="color: #4b5563; margin: 20px 0 10px 0; font-size: 18px; font-weight: 600; line-height: 1.4;">')
      .replace(/<p>/g, '<p style="color: #374151; margin: 12px 0; line-height: 1.7; font-size: 16px;">')
      .replace(/<ul>/g, '<ul style="color: #374151; margin: 15px 0; padding-left: 25px;">')
      .replace(/<ol>/g, '<ol style="color: #374151; margin: 15px 0; padding-left: 25px;">')
      .replace(/<li>/g, '<li style="margin: 8px 0; line-height: 1.6; font-size: 16px;">')
      .replace(/<strong>/g, '<strong style="color: #1f2937; font-weight: 600;">')
      .replace(/<em>/g, '<em style="color: #4b5563;">')
      .replace(/<blockquote>/g, '<blockquote style="border-left: 4px solid #4f46e5; padding: 15px 20px; margin: 20px 0; background: #f3f4f6; color: #374151; font-style: italic;">')
      .replace(/<code>/g, '<code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: Monaco, Consolas, monospace; font-size: 14px; color: #1e40af;">')
      .replace(/<pre>/g, '<pre style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; overflow-x: auto; margin: 15px 0;">')

    return html
  } catch (error) {
    console.error('Error converting markdown to HTML:', error)
    // Minimal fallback: escape nothing fancy, just wrap in a paragraph.
    return `<p style="color: #374151; margin: 12px 0; line-height: 1.7; font-size: 16px;">${markdown.replace(/\n\n/g, '</p><p style="color: #374151; margin: 12px 0; line-height: 1.7; font-size: 16px;">')}</p>`
  }
}

// Stable instructions live in the system prompt (cache-friendly); per-prospect data goes in the user turn.
const SYSTEM_PROMPT = `You are the AI Operating System (AIOS) architect for Ayothedoc.

Ayothedoc installs and runs a done-for-you AI Operating System for small businesses and agencies. It is built on four layers, the Four Cs:
- Context: the system knows the business, its offers, voice, and priorities.
- Connections: it plugs into the tools the business already runs on (email, calendar, CRM, billing, docs) and works from live data.
- Capabilities: done-for-you workflows that draft, route, summarize, follow up, and report.
- Cadence: it runs on a schedule without being asked, so work happens while the owner is away.

The wedge offer is the free 60-Second Lead Engine: every new lead is answered in under 60 seconds, in the owner's voice, with their booking link.

You are producing a personalized AIOS readiness audit for a prospect, from their website and what they told you.

Voice rules (strict):
- Never use em dashes or en dashes. Use commas, periods, or the word "to" for ranges.
- Plain, direct, and honest. No hype. Never use "fully automated", "revolutionary", "game-changing", "cutting-edge", "unlock", or exclamation-heavy copy.
- Brand stance: least AI necessary, the simplest reliable workflow, boring is beautiful, and the owner always owns the system.
- Tool-agnostic. Talk about outcomes and which of the Four Cs an opportunity sits in. Do not tell them to "use Zapier, Make, or n8n". You may refer to generic categories such as their CRM or their inbox, but never prescribe a specific tool brand.

Content rules:
- Map every opportunity to exactly one of the Four Cs.
- readinessScore: 0 to 100, an honest read of how ready this business looks to run on an AIOS today, based on the site and inputs. Be realistic, not flattering.
- hoursSavedPerMonth: a conservative range written as a string, like "10 to 20". If the owner gave hours per day on manual work, ground the estimate in that. If they did not, give a conservative range and do not invent precise dollar amounts anywhere.
- exampleWorkflow: one concrete, done-for-you flow you would install first, in plain language.
- opportunities: exactly 3, ordered by leverage. Each has a short label, its Four-C layer, and a one or two sentence value description written to the owner.
- fullReportMarkdown: a complete, client-ready report in Markdown with these sections:
  # AI Operating System Readiness Audit for {name}
  ## Executive summary
  ## What we see (from your site and what you told us)
  ## Your readiness across the Four Cs
  ## The three highest-leverage opportunities (each tagged with its Four-C layer)
  ## How we would install it (Audit, free and about 10 minutes; Install, 10 business days; Operate, ongoing with one new automation shipped weekly; you recover 40 or more hours a month or we keep working free until you do; you own everything, no lock-in)
  ## Expected impact (use ranges, no fabricated dollar figures)
  ## Next step (recommend starting with the free 60-Second Lead Engine on their real leads)
  Keep it specific to this business. No em dashes anywhere.`

const PREVIEW_SCHEMA = {
  type: 'object',
  properties: {
    readinessScore: { type: 'integer' },
    headline: { type: 'string' },
    opportunities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label: { type: 'string' },
          layer: { type: 'string', enum: ['Context', 'Connections', 'Capabilities', 'Cadence'] },
          value: { type: 'string' },
        },
        required: ['label', 'layer', 'value'],
        additionalProperties: false,
      },
    },
    hoursSavedPerMonth: { type: 'string' },
    exampleWorkflow: { type: 'string' },
    fullReportMarkdown: { type: 'string' },
  },
  required: ['readinessScore', 'headline', 'opportunities', 'hoursSavedPerMonth', 'exampleWorkflow', 'fullReportMarkdown'],
  additionalProperties: false,
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, website, businessType, currentChallenges, timeSpentDaily, optin_marketing } = await request.json()

    console.log('Received audit request for:', { email, businessType, website, optin_marketing })

    // Validate required fields. Hours are optional now, so we never fabricate them.
    if (!name || !email || !website || !businessType || !currentChallenges) {
      return NextResponse.json({ error: 'Name, email, website, business type, and your biggest blocker are required' }, { status: 400 })
    }

    const hours = typeof timeSpentDaily === 'number' && timeSpentDaily > 0 ? timeSpentDaily : null

    // Save the lead first so a downstream failure never costs us the lead.
    await saveUserData({
      name,
      email,
      website,
      businessType,
      currentChallenges,
      timeSpentDaily: hours,
      optin_marketing: optin_marketing || false,
    })

    const client = await getAnthropicClient()
    if (!client) {
      console.error('No Anthropic key (store or ANTHROPIC_API_KEY) - returning success without AI report')
      return NextResponse.json({
        success: true,
        message: 'Audit request received! Your detailed report will be emailed within 24 hours.',
      })
    }

    // Fetch website content (best effort) to ground the analysis.
    let websiteContent = ''
    try {
      const parsed = new URL(website)
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Unsupported URL protocol')
      }
      const host = parsed.hostname.toLowerCase()
      if (
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host === '0.0.0.0' ||
        host.startsWith('127.') ||
        host.startsWith('10.') ||
        host.startsWith('192.168.') ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
        host === '::1'
      ) {
        throw new Error('Refusing to fetch private/localhost URLs')
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const websiteResponse = await fetch(website, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AyothedocBot/1.0)'
        },
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      if (websiteResponse.ok) {
        const html = await websiteResponse.text()
        websiteContent = html
          .replace(/<script[^>]*>.*?<\/script>/gis, '')
          .replace(/<style[^>]*>.*?<\/style>/gis, '')
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .substring(0, 3000)
      }
    } catch (error) {
      console.log('Could not fetch website content:', error)
      websiteContent = 'Website content could not be analyzed'
    }

    // Generate the audit with Claude, constrained to our preview + report schema.
    console.log('Generating AIOS readiness audit with', AUDIT_MODEL)

    const userPrompt = `Prospect details:
- Name: ${name}
- Business type or industry: ${businessType}
- Website: ${website}
- Hours per day on manual or repetitive work: ${hours !== null ? hours : 'not provided'}
- Biggest blocker they named: ${currentChallenges}

Website content (extracted, may be truncated):
${websiteContent}

Produce the AIOS readiness audit for this prospect.`

    let preview: any = null
    let auditReport = ''
    try {
      const resp = await client.messages.create({
        model: AUDIT_MODEL,
        max_tokens: 8000,
        system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
        messages: [{ role: 'user', content: userPrompt }],
        output_config: { format: { type: 'json_schema', schema: PREVIEW_SCHEMA } },
      } as any)

      const textBlock = resp.content.find((b): b is Anthropic.TextBlock => b.type === 'text')
      const parsed = JSON.parse(textBlock?.text ?? '{}')

      auditReport = stripDashes(parsed.fullReportMarkdown || '')
      preview = {
        readinessScore: typeof parsed.readinessScore === 'number' ? parsed.readinessScore : null,
        headline: stripDashes(parsed.headline || ''),
        opportunities: Array.isArray(parsed.opportunities)
          ? parsed.opportunities.slice(0, 3).map((o: any) => ({
              label: stripDashes(o.label || ''),
              layer: o.layer || null,
              value: stripDashes(o.value || ''),
            }))
          : [],
        hoursSavedPerMonth: stripDashes(parsed.hoursSavedPerMonth || ''),
        exampleWorkflow: stripDashes(parsed.exampleWorkflow || ''),
      }
      console.log('AIOS audit generated successfully')
    } catch (err) {
      console.error('Claude audit generation failed:', err)
      // Lead is already saved; tell the user it is on the way and follow up manually.
      return NextResponse.json({
        success: true,
        message: 'Audit request received! Your report will be emailed shortly.',
      })
    }

    // Email the full report via Resend (with graceful fallback).
    const auditReportHtml = convertMarkdownToHtml(auditReport)
    const fromAddress = process.env.AUDIT_FROM_EMAIL || 'Ayothedoc <onboarding@resend.dev>'
    const resend = getResendClient()

    if (!resend) {
      console.log('RESEND_API_KEY not configured properly - logging report and returning preview')
      console.log('=== AIOS READINESS AUDIT FOR:', name, '===')
      console.log('Email:', email, '| Business Type:', businessType, '| Website:', website)
      console.log(auditReport)
      return NextResponse.json({
        success: true,
        preview,
        message: 'Your report is generated. You will receive it via email shortly.',
      })
    }

    try {
      const { data, error } = await resend.emails.send({
        from: fromAddress,
        to: [email],
        subject: `Your AI Operating System readiness audit, ${businessType}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: white; padding: 40px 30px; border-radius: 15px; margin-bottom: 30px; text-align: center; box-shadow: 0 8px 32px rgba(79, 70, 229, 0.3);">
              <h1 style="margin: 0; font-size: 30px; font-weight: 700; letter-spacing: -0.5px;">Your AI Operating System Readiness Audit</h1>
              <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Prepared for ${businessType}</p>
            </div>

            <!-- Welcome Message -->
            <div style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; margin-bottom: 15px;">Hi ${name},</h2>
              <p style="color: #4b5563; line-height: 1.7; font-size: 16px; margin: 0;">
                Thanks for requesting your readiness audit. We looked at your site (<strong>${website}</strong>) and what you told us, then scored your business across the four layers of an AI Operating System: Context, Connections, Capabilities, and Cadence. The full read is below.
              </p>
            </div>

            <!-- Audit Report Content -->
            <div style="background: white; padding: 35px; border-radius: 15px; border-left: 6px solid #4f46e5; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="color: #1f2937; line-height: 1.7;">
                ${auditReportHtml}
              </div>
            </div>

            <!-- Call to Action -->
            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 30px; border-radius: 15px; margin-bottom: 25px; text-align: center; border: 1px solid #bfdbfe;">
              <h3 style="color: #1e40af; margin-top: 0; font-size: 22px; margin-bottom: 15px;">Start with the part we give away free</h3>
              <p style="color: #374151; line-height: 1.7; margin-bottom: 20px; font-size: 16px;">
                We will build your 60-Second Lead Engine free, on your real leads. If it books calls you would have missed, we run the rest of your operations.
              </p>
              <a href="https://ayothedoc.com/offer" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);">
                Get your Lead Engine free
              </a>
              <p style="color: #6b7280; margin: 18px 0 0 0; font-size: 14px;">
                Prefer to talk first? <a href="https://calendly.com/ayothedoc" style="color: #4f46e5; font-weight: 600;">Book a 15-minute call</a>.
              </p>
            </div>

            <!-- Footer -->
            <div style="background: white; padding: 25px; border-radius: 15px; border-top: 4px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
                <strong style="color: #1f2937;">Best regards,</strong><br>
                <span style="color: #4f46e5; font-weight: 600;">The Ayothedoc Team</span>
              </p>
              <hr style="border: none; height: 1px; background: #e5e7eb; margin: 20px 0;">
              <p style="margin: 15px 0 0 0; font-size: 13px; color: #9ca3af; line-height: 1.5;">
                <strong>How this was made:</strong> this audit was generated by analyzing your website and the details you shared, then mapped to the four layers of an AI Operating System.<br>
                <strong>Privacy:</strong> your information is used only to prepare this audit and follow up with you. Reply to opt out any time.
              </p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error('Resend error:', error)
        // The report still generated; return the preview so the page renders.
        return NextResponse.json({
          success: true,
          preview,
          message: 'Your report is generated. Email delivery is delayed, we will resend it shortly.',
        })
      }

      console.log('Email sent successfully via Resend:', data?.id, '-', email)
      return NextResponse.json({
        success: true,
        preview,
        message: 'Audit generated and sent. Check your email in a few minutes.',
      })
    } catch (error: any) {
      console.error('Email sending failed:', error)
      // Still return the preview so the on-screen snapshot renders.
      return NextResponse.json({
        success: true,
        preview,
        message: 'Your report is generated. You will receive it via email shortly.',
      })
    }
  } catch (error) {
    console.error('Business audit error:', error)
    return NextResponse.json({ error: 'Failed to generate audit report' }, { status: 500 })
  }
}
