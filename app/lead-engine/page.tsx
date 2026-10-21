import { SiteHeader } from "@/components/site-header"
import { ContactForm } from "@/components/contact-form"
import Link from "next/link"

import { GUARANTEE, PLANS, usd } from "@/lib/aios-offer"
import { buildMetadata } from "@/lib/seo"

// Campaign landing page for cold outreach. Intentionally NOT in the nav, footer,
// or sitemap, and noindex so it does not compete with the homepage in search.
// Only people who get the link (from the outreach emails) land here.
export const metadata = buildMetadata({
  site: "aios",
  path: "/lead-engine",
  title: "Every Lead Answered in 60 Seconds | AIOS",
  description:
    "A personal reply to every inbound lead in under 60 seconds, in your voice, with your booking link. Live in 7 days, backed by the 60-Second Guarantee.",
  robots: { index: false, follow: false },
})

const STEPS = [
  {
    n: "01",
    title: "Tell us about your leads",
    body: "Where they come from, roughly how many, and what happens to them today.",
  },
  {
    n: "02",
    title: "We build it in 7 days",
    body: "We capture your voice from real emails you have sent, connect your form or inbox and test on sample leads you approve.",
  },
  {
    n: "03",
    title: "Every lead answered",
    body: "Each new lead gets a personal reply in under 60 seconds, day or night. You get an alert with every reply sent.",
  },
]

export default function LeadEnginePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="relative px-6 py-16 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <section className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lime-400/20 to-emerald-400/20 border border-lime-400/40 text-sm font-semibold tracking-wider text-lime-400 uppercase shadow-lg">
              For agencies and consultants
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              Your next lead gets a reply in 60 seconds. Not 6 hours.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mt-6 leading-relaxed">
              A lead can arrive while your team is in meetings or client delivery. A clear first-response workflow
              removes avoidable delay and keeps the next step visible.
            </p>
            <p className="text-lg md:text-xl mt-4 font-semibold">
              We build and run a Lead Engine that replies to every new lead in your voice, with your booking link.
              From <span className="text-lime-400">{usd(PLANS[0].monthly)}/month</span>, and founding clients pay half
              the setup fee.
            </p>
          </section>

          {/* How it works */}
          <section className="mt-16 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="p-8 rounded-2xl bg-gradient-to-br from-card/60 to-card/20 border border-border/40"
              >
                <div className="text-lime-400 text-sm font-bold tracking-widest mb-2">STEP {s.n}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </section>

          {/* The offer + form */}
          <section className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">What you get</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {[
                  ...PLANS[0].features,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted-foreground border-t border-border/40 pt-6 leading-relaxed">
                {GUARANTEE.body}{" "}
                <Link href="/offer" className="text-lime-400 hover:underline">
                  See both plans
                </Link>
                .
              </p>
            </div>

            <div className="backdrop-blur-xl bg-card/50 border border-border/50 p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Tell us about your leads
              </h2>
              <ContactForm />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
