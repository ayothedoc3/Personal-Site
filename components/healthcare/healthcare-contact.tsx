import { HealthcareHeader } from "./healthcare-header"
import { HealthcareFooter } from "./healthcare-footer"
import { Breadcrumbs, PageHero } from "./ui"
import { HealthcareContactForm } from "./healthcare-contact-form"

export function HealthcareContact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <PageHero
            eyebrow="Contact"
            title="Discuss a healthcare technology project"
            intro="Tell us about your product, pilot or implementation and we will respond to discuss how we can help."
          />

          <div className="mt-6 rounded-xl border border-border bg-muted/40 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
            Ayothedoc provides healthcare technology product and implementation services. It does not provide personal
            medical diagnosis, treatment or emergency services.
          </div>

          <div className="mt-10">
            <HealthcareContactForm />
          </div>
        </div>
      </section>

      <HealthcareFooter />
    </div>
  )
}
