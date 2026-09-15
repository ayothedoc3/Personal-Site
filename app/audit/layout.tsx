import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "aios",
  path: "/audit",
  title: "Free AI Readiness Audit | Ayothedoc",
  description:
    "A personalized read on where AI can run your operations, scored across the Four Cs and sent to your inbox. Free, takes a couple of minutes.",
})

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
