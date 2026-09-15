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
      title: "Contact AIOS by Ayothedoc",
      description: "Discuss AI operations and automation for your agency, consultancy or service business.",
    })
  }
  return buildMetadata({
    site: "healthcare",
    path: "/contact",
    title: "Contact | Discuss a Healthcare Technology Project | Ayothedoc",
    description:
      "Discuss a healthcare technology product, pilot or implementation with Ayothedoc. We do not provide personal medical diagnosis, treatment or emergency services.",
  })
}

export default async function ContactPage() {
  const key = await getSiteKey()
  return key === "aios" ? <AiosContact /> : <HealthcareContact />
}
