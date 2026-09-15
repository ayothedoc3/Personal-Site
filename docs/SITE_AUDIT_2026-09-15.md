# Ayothedoc two-property site audit

Audit date: 2026-09-15
Repository: `ayothedoc3/Personal-Site`
Decision: Option B implemented

## Outcome

The repository now serves two deliberately separate properties from one Next.js application:

| Host | Audience | Offer | Primary conversion |
|---|---|---|---|
| `ayothedoc.com` | Healthtech teams and healthcare organisations | Healthcare AI strategy, workflow design, prototyping, implementation and governance | Discuss a Healthcare AI Project |
| `aios.ayothedoc.com` | Agencies and consultants | Managed lead-response and operations workflows | Request a free, scoped Lead Engine pilot |

The root domain is not a doorway to AIOS. Shared routes render host-specific content and metadata. Legacy AIOS URLs on the root redirect directly to the matching AIOS URL, while old healthcare URLs redirect to the nearest healthcare AI replacement.

## Evidence used

- The production repository and git history.
- Connected Google Search Console data for both properties.
- A production-mode local build and host-aware crawl.
- Current public pages and submitted sitemap state.
- Google documentation for [Article](https://developers.google.com/search/docs/appearance/structured-data/article), [Organization logo](https://developers.google.com/search/docs/appearance/structured-data/logo), [FAQ](https://developers.google.com/search/docs/appearance/structured-data/faqpage) and [breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) structured data.

Search Console evidence, using the settled 2026-06-01 to 2026-09-11 range:

| Property | Clicks | Impressions | Pages seen | Interpretation |
|---|---:|---:|---:|---|
| `ayothedoc.com` | 1 | 789 | 35 | Existing healthcare visibility is small but real and worth preserving. The old intelligent-automation solution accounted for 373 impressions. |
| `aios.ayothedoc.com` | 0 | 171 | 14 | The AIOS property has early query visibility but not enough demand evidence to justify absorbing the root property. |

In the latest settled 28 days, healthcare automation language produced the clearest root-domain signal: `healthcare automation solutions`, `intelligent automation healthcare`, and `intelligent automation in healthcare`. AIOS impressions included `ai operating system for agencies`, `free ai audit`, and `aios business`. These are low-volume first-party signals, not a claim about total market search volume.

## Audit result

| Severity | Finding | Status | Exact implementation |
|---|---|---|---|
| Critical | Split identity and cross-domain overlap | Fixed | Host configuration in `lib/site-config.ts:16-89`; direct permanent migrations and wrong-host gating in `middleware.ts:16-79`; host-aware home dispatch in `app/page.tsx:6-28`. |
| Critical | Root `/services` and `/blog` sent visitors into unrelated AIOS branding | Fixed | `middleware.ts:25-29` maps root `/services` to `/solutions` and root `/blog` to `/insights`; AIOS still serves its own `/services` and `/blog`. |
| High | Article rich data lacked an image and publisher logo | Fixed | Article image and publisher are emitted in `app/insights/[slug]/page.tsx:38-60`; reusable Organization logo comes from `lib/structured-data.ts:3-23`. |
| High | Organization rich data lacked a logo and service relationships were incomplete | Fixed | Host-specific `Organization` plus `ProfessionalService` and `Service` graph in `app/layout.tsx:66-124`. |
| High | Healthcare offer was broad technology consulting rather than a focused AI service | Fixed | Homepage in `components/healthcare/healthcare-home.tsx`; service definitions in `lib/solutions.ts:22-211`; shared summaries and method in `lib/healthcare-content.ts`. |
| High | Audit website fetching allowed unsafe destinations and oversized responses | Fixed | Public HTTP URL and DNS validation, redirect revalidation, response limits and timeout in `lib/safe-public-url.ts`; consumed by `app/api/business-audit/route.ts`. |
| High | AI-generated audit and demo content could follow hostile input or emit unsafe HTML | Fixed | Input validation and escaped email fields in `app/api/business-audit/route.ts`; strict demo-output sanitization and prompt boundaries in `app/api/demo/route.ts`. |
| Medium | Page-level metadata could inherit the wrong host or homepage social URL | Fixed | Central metadata builder in `lib/seo.ts:22-54`; explicit legal-page metadata in `app/privacy/page.tsx`, `app/terms/page.tsx` and `app/medical-disclaimer/page.tsx`. Legal body copy was not changed. |
| Medium | Old URLs could create redirect chains or dead branding | Fixed | Direct one-hop route map in `middleware.ts:18-69`, including old healthcare service and case-study slugs, AIOS routes, and `www` canonicalisation. |
| Medium | Sitemaps mixed property intent and included a noindex landing page | Fixed | Separate host-aware inventories in `app/sitemap.ts:10-58`; `/lead-engine` is no longer submitted. |
| Medium | Robots output needed to remain host-specific | Fixed | Per-host sitemap and host directives, public crawling, and deliberate AI-crawler rules in `app/robots.ts:5-31`. Admin, API and blocked routes remain excluded. |
| Medium | Multiple first-screen CTAs competed on AIOS | Fixed | One primary hero CTA in `components/aios/aios-home.tsx:132-159`; the demo is now a supporting text link. |
| Medium | Forms were longer than needed and lacked complete conversion instrumentation | Fixed | Healthcare form in `components/healthcare/healthcare-contact-form.tsx`; AIOS form in `components/contact-form.tsx`; audit form in `app/audit/page.tsx`. Events are listed below. |
| Medium | Unverified placeholder work looked like potential proof | Fixed | Only verified projects from the supplied ground truth remain in `lib/case-studies.ts`; missing performance metrics are explicitly labelled `Not measured`. |
| Low | Operational documentation described an obsolete Gemini/static-HTML SEO pipeline | Fixed | Claude key wiring in `app/api/generate-seo/route.ts`; manual workflow in `.github/workflows/generate-seo.yml`; current process in `PROGRAMMATIC_SEO.md`. |

## Page-by-page technical checks

The production-mode local crawl covered all 48 submitted pages: 27 healthcare URLs and 21 AIOS URLs.

| Check | Result |
|---|---|
| HTTP status | All 48 sitemap URLs returned 200. |
| Titles and descriptions | No duplicates. All audited titles were 30 to 60 characters and descriptions were 70 to 160 characters. |
| Headings | Every submitted page had exactly one H1. All pages exposed `#main-content` for the skip link. |
| Canonicals and Open Graph URLs | Every submitted page self-canonicalised to the correct host and path. Homepage trailing-slash differences normalised to the same URL. |
| Structured data | Every JSON-LD block parsed. Article nodes had images and publisher logos. Organization nodes had logos. Host-level Service markup was present. Key FAQ pages emitted FAQPage markup. |
| Sitemaps and robots | Each host returned its own URL inventory and referenced its own sitemap. |
| Internal links | 48 unique same-property or deliberate cross-property targets were checked. No broken target was found. |
| Images | No rendered image lacked an `alt` attribute. |
| Redirects | Root `/services`, `/blog`, `/demo`, `/offer`, legacy service slugs and `www` behaved as mapped. AIOS requests for healthcare-only routes returned 404. |
| Security headers | Both hosts returned HSTS, `X-Content-Type-Options: nosniff`, a referrer policy and a restrictive camera/geolocation/microphone permissions policy. |
| Build | `next build` completed successfully, generated 51 static pages and reported 101 kB shared first-load JavaScript. |

## FAQ and answer-engine note

FAQPage markup is present because the visible questions are useful, quotable content and machine-readable. Google currently limits FAQ rich-result display primarily to authoritative government and health sites. The schema must not be treated as a promise that a FAQ rich result will appear.

## Analytics and conversion tracking

GA4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured (`app/layout.tsx:127-176`). These events are now emitted:

| Event | Where | Purpose |
|---|---|---|
| `cta_click` | `components/tracked-link.tsx`, headers, AIOS home and audit result | Compare important CTA traffic by site, label and destination. |
| `lead_form_start` | Both contact forms and the AIOS audit | Measure form starts. |
| `generate_lead` | Both contact forms and the AIOS audit | GA4 recommended lead-conversion event. |
| `video_start`, `video_complete` | `components/demo-video.tsx` | Measure demo engagement. |

The code is installed, but the connected account did not expose GA4 reporting access. Event receipt and conversion marking therefore require owner verification in GA4 DebugView and Admin.

## Performance and mobile limitation

The PageSpeed Insights API returned HTTP 429 for the requested production tests, and CrUX API data was not available through the current connection. No Lighthouse or Core Web Vitals score is invented in this report. The build size, responsive breakpoints and local rendered structure passed code-level checks. A live desktop and mobile visual pass is required after deployment, and field Core Web Vitals should be recorded once PageSpeed or CrUX access is available.

## Open items that require owner access or confirmation

1. Confirm the published prices, the 10-business-day target, plan deliverables and the work-guarantee language against current agreements. The legal body text was intentionally left unchanged.
2. Confirm `hello@ayothedoc.com`, `aios@ayothedoc.com`, `HEALTHCARE_ENQUIRY_EMAIL`, `AUDIT_FROM_EMAIL`, Resend and the Lead Engine are configured and monitored in production.
3. In Search Console, submit both current sitemaps, remove the obsolete `sitemap_index.xml` submission, and validate the old structured-data alert after the deployment is crawled.
4. Verify `generate_lead`, form-start, CTA and video events in GA4, then mark `generate_lead` as a key event.
5. Add only evidenced screenshots, client permission, testimonials or measured results to the case studies. None were fabricated here.
6. Obtain professional review of Privacy, Terms, Refund and Medical Disclaimer body copy. Only metadata was changed during this work.
