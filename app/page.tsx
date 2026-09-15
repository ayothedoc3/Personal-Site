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
      title: "Managed AI Operations for Agencies | AIOS",
      description:
        "AIOS builds and manages connected lead-response and operations workflows for agencies and consultants, using your tools, rules and approved context.",
    })
  }
  return buildMetadata({
    site: "healthcare",
    path: "/",
    title: "Healthcare AI Consulting and Implementation | Ayothedoc",
    description:
      "Ayothedoc helps healthtech teams and healthcare organisations choose, design, prototype and implement practical AI systems for real workflows.",
  })
}

export default async function Page() {
  const key = await getSiteKey()
  return key === "aios" ? <AiosHome /> : <HealthcareHome />
}
