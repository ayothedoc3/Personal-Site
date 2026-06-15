# Ayothedoc - Digital Agency Website

*Professional web development and AI automation services*

[![Built by Ayothedoc](https://img.shields.io/badge/Built%20by-Ayothedoc-lime?style=for-the-badge)](https://ayothedoc.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

## Overview

A modern, responsive website for Ayothedoc - a full-service digital agency specializing in web development and AI automation. Built with Next.js 15, TypeScript, and TailwindCSS with beautiful animations and a comprehensive contact system.

### Features
- 🌟 Modern, responsive design with dark/light theme support
- 📧 Advanced contact form with EmailJS integration
- 🎨 Interactive animations and smooth scrolling
- 📱 Mobile-first responsive design
- ⚡ Fast loading with Next.js 15 optimizations
- 🔍 SEO optimized with structured data
- ♿ Accessible with ARIA labels and keyboard navigation

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with custom themes
- **UI Components**: shadcn/ui with Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Email**: EmailJS for contact form submissions
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Personal-Site

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your EmailJS credentials

# Start development server
npm run dev
```

### Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Deployment with Coolify

This project is configured for deployment with [Coolify](https://coolify.io/):

### Setup Steps:

1. **Connect Repository**: Link your GitHub repository in Coolify
2. **Environment Variables**: Add your EmailJS credentials:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
3. **Build Settings**: Coolify will auto-detect Next.js and use:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
   - Port: `3000`

### Coolify Configuration

No additional configuration needed! The project includes:
- ✅ Standard Next.js build process
- ✅ Static asset optimization
- ✅ Environment variable support
- ✅ Production-ready builds

## Contact Form Setup

1. Create an [EmailJS](https://emailjs.com) account
2. Set up your email service and template
3. Copy credentials to `.env.local`
4. Update Calendly URL in the code

See `SETUP.md` for detailed instructions.

## About Ayothedoc

**Ayothedoc** is a managed AI operations studio for agencies and consultants, specializing in:
- ⚙️ AI Operating System installs
- 🤖 Agency workflow automation
- 📈 Client operations optimization
- 📈 60-second lead response systems
- 🔧 Managed AI Operations

**Contact**: [ayothedoc.com](https://ayothedoc.com)

---

*Built with ❤️ by Ayothedoc - Managed AI operations for agencies and consultants.*
