import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { getProgrammaticPageBySlug, getProgrammaticSummaries } from "@/lib/programmatic-seo"

interface AutomationDetailProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const summaries = await getProgrammaticSummaries()
  return summaries.map((summary) => ({ slug: summary.slug }))
}

export async function generateMetadata({ params }: AutomationDetailProps): Promise<Metadata> {
  const page = await getProgrammaticPageBySlug(params.slug)

  if (!page) {
    return {
      title: "Automation Playbook Not Found | Ayothedoc",
    }
  }

  const url = `https://ayothedoc.com/automation/${page.slug}`

  return {
    title: `${page.title} | Automation Playbooks | Ayothedoc`,
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

export default async function AutomationDetailPage({ params }: AutomationDetailProps) {
  const page = await getProgrammaticPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  const summaries = await getProgrammaticSummaries()
  const related = summaries.filter((summary) => summary.slug !== page.slug).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.title,
    description: page.metaDescription,
    datePublished: page.datePublished,
    totalTime: page.readTime ? `PT${page.readTime}M` : undefined,
    provider: {
      "@type": "Organization",
      name: "Ayothedoc",
      url: "https://ayothedoc.com",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-lime-400/25 transition-all duration-300 group-hover:scale-110">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
            </div>
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Ayothedoc
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/audit", label: "Free Audit" },
              { href: "/automation", label: "Automation Library" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/blog", label: "Blog" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 transition-all duration-300 group ${
                  item.href === "/automation" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 transition-all duration-300 ${
                    item.href === "/automation" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              asChild
              className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full shadow-lg hover:shadow-lime-400/25 transition-all duration-300 hover:scale-105"
            >
              <Link href="https://calendly.com/ayothedoc" target="_blank" rel="noopener noreferrer">
                Book a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative px-6 py-16 lg:px-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <article className="max-w-4xl mx-auto">
          <div className="text-sm mb-6 flex flex-wrap gap-3 text-muted-foreground uppercase tracking-[0.2em]">
            <span className="px-3 py-1 rounded-full bg-muted/50 border border-border/40">{page.tool}</span>
            <span className="px-3 py-1 rounded-full bg-muted/50 border border-border/40">{page.useCase}</span>
            <span className="px-3 py-1 rounded-full bg-muted/50 border border-border/40">{page.industry}</span>
            {page.readTime ? <span>{page.readTime} min read</span> : null}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {page.title}
          </h1>

          <p className="text-muted-foreground text-lg mt-6 leading-relaxed">{page.metaDescription}</p>

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-card/70 to-card/20 border border-border/40">
            <h2 className="text-xl font-semibold mb-4">Who this playbook is for</h2>
            <p className="text-muted-foreground leading-relaxed">
              Built for teams that want to ship this automation in the next 30 days. Use the workflow below as your implementation
              checklist or pass it to our team to deliver for you.
            </p>
          </div>

          <section className="mt-12 space-y-12">
            <div dangerouslySetInnerHTML={renderHtml(page.sections.intro)} />
            <div>
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <div dangerouslySetInnerHTML={renderHtml(page.sections.benefits)} />
            </div>
            <div className="p-6 bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 rounded-2xl">
              <h2 className="text-2xl font-semibold mb-3">Workflow Overview</h2>
              <div className="text-muted-foreground" dangerouslySetInnerHTML={renderHtml(page.sections.workflow)} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Implementation Steps</h2>
              <div dangerouslySetInnerHTML={renderHtml(page.sections.steps)} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Expected Results & ROI</h2>
              <div dangerouslySetInnerHTML={renderHtml(page.sections.results)} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4" dangerouslySetInnerHTML={renderHtml(page.sections.faq)} />
            </div>
          </section>

          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-lime-400 to-emerald-400 text-gray-900 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-3">Launch this automation with Ayothedoc</h2>
            <p className="text-lg mb-6 max-w-2xl">
              We build, document, and train your team on this workflow. Book a strategy session to scope deliverables and timeline.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-gray-900 text-lime-400 hover:bg-gray-800">
                <Link href="https://calendly.com/ayothedoc" target="_blank" rel="noopener noreferrer">
                  Book Your Strategy Call
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-lime-400">
                <Link href="/contact">Talk to the team</Link>
              </Button>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="max-w-5xl mx-auto mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Related playbooks</h2>
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
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{summary.tool}</div>
                  <h3 className="text-lg font-semibold group-hover:text-lime-400 transition-colors min-h-[60px]">
                    {summary.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3">{summary.excerpt || summary.metaDescription}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-lime-400 font-semibold">
                    View playbook
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
