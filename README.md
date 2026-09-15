# Ayothedoc and AIOS

One Next.js application serving two focused properties by hostname:

- [ayothedoc.com](https://ayothedoc.com): healthcare AI consulting, workflow design, prototyping, implementation and governance.
- [aios.ayothedoc.com](https://aios.ayothedoc.com): managed AI operations for agencies and consultants.

## Architecture

- Next.js 15 App Router, React 19 and TypeScript.
- Tailwind CSS and Radix-based UI components.
- Host selection in `lib/site-config.ts` and `lib/site.server.ts`.
- Route migrations and wrong-host gating in `middleware.ts`.
- Host-specific metadata, structured data, sitemaps and robots output.
- PostgreSQL-backed AIOS blog and lead storage.
- Resend for email, optional Cloudflare Turnstile and a separate Lead Engine handoff.

Shared pages such as `/about`, `/contact`, `/privacy` and `/terms` render the correct variant for the requested hostname. Healthcare-only pages return 404 on AIOS. Legacy root-domain AIOS URLs redirect permanently to their direct AIOS equivalents.

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

The default localhost view is the healthcare property. To test host dispatch against a production build:

```bash
npm run build
npm run start
curl -H "Host: ayothedoc.com" http://127.0.0.1:3000/
curl -H "Host: aios.ayothedoc.com" http://127.0.0.1:3000/
```

## Verification

```bash
npm run typecheck
npm run build
python -m py_compile scripts/programmatic_seo.py
python scripts/programmatic_seo.py --dry-run --limit 3
```

## Environment

See `.env.example` for the current variable list. Important production integrations include:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `RESEND_API_KEY`, `AUDIT_FROM_EMAIL`, `HEALTHCARE_ENQUIRY_EMAIL`
- `LEAD_ENGINE_URL`, `LEAD_ENGINE_SECRET`
- `ANTHROPIC_API_KEY`
- `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- PostgreSQL connection variables
- Stripe plan links

Never commit real secrets.

## Deployment

Coolify watches `main`. Both production hostnames must be attached to the same application because routing is hostname-aware. See `DOMAIN_AND_SUBDOMAIN_SETUP.md` for DNS, SSL and Turnstile checks.

## Current audit and plans

- `docs/SITE_AUDIT_2026-09-15.md`
- `docs/CONTENT_OFFER_AND_KEYWORD_PLAN.md`
- `docs/GROWTH_BACKLOG.md`
- `CONTENT_VERIFICATION_REQUIRED.md`
- `PROGRAMMATIC_SEO.md`

The medical disclaimer and legal-policy bodies require professional review. Do not change them as ordinary marketing copy.
