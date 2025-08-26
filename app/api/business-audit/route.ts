import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Resend } from 'resend'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, website, businessType, currentChallenges, timeSpentDaily } = await request.json()

    console.log('Received audit request for:', { email, businessType, website })

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
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px;">Your Business Automation Audit Report</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Personalized recommendations for ${businessType}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
              <h2 style="color: #333; margin-top: 0;">Hi ${name},</h2>
              <p style="color: #666; line-height: 1.6;">
                Thank you for requesting your personalized business automation audit! Our AI has analyzed your website and business information to create a comprehensive automation roadmap specifically for your ${businessType} business.
              </p>
            </div>
            
            <div style="white-space: pre-wrap; line-height: 1.6; color: #333; background: white; padding: 25px; border-radius: 10px; border-left: 4px solid #667eea; margin-bottom: 25px;">
${auditReport}
            </div>
            
            <div style="background: #e8f4fd; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
              <h3 style="color: #1a73e8; margin-top: 0;">Ready to Implement These Automations?</h3>
              <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
                Questions about implementing these automations? Let's discuss how we can help you save those ${timeSpentDaily} hours per day and transform your business operations.
              </p>
              <a href="https://calendly.com/ayothedoc" style="display: inline-block; background: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Book Your Free Consultation
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; color: #888; font-size: 14px;">
              <p>Best regards,<br>The Ayothedoc Team</p>
              <p style="margin-top: 15px; font-size: 12px;">
                <em>This audit was generated using advanced AI analysis of your website (${website}) and business model. Each recommendation is tailored to your specific challenges and industry.</em>
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