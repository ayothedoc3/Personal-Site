import type { Metadata } from "next"
import Link from "next/link"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { caseStudies } from "@/lib/case-studies"
import { sites } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Ayokunle Ademola-John | Healthcare Technology Product & Implementation",
  description:
    "Physician-trained healthcare technology product and implementation professional. Medical devices, digital health, clinical workflows, robotics adoption and AI systems.",
  alternates: { canonical: `${sites.healthcare.url}/ayo` },
}

const capabilities = [
  "Healthcare technology implementation",
  "Clinical workflow mapping",
  "Product requirements",
  "Medical-device implementation planning",
  "Digital health",
  "Healthcare interoperability",
  "FHIR",
  "Robotics adoption",
  "Human factors",
  "Responsible AI",
  "Technical project delivery",
  "Cross-functional leadership",
]

const interests = [
  "Medical technology implementation",
  "Healthcare and rehabilitation robotics",
  "Connected healthcare systems",
  "Healthcare interoperability",
  "Responsible healthcare AI",
  "African healthcare technology",
]

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ayokunle Ademola-John",
  jobTitle: "Healthcare Technology Product & Implementation Professional",
  url: `${sites.healthcare.url}/ayo`,
  sameAs: ["https://www.linkedin.com/in/ayokunle-ademola-john"],
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

      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-400">
          Professional profile
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
          Physician-Trained Healthcare Technology Product &amp; Implementation Professional
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Medical Devices &middot; Digital Health &middot; Clinical Workflows &middot; Robotics Adoption &middot; AI Systems
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#selected-work"
            className="inline-flex items-center rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
          >
            View Selected Work
          </a>
          <a
            href="mailto:hello@ayothedoc.com?subject=Professional%20opportunity"
            className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Discuss a Professional Opportunity
          </a>
        </div>

        {/* Summary */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">Professional summary</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Physician-trained professional working at the intersection of medicine, product and implementation. I help
            healthcare technology move from concept to practical adoption by connecting clinical needs, product
            decisions and technical delivery. My work spans medical devices, digital health, interoperability, robotics
            adoption and responsible AI.
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
            {caseStudies.map((c) => (
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
          <h2 className="text-xl font-semibold tracking-tight">Healthcare technology interests</h2>
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
            <li>Doctor of Medicine (MD)</li>
            <li>Postgraduate public-health training</li>
          </ul>
        </section>

        <section className="mt-12 rounded-xl border border-border bg-muted/40 p-6">
          <h2 className="text-base font-semibold">Professional contact</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            For roles, collaborations and professional opportunities, email{" "}
            <a href="mailto:hello@ayothedoc.com" className="text-teal-700 dark:text-teal-400 hover:underline">
              hello@ayothedoc.com
            </a>{" "}
            or connect on{" "}
            <a href="https://www.linkedin.com/in/ayokunle-ademola-john" className="text-teal-700 dark:text-teal-400 hover:underline">
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
