import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection, Eyebrow, PageHero } from "@/components/healthcare/ui"
import { pillars } from "@/lib/healthcare-content"
import { sites } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Healthcare Technology Solutions | Ayothedoc",
  description:
    "Four service pillars: MedTech and robotics implementation, digital health and connected systems, clinical product consulting, and healthcare AI.",
  alternates: { canonical: `${sites.healthcare.url}/solutions` },
}

const engagementFormats = [
  "Readiness assessment",
  "Product discovery engagement",
  "Pilot planning",
  "Implementation programme",
  "Workflow and integration design",
  "Managed implementation support",
  "Adoption and performance review",
]

export default function SolutionsIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />
          <PageHero
            eyebrow="Solutions"
            title="Healthcare technology, implemented"
            intro="We work across four pillars, from introducing medical devices and robotics to connecting systems, shaping clinical products, and applying AI where it earns its place."
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
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Typical engagement formats</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Most work starts with an assessment or discovery engagement, then moves into planning and implementation
            scoped to your product, site and stage.
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

      <CTASection heading="Not sure which pillar fits?" label="Discuss a Healthcare Technology Project" />

      <HealthcareFooter />
    </div>
  )
}
