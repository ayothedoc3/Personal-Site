import { getSiteKey } from "@/lib/site.server"
import { buildMetadata } from "@/lib/seo"
import { HealthcareAbout } from "@/components/healthcare/healthcare-about"
import AiosAbout from "@/components/aios/aios-about"

export async function generateMetadata() {
  const key = await getSiteKey()
  if (key === "aios") {
    return buildMetadata({
      site: "aios",
      path: "/about",
      title: "About AIOS | Managed AI Operations",
      description:
        "Meet the owner-led practice that builds, monitors and improves AI operations workflows for agencies, consultants and service businesses.",
    })
  }
  return buildMetadata({
    site: "healthcare",
    path: "/about",
    title: "About Ayothedoc | Healthcare AI Delivery",
    description:
      "Ayothedoc is a healthcare AI design and implementation practice led by technical project manager and agentic AI practitioner Ayokunle Ademola-John.",
  })
}

export default async function AboutPage() {
  const key = await getSiteKey()
  return key === "aios" ? <AiosAbout /> : <HealthcareAbout />
}
