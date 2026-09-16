import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { DemoClient } from "@/components/demo-client"
import { DemoVideo } from "@/components/demo-video"
import { Button } from "@/components/ui/button"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "aios",
  path: "/demo",
  title: "60-Second Lead Engine Demo | AIOS",
  description:
    "Enter a sample agency enquiry and inspect the sandboxed Lead Engine draft, subject line, booking link and elapsed drafting time. No signup required.",
})

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="relative px-6 py-16 lg:px-12">
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
              Enter an enquiry as if you were a prospect and inspect the sandboxed draft: a tailored first response
              based on the details you provide, with a clear next step and booking link.
            </p>
          </section>

          {/* Rendered walkthrough video */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-card/40">
              <DemoVideo />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3">
              The full loop, start to finish: a lead comes in, gets a personalized reply, and you get alerted. Prefer to
              try it yourself? Use the live version below.
            </p>
          </section>

          {/* The interactive demo */}
          <DemoClient />

          {/* Verifiable proof: the visitor can run the workflow themselves. */}
          <section className="mt-20 max-w-3xl mx-auto">
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Test the workflow, not a marketing claim</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The interactive demo above lets you submit a realistic enquiry and inspect the draft it produces. It is
                a sandbox, so it does not email the draft or store the enquiry.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-background/60 border border-border/40 p-5">
                  <div className="text-xl font-bold text-lime-400">Interactive</div>
                  <div className="text-xs text-muted-foreground mt-1">Use your own example or load the clearly labelled sample enquiry.</div>
                </div>
                <div className="rounded-xl bg-background/60 border border-border/40 p-5">
                  <div className="text-xl font-bold text-lime-400">Visible</div>
                  <div className="text-xs text-muted-foreground mt-1">Review the generated subject, reply and elapsed drafting time yourself.</div>
                </div>
                <div className="rounded-xl bg-background/60 border border-border/40 p-5">
                  <div className="text-xl font-bold text-lime-400">Sandboxed</div>
                  <div className="text-xs text-muted-foreground mt-1">The demonstration drafts only. It does not send email or create a lead record.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Guarantee + CTA */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get this on your real leads, free</h2>
            <p className="text-muted-foreground text-lg mb-2 max-w-2xl mx-auto">
              We build your first scoped Lead Engine free: approved voice examples, your booking rules and one agreed
              lead source. No card is required.
            </p>
            <p className="text-sm font-semibold text-lime-400 mb-8">
              Paid work is measured against a baseline agreed at kickoff.{" "}
              <Link href="/offer" className="hover:underline">Review the pilot scope and success criteria</Link>.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-lime-400/50">
                Apply for the Free Pilot
              </Button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}
