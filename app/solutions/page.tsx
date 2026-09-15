import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection, Eyebrow, PageHero } from "@/components/healthcare/ui"
import { pillars } from "@/lib/healthcare-content"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "healthcare",
  path: "/solutions",
  title: "Healthcare AI Consulting Services | Ayothedoc",
  description:
    "Healthcare AI readiness, workflow automation, product prototyping, safety and governance for healthtech teams and healthcare organisations.",
})

const engagementFormats = [
  "AI readiness assessment",
  "Use-case and workflow discovery",
  "Prototype design and build",
  "Evaluation and red-team scenarios",
  "Pilot planning",
  "Integration and implementation support",
  "Monitoring and improvement review",
]

export default function SolutionsIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />
          <PageHero
            eyebrow="Healthcare AI services"
            title="From AI opportunity to a testable healthcare workflow"
            intro="Choose the right use case, design the workflow and controls, build what needs testing, and prepare the evidence required for a responsible pilot."
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map((p) => (
              <Link
                key={p.slug}
                href={`/solutions/${p.slug}`}
                className="group rounded-xl border border-border bg-card p-7 hover:border-teal-500/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <p.icon className="h-7 w-7 text-teal-700 dark:text-teal-400" aria-hidden />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground transition-all" aria-hidden />
                </div>
                <h2 className="mt-4 text-lg font-medium text-foreground">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.positioning}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.services.slice(0, 3).map((s) => (
                    <li key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {s}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <Eyebrow>How engagements work</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Start at the point that matches your evidence</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Work can begin with a readiness decision, a focused prototype or an implementation problem. Scope is tied
            to the workflow question your team needs to answer next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {engagementFormats.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Not sure where to start?" label="Discuss a Healthcare AI Project" />

      </main>

      <HealthcareFooter />
    </div>
  )
}
