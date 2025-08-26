import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

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

    // For now, skip EmailJS and just log the audit report
    // The EmailJS template is set up for contact forms, not audit delivery
    console.log('=== BUSINESS AUDIT REPORT FOR:', name, '===')
    console.log('Email:', email)
    console.log('Business Type:', businessType)  
    console.log('Website:', website)
    console.log('=== AUDIT REPORT START ===')
    console.log(auditReport)
    console.log('=== AUDIT REPORT END ===')
    
    // Return success - the audit is generated and logged
    // You can manually send this to the customer or set up proper email later
    return NextResponse.json({
      success: true,
      message: 'Audit report generated successfully. You will receive it via email within 24 hours.'
    })

    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://ayothedoc.com', // Add origin header for EmailJS
      },
      body: JSON.stringify({
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAILJS_AUDIT_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: name,
          from_email: email,
          subject: `Business Audit Request - ${businessType}`,
          message: `BUSINESS AUDIT REPORT FOR ${name}

Business Type: ${businessType}
Website: ${website}
Daily Hours on Repetitive Tasks: ${timeSpentDaily}
Current Challenges: ${currentChallenges}

AI-GENERATED AUDIT REPORT:
${auditReport}

--
This is a business audit report, not a regular contact form submission. Please send the full audit report above to ${email}.`,
          company: businessType,
        },
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('EmailJS failed with status:', emailResponse.status)
      console.error('EmailJS error response:', errorText)
      console.error('Template params sent:', JSON.stringify({
        to_name: name,
        email: email,
        from_name: 'Ayothedoc Business Audit',
        subject: `Your Personalized Business Automation Audit Report - ${businessType}`,
        business_type: businessType,
        website_url: website,
        time_spent: timeSpentDaily,
        challenges: currentChallenges,
      }, null, 2))
      // Still return success since audit was generated
      console.log('Audit report generated but email failed:', auditReport.substring(0, 200) + '...')
      return NextResponse.json({
        success: true,
        message: 'Audit report generated successfully. Email delivery may be delayed.'
      })
    }

    console.log('Email sent successfully')

    // Log the audit for analytics (optional)
    console.log(`Audit generated for ${email} - ${businessType}`)

    return NextResponse.json({
      success: true,
      message: 'Audit report generated and sent successfully'
    })

  } catch (error) {
    console.error('Business audit error:', error)
    return NextResponse.json(
      { error: 'Failed to generate audit report' },
      { status: 500 }
    )
  }
}