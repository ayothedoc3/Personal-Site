import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection, PageHero, StatusLabel } from "@/components/healthcare/ui"
import { verifiedCaseStudies } from "@/lib/case-studies"
import { sites } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Case Studies | Ayothedoc Healthcare Technology",
  description:
    "Accurately labelled healthcare technology work, from hackathon pilots and prototypes to implementation and usability studies.",
  alternates: { canonical: `${sites.healthcare.url}/case-studies` },
}

export default function CaseStudiesIndex() {
  const studies = verifiedCaseStudies()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Case Studies" }]} />
          <PageHero
            eyebrow="Case studies"
            title="Accurately labelled work"
            intro="Every project is labelled by what it actually is: a hackathon pilot, a prototype, or an implementation study. We do not describe prototypes as deployed clinical systems, and we do not invent metrics."
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          {studies.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="group rounded-xl border border-border bg-card p-6 hover:border-teal-500/60 transition-colors"
                >
                  <StatusLabel>{c.status}</StatusLabel>
                  <h2 className="mt-4 font-medium text-foreground">{c.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400">
                    Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <h2 className="text-lg font-medium text-foreground">Case studies are being prepared</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
                We are finalising accurately labelled write-ups of recent work. If you would like to discuss relevant
                experience for your project, get in touch and we will share what is appropriate.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
                >
                  Discuss a Project
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection heading="Planning something similar?" label="Discuss Your Project" />
      <HealthcareFooter />
    </div>
  )
}
