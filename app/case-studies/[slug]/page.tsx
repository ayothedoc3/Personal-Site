import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection, StatusLabel } from "@/components/healthcare/ui"
import { caseStudies, caseStudyBySlug } from "@/lib/case-studies"
import { sites } from "@/lib/site-config"

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = caseStudyBySlug(slug)
  if (!c) return {}
  return {
    title: `${c.name} (${c.status}) | Ayothedoc Case Studies`,
    description: c.summary,
    alternates: { canonical: `${sites.healthcare.url}/case-studies/${slug}` },
    robots: c.verified ? undefined : { index: false, follow: false },
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border py-5">
      <dt className="text-sm font-semibold text-foreground">{label}</dt>
      <dd className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{children}</dd>
    </div>
  )
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = caseStudyBySlug(slug)
  if (!c) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }, { label: c.name }]}
          />
          <StatusLabel>{c.status}</StatusLabel>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{c.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{c.summary}</p>

          <dl className="mt-10">
            <Field label="Problem">{c.problem}</Field>
            <Field label="Users">{c.users}</Field>
            <Field label="Context">{c.context}</Field>
            <Field label="Role">{c.role}</Field>
            <Field label="Requirements">
              <ul className="list-disc pl-5 space-y-1">
                {c.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Field>
            <Field label="Approach">{c.approach}</Field>
            <Field label="Workflow">{c.workflow}</Field>
            <Field label="Technology">{c.technology.join(", ")}</Field>
            <Field label="Safety and risk considerations">{c.safety}</Field>
            <Field label="Outcome">{c.outcome}</Field>
            <Field label="Metrics">{c.metrics}</Field>
            <Field label="Lessons">{c.lessons}</Field>
            <Field label="Next steps">{c.nextSteps}</Field>
          </dl>
        </div>
      </section>

      <CTASection heading="Planning something similar?" label="Discuss Your Project" />
      <div className="mx-auto max-w-3xl px-6 pb-16 lg:px-8">
        <Link href="/case-studies" className="text-sm text-teal-700 dark:text-teal-400 hover:underline">
          &larr; All case studies
        </Link>
      </div>
      <HealthcareFooter />
    </div>
  )
}
