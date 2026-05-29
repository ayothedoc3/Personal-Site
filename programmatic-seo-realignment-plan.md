# Programmatic SEO Realignment Plan

**Status:** Spec for review. No code changed yet.
**Date:** 2026-05-27
**Owner:** Ayo

## Why this exists

The programmatic SEO engine was built on 2026-05-26 around the old positioning ("automation agency that builds in n8n / Make / Zapier"). The site repositioned on 2026-05-27 to **"we install and run your company's AI Operating System,"** built on the Four Cs (Context, Connections, Capabilities, Cadence), with a free **60-Second Lead Engine** as the wedge. The pSEO was never updated. This plan re-aims it.

Goal: every programmatic page should attract a buyer who wants the system **run for them**, teach a piece of the AIOS thesis, and funnel into the free Lead Engine.

---

## Current state (what we're changing)

| Dimension | Now | Problem |
|---|---|---|
| Primary axis | Tool (n8n, Make, Zapier) | Tool-led contradicts the "tool-agnostic" brand; attracts DIY searchers |
| Matrix | 8 tools x 8 use cases x 8 industries = 512 combos, 13 live | Most live pages are templated fallback filler (deindex risk) |
| URL/title | `/automation/n8n-lead-generation-law-firms` | Tool-first; wrong intent |
| Framing | "Automation Playbooks," "use as your implementation checklist" | DIY framing; you sell done-for-you |
| CTA | "Book Your Strategy Call" (Calendly) | Breaks the site's free Lead Engine funnel |
| Schema | `HowTo` | Reinforces DIY intent |
| Four Cs | Absent | Brand thesis missing from the largest page surface |
| Money keyword | "lead generation" (generic) | No page on speed-to-lead, the thing you give away free |

---

## Target taxonomy: outcome-first, tool-agnostic

Flip the primary axis from **tool** to **outcome**. Industry becomes the second axis. Tool drops to an optional "works with" mention. Every outcome maps to one of the Four Cs.

### New data files

Replace `tools.csv` as the primary axis with `outcomes.csv`. Keep `industries.csv`. Keep a slim `tools.csv` only for the "works with your stack" footer.

**`outcomes.csv`**

```
slug,name,four_c,intent,funnel_stage
60-second-lead-response,60-Second Lead Response,Capabilities,"speed to lead, instant lead follow-up",wedge
automated-client-reporting,Automated Client Reporting,Cadence,"client reports, recurring reporting",mid
client-onboarding-automation,Client Onboarding Automation,Capabilities,"onboarding sequence, new client setup",mid
proposal-follow-up,Proposal & Quote Follow-Up,Capabilities,"proposal follow up, quote chasing",mid
crm-sync-no-copy-paste,CRM Sync Without Copy-Paste,Connections,"crm sync, live data, no manual entry",mid
inbox-triage-reply-drafts,Inbox Triage & Reply Drafts,Capabilities,"email triage, reply drafting",mid
daily-brief-cadence,Daily Brief & Digest,Cadence,"morning brief, daily digest",top
ai-operating-system,AI Operating System (overview),Context,"ai operating system, ai for [industry]",pillar
```

**`industries.csv`** (keep, but prioritize the ICP). ICP from the outreach kit is **marketing agencies, web/design agencies, consulting firms, 3-25 staff.** Add "web design agencies" if not present; lead with the three ICP industries, treat the other five as expansion.

### New URL / title / H1 pattern

| Field | Pattern | Example |
|---|---|---|
| Slug | `{outcome-slug}-{industry-slug}` | `60-second-lead-response-marketing-agencies` |
| Title | `{Outcome} for {Industry}` | "60-Second Lead Response for Marketing Agencies" |
| H1 | same as title | |
| Pillar slug | `ai-operating-system-{industry-slug}` | `ai-operating-system-marketing-agencies` |

Tool no longer appears in slug, title, or H1. It is mentioned only in a "Works with your stack" line in the body.

---

## Initial build: ~18 pages (quality over count)

Do **not** regenerate 512 pages. Ship a tight, deep set. Three tiers:

### Tier 1: Pillars (Context, top of funnel) — 3 pages
- AI Operating System for Marketing Agencies
- AI Operating System for Consulting Firms
- AI Operating System for Web Design Agencies

### Tier 2: Wedge cluster (speed-to-lead, the money terms) — 6 pages
- 60-Second Lead Response for Marketing Agencies
- 60-Second Lead Response for Consulting Firms
- 60-Second Lead Response for Web Design Agencies
- Speed to Lead: Why a 60-Second Reply Wins More Deals (non-industry, informational-to-commercial)
- Lead Response Time Benchmarks for Agencies (data/linkbait)
- How to Auto-Reply to Every Inbound Lead (commercial)

### Tier 3: Capability x industry — ~9 pages
- Automated Client Reporting for {Marketing Agencies, Consulting Firms, Web Design Agencies}
- Client Onboarding Automation for {Marketing Agencies, Consulting Firms}
- Proposal & Quote Follow-Up for {Marketing Agencies, Consulting Firms}
- CRM Sync Without Copy-Paste for Agencies
- Inbox Triage & Reply Drafts for Agencies

Expansion later: roll the same outcomes across the other five industries (real estate, e-commerce, law firms, healthcare, SaaS, restaurants) only after the ICP set proves out.

---

## Content brief (per page)

Replace the DIY "implementation checklist" structure with done-for-you framing. Section order:

1. **The problem** — industry-specific, with the cost of doing it the manual way (lost deals, hours, slow follow-up). Concrete, not generic.
2. **What the AIOS does** — the outcome in plain terms, tied to its Four-C layer. Name the layer.
3. **Where it sits in your system** — one short paragraph connecting this single capability to the wider AI Operating System (links to the pillar page and `/services`).
4. **What "done" looks like** — the artifact and the SLA. For the wedge: every lead answered in under 60 seconds, in your voice, with your booking link.
5. **Expected results** — real numbers, plus the standing guarantee: recover 40+ hours/month or we keep working free.
6. **How we install it** — reuse the homepage 3-step: Audit (free, 10 min) → Install (10 business days) → Operate (ongoing).
7. **FAQ** — reuse homepage answers: who owns the system (you do), what if it breaks (we monitor and fix), how fast to ROI (live in 10 business days).
8. **CTA** — default pages lead with "Get your free AI-readiness audit" (`/audit`) and offer "Get your Lead Engine free" (`/offer`) as secondary; wedge/speed-to-lead pages flip the order. See the funnel section for the per-tier rule.

### Voice rules (non-negotiable)
- **No em dashes anywhere.** Use commas, periods, parentheses, or colons.
- **Anti-hype.** Never use "fully automated," "set and forget," or hype copy. The brand line is "least AI necessary, workflows beat agents, boring is beautiful." (Your own acq-pipeline scorer flags "fully automated" as a negative signal; the site must not use it.)
- Short sentences. Bullets over paragraphs. Casual but professional.
- Tool-agnostic. Mention specific tools only in a "Works with your stack" footer line.

### Quality gate
- The generator's templated fallback must **never publish**. If the LLM output trips the `_is_content_too_generic` check, the page is skipped, not shipped with filler.
- Target 700-1,200 words of genuinely useful, differentiated content per page. If it reads like every other SEO farm, it does not ship.

---

## Funnel and on-page changes

1. **CTA swap (do first, applies to all pages):** in `app/automation/[slug]/page.tsx`, drop the "Book Your Strategy Call" (Calendly) button. Set the CTA by page tier:
   - **Default (pillars + capability x industry):** primary = **"Get your free AI-readiness audit"** to `/audit`. Audit beats a call for cold search traffic: lower friction, value first, captures the lead even if they never book, and self-qualifies. Secondary = "Get your Lead Engine free" to `/offer`.
   - **Wedge / speed-to-lead pages:** primary = **"Get your Lead Engine free"** to `/offer` (the page topic is the offer). Secondary = `/audit`.
   - Calendly drops to a quiet tertiary "rather just talk? book a call" link, never the headline button.
2. **Schema:** change the JSON-LD `@type` from `HowTo` to `Service` (with `provider` Ayothedoc) plus a separate `FAQPage` block for the FAQ section.
3. **Internal linking:**
   - Every programmatic page links up to its industry pillar and to `/audit` and `/offer`.
   - The Four-C blocks on the homepage and `/services` link down into the matching outcome clusters.
   - Pillars link to all their child outcome pages (hub and spoke).
4. **Nav label:** "Automation Library" is fine to keep, but the `/automation` index copy should reframe from "automation blueprints / implementation checklists" to "what we install and operate for you," tied to the Four Cs.
5. **`/automation` index page:** add an outcome filter and a Four-C filter; keep industry. Demote or remove the tool filter.

---

## Dependency: realign the audit itself

Making the audit the default pSEO CTA only works if the audit carries the new message. Today it was built for the old positioning. Before (or alongside) routing search traffic into it, fix:

1. **Report framing.** The Gemini prompt in `app/api/business-audit/route.ts` calls itself a "Business Automation Audit" by an "expert business automation consultant" recommending "tools like Make.com, Zapier." Rewrite it as an **AI Operating System readiness audit** that scores the business against the **Four Cs** and frames each opportunity by its layer (Context / Connections / Capabilities / Cadence). Tool-agnostic. Honor the no-em-dash and anti-hype voice rules.
2. **Re-point the CTAs.** Both the email CTA ("Book Your FREE Strategy Call") and the final on-screen button ("Book a 15 minute readout") go to Calendly. Change the primary to **"Get your Lead Engine free"** (`/offer`); keep the call as a secondary option.
3. **Stop fabricating savings.** The form never asks for hours; `app/audit/page.tsx` hardcodes `timeSpentDaily: 4`, so the report's projected savings are extrapolated from a constant. Either ask the question or stop quoting hard dollar figures.
4. **Branded sender.** Email currently sends from `onboarding@resend.dev` (shared sandbox). Move to a branded `@ayothedoc.com` sender once the domain is warmed (ties to the outreach-engine warmup gate).
5. **Cleanups.** Fix the broken-emoji encoding in the email footer (`Ã°Å¸â€â€™ Privacy`); expand the business-type dropdown to match the pSEO industry set; consider AI-generating the on-screen mini-results instead of the hardcoded industry lookup in `getMiniResults()`.

## Generator changes (`scripts/programmatic_seo.py`)

- Swap the primary loop from `tools x use_cases x industries` to `outcomes x industries`, with tool as an optional secondary field.
- Load `outcomes.csv`; carry `four_c`, `intent`, and `funnel_stage` into each page's JSON so the renderer and schema can use them.
- Update the LLM prompt to inject: the brand voice rules above, the done-for-you framing, the Four-C layer for this outcome, and the homepage's Install/Operate/guarantee facts. Forbid em dashes and "fully automated" in the prompt.
- Enforce the quality gate: skip-and-log on generic output instead of writing fallback.
- New slug builder: `{outcome-slug}-{industry-slug}`.

---

## Migration

- For the 13 existing slugs, 301-redirect to the nearest new outcome slug where one maps (the four `*-lead-generation-*` pages map to `60-second-lead-response-*` or the generic speed-to-lead page). Slugs with no clean mapping redirect to the `/automation` index.
- Update `app/sitemap.ts` automatically (already pulls from summaries, so no manual edit needed once the data regenerates).
- Submit the updated sitemap in Search Console after launch and watch for coverage/indexing changes.

---

## Phased rollout

1. **Phase 0 (quick win, ~20 min):** CTA swap + schema fix on the existing pages. Independent of everything else.
2. **Phase 1:** add `outcomes.csv`, update the generator, ship the 3 pillars + 3 wedge-industry pages (6 deep pages).
3. **Phase 2:** the 3 non-industry wedge pages + the Tier 3 capability x industry set (~12 pages).
4. **Phase 3:** set 301s, retire the old thin pages, update the `/automation` index filters and copy.
5. **Phase 4 (expansion):** roll outcomes across the remaining five industries once the ICP set shows impressions/clicks in Search Console.

---

## Success criteria

- Programmatic pages send traffic into the free Lead Engine, not a dead-end Calendly link.
- Pages rank for buyer-intent terms (speed to lead, lead response time, automated client reporting for agencies), not generic tool tutorials.
- No thin/templated pages in the index.
- Every page teaches one Four-C layer and links into the system story.
