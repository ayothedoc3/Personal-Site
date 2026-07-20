# Subdomain Migration & Deployment Plan

## Recommended architecture
**One Next app, host-based routing** (brief Option B). Rejected Option A
(monorepo, two deployments) because the current setup is a single Coolify app
behind Cloudflare; two deployments add real infra risk for no benefit at this
size.

How it works:
- `lib/site-config.ts` centralizes both sites (name, host, url, canonical base,
  contact email, analytics prefix).
- `middleware.ts` reads the `Host` header and:
  - gates route sets (AIOS-only paths 404 on root host; healthcare-only paths
    404 on the aios host);
  - passes the resolved site to pages via a request header (`x-ayo-site`).
- Host-aware `generateMetadata`, canonical, sitemap, robots, structured data,
  header/footer, and contact form read the resolved site.
- Shared routes (`/about`, `/contact`, `/privacy`, `/terms`) render the correct
  variant per host and self-canonicalize to the serving host.

## Current hosting assessment
- Coolify app `f5cnm814b7faddx8ijo6u73k`, auto-deploy on push to `main`, Cloudflare in front (DYNAMIC, no HTML caching).
- Adding `aios.ayothedoc.com` to the SAME app is a config change (see DOMAIN_AND_SUBDOMAIN_SETUP.md), not a new deployment.

## Route inventories
See `SITE_REPOSITIONING_AUDIT.md` (classification) and `SITE_MIGRATION_MAP.md`
(per-URL destinations + redirects).

## Environment variables to review/add
Centralize hostnames; stop hardcoding `https://ayothedoc.com` in `sitemap.ts` /
`robots.ts` / `layout.tsx` (the code change does this via `site-config`).
- `NEXT_PUBLIC_SITE_URL` (root) and derived `AIOS_SITE_URL` (subdomain) if any
  server code needs absolute URLs.
- Existing Stripe `NEXT_PUBLIC_STRIPE_*_LINK`, Turnstile, Resend, DB, admin
  secrets: unchanged; they belong to AIOS flows and keep working on the aios host.
- No secret values in the repo.

## External integrations to update (owner)
- Turnstile: ensure the site key allows `aios.ayothedoc.com` (add hostname in
  the Cloudflare Turnstile widget config).
- Stripe payment links: hostless (buy.stripe.com), no change. Success/cancel
  URLs, if any point at `ayothedoc.com`, repoint to the aios host.
- CSP `connect-src`/`frame-src` already allow the needed third parties; verify
  they still cover the aios host (they are host-relative, so fine).
- Lead Engine handoff + contact API: unchanged.

## Redirect rules
Root-host 301s for relocated AIOS URLs (host-conditioned) + `www` -> apex. Full
table in `SITE_MIGRATION_MAP.md`.

## Analytics changes
Distinct event names per site (no shared names for unrelated funnels):
- Healthcare: `healthtech_project_enquiry_started`, `healthtech_project_enquiry_submitted`, `medtech_solution_viewed`, `robotics_solution_viewed`, `founder_cv_downloaded`, `professional_opportunity_clicked`.
- AIOS (existing, keep): `aios_assessment_started`, `aios_assessment_submitted`, `aios_service_viewed`, `aios_booking_clicked`, existing checkout events.
Hostname is available on every event via `page_location`.

## Cookies / auth considerations
- Admin auth cookie: scope to the narrowest host; do NOT set `.ayothedoc.com`
  domain cookies (no cross-subdomain sharing needed). Verify `/admin` login
  still works on whichever host serves it (keep admin on root host only).
- Theme storage key (`ayothedoc-ui-theme`) is localStorage, per-origin; fine.

## Release sequence (low-risk)
1. Land this branch's code (healthcare site + host routing) and open a preview.
2. Owner: add `aios.ayothedoc.com` DNS + Coolify domain + SSL (DOMAIN doc).
3. Deploy branch to a Coolify preview / or merge to a staging domain if available.
4. Validate AIOS on the aios host (home, offer, demo, contact, automation, blog, admin, forms, Stripe, Turnstile).
5. Validate healthcare on the root host (all new routes, contact form, metadata, sitemap, robots).
6. Confirm AIOS-only paths 404 on root and healthcare-only paths 404 on aios.
7. Merge to `main` (production). Root now serves healthcare; aios serves AIOS.
8. Enable `www` redirect. Submit both sitemaps in Search Console.
9. Monitor: 404s, form submissions on both hosts, analytics host split.

## Validation checklist
- [ ] Root renders healthcare home; aios renders AIOS home.
- [ ] Every new healthcare route renders with unique metadata + correct canonical.
- [ ] Every AIOS route still works on the aios host (forms, Stripe, Turnstile, blog CMS, admin).
- [ ] Cross-host 404 gating works both directions.
- [ ] Sitemaps host-correct and non-overlapping; robots per host.
- [ ] Production build passes; no type/lint blockers beyond the repo's existing ignores.

## Rollback
- The change is a single branch merge. Rollback = revert the merge commit and
  redeploy (Coolify auto-deploys the revert). The `aios.` domain can stay bound
  harmlessly. No data migration is involved, so rollback is clean.

## Manual actions required from the owner (summary)
1. DNS: `aios` CNAME -> `ayothedoc.com` (proxied).
2. Coolify: add `https://aios.ayothedoc.com` to the app's domains; redeploy for SSL.
3. `www` -> apex redirect (if not already).
4. Confirm/create `hello@` and `aios@` mailboxes (or I keep the current address).
5. Turnstile: allow the `aios.` hostname.
6. Search Console: add the aios property; submit both sitemaps.
