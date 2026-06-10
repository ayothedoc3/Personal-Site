import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Your Free 60-Second Lead Engine | Ayothedoc",
  description:
    "Tell us about your business and we build you a system that replies to every new lead in under 60 seconds, in your voice, with your booking link. First build free.",
  alternates: { canonical: "/contact" },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
