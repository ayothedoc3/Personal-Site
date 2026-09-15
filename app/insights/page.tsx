import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection, PageHero } from "@/components/healthcare/ui"
import { insights, insightCategories } from "@/lib/insights"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "healthcare",
  path: "/insights",
  title: "Healthcare AI Implementation Insights | Ayothedoc",
  description:
    "Practical writing on healthcare AI readiness, workflow design, data, evaluation, human oversight and responsible implementation.",
})

export default function InsightsIndex() {
  const activeCategories = insightCategories.filter((c) => insights.some((i) => i.category === c))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />
          <PageHero
            eyebrow="Insights"
            title="Practical thinking on healthcare AI implementation"
            intro="Concrete guidance on the workflows, data, controls and evidence around useful healthcare AI."
          />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {activeCategories.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((a) => (
              <Link
                key={a.slug}
                href={`/insights/${a.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 hover:border-teal-500/60 transition-colors"
              >
                <span className="text-xs font-medium text-teal-700 dark:text-teal-400">{a.category}</span>
                <h2 className="mt-3 font-medium text-foreground">{a.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400">
                  Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Have a healthcare AI implementation question?" label="Discuss a Healthcare AI Project" />

      </main>

      <HealthcareFooter />
    </div>
  )
}
