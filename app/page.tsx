import type { Metadata } from "next"
import { getSiteKey } from "@/lib/site.server"
import { sites } from "@/lib/site-config"
import AiosHome from "@/components/aios/aios-home"
import { HealthcareHome } from "@/components/healthcare/healthcare-home"

export async function generateMetadata(): Promise<Metadata> {
  const key = await getSiteKey()
  if (key === "aios") {
    return {
      title: "Managed AI Operations for Agencies & Consultants | AIOS by Ayothedoc",
      description:
        "AIOS by Ayothedoc installs and runs your company's AI Operating System, wired into your tools and trained on your business. Live in 10 days.",
      alternates: { canonical: `${sites.aios.url}/` },
    }
  }
  return {
    title: "Healthcare Technology Implementation & Clinical Innovation | Ayothedoc",
    description:
      "Ayothedoc helps healthtech companies, medical-device businesses and healthcare organisations design, implement and scale technology that fits real clinical and operational workflows.",
    alternates: { canonical: `${sites.healthcare.url}/` },
  }
}

export default async function Page() {
  const key = await getSiteKey()
  return key === "aios" ? <AiosHome /> : <HealthcareHome />
}
