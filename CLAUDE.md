# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built for Ayothedoc, a digital agency website that showcases web development and AI automation services. The project is designed for deployment with Coolify or other modern hosting platforms.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4.1.9 with custom themes
- **UI Components**: shadcn/ui with Radix UI primitives
- **Fonts**: Geist Sans & Mono
- **Theme**: Dark/light mode with next-themes
- **Package Manager**: pnpm

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server  
pnpm start

# Linting
pnpm lint
```

## Architecture

### App Router Structure
- `app/layout.tsx` - Root layout with theme provider, metadata, and structured data
- `app/page.tsx` - Main landing page with interactive animations and sections
- `app/globals.css` - Global styles and TailwindCSS imports
- Page routes: `/about`, `/blog`, `/contact`, `/services`

### Component Organization
- `components/ui/` - shadcn/ui components (Button, etc.)
- `components/theme-provider.tsx` - Theme context and localStorage management
- `components/theme-toggle.tsx` - Theme switching component

### Configuration
- `components.json` - shadcn/ui configuration with aliases
- `next.config.mjs` - Next.js config with build optimizations for production deployment
- `tsconfig.json` - TypeScript config with strict mode and path aliases
- `postcss.config.mjs` - PostCSS configuration for TailwindCSS

## Key Features

### Interactive Landing Page
The main page (`app/page.tsx`) includes:
- Typewriter animation for heading text
- Mouse-following gradient effects
- Intersection Observer animations for sections
- Rotating statistics display
- Responsive design with accessibility features

### Theme System
- Uses next-themes with system detection
- Custom theme toggle component
- CSS variables for consistent theming
- Storage key: "ayothedoc-ui-theme"

### SEO & Metadata
Comprehensive SEO setup in `app/layout.tsx`:
- Open Graph meta tags
- Twitter Card data
- Structured data (JSON-LD)
- Viewport and theme-color meta tags

## Development Notes

### Build Configuration
- ESLint and TypeScript errors ignored during builds (for rapid development)
- Image optimization disabled for static hosting
- Uses experimental Tailwind v4 with PostCSS

### Path Aliases
- `@/*` maps to root directory
- Components, utils, lib, hooks aliases configured

### Styling Approach
- TailwindCSS utility classes with custom color palette
- Gradient backgrounds and hover effects
- Backdrop blur and glass morphism effects
- CSS animations and transitions

### Deployment Ready
This project is optimized for modern hosting platforms:
- Standard Next.js build process
- Environment variable support
- Production-ready configuration
- Coolify and Docker compatible