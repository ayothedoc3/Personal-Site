# Blog Management Guide

This document explains how to manage the blog content on your Ayothedoc website.

## How Blog Posts Work

The blog system is powered by a simple TypeScript file that contains all blog posts. This approach provides:
- Easy content management
- Fast loading times
- Full control over SEO
- No database dependency
- Version control for content

## Managing Blog Posts

### Location
All blog posts are managed in: `lib/blog-data.ts`

### Adding a New Blog Post

1. Open `lib/blog-data.ts`
2. Add a new post object to the `blogPosts` array:

```typescript
{
  id: 5, // Increment the ID
  title: "Your Post Title",
  excerpt: "Brief description that appears in the blog listing",
  date: "March 20, 2024", // Use format: "Month DD, YYYY"
  category: "Automation", // Choose: Automation, Web Development, Case Study, Business Optimization
  readTime: "5 min read",
  image: "/your-blog-image.png", // Add image to public folder
  slug: "your-post-title-slug", // URL-friendly version
  published: true, // Set to false to hide the post
  author: "Ayothedoc Team",
  tags: ["automation", "productivity"], // Optional tags
  content: `
# Your Post Title

Your full blog post content goes here in Markdown format.

## Subheading

Content with **bold text** and *italic text*.

[Link to contact page](/contact)
  `
}
```

### Post Properties

- **id**: Unique number for each post
- **title**: The main headline
- **excerpt**: Short summary for listings
- **date**: Publication date (display format)
- **category**: Must match existing categories
- **readTime**: Estimated reading time
- **image**: Featured image path (store in `/public` folder)
- **slug**: URL-friendly identifier
- **published**: Boolean to show/hide posts
- **author**: Author name
- **tags**: Array of relevant tags
- **content**: Full post content in Markdown

### Managing Categories

To add new categories:
1. Add posts with the new category
2. The system automatically generates the category list

### Publishing/Unpublishing Posts

Set `published: false` to hide a post without deleting it.

## Newsletter Signup

The newsletter signup form at the bottom of the blog page is now functional and uses EmailJS to:
- Validate email addresses
- Send subscription notifications
- Provide user feedback
- Integrate with your existing EmailJS setup

## Images

Store blog images in the `/public` folder and reference them like:
```
image: "/my-blog-image.jpg"
```

## Future Enhancements

Consider these upgrades as your blog grows:

### CMS Integration
- **Sanity.io**: Headless CMS with great editing experience
- **Contentful**: Enterprise-grade content management
- **Strapi**: Open-source, self-hosted CMS

### Markdown Files
Convert to individual `.md` files in a `/content` directory for easier editing.

### Database Integration
Move to a database solution (PostgreSQL, MongoDB) for dynamic content management.

## Current Features

✅ Newsletter signup with EmailJS integration  
✅ Category filtering  
✅ Responsive design  
✅ SEO-friendly structure  
✅ Easy content management  
✅ Fast performance  

## Need Help?

If you need assistance with:
- Adding complex blog posts
- Setting up a CMS
- Customizing the blog design
- Adding new features

[Contact the Ayothedoc team](/contact) for support!