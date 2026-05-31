"use client"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { testimonials } from "@/data/testimonials"

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground overflow-hidden relative transition-colors duration-500">
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

      <main id="main-content" className="relative z-10">
        {/* Hero, visible by default (no JS dependency) for users and crawlers */}
        <section className="min-h-[88vh] flex items-center justify-center px-6 lg:px-12 pt-16">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block bg-card/30 backdrop-blur-xl px-4 py-2 rounded-full border border-border mb-8">
              <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">
                For agencies &amp; consultants
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              An enterprise AI team.
              <br />
              <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Without the enterprise headcount.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Most agencies lose deals to slow follow-up. We&apos;ll build you a system that replies to every new
              lead in under 60 seconds, personalized, in your voice, with your booking link, and we&apos;ll build
              the first one <strong className="text-foreground">free</strong>. Then we run the rest of your operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-14">
              <Link href="/contact">
                <Button
                  onClick={() => trackEvent("cta_click", { cta: "home_hero_free_engine", destination: "/contact" })}
                  className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-lime-400/50"
                >
                  Get Your Lead Engine Free
                </Button>
              </Link>
              <Link href="/offer">
                <Button
                  onClick={() => trackEvent("cta_click", { cta: "home_hero_pricing", destination: "/offer" })}
                  variant="outline"
                  className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 px-12 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-110"
                >
                  See Plans &amp; Pricing
                </Button>
              </Link>
            </div>

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
              You have 17 tools already. What you&apos;re missing is the layer that connects them and
              actually does the work, answering leads in seconds, onboarding clients, chasing follow-ups,
              and writing the reports nobody has time for. Hiring an operations manager costs $70–90k a year.
              A developer builds something, then disappears. Your business knowledge stays trapped in your head.
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

        {/* Pricing, the core offer */}
        <section id="pricing" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className={`max-w-6xl mx-auto ${reveal("pricing")}`}>
            <div className="text-center mb-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose the right level of AI operations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every engagement starts with a one-time install ($7,500, live in 10 business days). After
                that, we run and expand your system on a monthly plan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Foundation */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Foundation</h3>
                <div className="text-3xl font-bold text-lime-400 mb-1">$1,000<span className="text-base text-muted-foreground font-normal">/mo</span></div>
                <p className="text-sm text-muted-foreground mb-6">For owners who want the system in place and will drive it themselves.</p>
                <ul className="space-y-3 text-muted-foreground mb-8 flex-1">
                  <li>✓ AIOS installed + tools connected</li>
                  <li>✓ Context + voice trained on your business</li>
                  <li>✓ Up to 2 core automations live</li>
                  <li>✓ Monthly health check + fixes</li>
                </ul>
                <Link href="/offer">
                  <Button className="w-full bg-card border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 rounded-full font-semibold transition-all duration-300">
                    Start with Foundation
                  </Button>
                </Link>
              </div>

              {/* Operations, Most Popular */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border-2 border-lime-400 flex flex-col relative scale-105 shadow-2xl shadow-lime-400/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Operations</h3>
                <div className="text-3xl font-bold text-lime-400 mb-1">$2,500<span className="text-base text-muted-foreground font-normal">/mo</span></div>
                <p className="text-sm text-muted-foreground mb-6">We actively run your operations and ship new leverage every week.</p>
                <ul className="space-y-3 text-muted-foreground mb-8 flex-1">
                  <li>✓ Everything in Foundation</li>
                  <li>✓ One new automation shipped weekly</li>
                  <li>✓ Lead-to-follow-up engine (under 60s)</li>
                  <li>✓ Automated client reporting</li>
                  <li>✓ Priority support + monitoring</li>
                </ul>
                <Link href="/offer">
                  <Button className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                    Get Operations
                  </Button>
                </Link>
              </div>

              {/* Autonomous */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Autonomous</h3>
                <div className="text-3xl font-bold text-lime-400 mb-1">$5,000<span className="text-base text-muted-foreground font-normal">/mo</span></div>
                <p className="text-sm text-muted-foreground mb-6">A 24/7 AI operations layer running across your whole business.</p>
                <ul className="space-y-3 text-muted-foreground mb-8 flex-1">
                  <li>✓ Everything in Operations</li>
                  <li>✓ Agents running 24/7 on a schedule</li>
                  <li>✓ Multi-department coverage</li>
                  <li>✓ Dedicated strategist + same-day response</li>
                  <li>✓ Quarterly roadmap + KPI reviews</li>
                </ul>
                <Link href="/offer">
                  <Button className="w-full bg-card border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 rounded-full font-semibold transition-all duration-300">
                    Talk about Autonomous
                  </Button>
                </Link>
              </div>
            </div>

            <p className="text-center text-muted-foreground mt-10">
              Not sure where to start?{" "}
              <Link href="/contact" className="text-lime-400 font-semibold hover:underline">
                Get your Lead Engine built free
              </Link>{" "}
              and we&apos;ll recommend the right level.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className={`max-w-5xl mx-auto ${reveal("how")}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">From audit to autopilot in 30 days</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Audit", time: "Free · 10 minutes", body: "Score your AI readiness and surface the three highest-leverage automations for your business." },
                { step: "02", title: "Install", time: "10 business days", body: "We wire up your tools, train the system on your business, and ship your first working automations." },
                { step: "03", title: "Operate", time: "Ongoing", body: "We run it, monitor it, and ship new leverage on your plan, measured against your kickoff baseline." },
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Why teams trust us to run it</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                <h3 className="text-xl font-bold mb-3 text-lime-400">A baseline-backed guarantee</h3>
                <p className="text-muted-foreground leading-relaxed">We capture your manual-hours baseline at kickoff and measure against it. Recover 40+ hours a month or we keep working free until you do.</p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                <h3 className="text-xl font-bold mb-3 text-lime-400">You own everything</h3>
                <p className="text-muted-foreground leading-relaxed">The system, the automations, the documentation, all yours. No black boxes, no lock-in. Cancel anytime and keep what we built.</p>
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
                    account manager who hands it to someone junior. If it does not recover the hours we agreed on at
                    kickoff, I keep working until it does.&rdquo;
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
              {[
                { q: "Does this replace my team?", a: "No. It removes the repetitive work so your team does the work only humans should. Most clients redeploy recovered hours into sales and client delivery." },
                { q: "What happens if an automation breaks?", a: "We monitor every workflow and fix issues as part of your plan. You get alerts and a clear log of every run, no silent failures." },
                { q: "Who owns the system?", a: "You do. Every automation, prompt, and connection lives in your accounts. If you ever leave, you keep the entire system." },
                { q: "How fast until I see ROI?", a: "First automations are live within 10 business days. We measure recovered hours against your kickoff baseline over the following 30 days." },
                { q: "Do I need to be technical?", a: "Not at all. You bring the business context; we handle the build, the connections, and the running of it." },
              ].map((item) => (
                <details key={item.q} className="group p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-lime-400 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                  </summary>
                  <p className="text-muted-foreground leading-relaxed mt-4">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 lg:px-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 backdrop-blur-sm">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Stop losing leads to slow follow-up</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We&apos;ll build your 60-Second Lead Engine free, on your real leads, no card, no risk. If it books
                calls you&apos;d have missed, we talk about running the rest of your operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/contact">
                  <Button
                    onClick={() => trackEvent("cta_click", { cta: "home_final_free_engine", destination: "/contact" })}
                    className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-bold transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-lime-400/50"
                  >
                    Get Your Lead Engine Free
                  </Button>
                </Link>
                <Link href="/audit">
                  <Button
                    onClick={() => trackEvent("cta_click", { cta: "home_final_audit", destination: "/audit" })}
                    variant="outline"
                    className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 px-12 py-4 rounded-full text-lg font-bold transition-all duration-500 hover:scale-110"
                  >
                    Score my AI readiness
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
              <h3 className="text-2xl font-bold mb-4">Managed AI Operations for growing businesses</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h4 className="font-bold mb-4">Offer</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/audit" className="hover:text-lime-400">Free AI Readiness Audit</Link></li>
                  <li><Link href="/offer" className="hover:text-lime-400">Plans &amp; Pricing</Link></li>
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
          </div>
        </footer>
      </main>
    </div>
  )
}
