import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection } from "@/components/healthcare/ui"
import { insights, insightBySlug } from "@/lib/insights"
import { sites } from "@/lib/site-config"

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = insightBySlug(slug)
  if (!a) return {}
  return {
    title: `${a.title} | Ayothedoc Insights`,
    description: a.excerpt,
    alternates: { canonical: `${sites.healthcare.url}/insights/${slug}` },
    openGraph: { title: a.title, description: a.excerpt, type: "article", url: `${sites.healthcare.url}/insights/${slug}` },
  }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = insightBySlug(slug)
  if (!a) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    author: { "@type": "Organization", name: "Ayothedoc" },
    mainEntityOfPage: `${sites.healthcare.url}/insights/${a.slug}`,
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HealthcareHeader />

      <article className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: a.title }]}
          />
          <span className="text-xs font-medium text-teal-700 dark:text-teal-400">{a.category}</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl text-balance">{a.title}</h1>
          <div className="mt-10 space-y-5">
            {a.body.map((p, i) => (
              <p key={i} className="text-base text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </article>

      <CTASection heading="Working on something like this?" label="Discuss a Project" />
      <div className="mx-auto max-w-3xl px-6 pb-16 lg:px-8">
        <Link href="/insights" className="text-sm text-teal-700 dark:text-teal-400 hover:underline">
          &larr; All insights
        </Link>
      </div>
      <HealthcareFooter />
    </div>
  )
}
