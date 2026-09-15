# Content, offer and keyword plan

Date: 2026-09-15
Decision dependency: resolved with Option B

## Positioning architecture

| Property | Five-second message | Audience | Primary CTA | Boundary |
|---|---|---|---|---|
| `ayothedoc.com` | Practical AI systems for real healthcare workflows | Healthtech teams and healthcare organisations | Discuss a Healthcare AI Project | No general agency automation offer on this host. |
| `aios.ayothedoc.com` | Managed lead-response and operations workflows for agencies and consultants | Agencies and consulting firms | Get Your Lead Engine Free | No healthcare service pages on this host. |

The sites may link to one another when a visitor is clearly in the wrong segment, but neither property borrows the other property's keywords, navigation or primary CTA.

## First-party search evidence

Connected Search Console data shows early, low-volume visibility rather than mature rankings. This plan uses the exact query language already appearing, plus close commercial-intent variants. It does not claim search volume that was not measured.

- Healthcare: `healthcare automation solutions`, `intelligent automation healthcare`, `intelligent automation in healthcare`.
- AIOS: `ai operating system for agencies`, `free ai audit`, `aios business`.

Current market-language checks also show active use of `healthcare AI readiness assessment`, `AI implementation in healthcare`, `clinical workflow automation`, `agentic AI healthcare`, `AI readiness assessment` and agency `lead response automation`. These are directional language sources, not volume estimates: [RSM AI readiness assessment](https://rsmus.com/services/digital-transformation/ai-readiness-assessment.html), [Digital Medicine Society health AI readiness assessment](https://dimesociety.org/ai-implementation-in-healthcare-playbook/ai-evaluation-readiness/health-ai-readiness-assessment/), [Salesforce on agentic AI in healthcare](https://www.salesforce.com/healthcare/artificial-intelligence/healthcare-agentic-ai/) and [Informed AI readiness assessment](https://www.informed.com/services/ai-readiness-assessment/).

## Healthcare keyword map

| Priority | Page | Primary intent | Supporting language | Conversion |
|---:|---|---|---|---|
| 1 | `/` | healthcare AI consulting and implementation | practical healthcare AI, healthcare AI services | Project discussion |
| 1 | `/solutions/healthcare-ai-consulting` | healthcare AI readiness assessment | AI strategy, use-case prioritisation, implementation roadmap | Project discussion |
| 1 | `/solutions/ai-intelligent-automation` | healthcare workflow automation | intelligent automation in healthcare, human-in-the-loop workflow | Project discussion |
| 1 | `/solutions/healthcare-ai-product-development` | healthcare AI product development | healthcare AI prototype, agentic AI prototype | Project discussion |
| 1 | `/solutions/healthcare-ai-governance` | healthcare AI governance consulting | AI safety, evaluation, monitoring and human oversight | Project discussion |
| 2 | `/who-we-help/healthtech-startups` | healthcare AI consulting for startups | prototype delivery, implementation planning | Project discussion |
| 2 | `/who-we-help/healthcare-organisations` | hospital AI implementation support | workflow readiness, adoption and governance | Project discussion |
| 2 | `/who-we-help/medtech-robotics-companies` | AI product support for medtech | workflow integration, safety boundaries | Project discussion |
| 2 | `/tools/de-identify` | on-device clinical text de-identification | local PHI masking demo, clinical privacy prototype | Project discussion |
| 3 | `/method` | healthcare AI implementation process | discover, design, de-risk, deliver, monitor | Project discussion |

The existing `/solutions/ai-intelligent-automation` slug is retained because it owns the clearest Search Console impression history. Its content is now healthcare-specific, so ranking equity is preserved without keeping the old broad positioning.

## AIOS keyword map

| Priority | Page | Primary intent | Supporting language | Conversion |
|---:|---|---|---|---|
| 1 | `/` | managed AI operations for agencies | AI operating system for agencies, agency operations automation | Free Lead Engine pilot |
| 1 | `/services` | AI operations services for agencies | managed workflow automation, agency AI operations | Free Lead Engine pilot |
| 1 | `/contact` | free lead response automation pilot | AI lead response service, agency lead follow-up | Submit pilot request |
| 1 | `/offer` | managed AI operations pricing | AI automation service pricing, lead engine pilot | Submit pilot request |
| 1 | `/demo` | AI lead response automation demo | personalised lead reply demo, speed-to-lead workflow | Submit pilot request |
| 2 | `/audit` | free AI readiness audit for agencies | AI operations readiness, workflow automation assessment | Generate lead |
| 2 | `/automation/ai-operating-system-marketing-agencies` | AI operating system for marketing agencies | managed agency workflows | Audit or pilot |
| 2 | `/automation/ai-operating-system-consulting-firms` | AI operating system for consulting firms | consulting operations automation | Audit or pilot |
| 2 | `/automation/ai-operating-system-web-design-agencies` | AI operating system for web design agencies | web agency operations automation | Audit or pilot |
| 2 | Three `/automation/60-second-lead-response-*` pages | lead response automation by agency type | eligible lead response service target | Pilot |
| 3 | `/automation/auto-reply-inbound-leads` | automate inbound lead replies | lead intake, CRM and booking workflow | Pilot |
| 3 | `/automation/lead-response-time-benchmarks-agencies` | lead response time for agencies | baseline and service-target measurement | Audit |

## Implemented content and offer changes

### Healthcare

- The homepage now says what is offered, who it is for and what happens next in the first screen (`components/healthcare/healthcare-home.tsx`).
- Four focused offers replace the broad technology catalogue (`lib/solutions.ts`, `lib/healthcare-content.ts`).
- Audience pages link directly to relevant services (`lib/audiences-detail.ts`, `app/who-we-help/[slug]/page.tsx`).
- The method is Discover, Design, De-risk, Deliver and Monitor, with safe deployment and monitoring made explicit (`app/method/page.tsx`).
- The primary CTA is consistently `Discuss a Healthcare AI Project` through `components/healthcare/ui.tsx`.
- Three accurately labelled examples are visible: ExerScript, on-device clinical de-identification and Scam Shield (`lib/case-studies.ts`). Metrics are not claimed where none were supplied.
- The founder page leads with Technical Project Manager and Agentic AI Practitioner. The MD and MPH appear as credentials, not as the opening story (`app/ayo/page.tsx`).

### AIOS

- The homepage has one primary CTA. Demo access is a supporting text link and the audit no longer competes in the hero (`components/aios/aios-home.tsx`).
- The free offer is a scoped pilot on one agreed lead source with approved examples, eligibility rules, a response target and human handoff. It is not presented as a guaranteed commercial outcome.
- Audit results no longer fabricate hours or dollar savings. They require a measured baseline (`app/audit/page.tsx`, `app/api/business-audit/route.ts`).
- The demo now distinguishes an inspectable sandbox from client proof (`app/demo/page.tsx`, `components/demo-client.tsx`).
- Programmatic pages use outcome-first, tool-agnostic, done-for-you language and include failure handling, human handoff and a baseline (`data/programmatic-seo/pages`, `scripts/programmatic_seo.py`).

## Case-study standard

Each public case study answers these questions:

1. What real problem was explored?
2. What was actually built?
3. What can a visitor inspect or verify?
4. What safety or scope boundary applied?
5. Was the result deployed, prototyped or demonstrated?
6. Which outcome was measured? If none, say `Not measured`.

Before adding a client name, testimonial, screenshot or metric, retain written permission or the underlying evidence. An outcome-focused case study does not require an invented number.

## Blog and insight audit

### Healthcare insights

The three legacy articles are recent but previously broad. Their existing slugs are preserved, while their titles and bodies now support healthcare AI buyer questions:

- What a Healthcare AI Readiness Assessment Covers
- Why FHIR Matters for Healthcare AI Workflows
- Human Factors in Healthcare AI Adoption

They form a useful base, but three articles are not yet a complete commercial cluster. The first five backlog briefs are in `docs/GROWTH_BACKLOG.md`.

### AIOS blog and playbooks

The AIOS blog is database-backed, so repository inspection cannot prove the freshness or quality of every production record. The static playbook library is now a curated set of nine outcome-first pages. Automatic weekly generation remains paused. New pages should be added only when they answer a distinct buyer question and pass the generator's quality gate.

## CTA rule

One primary conversion per page does not mean every page can contain only one link. It means repeated primary buttons lead to the same next step, while supporting links remain visually secondary.

| Page family | Primary action | Allowed secondary action |
|---|---|---|
| Healthcare service, audience, method, insight and case study | Discuss a Healthcare AI Project | Related service, article or inspectable demo link |
| AIOS home, service, offer and demo | Request the free Lead Engine pilot | Read terms, watch demo or inspect service details |
| AIOS audit | Complete the readiness audit | View the Lead Engine offer after the result |
| AIOS playbook | Pilot for wedge pages, audit for broad readiness pages | Related playbook or the alternate low-friction path |

## Claims that remain owner-controlled

- Pricing and plan scope.
- The 10-business-day standard target.
- Published guarantee terms.
- Mailbox and delivery configuration.
- Client permission, testimonials, screenshots and measured outcomes.

These should be reviewed quarterly and whenever the offer changes.
