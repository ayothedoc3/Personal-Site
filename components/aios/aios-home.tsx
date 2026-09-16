"use client"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { testimonials } from "@/data/testimonials"
import { faqPageJsonLd, type FaqEntry } from "@/lib/structured-data"

const HOME_FAQS: FaqEntry[] = [
  {
    question: "Does this replace my team?",
    answer:
      "No. It removes repetitive work so your team can focus on sales, client delivery, and decisions that need people.",
  },
  {
    question: "What happens if an automation breaks?",
    answer:
      "The pilot includes visible failure handling, alerts and a human escalation path. Any ongoing monitoring and repair responsibilities are stated explicitly in a separate managed scope if you continue.",
  },
  {
    question: "Who owns the system?",
    answer:
      "You do. Every automation, prompt, and connection lives in your accounts. If you ever leave, you keep the entire system.",
  },
  {
    question: "How fast until the pilot is live?",
    answer:
      "The timeline is confirmed after the fit check because it depends on the lead source, integration, approved reply examples and access. The delivery clock does not start until those prerequisites are documented and available.",
  },
  {
    question: "Do I need to be technical?",
    answer:
      "No. You bring the business context. We handle the build, connections, monitoring, and ongoing operation.",
  },
]

export default function Home() {
  const [visibleSections, setVisibleSections] = useState(new Set<string>())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    })
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  }, [])

  const handleMouseDown = useCallback(() => {
    document.body.classList.remove("keyboard-navigation")
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("mousedown", handleMouseDown)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [handleMouseMove, handleKeyDown, handleMouseDown])

  const reveal = (id: string) =>
    `transition-all duration-1000 ${visibleSections.has(id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground overflow-x-clip relative transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(HOME_FAQS)) }}
      />
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-lime-400/10 to-emerald-400/5 rounded-full blur-3xl animate-pulse transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }}
        ></div>
        <div
          className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-tr from-lime-400/8 to-cyan-400/4 rounded-full blur-3xl animate-pulse delay-1000 transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * 0.015}px)` }}
        ></div>
      </div>

      {/* Header */}
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="relative z-10">
        {/* Hero, visible by default (no JS dependency) for users and crawlers */}
        <section className="min-h-[88vh] flex items-center justify-center px-6 lg:px-12 pt-16">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block bg-card/30 backdrop-blur-xl px-4 py-2 rounded-full border border-border mb-8">
              <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">
                For agencies &amp; consultants
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Give each qualified inbound lead
              <br />
              <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                a clear next step.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Start with one inbound source and a workflow designed to reply to eligible leads against a 60-second
              target, using your approved context, booking rules and human handoff. The scoped pilot starts{" "}
              <strong className="text-foreground">free</strong>, then you decide whether to expand.
            </p>

            <div className="flex justify-center items-center mb-6">
              <Link href="/contact">
                <Button
                  onClick={() => trackEvent("cta_click", { cta: "home_hero_free_engine", destination: "/contact" })}
                  className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-lime-400/50"
                >
                  Apply for the Free Pilot
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground mb-14">
              Want to see it first?{" "}
              <Link
                href="/demo"
                onClick={() => trackEvent("cta_click", { cta: "home_hero_demo", destination: "/demo" })}
                className="font-medium text-lime-400 hover:underline"
              >
                Watch the live demo
              </Link>
              .
            </p>

            <p className="text-sm text-muted-foreground -mt-8 mb-14">
              Application-based. Fit, scope, access and written success criteria are agreed before a pilot begins.
            </p>

            <p className="text-muted-foreground mb-6">Plugs into the tools you already run on</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-70 text-lg font-semibold">
              <span>Gmail</span>
              <span>Slack</span>
              <span>HubSpot</span>
              <span>Notion</span>
              <span>Google Workspace</span>
              <span>Stripe</span>
              <span>Claude</span>
            </div>
          </div>
        </section>

        {/* Problem framing */}
        <section id="problem" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className={`max-w-4xl mx-auto text-center ${reveal("problem")}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">You don&apos;t have a tools problem.</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              You may already have an inbox, CRM, calendar and project tools. What is often missing is a reliable
              operating layer connecting the rules, context, handoffs and monitoring around them. A one-off build
              still leaves someone responsible for ownership, failure handling and improvement.
            </p>
            <p className="text-xl font-semibold">
              An AI Operating System fixes that, and we build it, run it, and keep improving it for you.
            </p>
          </div>
        </section>

        {/* What we run for you, the Four Cs */}
        <section id="pillars" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className={`max-w-6xl mx-auto ${reveal("pillars")}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What we run for you</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every AI Operating System we install is built on four layers. We set them up, then operate
                them so the system keeps working while you don&apos;t.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Context",
                  body: "Your business, your voice, your priorities, captured so the system answers like your best teammate, not a stranger.",
                },
                {
                  title: "Connections",
                  body: "Wired into your inbox, CRM, calendar, docs, and billing so it works from live data, never copy-paste.",
                },
                {
                  title: "Capabilities",
                  body: "Done-for-you workflows that draft, route, summarize, and report, your SOPs turned into reliable automations.",
                },
                {
                  title: "Cadence",
                  body: "Runs on a schedule while your laptop is closed. Briefs land, follow-ups send, reports ship, unprompted.",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10"
                >
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-lime-400 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* One clear entry offer */}
        <section id="pricing" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className={`max-w-6xl mx-auto ${reveal("pricing")}`}>
            <div className="text-center mb-12">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">One clear starting point</div>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Test one real lead-response handoff</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The free pilot is deliberately narrow: one inbound source, approved replies, booking and routing
                rules, human handoff, alerts and a written scorecard. Validate the workflow first, then choose whether
                a broader managed AIOS engagement is justified.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { title: "Apply", body: "Share the lead source, current process, approximate volume and who owns the response." },
                { title: "Validate", body: "Test the scoped workflow against agreed timing, content, routing, handoff and failure criteria." },
                { title: "Decide", body: "Review the findings and continue only if a wider managed system is worth the investment." },
              ].map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-border/50 bg-card/50 p-8">
                  <div className="text-sm font-bold tracking-widest text-lime-400">0{index + 1}</div>
                  <h3 className="mt-3 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <Link href="/contact">
                <Button className="rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 px-10 py-4 text-lg font-bold text-gray-900 hover:from-lime-500 hover:to-emerald-500">
                  Apply for the Free Pilot
                </Button>
              </Link>
              <Link href="/offer" className="text-sm font-medium text-lime-400 hover:underline">
                Review the complete scope and fit criteria
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className={`max-w-5xl mx-auto ${reveal("how")}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">From application to an evidence-based decision</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Fit check", time: "Application review", body: "Confirm that a real inbound source, approved replies, access and an accountable human owner are available." },
                { step: "02", title: "Pilot", time: "Timeline agreed before build", body: "Configure one scoped response and handoff path, then inspect it against the written pilot scorecard." },
                { step: "03", title: "Decision", time: "No automatic upgrade", body: "Review observed performance and choose whether to stop, keep the workflow focused or scope managed operations." },
              ].map((s) => (
                <div key={s.step} className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                  <div className="text-lime-400 text-sm font-bold tracking-widest mb-2">STEP {s.step}</div>
                  <h3 className="text-2xl font-bold mb-1">{s.title}</h3>
                  <div className="text-sm text-muted-foreground mb-4">{s.time}</div>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us / trust, honest signals, no fabricated testimonials */}
        <section id="trust" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className={`max-w-6xl mx-auto ${reveal("trust")}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why the pilot is lower risk</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                <h3 className="text-xl font-bold mb-3 text-lime-400">Success criteria first</h3>
                <p className="text-muted-foreground leading-relaxed">Eligible leads, timing, required reply content, routing, human handoff and failure handling are written down before the build starts.</p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                <h3 className="text-xl font-bold mb-3 text-lime-400">You own everything</h3>
                <p className="text-muted-foreground leading-relaxed">You receive the workflow findings and handover notes. Any paid continuation is separately scoped and never automatic.</p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                <h3 className="text-xl font-bold mb-3 text-lime-400">Boring is beautiful</h3>
                <p className="text-muted-foreground leading-relaxed">We use the least AI necessary and the simplest reliable workflow. Fewer moving parts, fewer failures, systems you can actually trust.</p>
              </div>
            </div>

            {/* Founder note: honest, owner-led trust signal (no fabricated proof) */}
            <div className="mt-12 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 flex items-center justify-center text-gray-900 text-2xl font-bold shadow-lg">
                  A
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg md:text-xl leading-relaxed">
                    &ldquo;I design and run every system myself. You work directly with the person doing the build, not an
                    account manager who hands it to someone junior. We agree what the workflow must do and how it will
                    be measured before the build starts.&rdquo;
                  </p>
                  <div className="mt-4 font-semibold">
                    Ayo
                    <span className="text-muted-foreground font-normal">, founder of Ayothedoc</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real testimonials render here automatically once data/testimonials.ts has entries. */}
            {testimonials.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50"
                  >
                    {t.result ? <div className="text-lime-400 font-bold mb-3">{t.result}</div> : null}
                    <p className="text-muted-foreground mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <div className="font-semibold">
                      {t.name}
                      <span className="text-muted-foreground font-normal">, {t.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className={`max-w-3xl mx-auto ${reveal("faq")}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Common questions</h2>
            </div>
            <div className="space-y-4">
              {HOME_FAQS.map((item) => (
                <details key={item.question} className="group p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex justify-between items-center">
                    {item.question}
                    <span className="text-lime-400 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                  </summary>
                  <p className="text-muted-foreground leading-relaxed mt-4">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 lg:px-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 backdrop-blur-sm">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Stop leaving qualified enquiries waiting</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Apply for a scoped 60-Second Lead Response Pilot on one agreed inbound source. Review it against
                written technical criteria, then choose whether a broader system makes sense.
              </p>
              <div className="flex justify-center items-center">
                <Link href="/contact">
                  <Button
                    onClick={() => trackEvent("cta_click", { cta: "home_final_free_engine", destination: "/contact" })}
                    className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-bold transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-lime-400/50"
                  >
                    Apply for the Free Pilot
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 lg:px-12 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Managed AI Operations for agencies and consultants</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h4 className="font-bold mb-4">Offer</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/audit" className="hover:text-lime-400">Free AI Readiness Audit</Link></li>
                  <li><Link href="/offer" className="hover:text-lime-400">Free Lead Response Pilot</Link></li>
                  <li><Link href="/services" className="hover:text-lime-400">What we install</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/about" className="hover:text-lime-400">About</Link></li>
                  <li><Link href="/contact" className="hover:text-lime-400">Contact</Link></li>
                  <li><Link href="/automation" className="hover:text-lime-400">Automation Library</Link></li>
                  <li><Link href="/blog" className="hover:text-lime-400">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/terms" className="hover:text-lime-400">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="hover:text-lime-400">Privacy Policy</Link></li>
                  <li><Link href="/refund" className="hover:text-lime-400">Refund &amp; Cancellation</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
              AIOS is an AI operations and automation service by Ayothedoc.{" "}
              <a href="https://ayothedoc.com/about" className="underline hover:text-lime-400">
                About Ayothedoc
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
