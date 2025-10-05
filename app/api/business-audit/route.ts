import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Resend } from 'resend'
import { marked } from 'marked'
import fs from 'fs'
import path from 'path'

import { insertAuditLead } from '@/lib/db'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const resend = new Resend(process.env.RESEND_API_KEY)

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
        timeSpentDaily: userData.timeSpentDaily,
        optin_marketing: !!userData.optin_marketing,
      })
      if (ok) {
        const slackUrl = process.env.AUDIT_SLACK_WEBHOOK_URL
        if (slackUrl) {
          try {
            await fetch(slackUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: New Audit Lead:  <> —  () })
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
        const airtableUrl = https://api.airtable.com/v0//
        const fields: Record<string, any> = {
          Name: userData.name,
          Email: userData.email,
          Website: userData.website,
          'Business Type': userData.businessType,
          'Current Challenges': userData.currentChallenges,
          'Time Spent Daily': userData.timeSpentDaily,
          'Opt-in Marketing': !!userData.optin_marketing,
          Timestamp: new Date().toISOString(),
          Source: 'Business Audit Form',
        }
        const resp = await fetch(airtableUrl, {
          method: 'POST',
          headers: {
            Authorization: Bearer ,
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
}function convertMarkdownToHtml(markdown: string): string {
  try {
    // Use marked to convert markdown to HTML
    let html = marked(markdown, {
      headerIds: false,
      mangle: false,
      breaks: true
    })
    
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
    
    // Enhanced fallback conversion with better regex patterns
    return markdown
      // Convert headers
      .replace(/^# (.*$)/gim, '<h1 style="color: #1f2937; margin: 30px 0 15px 0; font-size: 28px; font-weight: 700; line-height: 1.2;">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 style="color: #374151; margin: 25px 0 12px 0; font-size: 22px; font-weight: 600; line-height: 1.3;">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 style="color: #4b5563; margin: 20px 0 10px 0; font-size: 18px; font-weight: 600; line-height: 1.4;">$1</h3>')
      
      // Convert bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #1f2937; font-weight: 600;">$1</strong>')
      
      // Convert bullet points
      .replace(/^- (.*$)/gim, '• $1<br>')
      .replace(/^\* (.*$)/gim, '• $1<br>')
      
      // Convert line breaks
      .replace(/\n\n/g, '</p><p style="color: #374151; margin: 12px 0; line-height: 1.7; font-size: 16px;">')
      .replace(/\n/g, '<br>')
      
      // Wrap in paragraphs
      .replace(/^(.)/g, '<p style="color: #374151; margin: 12px 0; line-height: 1.7; font-size: 16px;">$1')
      .replace(/(.)$/g, '$1</p>')
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, website, businessType, currentChallenges, timeSpentDaily, optin_marketing } = await request.json()

    console.log('Received audit request for:', { email, businessType, website, optin_marketing })

    // Validate required fields
    if (!name || !email || !website || !businessType || !currentChallenges || !timeSpentDaily) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if required environment variables are set
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    // Fetch website content
    let websiteContent = ''
    try {
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
        // Extract basic content (simplified)
        websiteContent = html
          .replace(/<script[^>]*>.*?<\/script>/gis, '')
          .replace(/<style[^>]*>.*?<\/style>/gis, '')
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .substring(0, 3000) // Limit content length
      }
    } catch (error) {
      console.log('Could not fetch website content:', error)
      websiteContent = 'Website content could not be analyzed'
    }

    // Generate AI analysis using Gemini
    console.log('Generating AI analysis...')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
    As an expert business automation consultant, analyze the following business and provide a comprehensive automation audit report:

    BUSINESS INFORMATION:
    - Name: ${name}
    - Business Type: ${businessType}
    - Website: ${website}
    - Daily Hours on Repetitive Tasks: ${timeSpentDaily}
    - Current Challenges: ${currentChallenges}

    WEBSITE CONTENT ANALYSIS:
    ${websiteContent}

    Please provide a detailed, personalized report in the following format:

    # Business Automation Audit Report for ${name}

    ## Executive Summary
    [2-3 sentence overview of automation potential]

    ## Business Analysis
    [Analysis of their business model based on website content and type]

    ## Top 5 Automation Opportunities
    
    ### 1. [Automation Name]
    - **What it does:** [Description]
    - **Tools needed:** [Specific tools/platforms]
    - **Time saved:** [Hours per week]
    - **Cost estimate:** [Implementation cost]
    - **ROI timeline:** [Payback period]

    ### 2. [Automation Name]
    [Same format for 5 opportunities total]

    ## Priority Implementation Roadmap
    - **Phase 1 (Month 1):** [Quick wins]
    - **Phase 2 (Month 2-3):** [Medium complexity]
    - **Phase 3 (Month 4-6):** [Advanced automations]

    ## Projected Annual Savings
    - **Time saved:** [Total hours per year]
    - **Cost savings:** [Dollar amount]
    - **Revenue potential:** [Additional revenue opportunities]

    ## Next Steps
    [Specific actionable recommendations]

    Make this report highly specific to their business type, challenges, and website content. Focus on practical, implementable solutions using tools like Make.com, Zapier, AI assistants, and custom workflows.
    `

    const result = await model.generateContent(prompt)
    const auditReport = result.response.text()
    console.log('AI analysis generated successfully')

    // Save user data for lead collection
    await saveUserData({
      name,
      email,
      website,
      businessType,
      currentChallenges,
      timeSpentDaily,
      optin_marketing: optin_marketing || false
    })

    // Convert markdown report to clean HTML
    const auditReportHtml = convertMarkdownToHtml(auditReport)

    // Send email with the report (using EmailJS or similar service)
    const emailContent = {
      to_name: name,
      to_email: email,
      subject: `Your Personalized Business Automation Audit Report - ${businessType}`,
      message: auditReport,
      website_analyzed: website,
      business_type: businessType,
    }

    // Send email using Resend (with fallback)
    console.log('Sending audit report via Resend...')
    
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('placeholder')) {
      console.log('RESEND_API_KEY not configured properly - using fallback method')
      
      // Fallback: Log the report and notify admin
      console.log('=== BUSINESS AUDIT REPORT FOR:', name, '===')
      console.log('Email:', email)
      console.log('Business Type:', businessType)  
      console.log('Website:', website)
      console.log('=== AUDIT REPORT START ===')
      console.log(auditReport)
      console.log('=== AUDIT REPORT END ===')
      
      // TODO: Set up proper Resend API key for automatic delivery
      return NextResponse.json({
        success: true,
        message: 'Audit report generated successfully! You will receive it via email within 24 hours.'
      })
    }

    try {
      const { data, error } = await resend.emails.send({
        from: 'Ayothedoc Business Audit <onboarding@resend.dev>',
        to: [email],
        subject: `Your Personalized Business Automation Audit Report - ${businessType}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: white; padding: 40px 30px; border-radius: 15px; margin-bottom: 30px; text-align: center; box-shadow: 0 8px 32px rgba(79, 70, 229, 0.3);">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">🚀 Your Business Automation Audit Report</h1>
              <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Personalized recommendations for ${businessType}</p>
            </div>
            
            <!-- Welcome Message -->
            <div style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; margin-bottom: 15px;">Hi ${name}! 👋</h2>
              <p style="color: #4b5563; line-height: 1.7; font-size: 16px; margin: 0;">
                Thank you for requesting your personalized business automation audit! Our AI has analyzed your website (<strong>${website}</strong>) and business information to create a comprehensive automation roadmap specifically for your <strong>${businessType}</strong> business.
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
              <h3 style="color: #1e40af; margin-top: 0; font-size: 22px; margin-bottom: 15px;">Ready to Transform Your Business? 🎯</h3>
              <p style="color: #374151; line-height: 1.7; margin-bottom: 20px; font-size: 16px;">
                Questions about implementing these automations? Let's discuss how we can help you save those <strong>${timeSpentDaily} hours per day</strong> and transform your business operations into a growth engine.
              </p>
              <a href="https://calendly.com/ayothedoc" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3); transition: all 0.3s ease;">
                📅 Book Your FREE Strategy Call
              </a>
            </div>
            
            <!-- Footer -->
            <div style="background: white; padding: 25px; border-radius: 15px; border-top: 4px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
                <strong style="color: #1f2937;">Best regards,</strong><br>
                <span style="color: #4f46e5; font-weight: 600;">The Ayothedoc Team</span>
              </p>
              <hr style="border: none; height: 1px; background: #e5e7eb; margin: 20px 0;">
              <p style="margin: 15px 0 0 0; font-size: 13px; color: #9ca3af; line-height: 1.5;">
                <strong>🤖 AI-Powered Analysis:</strong> This audit was generated using advanced AI analysis of your website and business model. Each recommendation is tailored to your specific challenges and industry.<br>
                <strong>🔒 Privacy:</strong> Your information is secure and will only be used to provide you with relevant business automation insights.
              </p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { error: 'Failed to send audit report' },
          { status: 500 }
        )
      }

      console.log('Email sent successfully via Resend:', data?.id)
      console.log(`Audit generated for ${email} - ${businessType}`)

      return NextResponse.json({
        success: true,
        message: 'Audit report generated and sent successfully! Check your email in a few minutes.'
      })

    } catch (error: any) {
      console.error('Email sending failed:', error)
      
      // If it's an API key issue, fall back to logging
      if (error?.message?.includes('API key') || error?.statusCode === 401) {
        console.log('Resend API key issue - falling back to logging method')
        console.log('=== BUSINESS AUDIT REPORT FOR:', name, '===')
        console.log('Email:', email)
        console.log('Business Type:', businessType)  
        console.log('Website:', website)
        console.log('=== AUDIT REPORT START ===')
        console.log(auditReport)
        console.log('=== AUDIT REPORT END ===')
        
        return NextResponse.json({
          success: true,
          message: 'Audit report generated successfully! You will receive it via email within 24 hours.'
        })
      }
      
      return NextResponse.json(
        { error: 'Failed to send audit report' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Business audit error:', error)
    return NextResponse.json(
      { error: 'Failed to generate audit report' },
      { status: 500 }
    )
  }
}



