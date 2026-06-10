import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How It Works | Managed AI Operations | Ayothedoc",
  description:
    "How we install and run your AI Operating System: the Four Cs (Context, Connections, Capabilities, Cadence) that take the repetitive work off your plate.",
  alternates: { canonical: "/services" },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
