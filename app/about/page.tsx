import type { Metadata } from "next"
import { getSiteKey } from "@/lib/site.server"
import { sites } from "@/lib/site-config"
import { HealthcareAbout } from "@/components/healthcare/healthcare-about"
import AiosAbout from "@/components/aios/aios-about"

export async function generateMetadata(): Promise<Metadata> {
  const key = await getSiteKey()
  if (key === "aios") {
    return {
      title: "About AIOS by Ayothedoc",
      description:
        "AIOS by Ayothedoc builds and runs AI operations systems for agencies, consultants and service businesses.",
      alternates: { canonical: `${sites.aios.url}/about` },
    }
  }
  return {
    title: "About Ayothedoc | Healthcare Technology Implementation",
    description:
      "Ayothedoc is a healthcare technology implementation and clinical innovation practice, founded by physician-trained Ayokunle Ademola-John.",
    alternates: { canonical: `${sites.healthcare.url}/about` },
  }
}

export default async function AboutPage() {
  const key = await getSiteKey()
  return key === "aios" ? <AiosAbout /> : <HealthcareAbout />
}
