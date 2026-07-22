# Site Migration Map

How every existing URL moves when the root domain becomes the healthcare site
and AIOS relocates to `aios.ayothedoc.com`. One app, host-based routing, so
"move" = "serve only on the AIOS host + redirect the root-host request."

Redirect types: **301** permanent · **serve** (rendered on that host, no
redirect) · **410** gone · **noindex** (kept, not indexed).

## AIOS routes (relocate to `aios.ayothedoc.com`)

| Existing URL | Purpose | Dest host | Dest URL | Type | Reason | Verified |
|---|---|---|---|---|---|---|
| ayothedoc.com/ | AIOS home | aios.ayothedoc.com | aios.ayothedoc.com/ | serve on aios; root shows healthcare | Root is now healthcare | pending |
| ayothedoc.com/offer | Pricing ladder | aios | aios.ayothedoc.com/offer | 301 from root | AIOS offer | pending |
| ayothedoc.com/demo | Lead Engine demo | aios | aios.ayothedoc.com/demo | 301 from root | AIOS | pending |
| ayothedoc.com/lead-engine | Lead Engine landing | aios | aios.ayothedoc.com/lead-engine | 301 from root | AIOS | pending |
| ayothedoc.com/services | How it works | aios | aios.ayothedoc.com/services | 301 from root | AIOS | pending |
| ayothedoc.com/audit | AI-readiness audit | aios | aios.ayothedoc.com/audit | 301 from root | AIOS | pending |
| ayothedoc.com/automation | Programmatic SEO index | aios | aios.ayothedoc.com/automation | 301 from root | AIOS | pending |
| ayothedoc.com/automation/[slug] | Programmatic SEO pages | aios | aios.ayothedoc.com/automation/[slug] | 301 from root | AIOS; preserves 9 indexed slugs + existing internal redirects | pending |
| ayothedoc.com/blog | Blog index | aios | aios.ayothedoc.com/blog | 301 from root | Agency content = AIOS resources | pending |
| ayothedoc.com/blog/[slug] | Blog posts | aios | aios.ayothedoc.com/blog/[slug] | 301 from root | Agency posts | pending |
| ayothedoc.com/refund | Refund (Stripe) | aios | aios.ayothedoc.com/refund | 301 from root | AIOS commerce only | pending |

## Shared routes (host-aware, no cross-host redirect)

| Existing URL | Purpose | Handling | Verified |
|---|---|---|---|
| /about | Founder/company | Root: NEW healthcare About. aios: AIOS About variant. Each self-canonical. | pending |
| /contact | Enquiry form | Root: healthcare project form (hello@). aios: AIOS form (aios@). Host-aware categories + events. | pending |
| /privacy | Privacy | Both hosts, host-aware branding + canonical | pending |
| /terms | Terms | Both hosts, host-aware branding + canonical | pending |
| /admin, /api/* | Backend | Host-agnostic, noindex, unchanged | pending |

## New healthcare URLs (root host only; 404 on aios host)

`/` · `/solutions` · `/solutions/medtech-robotics-implementation` · `/solutions/digital-health-connected-systems` · `/solutions/clinical-product-implementation` · `/solutions/ai-intelligent-automation` · `/who-we-help` (+ 4 subpages) · `/method` · `/case-studies` (+ `/[slug]`) · `/insights` (+ categories) · `/ayo` · `/medical-disclaimer`.

AIOS-only URLs (`/offer /demo /lead-engine /services /audit /automation /blog /refund`) return **404 on the root host**; healthcare-only URLs return **404 on the aios host**. Enforced in `middleware.ts`.

## Redirect implementation notes
- Root-host 301s to the AIOS host are added in `next.config.mjs` `redirects()` **with a `has` host condition** (`host = ayothedoc.com`) so they only fire on the root host, plus `middleware.ts` as the host gate. Existing `/automation/*` internal 301s are preserved and re-scoped to the aios host.
- `www.ayothedoc.com` → `ayothedoc.com` 301 (Cloudflare or Coolify redirect rule, see DOMAIN_AND_SUBDOMAIN_SETUP.md).
- Do NOT redirect `ayothedoc.com` → `aios.ayothedoc.com`. Root must render healthcare.
- No page is served on both hosts; canonical always matches the serving host.

## Verification status legend
`pending` until validated on a Coolify preview with the `aios.` host bound. Update to `verified` in the completion report after the release checklist passes.
