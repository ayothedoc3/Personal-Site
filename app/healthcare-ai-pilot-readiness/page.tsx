import { CheckCircle2, Clock3, ShieldCheck, Target } from "lucide-react"

import { HealthcareContactForm } from "@/components/healthcare/healthcare-contact-form"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { Breadcrumbs, Eyebrow } from "@/components/healthcare/ui"
import { buildMetadata } from "@/lib/seo"
import { sites } from "@/lib/site-config"
import { faqPageJsonLd, type FaqEntry } from "@/lib/structured-data"

export const metadata = buildMetadata({
  site: "healthcare",
  path: "/healthcare-ai-pilot-readiness",
  title: "Healthcare AI Pilot Readiness Sprint | Ayothedoc",
  description:
    "Turn one healthcare AI use case into a decision-ready pilot plan with workflow, data, safety, evaluation and implementation requirements made explicit.",
})

const deliverables = [
  "Intended user, problem and workflow boundary",
  "Current-state and proposed workflow map",
  "Data, integration and access requirements",
  "Human-review, escalation and failure rules",
  "Risk, privacy and governance questions",
  "Evaluation and pilot acceptance criteria",
  "Prioritised pilot roadmap and next decision",
]

const faqs: FaqEntry[] = [
  {
    question: "Who is the sprint designed for?",
    answer:
      "It is designed for healthtech, MedTech, digital-health and healthcare teams with one defined AI use case that needs a practical go, revise or stop decision before a prototype or pilot.",
  },
  {
    question: "Does the sprint provide regulatory or legal approval?",
    answer:
      "No. It identifies workflow, evidence, privacy, safety and governance questions that need owners. Formal legal, regulatory, information-security and clinical approvals remain with appropriately authorised professionals and organisations.",
  },
  {
    question: "Do we need to share patient-identifiable data?",
    answer:
      "No. Do not submit patient-identifiable or other sensitive personal data through the application form. Discovery should begin with synthetic, de-identified or non-sensitive process information wherever possible.",
  },
  {
    question: "What is the delivery commitment?",
    answer:
      "The standard target is five business days after kickoff, the agreed inputs are complete and the relevant stakeholders are available. The exact scope and start date are confirmed in writing first.",
  },
]

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Healthcare AI Pilot Readiness Sprint",
  description:
    "A focused engagement that turns one healthcare AI use case into a decision-ready workflow, risk, evaluation and pilot plan.",
  url: `${sites.healthcare.url}/healthcare-ai-pilot-readiness`,
  provider: { "@id": `${sites.healthcare.url}/#organization` },
  areaServed: "Worldwide",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Healthtech, MedTech, digital health and healthcare organisations",
  },
}

export default function HealthcareAiPilotReadinessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqs)) }} />
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Healthcare AI Pilot Readiness Sprint" },
              ]}
            />
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <Eyebrow>Focused entry engagement</Eyebrow>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                  Turn one healthcare AI use case into a decision-ready pilot plan
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                  The Healthcare AI Pilot Readiness Sprint makes the workflow, data needs, human oversight, risks,
                  evaluation criteria and next delivery decision explicit before your team commits to a larger build.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                    <Target className="h-4 w-4 text-teal-600" aria-hidden /> One defined use case
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                    <Clock3 className="h-4 w-4 text-teal-600" aria-hidden /> Five-business-day target
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                    <ShieldCheck className="h-4 w-4 text-teal-600" aria-hidden /> Human oversight built in
                  </span>
                </div>
              </div>

              <aside className="rounded-2xl border border-teal-600/40 bg-teal-600/[0.06] p-7">
                <h2 className="text-xl font-semibold">The decision you leave with</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Proceed, revise or stop, backed by a practical decision pack that shows what the pilot would need,
                  who owns each decision and how success would be evaluated.
                </p>
                <p className="mt-5 border-t border-teal-600/20 pt-5 text-xs leading-relaxed text-muted-foreground">
                  The sprint does not provide medical advice, regulatory approval or a guarantee of clinical,
                  financial or adoption outcomes.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <Eyebrow>The complete decision pack</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight">
              Seven outputs required for a responsible pilot decision
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="text-center">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Define, examine, decide</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  n: "01",
                  title: "Define the use case",
                  body: "Confirm the intended user, current workflow, responsible owner, available inputs and the decision the AI-assisted step would support.",
                },
                {
                  n: "02",
                  title: "Examine readiness",
                  body: "Map data, integrations, human review, risks, failure paths, evaluation scenarios and unresolved dependencies with the relevant stakeholders.",
                },
                {
                  n: "03",
                  title: "Make the next decision",
                  body: "Receive a prioritised roadmap and acceptance criteria showing whether to prototype, prepare a pilot, revise the scope or stop.",
                },
              ].map((step) => (
                <div key={step.n} className="rounded-xl border border-border bg-card p-7">
                  <div className="text-sm font-semibold tracking-wider text-teal-700 dark:text-teal-400">STEP {step.n}</div>
                  <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 lg:grid-cols-2 lg:px-8">
            <div className="rounded-2xl border border-teal-600/30 bg-card p-8">
              <h2 className="text-2xl font-semibold">A strong fit</h2>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[
                  "One AI use case has been identified",
                  "A workflow owner can participate",
                  "The team needs a go, revise or stop decision",
                  "Synthetic, de-identified or non-sensitive process information can be used first",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-semibold">The scope-completion commitment</h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The agreed outputs and delivery prerequisites are documented before kickoff. If an agreed deliverable
                is incomplete against that written scope, it is revised at no additional professional fee.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                This commitment covers the deliverables Ayothedoc controls. It does not promise regulatory approval,
                clinical performance, adoption, revenue, savings or another party&apos;s decision.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
            <Eyebrow>Apply for the sprint</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Tell us the one decision your team needs to make</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Applications are reviewed for fit. Do not include patient-identifiable data, credentials or other
              sensitive personal information.
            </p>
            <div className="mt-10">
              <HealthcareContactForm defaultProjectType="Healthcare AI Pilot Readiness Sprint" />
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
            <Eyebrow>Questions</Eyebrow>
            <div className="mt-8 space-y-4">
              {faqs.map((item) => (
                <details key={item.question} className="rounded-xl border border-border bg-card p-6">
                  <summary className="cursor-pointer font-medium">{item.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <HealthcareFooter />
    </div>
  )
}
