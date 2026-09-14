import type { Metadata } from "next"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, CTASection, Eyebrow, PageHero } from "@/components/healthcare/ui"
import { DeidentifyClient } from "@/components/healthcare/deidentify-client"
import { sites, siteSocialImages } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "On-Device Clinical De-identification Demo | Ayothedoc",
  description:
    "Remove protected health information from clinical text entirely in your browser, nothing uploaded. A demonstration of on-device de-identification.",
  alternates: { canonical: `${sites.healthcare.url}/tools/de-identify` },
  openGraph: {
    title: "On-Device Clinical De-identification Demo | Ayothedoc",
    description: "Remove PHI from clinical text entirely in your browser. Nothing uploaded.",
    url: `${sites.healthcare.url}/tools/de-identify`,
    images: [siteSocialImages.healthcare],
  },
}

const production = [
  "Full clinical NER models, not just pattern matching, running on your own infrastructure (on-prem, air-gapped, or mobile).",
  "Coverage of the 18 HIPAA Safe Harbor identifiers with configurable confidence thresholds.",
  "Format-preserving synthetic replacement, date shifting, and consistent pseudonymisation.",
  "Governance: audit reports, redaction previews, and human review on low-confidence spans.",
  "Validation against your own documents before anything goes live.",
]

export default function DeidentifyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "De-identify" }]} />
          <PageHero
            eyebrow="On-device demo"
            title="De-identify clinical text, on your device"
            intro="Paste a clinical note and watch protected health information get removed, entirely in your browser. Nothing is uploaded, nothing leaves your machine."
          />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <DeidentifyClient />
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>How this demo works</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">Processing stays on the device</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A pattern layer runs instantly and locally on the text you paste, catching structured identifiers
                like SSNs, dates, and phone numbers with no API call and no server round-trip. You can optionally
                enable an in-browser AI model (a one-time download) to catch names it misses by context. Either way,
                sensitive clinical text never leaves the device.
              </p>
            </div>
            <div>
              <Eyebrow>In a real engagement</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">What we implement for clients</h2>
              <ul className="mt-4 space-y-2.5">
                {production.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Need on-device de-identification in your product or hospital?"
        label="Discuss an On-Device De-identification Project"
      />

      </main>

      <HealthcareFooter />
    </div>
  )
}
