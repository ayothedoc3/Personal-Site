# Coolify Deployment Guide

This guide will help you deploy your Ayothedoc website using Coolify with GitHub integration.

## Prerequisites

- Coolify server set up and running
- GitHub repository with your code
- EmailJS account configured (see SETUP.md)

## Step 1: Prepare Your Repository

Ensure your repository has all the necessary files:
- ✅ `package.json` with build scripts
- ✅ `next.config.mjs` with production configuration
- ✅ `Dockerfile` for container deployment (optional)
- ✅ `.env.local.example` with environment variables template

## Step 2: Connect Repository to Coolify

1. **Login to Coolify Dashboard**
2. **Create New Application**:
   - Click "New Application"
   - Select "Public Repository" 
   - Enter your GitHub repository URL
   - Choose "main" branch

3. **Application Settings**:
   - **Name**: `ayothedoc-website`
   - **Build Pack**: Auto-detect (should detect Next.js)
   - **Port**: `3000`

## Step 3: Configure Environment Variables

In Coolify, add these environment variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NODE_ENV=production
```

**How to add variables in Coolify:**
1. Go to your application dashboard
2. Click "Environment Variables" tab
3. Add each variable with "Add New Variable"
4. Mark as "Build Time" for NEXT_PUBLIC_* variables

## Step 4: Build Configuration

Coolify should auto-detect Next.js and use these commands:
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Install Command**: `npm install`

If not auto-detected, manually set:
```bash
# Build Command
npm run build

# Start Command  
npm run start
```

## Step 5: Domain Setup

1. **Add Custom Domain** (optional):
   - Go to "Domains" tab in your app
   - Add your domain (e.g., `yourdomain.com`)
   - Configure DNS to point to your Coolify server

2. **SSL Certificate**:
   - Coolify will automatically provision Let's Encrypt SSL
   - Enable "Force HTTPS" for security

## Step 6: Deploy

1. **Initial Deployment**:
   - Click "Deploy" button
   - Monitor build logs for any issues
   - First deployment may take 3-5 minutes

2. **Auto-Deployments**:
   - Enable "Auto Deploy" for automatic deployments on git push
   - Set up webhook for instant deployments

## Step 7: Verify Deployment

Once deployed, test these features:

### ✅ Basic Functionality
- [ ] Homepage loads correctly
- [ ] Navigation between pages works
- [ ] Theme toggle (dark/light) works
- [ ] Responsive design on mobile

### ✅ Contact Form
- [ ] Form validation shows errors
- [ ] Required fields are enforced
- [ ] Email format validation works
- [ ] Form submission sends email (test with real email)
- [ ] Success message appears after submission
- [ ] Form resets after successful submission

### ✅ CTA Buttons
- [ ] "Book Consultation" opens Calendly
- [ ] "Get Free Consultation" goes to contact page
- [ ] "Learn More" scrolls to services section
- [ ] "View Our Services" scrolls to services section

## Troubleshooting

### Build Failures
If build fails, check:
1. **Node.js Version**: Ensure Coolify uses Node.js 18+
2. **Environment Variables**: All NEXT_PUBLIC_* variables are set
3. **Dependencies**: Run `npm install` locally to check for issues

### Common Issues

**Issue**: `Module not found` errors
**Solution**: Clear build cache and redeploy

**Issue**: Environment variables not working
**Solution**: Ensure NEXT_PUBLIC_ prefix and mark as "Build Time"

**Issue**: Images not loading
**Solution**: Check public folder is included in build

**Issue**: EmailJS not working
**Solution**: Verify environment variables and EmailJS account setup

## Performance Optimization

### Build Optimizations
- Coolify automatically compresses assets
- Next.js optimizes images and fonts
- Static files are cached

### Monitoring
- Use Coolify's built-in monitoring
- Check application logs for errors
- Monitor response times and uptime

## Maintenance

### Updates
1. Push changes to GitHub
2. Auto-deployment triggers (if enabled)
3. Monitor deployment logs
4. Test functionality after updates

### Backup
- Coolify handles container backups
- Keep GitHub repository as source backup
- Export environment variables periodically

## Alternative Deployment Options

If you prefer other deployment methods:

### Docker Deployment
```bash
# Build Docker image
docker build -t ayothedoc-website .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id \
  -e NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id \
  -e NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key \
  ayothedoc-website
```

### Manual Server Deployment
```bash
# On your server
git clone your-repo
cd Personal-Site
npm install
npm run build
npm run start
```

## Support

If you encounter issues:
1. Check Coolify documentation
2. Review application logs in Coolify dashboard
3. Test locally with `npm run build && npm run start`
4. Contact Ayothedoc support

---

**Note**: This deployment is production-ready with all optimizations enabled. The website will be fast, secure, and scalable on Coolify infrastructure.