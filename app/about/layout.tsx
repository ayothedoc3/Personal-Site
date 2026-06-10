import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Ayothedoc | Managed AI Operations",
  description:
    "Ayothedoc installs and runs your company's AI Operating System, owner-led, hands-on, and measured against a baseline. Direct access to the person who builds it.",
  alternates: { canonical: "/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
