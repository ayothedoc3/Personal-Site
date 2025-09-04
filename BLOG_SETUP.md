# File-Based Blog System Setup Guide

This guide will help you complete the setup of your new file-based blog system with Decap CMS.

## ✅ What's Already Done

- ✅ Added markdown processing dependencies (gray-matter, remark, remark-html)
- ✅ Created `content/posts/` directory structure
- ✅ Implemented `lib/posts.ts` utility functions for reading MDX files
- ✅ Created dynamic blog post page at `/blog/[slug]`
- ✅ Updated blog listing page to use file-based posts
- ✅ Migrated existing demo posts to MDX files
- ✅ Set up Decap CMS admin interface at `/admin`
- ✅ Created GitHub OAuth API route for CMS authentication

## 🔧 Final Configuration Steps

### 1. GitHub OAuth App Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App with these settings:
   - **Application name**: Ayothedoc Blog CMS
   - **Homepage URL**: `https://your-domain.vercel.app`
   - **Authorization callback URL**: `https://your-domain.vercel.app/admin/auth.html`
3. Copy the Client ID and Client Secret

### 2. Environment Variables

Add these to your Vercel environment variables or `.env.local`:

```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 3. Update Configuration Files

#### Update `public/admin/config.yml`:
- Replace `ayothedoc/personal-site` with your GitHub repo
- Replace `your-site-domain.vercel.app` with your actual domain

#### Update `public/admin/auth.html`:
- Replace `YOUR_GITHUB_CLIENT_ID` with your actual GitHub Client ID

### 4. Test the System

1. **Local Development**: 
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:3000/blog` to see your posts

2. **CMS Access**:
   Visit `http://localhost:3000/admin` to access the CMS

3. **Create New Posts**:
   - Use the CMS interface to create/edit posts
   - Or manually create `.mdx` files in `content/posts/`

## 📁 File Structure

```
├── content/
│   └── posts/
│       ├── 10-business-processes-automate-today.mdx
│       ├── wordpress-vs-custom-development-guide.mdx
│       ├── make-com-client-success-story.mdx
│       └── n8n-workflows-small-business-guide.mdx
├── lib/
│   └── posts.ts
├── app/
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── api/
│       └── auth/
│           └── route.ts
├── components/
│   └── blog-client.tsx
└── public/
    └── admin/
        ├── index.html
        ├── config.yml
        └── auth.html
```

## 🎯 n8n Integration for Automated Publishing

To set up automated publishing with n8n:

1. **Create n8n Workflow** with these nodes:
   - Webhook trigger
   - Data transformation
   - GitHub API node (create/update file)
   - HTTP Request node (Vercel deploy hook)

2. **Sample Workflow Structure**:
   ```
   Webhook → Process Data → Create MDX Content → GitHub API → Deploy Hook
   ```

3. **Deploy Hook**: Create a Vercel deploy hook and add it to your n8n workflow

## 📝 Content Model

Each blog post should have this frontmatter structure:

```yaml
---
title: "Your Post Title"
excerpt: "Brief description of the post"
date: "2024-03-15"
category: "Automation" # or Web Development, Case Study, etc.
readTime: "5 min read"
image: "/path-to-image.png"
slug: "your-post-slug"
published: true
author: "Ayothedoc Team"
tags: ["automation", "productivity", "workflows"]
---
```

## 🚀 Benefits of This System

- **Human Editing**: Use the CMS at `/admin` for easy content management
- **Automated Publishing**: n8n workflows can create/update posts via GitHub API
- **Git-Based**: All content is version controlled
- **Fast Performance**: Static generation with Next.js
- **SEO Optimized**: Automatic metadata generation
- **Scalable**: Easy to add more content types and features

## 🔧 Troubleshooting

- **Posts not showing**: Check file permissions and frontmatter format
- **CMS auth issues**: Verify GitHub OAuth app settings and environment variables
- **Build errors**: Ensure all MDX files have valid frontmatter

## 📈 Next Steps

1. Replace placeholder images with actual blog images
2. Set up your n8n automation workflow
3. Configure your Vercel deploy hooks
4. Test the complete publishing pipeline
5. Add more content types if needed (pages, case studies, etc.)

Your file-based blog system is now ready for both human editing and automated publishing!