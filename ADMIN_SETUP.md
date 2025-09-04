# Admin Panel Setup Guide

## 🔐 Access Your Business Audit Leads

The admin panel at `/admin` allows you to view and export all business audit form submissions.

### Setup Steps:

1. **Add Environment Variable**
   ```bash
   # Add this to your .env.local file (for local development)
   LEADS_API_KEY=your-secret-admin-key-123
   
   # Or add to your Vercel environment variables (for production)
   # Go to: Vercel Dashboard > Your Project > Settings > Environment Variables
   # Variable Name: LEADS_API_KEY
   # Value: your-secret-admin-key-123
   ```

2. **Access Admin Panel**
   - Visit: `https://your-website.com/admin`
   - Or locally: `http://localhost:3000/admin`

3. **Login**
   - Enter the same API key you set in the environment variable
   - Click "Access Leads"

4. **View & Export Leads**
   - See all audit form submissions
   - View contact details, challenges, and time spent data
   - Export as CSV for importing into your CRM
   - Refresh to see new submissions

### 📊 Lead Data Collected:

Each audit submission captures:
- ✅ Full name and email address
- ✅ Website URL (analyzed by AI)  
- ✅ Business type/industry
- ✅ Hours spent on repetitive tasks daily
- ✅ Current business challenges (detailed)
- ✅ Submission timestamp
- ✅ Unique lead ID

### 🔒 Security Notes:

- Keep your `LEADS_API_KEY` secure and private
- Change the key periodically for security
- Only you will have access to the admin panel
- Lead data is stored locally in your project files

### 📈 Using Lead Data:

- **Follow up**: Contact high-value prospects who spend 4+ hours daily on repetitive tasks
- **Segment**: Group leads by business type for targeted messaging  
- **Qualify**: Review challenges to understand pain points
- **Convert**: Use the audit report as a conversation starter
- **Export**: Download CSV to import into HubSpot, Salesforce, etc.

### 🆘 Troubleshooting:

**Can't access admin panel?**
- Make sure `LEADS_API_KEY` is set in environment variables
- Restart your development server after adding the variable
- Check the browser console for any error messages

**No leads showing?**
- Leads will appear after users submit the business audit form
- Check that the audit form is working on `/audit` page

**Export not working?**
- Ensure you're using the same API key for authentication
- Try refreshing the page and attempting export again