import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  getProgrammaticSummaries,
  getProgrammaticFilters,
  type FourC,
} from "@/lib/programmatic-seo"

export const metadata: Metadata = {
  title: "AIOS Playbooks Library | Ayothedoc",
  description:
    "Browse what we install and run as your AI Operating System. Pages are organized by the Four Cs (Context, Connections, Capabilities, Cadence) and by industry.",
  alternates: {
    canonical: "/automation",
  },
  openGraph: {
    title: "AIOS Playbooks Library | Ayothedoc",
    description:
      "Browse what we install and run as your AI Operating System. Pages are organized by the Four Cs and by industry.",
    url: "https://ayothedoc.com/automation",
  },
}

type AutomationIndexProps = {
  searchParams?: Promise<{
    outcome?: string
    fourC?: string
    industry?: string
    q?: string
  }>
}

function buildFilterHref(params: URLSearchParams, key: string, value: string | undefined) {
  const nextParams = new URLSearchParams(params.toString())
  if (value) nextParams.set(key, value)
  else nextParams.delete(key)
  return `/automation${nextParams.toString() ? `?${nextParams.toString()}` : ""}`
}

const FOUR_C_PILL: Record<FourC, string> = {
  Context: "border-cyan-400/60 text-cyan-300",
  Connections: "border-emerald-400/60 text-emerald-300",
  Capabilities: "border-lime-400/60 text-lime-300",
  Cadence: "border-amber-400/60 text-amber-300",
}

export default async function AutomationIndex({ searchParams }: AutomationIndexProps) {
  const [summaries, filters] = await Promise.all([getProgrammaticSummaries(), getProgrammaticFilters()])
  const sp = (await searchParams) ?? {}

  const params = new URLSearchParams()
  if (sp.outcome) params.set("outcome", sp.outcome)
  if (sp.fourC) params.set("fourC", sp.fourC)
  if (sp.industry) params.set("industry", sp.industry)
  if (sp.q) params.set("q", sp.q)

  const query = sp.q?.toLowerCase().trim()
  const filtered = summaries.filter((summary) => {
    if (sp.outcome && summary.outcome !== sp.outcome) return false
    if (sp.fourC && summary.fourC !== sp.fourC) return false
    if (sp.industry && summary.industry !== sp.industry) return false
    if (query) {
      const haystack = [
        summary.title,
        summary.metaDescription,
        summary.excerpt,
        summary.outcome,
        summary.fourC,
        summary.industry ?? "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return haystack.includes(query)
    }
    return true
  })

  // Surface pillars first, then wedge cluster, then capabilities. Inside each
  // tier, keep alpha order by title for stable browsing.
  const TIER_RANK: Record<string, number> = { pillar: 0, wedge: 1, capability: 2 }
  const ordered = [...filtered].sort((a, b) => {
    const ta = TIER_RANK[a.tier ?? "capability"] ?? 99
    const tb = TIER_RANK[b.tier ?? "capability"] ?? 99
    if (ta !== tb) return ta - tb
    return a.title.localeCompare(b.title)
  })

  const activeFilters = {
    outcome: sp.outcome,
    fourC: sp.fourC,
    industry: sp.industry,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />

      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lime-400/20 to-emerald-400/20 border border-lime-400/40 text-sm font-semibold tracking-wider text-lime-400 uppercase shadow-lg">
              AIOS Playbooks
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              What we install and run as your AI Operating System
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mt-6 max-w-3xl mx-auto">
              Every page is something we install for an agency or consulting firm and then operate. Filter by the layer of the Four Cs it sits in, by outcome, or by your industry.
            </p>
          </div>

          <form action="/automation" method="get" className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center mb-12">
            <div className="flex gap-3">
              <Input
                type="search"
                name="q"
                placeholder="Search outcomes, layers, or industries"
                defaultValue={sp.q ?? ""}
                className="bg-card/80 border-border/60 focus-visible:ring-lime-400"
              />
              {activeFilters.outcome ? <input type="hidden" name="outcome" value={activeFilters.outcome} /> : null}
              {activeFilters.fourC ? <input type="hidden" name="fourC" value={activeFilters.fourC} /> : null}
              {activeFilters.industry ? <input type="hidden" name="industry" value={activeFilters.industry} /> : null}
            </div>
            <Button type="submit" className="bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900">
              Search
            </Button>
          </form>

          <section className="space-y-6 mb-12">
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">Filter by Four-C layer</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant={activeFilters.fourC ? "outline" : "default"}
                  className={activeFilters.fourC ? "border-lime-400 text-lime-400" : "bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900"}
                >
                  <Link href={buildFilterHref(params, "fourC", undefined)}>All layers</Link>
                </Button>
                {filters.fourCs.map((fourC) => (
                  <Button
                    key={fourC}
                    asChild
                    variant="outline"
                    className={`border ${activeFilters.fourC === fourC ? FOUR_C_PILL[fourC as FourC] : "border-border/60"} hover:border-lime-400/80 transition`}
                  >
                    <Link href={buildFilterHref(params, "fourC", activeFilters.fourC === fourC ? undefined : fourC)}>{fourC}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">Outcome</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant={activeFilters.outcome ? "outline" : "default"}
                  className={activeFilters.outcome ? "border-lime-400 text-lime-400" : "bg-muted text-foreground"}
                >
                  <Link href={buildFilterHref(params, "outcome", undefined)}>All outcomes</Link>
                </Button>
                {filters.outcomes.map((outcome) => (
                  <Button
                    key={outcome}
                    asChild
                    variant="outline"
                    className={`border border-border/60 hover:border-emerald-400/80 transition ${
                      activeFilters.outcome === outcome ? "border-emerald-400 text-emerald-400" : ""
                    }`}
                  >
                    <Link href={buildFilterHref(params, "outcome", activeFilters.outcome === outcome ? undefined : outcome)}>
                      {outcome}
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
            {ordered.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-muted/30 border border-border/50 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-3">No playbooks match your filters yet</h3>
                <p className="text-muted-foreground mb-6">Reset the filters or get a custom audit and we will scope the next one for you.</p>
                <Button asChild className="bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900" size="lg">
                  <Link href="/audit">Get your free AIOS readiness audit</Link>
                </Button>
              </div>
            ) : (
              ordered.map((summary) => (
                <article
                  key={summary.slug}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-card/70 to-card/20 border border-border/40 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-lime-400/10"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-lime-400/10 to-emerald-400/10 rounded-2xl" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <span className={`px-3 py-1 rounded-full border font-semibold ${FOUR_C_PILL[summary.fourC as FourC] ?? "border-border/40"}`}>
                        {summary.fourC}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-muted/60 border border-border/40">{summary.outcome}</span>
                      {summary.industry ? (
                        <span className="px-3 py-1 rounded-full bg-muted/60 border border-border/40">{summary.industry}</span>
                      ) : null}
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
                        Read playbook
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
