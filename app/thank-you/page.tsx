import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { LeadThankYou } from "@/components/lead-thank-you"
import { SiteHeader } from "@/components/site-header"
import { buildMetadata } from "@/lib/seo"
import { getSiteKey } from "@/lib/site.server"
import { sites } from "@/lib/site-config"

export async function generateMetadata() {
  const site = await getSiteKey()
  return buildMetadata({
    site,
    path: "/thank-you",
    title: site === "aios" ? "Request Received | AIOS" : "Healthcare AI Enquiry Received | Ayothedoc",
    description: "Confirmation that your enquiry has been received.",
    robots: { index: false, follow: false },
  })
}

export default async function ThankYouPage() {
  const site = await getSiteKey()

  if (site === "aios") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          <LeadThankYou
            site="aios"
            heading="Got it. Check your inbox."
            message="You should already have a reply from our own Lead Engine. Ayo will follow up within one business day with a fit check, the right plan and a start date."
            bookingUrl={process.env.AIOS_BOOKING_URL}
            contactEmail={sites.aios.contactEmail}
            nextHref="/offer"
            nextLabel="Review pricing and the guarantee"
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HealthcareHeader />
      <main id="main-content" tabIndex={-1}>
        <LeadThankYou
          site="healthcare"
          heading="Your healthcare AI enquiry has been received"
          message="We will review the use case, project stage and requested outcome, then reply with the most useful next step. This confirmation is not medical, regulatory or legal advice."
          bookingUrl={process.env.HEALTHCARE_BOOKING_URL}
          contactEmail={sites.healthcare.contactEmail}
          nextHref="/healthcare-ai-pilot-readiness"
          nextLabel="Review the Pilot Readiness Sprint"
        />
      </main>
      <HealthcareFooter />
    </div>
  )
}
