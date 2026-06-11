import type { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { DemoClient } from "@/components/demo-client"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Live Demo: Watch the 60-Second Lead Engine Reply | Ayothedoc",
  description:
    "Play the lead. Type an enquiry and watch the Lead Engine draft a personalized reply in front of you, the same system that answers our own leads in seconds.",
  alternates: { canonical: "/demo" },
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />

      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <section className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lime-400/20 to-emerald-400/20 border border-lime-400/40 text-sm font-semibold tracking-wider text-lime-400 uppercase shadow-lg">
              Live demo, no signup
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              Don&apos;t take our word for it. <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">Watch it reply.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mt-6 leading-relaxed">
              This is the same engine that answers our own leads. Type an enquiry as if you were a prospect, and watch
              it draft the reply a real lead would get: personalized, on-voice, with a booking link.
            </p>
          </section>

          {/* The interactive demo */}
          <DemoClient />

          {/* Honest proof: we run our own */}
          <section className="mt-20 max-w-3xl mx-auto">
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">We run our own. Here are the numbers.</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every enquiry on this site&apos;s contact form is answered by the same Lead Engine we build for clients.
                No human in the loop for the first reply, day or night.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-background/60 border border-border/40 p-5">
                  <div className="text-3xl font-bold text-lime-400">7.8s</div>
                  <div className="text-xs text-muted-foreground mt-1">full loop in a timed test: lead in, personalized reply sent, owner alerted (June 11, 2026)</div>
                </div>
                <div className="rounded-xl bg-background/60 border border-border/40 p-5">
                  <div className="text-3xl font-bold text-lime-400">24/7</div>
                  <div className="text-xs text-muted-foreground mt-1">runs while we sleep, weekends and 2am enquiries included</div>
                </div>
                <div className="rounded-xl bg-background/60 border border-border/40 p-5">
                  <div className="text-3xl font-bold text-lime-400">100%</div>
                  <div className="text-xs text-muted-foreground mt-1">of inbound leads get a personal first reply, none sit unanswered</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Want to verify? Use the <Link href="/contact" className="text-lime-400 hover:underline">contact form</Link>{" "}
                and time the reply yourself.
              </p>
            </div>
          </section>

          {/* Guarantee + CTA */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get this on your real leads, free</h2>
            <p className="text-muted-foreground text-lg mb-2 max-w-2xl mx-auto">
              We build your first Lead Engine free: your voice, your booking link, your real leads. No card, no risk.
            </p>
            <p className="text-sm font-semibold text-lime-400 mb-8">
              And when you move to a plan: recover 40+ hours a month or we keep working free until you do.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-lime-400/50">
                Get Your Lead Engine Free
              </Button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}
