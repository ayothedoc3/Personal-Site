import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection, PageHero } from "@/components/healthcare/ui"
import { audiences } from "@/lib/healthcare-content"
import { sites } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Who We Help | Ayothedoc Healthcare Technology",
  description:
    "We work with healthtech startups, medical-device and robotics companies, healthcare organisations, and international companies entering African markets.",
  alternates: { canonical: `${sites.healthcare.url}/who-we-help` },
}

export default function WhoWeHelpIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Who We Help" }]} />
          <PageHero
            eyebrow="Who we help"
            title="Four groups introducing technology into healthcare"
            intro="Different starting points, the same need: technology that fits real clinical and operational workflows and actually gets adopted."
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

      <CTASection heading="See your situation here?" label="Discuss a Healthcare Technology Project" />
      <HealthcareFooter />
    </div>
  )
}
