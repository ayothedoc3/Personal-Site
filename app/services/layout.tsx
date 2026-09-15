import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "aios",
  path: "/services",
  title: "Managed AI Operations Services | AIOS",
  description:
    "How we install and run your AI Operating System: the Four Cs (Context, Connections, Capabilities, Cadence) that take the repetitive work off your plate.",
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
