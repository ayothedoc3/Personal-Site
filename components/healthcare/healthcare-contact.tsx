import { HealthcareHeader } from "./healthcare-header"
import { HealthcareFooter } from "./healthcare-footer"
import { Breadcrumbs, PageHero } from "./ui"
import { HealthcareContactForm } from "./healthcare-contact-form"

export function HealthcareContact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />

      <main id="main-content" tabIndex={-1}>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <PageHero
            eyebrow="Contact"
            title="Discuss a healthcare AI project"
            intro="Tell us the workflow or product question you are trying to solve. We will review it and reply with the most useful next step."
          />

          <div className="mt-6 rounded-xl border border-border bg-muted/40 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
            Ayothedoc provides healthcare AI product and implementation services. It does not provide personal medical
            diagnosis, treatment or emergency services.
          </div>

          <div className="mt-10">
            <HealthcareContactForm />
          </div>
        </div>
      </section>

      </main>

      <HealthcareFooter />
    </div>
  )
}
