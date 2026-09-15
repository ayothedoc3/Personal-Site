import { getSiteKey } from "@/lib/site.server"
import { buildMetadata } from "@/lib/seo"
import AiosHome from "@/components/aios/aios-home"
import { HealthcareHome } from "@/components/healthcare/healthcare-home"

export async function generateMetadata() {
  const key = await getSiteKey()
  if (key === "aios") {
    return buildMetadata({
      site: "aios",
      path: "/",
      title: "Managed AI Operations for Agencies & Consultants | AIOS by Ayothedoc",
      description:
        "AIOS by Ayothedoc installs and runs your company's AI Operating System, wired into your tools and trained on your business. Live in 10 days.",
    })
  }
  return buildMetadata({
    site: "healthcare",
    path: "/",
    title: "Healthcare Technology Implementation & Clinical Innovation | Ayothedoc",
    description:
      "Ayothedoc helps healthtech, medical-device and healthcare organisations design, implement and scale technology for real clinical and operational workflows.",
  })
}

export default async function Page() {
  const key = await getSiteKey()
  return key === "aios" ? <AiosHome /> : <HealthcareHome />
}
