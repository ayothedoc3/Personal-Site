# EmailJS Setup Guide

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. Copy the **Service ID**

## 3. Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

Hello {{to_name}},

You have a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Service Interest: {{service}}
Newsletter: {{newsletter}}

Message:
{{message}}

---
This message was sent from your website contact form.
Reply to: {{reply_to}}
```

4. Save and copy the **Template ID**

## 4. Get Public Key

1. Go to **General** settings in your EmailJS dashboard
2. Copy your **Public Key**

## 5. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 6. Calendar Integration

Update the Calendly URL in the code:
- Replace `https://calendly.com/ayothedoc` with your actual Calendly link
- Or use another booking platform like Cal.com

## 7. Test the Form

1. Start the development server: `npm run dev`
2. Go to `/contact` page
3. Fill out and submit the form
4. Check your email for the submission

## Features Implemented

✅ **Form Validation**
- Real-time validation with Zod schema
- Required field indicators
- Email format validation
- Minimum character limits

✅ **UI Components**
- Custom Input, Textarea, Select, Checkbox components
- Loading states during submission
- Success/error feedback messages
- Hover and focus animations

✅ **Form Submission**
- EmailJS integration for sending emails
- Form reset after successful submission
- Error handling for failed submissions

✅ **CTA Button Functionality**
- "Book Consultation" → Opens Calendly
- "Get Free Consultation" → Navigates to contact page
- "Learn More" → Smooth scrolls to services section
- "View Our Services" → Smooth scrolls to services section

## Customization Options

### EmailJS Alternative
If you prefer a different email service, you can replace EmailJS with:
- **Resend**: Modern email API
- **Nodemailer**: Server-side email sending
- **Sendgrid**: Enterprise email service

### Database Integration
To store form submissions in a database:
1. Set up a database (PostgreSQL, MongoDB, etc.)
2. Create an API route in `app/api/contact/route.ts`
3. Update the form to submit to your API instead of EmailJS

### Newsletter Integration
To integrate with newsletter services:
- **Mailchimp**: Use their API to subscribe users
- **ConvertKit**: Add subscribers via API
- **Brevo (Sendinblue)**: Direct API integration