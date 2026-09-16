import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HealthcareHeader } from "./healthcare-header"
import { HealthcareFooter } from "./healthcare-footer"
import { audiences, healthcareFaqs, methodSteps, pillars, primaryCta } from "@/lib/healthcare-content"
import { verifiedCaseStudies } from "@/lib/case-studies"
import { faqPageJsonLd } from "@/lib/structured-data"
import { TrackedLink } from "@/components/tracked-link"

const problems = [
  "AI ideas with no use-case priority",
  "Workflows and owners left undefined",
  "Data and integrations not ready",
  "Human review added too late",
  "Demos mistaken for production systems",
  "Evaluation criteria missing",
  "Failure paths not designed",
  "No monitoring or adoption plan",
]

const differentiators = [
  "Healthcare workflow context",
  "Public-health systems thinking",
  "Agentic AI delivery",
  "Product and technical project leadership",
  "Human-oversight design",
  "Rapid, testable prototyping",
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-400">
      {children}
    </div>
  )
}

export function HealthcareHome() {
  const work = verifiedCaseStudies()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(healthcareFaqs)) }}
      />
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Healthcare AI Design &amp; Implementation</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Practical AI systems for real healthcare workflows
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Ayothedoc helps healthtech teams and healthcare organisations choose, design, prototype and implement
              focused AI workflows with human oversight, privacy and clear acceptance criteria.
            </p>
            <div className="mt-9">
              <TrackedLink
                href={primaryCta.href}
                eventParams={{ site: "healthcare", cta: "home_hero_project", destination: primaryCta.href }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship entry offer */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 rounded-2xl border border-teal-600/40 bg-card p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-10">
            <div>
              <Eyebrow>Focused entry engagement</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Healthcare AI Pilot Readiness Sprint
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                Turn one healthcare AI use case into a decision-ready pilot plan with the workflow, data needs, human
                oversight, risks, evaluation criteria and implementation path made explicit.
              </p>
              <TrackedLink
                href="/healthcare-ai-pilot-readiness"
                eventParams={{ site: "healthcare", cta: "home_readiness_sprint", destination: "/healthcare-ai-pilot-readiness" }}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                Review the complete sprint
                <ArrowRight className="h-4 w-4" aria-hidden />
              </TrackedLink>
            </div>
            <ul className="grid gap-3 text-sm text-muted-foreground">
              {[
                "One defined use case",
                "Seven-part decision pack",
                "Five-business-day target after complete kickoff inputs",
                "Scope-completion commitment on agreed deliverables",
              ].map((item) => (
                <li key={item} className="rounded-lg border border-border bg-background px-4 py-3.5">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for teams putting AI into healthcare products and operations
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <Link
                key={a.slug}
                href={`/who-we-help/${a.slug}`}
                className="group rounded-xl border border-border bg-card p-6 hover:border-teal-500/60 transition-colors"
              >
                <a.icon className="h-6 w-6 text-teal-700 dark:text-teal-400" aria-hidden />
                <h3 className="mt-4 font-medium text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-teal-700 dark:text-teal-400">
                  Learn more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Healthcare AI fails when the workflow is treated as an afterthought
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A capable model is not a complete system. Useful healthcare AI also needs the right problem, data path,
              integrations, review points, failure handling and evidence.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p) => (
              <li key={p} className="rounded-lg border border-border bg-card px-4 py-3.5 text-sm text-foreground">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Service pillars */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <Eyebrow>Solutions</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Four healthcare AI services</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {pillars.map((p) => (
              <Link
                key={p.slug}
                href={`/solutions/${p.slug}`}
                className="group rounded-xl border border-border bg-card p-7 hover:border-teal-500/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <p.icon className="h-7 w-7 text-teal-700 dark:text-teal-400" aria-hidden />
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground transition-all" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-medium text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.positioning}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* On-device tool teaser */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <Link
            href="/tools/de-identify"
            className="group flex flex-col gap-4 rounded-2xl border border-teal-600/40 bg-card p-7 sm:flex-row sm:items-center sm:justify-between hover:border-teal-500 transition-colors"
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-400">
                Try it
              </div>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                On-device clinical de-identification demo
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
                Paste clinical text and review common identifiers masked entirely in your browser. The pasted text is
                not uploaded.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white group-hover:bg-teal-700 transition-colors">
              Open the demo <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </div>
      </section>

      {/* Differentiation */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Healthcare context combined with hands-on AI delivery
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ayothedoc connects healthcare workflow understanding, public-health thinking, agentic AI and technical
                project delivery. The goal is not an AI slide deck. It is a system or plan your team can inspect, test
                and move forward responsibly.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {differentiators.map((d) => (
                <li key={d} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600" aria-hidden />
                  <span className="text-sm text-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Method preview */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Method</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                From healthcare need to evaluated AI workflow
              </h2>
            </div>
            <Link href="/method" className="text-sm text-teal-700 dark:text-teal-400 hover:underline">
              See the full method
            </Link>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {methodSteps.map((s) => (
              <li key={s.n} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-teal-600 text-xs font-semibold text-white">
                    {s.n}
                  </span>
                  <s.icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                </div>
                <h3 className="mt-3 font-medium text-foreground">{s.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Selected work (only verified case studies are shown) */}
      {work.length > 0 ? (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Selected work</Eyebrow>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Real prototypes and public demonstrations
                </h2>
              </div>
              <Link href="/case-studies" className="text-sm text-teal-700 dark:text-teal-400 hover:underline">
                View case studies
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {work.slice(0, 3).map((w) => (
                <Link
                  key={w.slug}
                  href={`/case-studies/${w.slug}`}
                  className="rounded-xl border border-border bg-card p-6 hover:border-teal-500/60 transition-colors"
                >
                  <span className="inline-flex rounded-full border border-teal-600/40 bg-teal-600/10 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-400">
                    {w.status}
                  </span>
                  <h3 className="mt-4 font-medium text-foreground">{w.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <Eyebrow>Frequently asked questions</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            What a healthcare AI engagement involves
          </h2>
          <div className="mt-10 space-y-4">
            {healthcareFaqs.map((item) => (
              <details key={item.question} className="rounded-xl border border-border bg-card p-6">
                <summary className="cursor-pointer font-medium text-foreground">{item.question}</summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="rounded-2xl border border-border bg-card px-8 py-14 text-center">
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
              Need a decision-ready plan for one healthcare AI use case?
            </h2>
            <div className="mt-8">
              <TrackedLink
                href="/healthcare-ai-pilot-readiness"
                eventParams={{ site: "healthcare", cta: "home_final_readiness_sprint", destination: "/healthcare-ai-pilot-readiness" }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
              >
                Start with the Pilot Readiness Sprint
                <ArrowRight className="h-4 w-4" aria-hidden />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      </main>

      <HealthcareFooter />
    </div>
  )
}
