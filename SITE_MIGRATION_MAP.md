# Production URL migration map

Updated: 2026-09-15
Implementation: `middleware.ts`

## Root-domain migrations

| Requested URL on `ayothedoc.com` | Destination | Status | Reason |
|---|---|---:|---|
| `/services` and `/services/*` | `https://ayothedoc.com/solutions` | 301 | Root services are now healthcare AI solutions. |
| `/blog` | `https://ayothedoc.com/insights` | 301 | Root editorial content is healthcare AI insights. |
| `/blog/[slug]` | `https://aios.ayothedoc.com/blog/[slug]` | 301 | Preserves already-indexed legacy AIOS posts on the correct property. |
| `/offer` | Same path on `aios.ayothedoc.com` | 301 | AIOS commercial route. |
| `/demo` | Same path on `aios.ayothedoc.com` | 301 | AIOS Lead Engine demo. |
| `/lead-engine` | Same path on `aios.ayothedoc.com` | 301 | AIOS landing route, excluded from sitemap. |
| `/audit` | Same path on `aios.ayothedoc.com` | 301 | AIOS readiness audit. |
| `/automation/*` | Same path on `aios.ayothedoc.com` | 301 | AIOS playbook library. |
| `/refund` | Same path on `aios.ayothedoc.com` | 301 | AIOS commerce policy. |
| `/solutions/medtech-robotics-implementation` | `/solutions/healthcare-ai-product-development` | 301 | Closest focused healthcare AI replacement. |
| `/solutions/digital-health-connected-systems` | `/solutions/ai-intelligent-automation` | 301 | Preserves the healthcare automation intent. |
| `/solutions/clinical-product-implementation` | `/solutions/healthcare-ai-product-development` | 301 | Closest focused healthcare AI replacement. |
| `/case-studies/exerscript-healthcare-ai-hackathon-pilot` | `/case-studies/exerscript-healthcare-ai-prototype` | 301 | Accurate project-status wording. |
| Any remaining path on `www.ayothedoc.com` | Same path on `ayothedoc.com` | 301 | One canonical healthcare hostname. |

Migration rules run before the `www` rule, so a legacy `www` AIOS path reaches its final host in one redirect.

## Served on both hosts with distinct output

`/`, `/about`, `/contact`, `/privacy`, `/terms`, `/services` and `/blog` are host-aware. The root and AIOS versions self-canonicalise to their own host and render the appropriate brand, content and navigation.

## Wrong-host behaviour

Healthcare-only prefixes return 404 on `aios.ayothedoc.com`:

`/solutions`, `/who-we-help`, `/method`, `/case-studies`, `/insights`, `/ayo`, `/medical-disclaimer`, `/tools`

Explicit AIOS commercial prefixes on the root redirect to AIOS as listed above. API, admin and framework assets are excluded from marketing-route gating.

## Validation

The production-mode local test confirmed:

- root `/services` to root `/solutions` in one 301;
- root `/blog` to root `/insights` in one 301;
- root `/demo` and `/offer` to the same AIOS path in one 301;
- each old healthcare solution slug to its final replacement in one 301;
- `www` root to the apex in one 301;
- healthcare-only routes on AIOS return 404;
- all 48 current sitemap pages return 200.
