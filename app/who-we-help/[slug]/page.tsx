import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CheckList, CTASection, Eyebrow, PageHero } from "@/components/healthcare/ui"
import { audienceDetails, audienceSlugs } from "@/lib/audiences-detail"
import { solutionDetails } from "@/lib/solutions"
import { sites } from "@/lib/site-config"

export function generateStaticParams() {
  return audienceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const d = audienceDetails[slug]
  if (!d) return {}
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: `${sites.healthcare.url}/who-we-help/${slug}` },
    openGraph: { title: d.metaTitle, description: d.metaDescription, url: `${sites.healthcare.url}/who-we-help/${slug}` },
  }
}

export default async function AudiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const d = audienceDetails[slug]
  if (!d) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Who We Help", href: "/who-we-help" }, { label: d.navLabel }]}
          />
          <PageHero eyebrow="Who we help" title={d.heroTitle} intro={d.intro} />
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">Common problems we hear</h2>
          <div className="mt-8">
            <CheckList items={d.problems} columns={2} />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <Eyebrow>How we help</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">What we focus on</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {d.focus.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {d.note ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-medium text-foreground">What we do and do not do</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.note}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">Relevant solutions</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.relatedSolutions.map((s) => {
              const sol = solutionDetails[s]
              if (!sol) return null
              return (
                <Link
                  key={s}
                  href={`/solutions/${s}`}
                  className="group rounded-xl border border-border bg-card p-5 hover:border-teal-500/60 transition-colors"
                >
                  <h3 className="font-medium text-foreground">{sol.navLabel}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400">
                    View solution{" "}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection heading="Let's talk about your situation" label={d.ctaLabel} />
      <HealthcareFooter />
    </div>
  )
}
