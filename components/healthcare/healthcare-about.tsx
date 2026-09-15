import Link from "next/link"
import { HealthcareHeader } from "./healthcare-header"
import { HealthcareFooter } from "./healthcare-footer"
import { Breadcrumbs, CTASection, Eyebrow, PageHero } from "./ui"

const howWeWork = [
  { title: "Workflow first", body: "We define the user, task and operating context before choosing an AI approach." },
  { title: "Smallest useful system", body: "We scope the narrowest prototype or workflow that can answer the next decision." },
  { title: "Controls in the design", body: "Human review, privacy, failure handling and evaluation are product requirements." },
  { title: "Evidence before expansion", body: "We use explicit acceptance criteria to decide whether a workflow should move forward." },
]

const capabilities = [
  "Healthcare AI readiness",
  "Clinical workflow mapping",
  "AI product requirements",
  "Agentic AI prototyping",
  "MCP and A2A orchestration",
  "Healthcare workflow automation",
  "AI evaluation and governance",
  "Technical project delivery",
]

export function HealthcareAbout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <PageHero
            eyebrow="About"
            title="Healthcare AI, built around the workflow"
            intro="Ayothedoc is a healthcare AI design and implementation practice. We help teams turn a useful problem into a testable system, with clear human ownership and evidence requirements."
          />
        </div>
      </section>

      {/* Founder */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border bg-card p-7">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-teal-600 text-xl font-semibold text-white">
                  AA
                </div>
                <h2 className="mt-4 text-lg font-semibold">Ayokunle Ademola-John</h2>
                <p className="mt-1 text-sm text-muted-foreground">Founder</p>
                <Link
                  href="/ayo"
                  className="mt-5 inline-flex text-sm text-teal-700 dark:text-teal-400 hover:underline"
                >
                  View professional profile
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Eyebrow>Founder</Eyebrow>
              <p className="mt-4 text-lg text-foreground leading-relaxed">
                Ayokunle Ademola-John is a technical project manager and agentic AI practitioner based in Vilnius.
                His work combines healthcare workflow context, product thinking and hands-on AI delivery.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                  Built ExerScript, a physical-activity prescription agent using MCP and agent-to-agent orchestration
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                  Built the on-device clinical de-identification demo available on this site
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                  Presented at PyCon Estonia 2025 on making AI and machine learning understandable for real-world use
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                  Healthcare credentials include an MD (2018) and an MPH completed in 2026
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">How we work</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {howWeWork.map((h) => (
              <div key={h.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-medium text-foreground">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">Where we focus</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {capabilities.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Want to talk through a healthcare AI problem?" label="Discuss a Healthcare AI Project" />

      </main>

      <HealthcareFooter />
    </div>
  )
}
