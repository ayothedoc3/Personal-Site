# Prioritised growth backlog

Date: 2026-09-15

## P0: complete immediately after deployment

| Owner | Task | Why | Done when |
|---|---|---|---|
| Ayo or Codex with a mobile viewport | Verify narrow-viewport rendering on both live hosts | Desktop production QA passed, but the available audit browser did not expose mobile emulation | Home, contact and one detail page on each host pass at 390 CSS pixels without overflow or clipped controls. |
| Ayo | Test one healthcare enquiry and one AIOS pilot request | Production mail and Lead Engine credentials cannot be proven by a code build | Both messages reach the correct monitored destination and show accurate success states. |
| Ayo | Verify GA4 events in DebugView | The code emits events, but account reporting access was unavailable | `lead_form_start`, `generate_lead`, `cta_click`, `video_start` and `video_complete` are visible with the correct hostname. |
| Ayo | Mark `generate_lead` as a GA4 key event | Makes conversion reporting usable | GA4 Admin shows it as a key event. |
| Ayo | Submit both sitemaps in Search Console | Accelerates discovery of the clean property split | Root and AIOS sitemaps show successful fetches. |
| Ayo | Remove the obsolete root `sitemap_index.xml` submission | It currently carries seven warnings and one error | Only the current host-specific sitemap remains submitted. |
| Ayo | Start validation for the old breadcrumb alert | Current markup passes, but Google must recrawl it | Search Console validation is started after deployment. |

## P1: commercial-intent content, first five briefs

No traffic or conversion forecast is attached because there is not enough first-party data yet.

| Priority | Working title and target | Destination | Conversion path | Brief |
|---:|---|---|---|---|
| 1 | Healthcare AI Readiness Assessment Checklist | New healthcare insight linked to `/solutions/healthcare-ai-consulting` | Project discussion | Show workflow, data, ownership, evaluation, safety, integration and adoption questions. Offer a practical downloadable checklist only if a real follow-up process exists. |
| 2 | How to Evaluate a Healthcare AI Workflow Before a Pilot | New healthcare insight linked to consulting and governance | Project discussion | Define the baseline, eligible cases, failure modes, human handoff, acceptance criteria and monitoring plan. |
| 3 | Human-in-the-Loop Healthcare AI Workflow Design | New healthcare insight linked to automation and governance | Project discussion | Explain decision boundaries, escalation, override, logging and review without giving medical or legal advice. |
| 4 | AI Lead Response Automation for Marketing Agencies | Strengthen the existing marketing-agency wedge page | Free pilot | Show one scoped flow, eligibility rules, booking rules, exception handling and measurement. Avoid invented conversion benchmarks. |
| 5 | Managed AI Operations vs Hiring an Operations Manager | New AIOS buyer guide | Free pilot | Compare job-to-be-done, ownership, maintenance, change management and failure handling. Do not invent salary or ROI figures. |

## P1: proof collection

| Input needed from Ayo | Where it improves the site | Safe default until supplied |
|---|---|---|
| ExerScript screenshots, demo URL, event context and observed result | Homepage and ExerScript case study | Keep current prototype description and `Not measured`. |
| De-identification evaluation set, entity coverage and measured error review | Tool and case study | Describe only the visible browser demo and common identifiers it attempts to mask. |
| Scam Shield test method and measured detection results | Case study | Keep it as a non-healthcare safety prototype with no performance claim. |
| Business Brain, CyberTaxx or EMOS/Labyrinth OS permission and scope | Potential AIOS or founder proof | Mention only in founder material where grounded; do not imply a client outcome. |
| Approved client names, quotes and written publication permission | Trust sections | Publish no testimonial. |

## P1: offer verification

Review the following against current contracts before increasing paid traffic:

- Foundation, Operations, Autonomous, Lead Engine Care and Install Sprint pricing.
- Exactly what `one new automation shipped weekly`, priority support and same-day response mean.
- The 10-business-day target and when its clock starts.
- Work-guarantee eligibility, exclusions, measurement and remedy.
- Which integrations are currently supported and which require a fit check.

The site now qualifies these claims and links to published terms, but owner and legal confirmation is still required.

## P2: measurement and CRO

1. Create a hostname-based GA4 exploration for healthcare and AIOS.
2. Track the funnel as page view to `lead_form_start` to `generate_lead`, segmented by CTA and landing page.
3. Record qualified lead status outside GA4, then join it to source and landing page without storing sensitive healthcare information in analytics.
4. After at least 20 qualified form starts per funnel, inspect abandonment by device and field rather than changing forms from anecdote.
5. Test one offer variable at a time. Start with CTA specificity, not colour.

## P2: technical and search follow-up

| Task | Trigger | Acceptance criterion |
|---|---|---|
| Capture Lighthouse and field Core Web Vitals | PageSpeed quota or CrUX access is available | Mobile and desktop scores are recorded for both homes and one conversion page per host; regressions receive file-level fixes. |
| Recheck titles and query mapping | Four weeks after recrawl | Search Console queries match the intended page map and no page cannibalisation is evident. |
| Audit production AIOS blog records | Database or admin read access is available | Every indexed post has a buyer-intent purpose, unique metadata, current facts and one primary CTA. |
| Review playbook indexation | At least four weeks after sitemap submission | Keep pages with distinct impressions or conversion value; improve or noindex thin overlaps. |
| Add case-study media | Evidence and permission are supplied | Images have useful alt text, captions state what is shown and schema references the real media. |

## P3: maintenance cadence

- Weekly: automated re-audit of live metadata, schemas, redirects, broken links and obvious regressions.
- Monthly: Search Console query and landing-page review for each host.
- Quarterly: pricing, guarantee, credentials, case evidence and legal-copy review.
- Before publishing any generated playbook: run the quality gate and human claim review. The GitHub workflow remains manual by design.
