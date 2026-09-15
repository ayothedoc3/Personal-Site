import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { Breadcrumbs, PageHero } from "@/components/healthcare/ui"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "healthcare",
  path: "/medical-disclaimer",
  title: "Medical Disclaimer | Healthcare AI | Ayothedoc",
  description:
    "Ayothedoc provides healthcare technology consulting. It does not provide individual medical advice, diagnosis, treatment or emergency services.",
})

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Medical Disclaimer" }]} />
          <PageHero eyebrow="Legal" title="Medical disclaimer" />
          <div className="mt-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              This website provides information about healthcare technology product and implementation consulting
              services provided by Ayothedoc.
            </p>
            <p>Ayothedoc does not provide individual medical advice, diagnosis or treatment.</p>
            <p>The information on this website is not a substitute for medical care.</p>
            <p>
              For personal medical needs, please contact a qualified healthcare professional. In an emergency, use your
              local emergency services.
            </p>
          </div>
        </div>
      </section>

      </main>

      <HealthcareFooter />
    </div>
  )
}
