import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free AI Readiness Audit | Ayothedoc",
  description:
    "A personalized read on where AI can run your operations, scored across the Four Cs and sent to your inbox. Free, takes a couple of minutes.",
  alternates: { canonical: "/audit" },
}

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
