import type { Metadata } from "next"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection, PageHero } from "@/components/healthcare/ui"
import { methodSteps } from "@/lib/healthcare-content"
import { sites } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Our Method: From Healthcare Need to Practical Implementation | Ayothedoc",
  description:
    "A five-stage method for healthcare technology: Discover, Design, De-risk, Deploy, and Monitor and improve, with human oversight and measurable outcomes.",
  alternates: { canonical: `${sites.healthcare.url}/method` },
}

export default function MethodPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Method" }]} />
          <PageHero
            eyebrow="Method"
            title="From healthcare need to practical implementation"
            intro="We work in five stages. Each one has a clear purpose, so technology is planned, de-risked and measured rather than dropped into a live clinical environment and hoped for."
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <ol className="space-y-6">
            {methodSteps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-teal-600 text-sm font-semibold text-white">
                    {s.n}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <s.icon className="h-5 w-5 text-teal-700 dark:text-teal-400" aria-hidden />
                    <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:pl-15">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection heading="Have a project that needs this?" label="Discuss Your Implementation" />
      <HealthcareFooter />
    </div>
  )
}
