import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HealthcareHeader } from "./healthcare-header"
import { HealthcareFooter } from "./healthcare-footer"
import { audiences, methodSteps, pillars, primaryCta, secondaryCta } from "@/lib/healthcare-content"
import { verifiedCaseStudies } from "@/lib/case-studies"

const problems = [
  "Poor workflow fit",
  "Unclear requirements",
  "Insufficient user involvement",
  "Weak implementation planning",
  "Fragmented integrations",
  "Inadequate training",
  "Low adoption",
  "Unmanaged safety and operational risks",
]

const differentiators = [
  "Medical training",
  "Public-health perspective",
  "Product development",
  "Technical implementation",
  "Workflow analysis",
  "Cross-functional delivery",
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
      <HealthcareHeader />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Healthcare Technology Implementation &amp; Clinical Innovation</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Healthcare technology that works in the real world
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Ayothedoc helps healthtech companies, medical-device businesses and healthcare organisations design,
              introduce, integrate and scale technology that fits real clinical and operational environments.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for organisations introducing technology into healthcare
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
              Healthcare technology fails when implementation is treated as an afterthought
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Good technology can still fail in a healthcare setting. The common causes are rarely the technology
              itself.
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
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Four ways we work</h2>
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

      {/* Differentiation */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Clinical understanding combined with practical technology delivery
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We combine medical understanding, public-health insight, product delivery and technical
                implementation to help healthcare technology move from concept to practical adoption.
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
                From healthcare need to practical implementation
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
                  Accurately labelled, from pilots to implementation studies
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

      {/* Closing CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="rounded-2xl border border-border bg-card px-8 py-14 text-center">
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
              Planning a healthcare technology product, pilot or implementation?
            </h2>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HealthcareFooter />
    </div>
  )
}
