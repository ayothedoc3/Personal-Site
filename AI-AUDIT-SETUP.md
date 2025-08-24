# AI Business Audit Tool Setup Guide

## Overview
The AI Business Audit tool uses Google Gemini AI to analyze user websites and generate personalized automation recommendations sent via email.

## Required Setup

### 1. Google Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Add to your `.env.local` file:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### 2. EmailJS Template for Audit Reports
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Create a new email template for audit reports
3. Template structure:
   ```html
   Subject: Your Personalized Business Automation Audit - {{business_type}}
   
   Hi {{to_name}},
   
   Thanks for requesting your personalized automation audit! 
   
   Website Analyzed: {{website_analyzed}}
   Business Type: {{business_type}}
   
   Here's your comprehensive report:
   
   {{message}}
   
   Best regards,
   The Ayothedoc Team
   
   ---
   Ready to implement these automations? Reply to this email to schedule a free consultation!
   ```
4. Add template ID to `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_AUDIT_TEMPLATE_ID=your_audit_template_id_here
   ```

### 3. Environment Variables Summary
Your `.env.local` should include:
```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_contact_template_id_here
NEXT_PUBLIC_EMAILJS_AUDIT_TEMPLATE_ID=your_audit_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
```

## How It Works

### 1. User Input
- Name, email, website URL
- Business type/industry
- Current challenges
- Time spent on repetitive tasks

### 2. AI Analysis
- Fetches and analyzes website content
- Uses Gemini AI to generate personalized recommendations
- Creates specific automation opportunities based on:
  - Business model
  - Industry best practices  
  - Current challenges
  - Website content analysis

### 3. Report Generation
- Comprehensive audit report including:
  - Executive summary
  - Top 5 automation opportunities
  - Implementation roadmap
  - ROI projections
  - Specific tool recommendations

### 4. Email Delivery
- Professional formatted report sent via EmailJS
- Includes call-to-action for consultation

## Features

### Personalization
- Website content analysis
- Industry-specific recommendations
- Custom implementation timeline
- Specific tool suggestions (Make.com, Zapier, etc.)

### Business Intelligence
- ROI calculations
- Time savings projections
- Priority-based implementation roadmap
- Cost-benefit analysis

### Lead Generation
- Captures qualified leads with business context
- Provides immediate value
- Creates consultation opportunities
- Builds trust through AI-powered insights

## Benefits Over Generic ROI Calculator

1. **Highly Personalized**: Each report is unique based on actual business analysis
2. **Educational Value**: Users learn specific automation strategies for their industry
3. **Qualified Leads**: Users who request audits are serious about automation
4. **Competitive Advantage**: AI-powered analysis sets you apart from generic calculators
5. **Higher Conversion**: Personalized reports create stronger engagement than generic tools

## Testing

1. Fill out the form with test data
2. Use a real website URL for content analysis
3. Check email delivery and formatting
4. Verify AI report quality and relevance

## Monitoring

- Check API usage in Google AI Studio
- Monitor EmailJS delivery rates
- Track form submissions and conversion rates
- Review generated reports for quality

This tool transforms your website from a static brochure into an intelligent lead generation machine that provides genuine value to potential clients.