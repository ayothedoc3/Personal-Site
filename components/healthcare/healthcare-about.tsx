import Link from "next/link"
import { HealthcareHeader } from "./healthcare-header"
import { HealthcareFooter } from "./healthcare-footer"
import { Breadcrumbs, CTASection, Eyebrow, PageHero } from "./ui"

const howWeWork = [
  { title: "Medical understanding", body: "We start from the clinical and operational reality, not the technology." },
  { title: "Public-health perspective", body: "We consider systems, populations and how technology performs at scale." },
  { title: "Product delivery", body: "We turn needs into clear requirements, pilots and implementable plans." },
  { title: "Technical implementation", body: "We coordinate integrations, testing, training and adoption." },
]

const capabilities = [
  "Healthcare technology implementation",
  "Clinical workflow mapping",
  "Product requirements",
  "Medical-device implementation planning",
  "Digital health and interoperability",
  "Responsible healthcare AI",
]

export function HealthcareAbout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <PageHero
            eyebrow="About"
            title="Clinical understanding, combined with practical technology delivery"
            intro="Ayothedoc is a healthcare technology implementation and clinical innovation practice. We help healthcare technology move from concept to practical, measured adoption."
          />
        </div>
      </section>

      {/* Founder */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border bg-card p-7">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-teal-600 text-xl font-semibold text-white">
                  AA
                </div>
                <h2 className="mt-4 text-lg font-semibold">Ayokunle Ademola-John</h2>
                <p className="mt-1 text-sm text-muted-foreground">Founder</p>
                <Link
                  href="/ayo"
                  className="mt-5 inline-flex text-sm text-teal-700 dark:text-teal-400 hover:underline"
                >
                  View professional profile
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Eyebrow>Founder</Eyebrow>
              <p className="mt-4 text-lg text-foreground leading-relaxed">
                Ayokunle Ademola-John is a physician-trained healthcare technology product and implementation
                professional. His work combines medical understanding, public-health insight, technical product
                delivery and implementation leadership.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                  Physician-trained, with a Doctor of Medicine degree
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                  Postgraduate public-health training
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                  Experience in technology product delivery, automation, integrations and implementation
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                  Focused on connecting clinical needs, product decisions and practical implementation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">How we work</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {howWeWork.map((h) => (
              <div key={h.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-medium text-foreground">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">Where we focus</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {capabilities.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Want to talk through a project?" label="Discuss a Healthcare Technology Project" />
      <HealthcareFooter />
    </div>
  )
}
