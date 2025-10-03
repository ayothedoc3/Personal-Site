import Link from "next/link"
import type { Metadata } from "next"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProgrammaticSummaries, getProgrammaticFilters } from "@/lib/programmatic-seo"

export const metadata: Metadata = {
  title: "Automation Playbooks Library | Ayothedoc",
  description:
    "Explore industry-specific automation playbooks for tools like Make.com, Zapier, and n8n. Filter by tool, use case, and industry to find ready-to-run workflows.",
  alternates: {
    canonical: "/automation",
  },
  openGraph: {
    title: "Automation Playbooks Library | Ayothedoc",
    description:
      "Explore industry-specific automation playbooks for tools like Make.com, Zapier, and n8n. Filter by tool, use case, and industry to find ready-to-run workflows.",
    url: "https://ayothedoc.com/automation",
  },
}

type AutomationIndexProps = {
  searchParams?: {
    tool?: string
    useCase?: string
    industry?: string
    q?: string
  }
}

function buildFilterHref(params: URLSearchParams, key: string, value: string | undefined) {
  const nextParams = new URLSearchParams(params.toString())

  if (value) {
    nextParams.set(key, value)
  } else {
    nextParams.delete(key)
  }

  return `/automation${nextParams.toString() ? `?${nextParams.toString()}` : ""}`
}

export default async function AutomationIndex({ searchParams }: AutomationIndexProps) {
  const [summaries, filters] = await Promise.all([getProgrammaticSummaries(), getProgrammaticFilters()])

  const params = new URLSearchParams()
  if (searchParams?.tool) params.set("tool", searchParams.tool)
  if (searchParams?.useCase) params.set("useCase", searchParams.useCase)
  if (searchParams?.industry) params.set("industry", searchParams.industry)
  if (searchParams?.q) params.set("q", searchParams.q)

  const query = searchParams?.q?.toLowerCase().trim()
  const filtered = summaries.filter((summary) => {
    if (searchParams?.tool && summary.tool !== searchParams.tool) return false
    if (searchParams?.useCase && summary.useCase !== searchParams.useCase) return false
    if (searchParams?.industry && summary.industry !== searchParams.industry) return false
    if (query) {
      const haystack = [summary.title, summary.metaDescription, summary.excerpt, summary.tool, summary.useCase, summary.industry]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return haystack.includes(query)
    }
    return true
  })

  const activeFilters = {
    tool: searchParams?.tool,
    useCase: searchParams?.useCase,
    industry: searchParams?.industry,
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
              { href: "/automation", label: "Automation Library", active: true },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/blog", label: "Blog" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 transition-all duration-300 group ${
                  item.active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 transition-all duration-300 ${
                    item.active ? "w-full" : "w-0 group-hover:w-full"
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lime-400/20 to-emerald-400/20 border border-lime-400/40 text-sm font-semibold tracking-wider text-lime-400 uppercase shadow-lg">
              Automation Playbooks
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              Launch-ready automation strategies for your team
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mt-6 max-w-3xl mx-auto">
              Browse programmatically generated automation blueprints covering tools, use cases, and industries we implement every week.
              Each playbook maps the problem, workflow, and ROI so you can launch fast.
            </p>
          </div>

          <form action="/automation" method="get" className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center mb-12">
            <div className="flex gap-3">
              <Input
                type="search"
                name="q"
                placeholder="Search tools, use cases, industries, or benefits"
                defaultValue={searchParams?.q ?? ""}
                className="bg-card/80 border-border/60 focus-visible:ring-lime-400"
              />
              {activeFilters.tool ? <input type="hidden" name="tool" value={activeFilters.tool} /> : null}
              {activeFilters.useCase ? <input type="hidden" name="useCase" value={activeFilters.useCase} /> : null}
              {activeFilters.industry ? <input type="hidden" name="industry" value={activeFilters.industry} /> : null}
            </div>
            <Button type="submit" className="bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900">
              Search playbooks
            </Button>
          </form>

          <section className="space-y-6 mb-12">
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">Filter by tool</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant={activeFilters.tool ? "outline" : "default"}
                  className={activeFilters.tool ? "border-lime-400 text-lime-400" : "bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900"}
                >
                  <Link href={buildFilterHref(params, "tool", undefined)}>All tools</Link>
                </Button>
                {filters.tools.map((tool) => (
                  <Button
                    key={tool}
                    asChild
                    variant="outline"
                    className={`border border-border/60 hover:border-lime-400/80 transition ${
                      activeFilters.tool === tool ? "border-lime-400 text-lime-400" : ""
                    }`}
                  >
                    <Link href={buildFilterHref(params, "tool", activeFilters.tool === tool ? undefined : tool)}>{tool}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">Use case</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant={activeFilters.useCase ? "outline" : "default"}
                  className={activeFilters.useCase ? "border-lime-400 text-lime-400" : "bg-muted text-foreground"}
                >
                  <Link href={buildFilterHref(params, "useCase", undefined)}>All use cases</Link>
                </Button>
                {filters.useCases.map((useCase) => (
                  <Button
                    key={useCase}
                    asChild
                    variant="outline"
                    className={`border border-border/60 hover:border-emerald-400/80 transition ${
                      activeFilters.useCase === useCase ? "border-emerald-400 text-emerald-400" : ""
                    }`}
                  >
                    <Link href={buildFilterHref(params, "useCase", activeFilters.useCase === useCase ? undefined : useCase)}>
                      {useCase}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">Industry</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant={activeFilters.industry ? "outline" : "default"}
                  className={activeFilters.industry ? "border-lime-400 text-lime-400" : "bg-muted text-foreground"}
                >
                  <Link href={buildFilterHref(params, "industry", undefined)}>All industries</Link>
                </Button>
                {filters.industries.map((industry) => (
                  <Button
                    key={industry}
                    asChild
                    variant="outline"
                    className={`border border-border/60 hover:border-cyan-400/80 transition ${
                      activeFilters.industry === industry ? "border-cyan-400 text-cyan-400" : ""
                    }`}
                  >
                    <Link
                      href={buildFilterHref(params, "industry", activeFilters.industry === industry ? undefined : industry)}
                    >
                      {industry}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-muted/30 border border-border/50 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-3">No playbooks match your filters yet</h3>
                <p className="text-muted-foreground mb-6">Reset the filters or reach out and we will draft a custom automation plan for you.</p>
                <Button asChild className="bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900" size="lg">
                  <Link href="/contact">Request a custom workflow</Link>
                </Button>
              </div>
            ) : (
              filtered.map((summary) => (
                <article
                  key={summary.slug}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-card/70 to-card/20 border border-border/40 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-lime-400/10"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-lime-400/10 to-emerald-400/10 rounded-2xl" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <span className="px-3 py-1 rounded-full bg-muted/60 border border-border/40">{summary.tool}</span>
                      <span className="px-3 py-1 rounded-full bg-muted/60 border border-border/40">{summary.useCase}</span>
                      <span className="px-3 py-1 rounded-full bg-muted/60 border border-border/40">{summary.industry}</span>
                    </div>
                    <h2 className="text-2xl font-semibold mt-6 mb-4 group-hover:text-lime-400 transition-colors">
                      {summary.title}
                    </h2>
                    <p className="text-muted-foreground flex-1 leading-relaxed">{summary.excerpt || summary.metaDescription}</p>
                    <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{summary.readTime ? `${summary.readTime} min read` : "Quick read"}</span>
                      <Link
                        href={`/automation/${summary.slug}`}
                        className="inline-flex items-center gap-2 text-lime-400 font-semibold hover:text-emerald-400 transition"
                      >
                        View playbook
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H4a1 1 0 110-2h10.586l-2.293-2.293a1 1 0 010-1.414z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
