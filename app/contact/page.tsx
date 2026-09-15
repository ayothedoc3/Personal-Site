import { getSiteKey } from "@/lib/site.server"
import { buildMetadata } from "@/lib/seo"
import { HealthcareContact } from "@/components/healthcare/healthcare-contact"
import AiosContact from "@/components/aios/aios-contact"

export async function generateMetadata() {
  const key = await getSiteKey()
  if (key === "aios") {
    return buildMetadata({
      site: "aios",
      path: "/contact",
      title: "Request a Free Lead Engine | AIOS",
      description: "Request a free, scoped lead-response workflow for your agency or consulting firm. No card required; scope and success criteria are agreed first.",
    })
  }
  return buildMetadata({
    site: "healthcare",
    path: "/contact",
    title: "Discuss a Healthcare AI Project | Ayothedoc",
    description:
      "Tell Ayothedoc about a healthcare AI workflow, product, prototype or readiness question. Start with a focused project discussion.",
  })
}

export default async function ContactPage() {
  const key = await getSiteKey()
  return key === "aios" ? <AiosContact /> : <HealthcareContact />
}
