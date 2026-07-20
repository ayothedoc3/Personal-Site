# Site Repositioning Audit

Branch: `healthcare-repositioning`. Nothing here is deployed until merged to main.

## Goal
Split one AIOS/agency site into two experiences:
- **`ayothedoc.com`** (root) becomes **Ayothedoc, Healthcare Technology Implementation & Clinical Innovation**.
- **`aios.ayothedoc.com`** hosts the **existing AIOS** business (AI Operations for agencies/consultants), relocated intact.

## Current stack (inspected, do not migrate)
- Next.js 15 App Router, React 19, TypeScript, TailwindCSS v4, shadcn/ui (Radix), Geist fonts, next-themes.
- Package manager: pnpm. Build: `next build`. `eslint.ignoreDuringBuilds` + `typescript.ignoreBuildErrors` = true. `images.unoptimized` = true.
- One Coolify app (`f5cnm814b7faddx8ijo6u73k`) behind Cloudflare, auto-deploy on push to `main`.
- Backend: Postgres (blog CMS, leads, secrets), admin panel, contact/lead APIs, Turnstile, Stripe payment links, Resend/Lead-Engine handoff.

## Architecture decision
**Option B: one Next app, host-based routing** via `middleware.ts` + a centralized `lib/site-config.ts`, not a monorepo split (Option A). Reason: a single Coolify app + Cloudflare makes two separate deployments high-risk and high-effort for no real gain here. One app serves both hostnames; middleware gates which route set renders per host. Details + release sequence in `SUBDOMAIN_MIGRATION_AND_DEPLOYMENT_PLAN.md`.

## Route inventory + classification
Groups: **A** = healthcare (root), **B** = AIOS (subdomain), **C** = shared backend/legal (host-aware), **D** = archive/remove.

| Route | Current purpose | Group | Action |
|---|---|---|---|
| `/` (`app/page.tsx`) | AIOS homepage | B | Root `/` becomes NEW healthcare home; AIOS home renders on `aios.` host |
| `/offer` | AIOS pricing ladder | B | Serve on `aios.` only; 404 on root |
| `/demo` | Lead Engine demo (+ video) | B | `aios.` only |
| `/lead-engine` | AIOS lead-engine landing | B | `aios.` only |
| `/services` | AIOS "how it works" | B | `aios.` only (consider rename to `/how-it-works` on AIOS) |
| `/audit` | AI-readiness audit lead magnet | B | `aios.` only |
| `/automation` + `/automation/[slug]` | Programmatic SEO (agency automations) | B | `aios.` only |
| `/blog` + `/blog/[slug]` | DB blog CMS (4 agency MDX + seeded posts) | B | Stays AIOS (Resources). Healthcare gets a separate `/insights` |
| `/about` | Founder-led AIOS about | C→split | NEW healthcare `/about` on root; AIOS about variant on `aios.` |
| `/contact` (+ `/contact/layout`) | Contact form (AIOS categories) | C→split | Host-aware: healthcare project form on root, AIOS form on `aios.` |
| `/privacy` | Privacy policy | C | Host-aware branding; shared body |
| `/terms` | Terms | C | Host-aware branding; shared body |
| `/refund` | Refund policy (Stripe) | B | AIOS-specific; `aios.` only |
| `/admin` | Blog/secrets/campaign admin | C | Keep, host-agnostic, noindex |
| `/api/*` (contact, leads, demo, business-audit, admin/*, auth, generate-seo) | Backend | C | Keep. Route by payload/host where needed |
| `/sitemap.ts`, `/robots.ts` | Single, root host | C | Replace with per-host sitemap + robots |
| `app/layout.tsx` structured data | `ProfessionalService` (AI ops) | C | Host-aware: healthcare `ProfessionalService` on root, AIOS on subdomain |

## New healthcare routes to CREATE (root host, Group A)
`/` · `/solutions` · `/solutions/medtech-robotics-implementation` · `/solutions/digital-health-connected-systems` · `/solutions/clinical-product-implementation` · `/solutions/ai-intelligent-automation` · `/who-we-help` · `/who-we-help/healthtech-startups` · `/who-we-help/medtech-robotics-companies` · `/who-we-help/healthcare-organisations` · `/who-we-help/africa-market-entry` · `/method` · `/case-studies` · `/case-studies/[slug]` · `/insights` (+ category views) · `/about` · `/contact` · `/ayo` (founder portfolio) · `/medical-disclaimer` · healthcare `/privacy` + `/terms`.

## Components: reuse vs new
**Reuse as-is (host-agnostic):** `components/ui/*` (button, card, input, select, textarea, checkbox, slider, honeypot), `theme-provider`, `theme-toggle`, `google-analytics`, `turnstile`, `lib/*` (db, rate-limiter, security-utils, secrets, analytics, utils).

**Reuse for AIOS host only:** `site-header` (becomes AIOS variant), `contact-form`, `business-audit`, `demo-client`, `checkout-link`, `blog-client`.

**New (healthcare) components to build:** `PageHero`, `SolutionCard`, `AudienceCard`, `ProcessSteps`, `CaseStudyCard`, `StatusLabel`, `CTASection`, `Breadcrumbs`, `ArticleCard`, `HealthcareContactForm`, `FounderProfile`, `CapabilityList`, `HealthcareHeader`, `HealthcareFooter`. Centralize copy in `lib/healthcare-content.ts`.

## Messaging to REMOVE / not expose on root host
"Managed AI Operations", "60-Second Lead Engine", "AIOS", "recover 40+ hours", "agencies and consultants", Stripe pricing ladder, "least AI necessary" (AIOS framing), lead-response automation. All of this is valid, it just belongs on `aios.` only.

## Content requiring verification (see CONTENT_VERIFICATION_REQUIRED.md)
- Founder credentials wording (MD degree, public-health training, physician-trained, NO active-licensure/board/hospital-privileges claims).
- Every case study must carry an accurate status label; no invented metrics/clients/deployments.
- No claims of African distributor networks, regulatory approvals, government access, or hospital deployments.
- `hello@ayothedoc.com` and `aios@ayothedoc.com` mailboxes: confirm they exist before publishing.
