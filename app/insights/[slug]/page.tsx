import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection } from "@/components/healthcare/ui"
import { insights, insightBySlug } from "@/lib/insights"
import { sites } from "@/lib/site-config"
import { organizationJsonLd } from "@/lib/structured-data"

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = insightBySlug(slug)
  if (!a) return {}
  const articleUrl = `${sites.healthcare.url}/insights/${a.slug}`
  const imageUrl = `${sites.healthcare.url}${a.image.src}`

  return {
    title: `${a.title} | Ayothedoc Insights`,
    description: a.excerpt,
    alternates: { canonical: articleUrl },
    openGraph: {
      title: a.title,
      description: a.excerpt,
      type: "article",
      url: articleUrl,
      images: [{ url: imageUrl, width: a.image.width, height: a.image.height, alt: a.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.excerpt,
      images: [imageUrl],
    },
  }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = insightBySlug(slug)
  if (!a) notFound()

  const articleUrl = `${sites.healthcare.url}/insights/${a.slug}`
  const imageUrl = `${sites.healthcare.url}${a.image.src}`
  const organization = organizationJsonLd(sites.healthcare)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: a.title,
    description: a.excerpt,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      contentUrl: imageUrl,
      width: a.image.width,
      height: a.image.height,
      caption: a.image.alt,
    },
    datePublished: a.date,
    author: organization,
    publisher: organization,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>

      <article className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: a.title }]}
          />
          <span className="text-xs font-medium text-teal-700 dark:text-teal-400">{a.category}</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl text-balance">{a.title}</h1>
          <Image
            src={a.image.src}
            alt={a.image.alt}
            width={a.image.width}
            height={a.image.height}
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="mt-8 h-auto w-full rounded-xl border border-border bg-muted"
          />
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

      </main>

      <HealthcareFooter />
    </div>
  )
}
