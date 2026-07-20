import type { Metadata } from "next"
import { getSiteKey } from "@/lib/site.server"
import { sites } from "@/lib/site-config"
import { HealthcareContact } from "@/components/healthcare/healthcare-contact"
import AiosContact from "@/components/aios/aios-contact"

export async function generateMetadata(): Promise<Metadata> {
  const key = await getSiteKey()
  if (key === "aios") {
    return {
      title: "Contact AIOS by Ayothedoc",
      description: "Discuss AI operations and automation for your agency, consultancy or service business.",
      alternates: { canonical: `${sites.aios.url}/contact` },
    }
  }
  return {
    title: "Contact | Discuss a Healthcare Technology Project | Ayothedoc",
    description:
      "Discuss a healthcare technology product, pilot or implementation with Ayothedoc. We do not provide personal medical diagnosis, treatment or emergency services.",
    alternates: { canonical: `${sites.healthcare.url}/contact` },
  }
}

export default async function ContactPage() {
  const key = await getSiteKey()
  return key === "aios" ? <AiosContact /> : <HealthcareContact />
}
