import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import {
  getProgrammaticPageBySlug,
  getProgrammaticSummaries,
  type FourC,
  type PageTier,
  type ProgrammaticSeoPage,
  type ProgrammaticSeoSummary,
} from "@/lib/programmatic-seo"

interface AutomationDetailProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const summaries = await getProgrammaticSummaries()
  return summaries.map((summary) => ({ slug: summary.slug }))
}

export async function generateMetadata({ params }: AutomationDetailProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getProgrammaticPageBySlug(slug)

  if (!page) {
    return {
      title: "Page Not Found | Ayothedoc",
    }
  }

  const url = `https://ayothedoc.com/automation/${page.slug}`

  return {
    title: `${page.title} | Ayothedoc`,
    description: page.metaDescription,
    alternates: {
      canonical: `/automation/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url,
      type: "article",
      siteName: "Ayothedoc",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
  }
}

function renderHtml(html: string) {
  return { __html: html }
}

// Map Four-C → a tasteful accent class for the badge. Stays inside the brand palette.
const FOUR_C_ACCENT: Record<FourC, string> = {
  Context: "from-cyan-400/30 to-cyan-400/10 border-cyan-400/40 text-cyan-200",
  Connections: "from-emerald-400/30 to-emerald-400/10 border-emerald-400/40 text-emerald-200",
  Capabilities: "from-lime-400/30 to-lime-400/10 border-lime-400/40 text-lime-200",
  Cadence: "from-amber-400/30 to-amber-400/10 border-amber-400/40 text-amber-200",
}

const FOUR_C_BLURB: Record<FourC, string> = {
  Context: "Layer 1 of the AI Operating System: the system knows your business.",
  Connections: "Layer 2 of the AI Operating System: it plugs into the tools you already run on.",
  Capabilities: "Layer 3 of the AI Operating System: done-for-you workflows that produce real artifacts.",
  Cadence: "Layer 4 of the AI Operating System: it runs on a schedule, no human prompt needed.",
}

const TIER_LABEL: Record<PageTier, string> = {
  pillar: "AIOS Overview",
  wedge: "Free Build",
  capability: "Installed Capability",
}

// CTA tiering, straight from the realignment plan:
//  - wedge pages (speed-to-lead): the page topic IS the offer, so lead with the
//    free Lead Engine. Audit is secondary.
//  - everything else (pillars + capability x industry): cold-search default,
//    lead with the free audit. Lead Engine is secondary.
//  - Calendly is never primary; it lives as a quiet tertiary text link.
function primaryCta(tier: PageTier): { href: string; label: string } {
  if (tier === "wedge") return { href: "/offer", label: "Get your Lead Engine free" }
  return { href: "/audit", label: "Get your free AIOS readiness audit" }
}

function secondaryCta(tier: PageTier): { href: string; label: string } {
  if (tier === "wedge") return { href: "/audit", label: "Or score your AI readiness first" }
  return { href: "/offer", label: "Or get your Lead Engine free" }
}

// Strip raw HTML tags into plain text for the FAQPage JSON-LD.
function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

// Parse the FAQ section (h4 questions, p answers) into structured FAQ entries
// so the JSON-LD FAQPage schema actually has data, not just a name.
function parseFaq(html: string): Array<{ question: string; answer: string }> {
  const result: Array<{ question: string; answer: string }> = []
  const pattern = /<h4[^>]*>([\s\S]*?)<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/gi
  let match
  while ((match = pattern.exec(html)) !== null) {
    const question = stripTags(match[1])
    const answer = stripTags(match[2])
    if (question && answer) result.push({ question, answer })
  }
  return result
}

function buildJsonLd(page: ProgrammaticSeoPage): Array<Record<string, unknown>> {
  const url = `https://ayothedoc.com/automation/${page.slug}`
  const provider = {
    "@type": "Organization",
    name: "Ayothedoc",
    url: "https://ayothedoc.com",
  }

  // Service schema replaces HowTo: this is done-for-you, not a DIY tutorial.
  const service: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    provider,
    serviceType: page.outcome,
    url,
    areaServed: page.industry || "Global",
    audience: page.industry
      ? { "@type": "BusinessAudience", audienceType: page.industry }
      : { "@type": "BusinessAudience", audienceType: "Agencies and consulting firms" },
  }

  const faqEntries = parseFaq(page.sections.faq)
  const blocks: Array<Record<string, unknown>> = [service]
  if (faqEntries.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntries.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: { "@type": "Answer", text: entry.answer },
      })),
    })
  }
  return blocks
}

function getRelated(all: ProgrammaticSeoSummary[], page: ProgrammaticSeoPage, limit = 3): ProgrammaticSeoSummary[] {
  // Prefer same industry, then same outcome, then anything else.
  const others = all.filter((s) => s.slug !== page.slug)
  const sameIndustry = page.industry ? others.filter((s) => s.industry === page.industry) : []
  const sameOutcome = others.filter((s) => s.outcome === page.outcome && s.industry !== page.industry)
  const seen = new Set<string>()
  const out: ProgrammaticSeoSummary[] = []
  for (const list of [sameIndustry, sameOutcome, others]) {
    for (const s of list) {
      if (out.length >= limit) break
      if (seen.has(s.slug)) continue
      seen.add(s.slug)
      out.push(s)
    }
  }
  return out
}

export default async function AutomationDetailPage({ params }: AutomationDetailProps) {
  const { slug } = await params
  const page = await getProgrammaticPageBySlug(slug)

  if (!page) {
    notFound()
  }

  const summaries = await getProgrammaticSummaries()
  const related = getRelated(summaries, page)

  const jsonLdBlocks = buildJsonLd(page)
  const primary = primaryCta(page.tier)
  const secondary = secondaryCta(page.tier)
  const accent = FOUR_C_ACCENT[page.fourC]
  const fourCBlurb = FOUR_C_BLURB[page.fourC]
  const tierLabel = TIER_LABEL[page.tier]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />

      <main className="relative px-6 py-16 lg:px-12">
        {jsonLdBlocks.map((block, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}

        <article className="max-w-4xl mx-auto">
          <div className="text-xs mb-6 flex flex-wrap gap-3 text-muted-foreground uppercase tracking-[0.2em]">
            <span
              className={`px-3 py-1 rounded-full bg-gradient-to-r ${accent} border font-semibold`}
            >
              {page.fourC}
            </span>
            <span className="px-3 py-1 rounded-full bg-muted/50 border border-border/40">
              {tierLabel}
            </span>
            {page.industry ? (
              <span className="px-3 py-1 rounded-full bg-muted/50 border border-border/40">
                {page.industry}
              </span>
            ) : null}
            {page.readTime ? <span className="self-center">{page.readTime} min read</span> : null}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {page.title}
          </h1>

          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">{page.metaDescription}</p>

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-card/70 to-card/20 border border-border/40">
            <h2 className="text-xl font-semibold mb-2">Where this sits</h2>
            <p className="text-muted-foreground leading-relaxed">{fourCBlurb}</p>
          </div>

          <section className="mt-12 space-y-12">
            <div dangerouslySetInnerHTML={renderHtml(page.sections.intro)} />
            <div>
              <h2 className="text-2xl font-semibold mb-4">Where this sits in your AI Operating System</h2>
              <div dangerouslySetInnerHTML={renderHtml(page.sections.fourCFit)} />
            </div>
            <div className="p-6 bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 rounded-2xl">
              <h2 className="text-2xl font-semibold mb-3">What &ldquo;done&rdquo; looks like</h2>
              <div className="text-muted-foreground" dangerouslySetInnerHTML={renderHtml(page.sections.whatDoneLooksLike)} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">How we install it</h2>
              <div dangerouslySetInnerHTML={renderHtml(page.sections.howWeInstall)} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Expected results</h2>
              <div dangerouslySetInnerHTML={renderHtml(page.sections.expectedResults)} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>
              <div
                className="space-y-6 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed"
                dangerouslySetInnerHTML={renderHtml(page.sections.faq)}
              />
            </div>
          </section>

          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-lime-400 to-emerald-400 text-gray-900 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-3">
              {page.tier === "wedge"
                ? "Want it built on your real leads?"
                : "Ready to see where your AIOS stands?"}
            </h2>
            <p className="text-lg mb-6 max-w-2xl">
              {page.tier === "wedge"
                ? "We will build your 60-Second Lead Engine free, on your real leads. If it books calls you would have missed, we run the rest of your operations."
                : "Score your AI readiness across the Four Cs in about 10 minutes. We send the audit and the three highest-leverage automations for your business."}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild className="bg-gray-900 text-lime-400 hover:bg-gray-800">
                <Link href={primary.href}>{primary.label}</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-lime-400">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="max-w-5xl mx-auto mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Related</h2>
              <Link href="/automation" className="text-sm text-lime-400 hover:text-emerald-400 font-semibold">
                View all
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((summary) => (
                <Link
                  key={summary.slug}
                  href={`/automation/${summary.slug}`}
                  className="group block p-6 rounded-2xl bg-card/60 border border-border/40 hover:border-lime-400/60 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    {summary.fourC}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-lime-400 transition-colors min-h-[60px]">
                    {summary.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3">{summary.excerpt || summary.metaDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-lime-400 font-semibold">
                    Read more
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H4a1 1 0 110-2h10.586l-2.293-2.293a1 1 0 010-1.414z" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
