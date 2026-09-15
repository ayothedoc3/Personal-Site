import Link from "next/link"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { verifiedCaseStudies } from "@/lib/case-studies"
import { sites } from "@/lib/site-config"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "healthcare",
  path: "/ayo",
  title: "Ayokunle Ademola-John | Healthcare AI Delivery",
  description:
    "Technical project manager and agentic AI practitioner working on healthcare AI products, workflows, prototypes and responsible implementation.",
})

const capabilities = [
  "Healthcare AI readiness",
  "Clinical workflow mapping",
  "AI product requirements",
  "Agentic AI systems",
  "MCP servers",
  "Agent-to-agent orchestration",
  "AI workflow automation",
  "Evaluation and human oversight",
  "Technical project delivery",
  "Cross-functional leadership",
]

const interests = [
  "Agentic AI in healthcare",
  "Healthcare knowledge systems",
  "Clinical data minimisation",
  "Human-supervised automation",
  "Responsible AI product design",
  "Healthcare AI in African markets",
]

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ayokunle Ademola-John",
  jobTitle: "Technical Project Manager and Agentic AI Practitioner",
  url: `${sites.healthcare.url}/ayo`,
  sameAs: ["https://www.linkedin.com/in/ayothedoc"],
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />

      {/* Minimal professional header, deliberately separate from the sales nav */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 lg:px-8">
          <span className="text-sm font-medium text-foreground">Ayokunle Ademola-John</span>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Ayothedoc &rarr;
          </Link>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-400">
          Professional profile
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
          Technical Project Manager and Agentic AI Practitioner
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Healthcare AI &middot; Agentic Systems &middot; Product Delivery &middot; Workflow Implementation
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:hello@ayothedoc.com?subject=Professional%20opportunity"
            className="inline-flex items-center rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
          >
            Discuss a Professional Opportunity
          </a>
          <a href="#selected-work" className="inline-flex items-center px-2 py-3 text-sm text-teal-700 dark:text-teal-400 hover:underline">
            View selected work
          </a>
        </div>

        {/* Summary */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Professional summary</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            I design and deliver agentic AI products and workflows, with a focus on healthcare use cases that need clear
            product requirements, human oversight and practical implementation. My work connects domain context,
            technical architecture and cross-functional delivery.
          </p>
        </section>

        {/* Capabilities */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Core capabilities</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {capabilities.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground">
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Selected work */}
        <section id="selected-work" className="mt-12 scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight">Selected projects</h2>
          <p className="mt-2 text-sm text-muted-foreground">What I personally owned, designed or coordinated.</p>
          <div className="mt-5 space-y-4">
            {verifiedCaseStudies().map((c) => (
              <div key={c.slug} className="rounded-xl border border-border bg-card p-6">
                <span className="inline-flex rounded-full border border-teal-600/40 bg-teal-600/10 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-400">
                  {c.status}
                </span>
                <h3 className="mt-3 font-medium text-foreground">{c.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
                <p className="mt-2 text-sm text-muted-foreground"><span className="text-foreground">Role:</span> {c.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Current interests</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {interests.map((i) => (
              <span key={i} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground">
                {i}
              </span>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Education</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Master of Public Health, Lithuanian Sports University, completed June 2026</li>
            <li>Doctor of Medicine, Caucasus International University, 2018</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Speaking</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Presented at PyCon Estonia 2025 on demystifying AI and machine learning for real-world use.
          </p>
        </section>

        <section className="mt-12 rounded-xl border border-border bg-muted/40 p-6">
          <h2 className="text-base font-semibold">Professional contact</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            For roles, collaborations and professional opportunities, email{" "}
            <a href="mailto:hello@ayothedoc.com" className="text-teal-700 dark:text-teal-400 hover:underline">
              hello@ayothedoc.com
            </a>{" "}
            or connect on{" "}
            <a href="https://www.linkedin.com/in/ayothedoc" className="text-teal-700 dark:text-teal-400 hover:underline">
              LinkedIn
            </a>
            .
          </p>
        </section>
      </main>

      <HealthcareFooter />
    </div>
  )
}
