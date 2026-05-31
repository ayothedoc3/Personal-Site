import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { ContactForm } from "@/components/contact-form"

// Campaign landing page for cold outreach. Intentionally NOT in the nav, footer,
// or sitemap, and noindex so it does not compete with the homepage in search.
// Only people who get the link (from the outreach emails) land here.
export const metadata: Metadata = {
  title: "Your free 60-Second Lead Engine | Ayothedoc",
  description:
    "We build you a system that replies to every new lead in under 60 seconds, personalized, in your voice, with your booking link. The first one is free, on your real leads.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/lead-engine" },
}

const STEPS = [
  {
    n: "01",
    title: "You send us your business",
    body: "Fill in the short form. We learn your voice, your offer, and where your leads come in.",
  },
  {
    n: "02",
    title: "We build it, free",
    body: "We wire a system that replies to every new lead in under 60 seconds and pings you instantly. No card, no call required.",
  },
  {
    n: "03",
    title: "You watch it work",
    body: "It runs on your real leads. If it books calls you would have missed, we talk about running the rest of your operations.",
  },
]

export default function LeadEnginePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />

      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <section className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lime-400/20 to-emerald-400/20 border border-lime-400/40 text-sm font-semibold tracking-wider text-lime-400 uppercase shadow-lg">
              For agencies and consultants
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              Leads going cold while you&apos;re in meetings?
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mt-6 leading-relaxed">
              Most agencies lose deals not on price but on speed. A lead fills out your form, and by the time someone
              replies hours later they have booked with whoever answered first.
            </p>
            <p className="text-lg md:text-xl mt-4 font-semibold">
              We build you a system that replies to every new lead in under 60 seconds, personalized, in your voice,
              with your booking link. We build the first one <span className="text-lime-400">free</span>, on your real
              leads.
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
              <h2 className="text-3xl md:text-4xl font-bold">What you get, free</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {[
                  "Replies to every new lead in under 60 seconds",
                  "Personalized and written in your voice",
                  "Your booking link built into every reply",
                  "An instant alert to you on every new lead",
                  "Built and run on your real leads, no card required",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted-foreground border-t border-border/40 pt-6 leading-relaxed">
                No strings. If the Lead Engine books calls you would have missed, we talk about running the rest of your
                operations. If it does not, you keep what we built and we part as friends.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-card/50 border border-border/50 p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Get your Lead Engine built free
              </h2>
              <ContactForm />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
