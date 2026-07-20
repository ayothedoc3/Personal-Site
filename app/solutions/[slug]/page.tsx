import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CheckList, CTASection, Eyebrow, PageHero } from "@/components/healthcare/ui"
import { solutionDetails, solutionSlugs } from "@/lib/solutions"
import { sites } from "@/lib/site-config"

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const d = solutionDetails[slug]
  if (!d) return {}
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: `${sites.healthcare.url}/solutions/${slug}` },
    openGraph: {
      title: d.metaTitle,
      description: d.metaDescription,
      url: `${sites.healthcare.url}/solutions/${slug}`,
    },
  }
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const d = solutionDetails[slug]
  if (!d) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Solutions", href: "/solutions" },
              { label: d.navLabel },
            ]}
          />
          <PageHero eyebrow="Solutions" title={d.heroTitle} intro={d.intro} />
          {d.positioning ? (
            <p className="mt-6 max-w-3xl rounded-xl border border-teal-600/30 bg-teal-600/[0.06] px-5 py-4 text-sm text-foreground leading-relaxed">
              {d.positioning}
            </p>
          ) : null}
        </div>
      </section>

      {/* Problems */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">Problems we address</h2>
          <div className="mt-8">
            <CheckList items={d.problems} columns={2} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Services</h2>
          <div className="mt-8">
            <CheckList items={d.services} columns={2} />
          </div>
        </div>
      </section>

      {/* Process / audience */}
      {d.process ? (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight">{d.process.heading}</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {d.process.items.map((it) => (
                <span key={it} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
                  {it}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {d.audience ? (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight">Who this is for</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {d.audience.map((it) => (
                <span key={it} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
                  {it}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Responsible use + boundaries */}
      {(d.responsibleUse || d.boundaries) ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 space-y-4">
            {d.responsibleUse ? (
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-medium text-foreground">Responsible use</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.responsibleUse}</p>
              </div>
            ) : null}
            {d.boundaries ? (
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-medium text-foreground">Scope of this service</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.boundaries}</p>
              </div>
            ) : null}
            {d.aiosNote ? (
              <p className="text-sm text-muted-foreground">
                For non-healthcare business automation, visit{" "}
                <a href="https://aios.ayothedoc.com" className="text-teal-700 dark:text-teal-400 hover:underline">
                  AIOS by Ayothedoc
                </a>
                .
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <CTASection heading="Ready to move this forward?" label={d.ctaLabel} />

      <div className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <Link href="/solutions" className="text-sm text-teal-700 dark:text-teal-400 hover:underline">
          &larr; All solutions
        </Link>
      </div>

      <HealthcareFooter />
    </div>
  )
}
