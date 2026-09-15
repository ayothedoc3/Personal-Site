import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection, PageHero } from "@/components/healthcare/ui"
import { audiences } from "@/lib/healthcare-content"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "healthcare",
  path: "/who-we-help",
  title: "Who We Help With Healthcare AI | Ayothedoc",
  description:
    "Healthcare AI support for healthtech startups, healthcare organisations, MedTech teams and companies planning implementation in African markets.",
})

export default function WhoWeHelpIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Who We Help" }]} />
          <PageHero
            eyebrow="Who we help"
            title="Healthcare AI support matched to your starting point"
            intro="A founder testing a product and an organisation evaluating a live workflow need different evidence, controls and delivery plans."
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {audiences.map((a) => (
              <Link
                key={a.slug}
                href={`/who-we-help/${a.slug}`}
                className="group rounded-xl border border-border bg-card p-7 hover:border-teal-500/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <a.icon className="h-7 w-7 text-teal-700 dark:text-teal-400" aria-hidden />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground transition-all" aria-hidden />
                </div>
                <h2 className="mt-4 text-lg font-medium text-foreground">{a.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="See your starting point here?" label="Discuss a Healthcare AI Project" />

      </main>

      <HealthcareFooter />
    </div>
  )
}
