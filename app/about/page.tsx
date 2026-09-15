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
      title: "About AIOS by Ayothedoc",
      description:
        "AIOS by Ayothedoc builds and runs AI operations systems for agencies, consultants and service businesses.",
    })
  }
  return buildMetadata({
    site: "healthcare",
    path: "/about",
    title: "About Ayothedoc | Healthcare Technology Implementation",
    description:
      "Ayothedoc is a healthcare technology implementation and clinical innovation practice, founded by physician-trained Ayokunle Ademola-John.",
  })
}

export default async function AboutPage() {
  const key = await getSiteKey()
  return key === "aios" ? <AiosAbout /> : <HealthcareAbout />
}
