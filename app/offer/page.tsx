import type { Metadata } from "next"

import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { CheckoutLink } from "@/components/checkout-link"

export const metadata: Metadata = {
  title: "Plans & Pricing: Managed AI Operations | Ayothedoc",
  description:
    "Install your AI Operating System in 10 days, then run it on a monthly plan: Foundation $1,000, Operations $2,500, or Autonomous $5,000. Recover 40+ hours a month or we keep working free until you do.",
  alternates: {
    canonical: "/offer",
  },
  openGraph: {
    title: "Plans & Pricing: Managed AI Operations | Ayothedoc",
    description:
      "Install your AI Operating System in 10 days, then run it on a monthly plan. Recover 40+ hours a month or we keep working free until you do.",
    url: "https://ayothedoc.com/offer",
  },
}

export default function OfferPage() {
  // Stripe Payment Links (set in env). Empty values fall back to /contact via CheckoutLink.
  const installHref = process.env.NEXT_PUBLIC_STRIPE_SPRINT_LINK // one-time install ($7,500)
  const careHref = process.env.NEXT_PUBLIC_STRIPE_CARE_LINK // Lead Engine Care ($249/mo)
  const foundationHref = process.env.NEXT_PUBLIC_STRIPE_FOUNDATION_LINK
  const operationsHref = process.env.NEXT_PUBLIC_STRIPE_OPERATIONS_LINK
  const autonomousHref = process.env.NEXT_PUBLIC_STRIPE_AUTONOMOUS_LINK

  const tiers = [
    {
      name: "Foundation",
      price: "$1,000",
      cadence: "/mo",
      tagline: "The system in place. You drive it.",
      href: foundationHref,
      cta: "offer_tier_foundation",
      featured: false,
      features: [
        "AIOS installed + tools connected",
        "Context + voice trained on your business",
        "Up to 2 core automations live",
        "Monthly health check + fixes",
      ],
    },
    {
      name: "Operations",
      price: "$2,500",
      cadence: "/mo",
      tagline: "We run it and ship new leverage weekly.",
      href: operationsHref,
      cta: "offer_tier_operations",
      featured: true,
      features: [
        "Everything in Foundation",
        "One new automation shipped weekly",
        "Lead-to-follow-up engine (under 60s)",
        "Automated client reporting",
        "Priority support + monitoring",
      ],
    },
    {
      name: "Autonomous",
      price: "$5,000",
      cadence: "/mo",
      tagline: "A 24/7 AI ops layer across the business.",
      href: autonomousHref,
      cta: "offer_tier_autonomous",
      featured: false,
      features: [
        "Everything in Operations",
        "Agents running 24/7 on a schedule",
        "Multi-department coverage",
        "Dedicated strategist + same-day response",
        "Quarterly roadmap + KPI reviews",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />

      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <section className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lime-400/20 to-emerald-400/20 border border-lime-400/40 text-sm font-semibold tracking-wider text-lime-400 uppercase shadow-lg">
              For agencies &amp; consultants
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              Start free. Pay only once it works.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
              We build your 60-Second Lead Engine free as a pilot. If it books calls you would have missed, we
              install and run the rest of your AI operations. You never pay before you have seen it work.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href="/contact">
                <span className="inline-flex items-center justify-center bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 rounded-full px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-lime-400/25 transition-all duration-300 hover:scale-105 cursor-pointer">
                  Get your free Lead Engine
                </span>
              </Link>
            </div>
            <p className="mt-4 text-sm font-medium text-lime-400/90">
              We take a limited number of free builds each month, so each one gets done properly.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer to see it first?{" "}
              <Link href="/demo" className="text-lime-400 font-medium hover:underline">
                Watch it reply live
              </Link>
            </p>
          </section>

          {/* The path: makes the free-to-paid sequence explicit */}
          <section className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">How it goes, step by step</h2>
              <p className="text-muted-foreground mt-2">No surprises. Each step is a clear decision, and you only move up when you want to.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { n: "1", h: "Free pilot", s: "Your 60-Second Lead Engine, on one lead source, trained on your real replies. Live within 7 days. No card. Limited slots each month.", tag: "Free" },
                { n: "2", h: "Keep it running", s: "Optional. We host, monitor, and tune the engine as your offers change.", tag: "$249/mo" },
                { n: "3", h: "Full AIOS install", s: "One-time. We wire your whole stack and ship your first automations in 10 business days.", tag: "$7,500" },
                { n: "4", h: "Managed operations", s: "We run and expand the system on a monthly plan. Choose how much we run for you.", tag: "$1k–$5k/mo" },
              ].map((step) => (
                <div key={step.n} className="p-6 rounded-2xl bg-gradient-to-br from-card/70 to-card/20 border border-border/40 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 text-gray-900 font-bold flex items-center justify-center text-sm">{step.n}</div>
                    <span className="text-xs font-semibold text-lime-400">{step.tag}</span>
                  </div>
                  <h3 className="font-bold mt-4">{step.h}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">{step.s}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Start small: the bridge between the free build and the full install */}
          <section className="mt-16 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Start small · No install fee</div>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">Lead Engine Care: $249/mo</h2>
                <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                  Love your free Lead Engine but not ready for the full system? We keep it running for you: hosting,
                  monitoring, and monthly tuning so the replies stay sharp as your offers change. Cancel anytime, and
                  upgrade to a full plan whenever you&apos;re ready.
                </p>
              </div>
              <div className="shrink-0">
                <CheckoutLink
                  href={careHref}
                  label="Keep my engine running"
                  cta="offer_lead_engine_care"
                  className="bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500 rounded-full px-10"
                />
              </div>
            </div>
          </section>

          {/* The install step */}
          <section className="mt-16 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-card/70 to-card/20 border border-border/40">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Step 1 · One-time</div>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">AIOS Install Sprint: $7,500</h2>
                <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                  In 10 business days we wire up your tools, train the system on your business, and ship your
                  first working automations. You see recovered hours measured against your kickoff baseline.
                </p>
              </div>
              <div className="shrink-0">
                <CheckoutLink
                  href={installHref}
                  label="Book the Install"
                  cta="offer_install_sprint"
                  className="bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500 rounded-full px-10"
                />
              </div>
            </div>
          </section>

          {/* Monthly tiers */}
          <section className="mt-12">
            <div className="text-center mb-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Step 2 · Monthly</div>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Choose how much we run for you</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3 mt-10">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative p-8 rounded-2xl flex flex-col ${
                    tier.featured
                      ? "bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border-2 border-lime-400 md:scale-105 shadow-2xl shadow-lime-400/10"
                      : "bg-gradient-to-br from-card/70 to-card/20 border border-border/40"
                  }`}
                >
                  {tier.featured ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  ) : null}
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <div className="mt-2 mb-1">
                    <span className="text-4xl font-bold text-lime-400">{tier.price}</span>
                    <span className="text-base text-muted-foreground font-normal">{tier.cadence}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{tier.tagline}</p>
                  <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <CheckoutLink
                    href={tier.href}
                    label={`Choose ${tier.name}`}
                    cta={tier.cta}
                    variant={tier.featured ? "default" : "outline"}
                    className={
                      tier.featured
                        ? "w-full bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500 rounded-full font-semibold"
                        : "w-full border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 rounded-full font-semibold"
                    }
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8">
              Month-to-month. You own everything we build. Cancel anytime and keep the system.
            </p>
          </section>

          {/* Top tier: invite-only */}
          <section className="mt-12 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-foreground/[0.06] to-transparent border border-lime-400/30">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Top tier · By application</div>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">AIOS Partner</h2>
                <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                  For agencies that want their operations run end to end. We own your AI Operating System across
                  every department, ship against a weekly roadmap, and you get a direct line to me. Capped at a
                  handful of partners so each one gets real attention.
                </p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-2.5 text-sm text-muted-foreground max-w-2xl">
                  {[
                    "Everything in Autonomous",
                    "We run your operations end to end, across departments",
                    "Direct line to the founder, embedded in your team",
                    "Weekly roadmap + same-day response",
                    "Quarterly strategy + KPI ownership",
                    "Capped partner roster",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 text-center md:pt-1">
                <div className="text-sm text-muted-foreground mb-3">Invite-only</div>
                <Link href="/contact">
                  <span className="inline-flex items-center justify-center border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 rounded-full px-10 py-3 font-semibold cursor-pointer transition-all duration-300">
                    Apply for a partner slot
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* Guarantee */}
          <section className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold">The 40-hour guarantee</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                On the paid AIOS install and plans, here is exactly what we promise and how it is measured.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3 max-w-4xl mx-auto text-sm">
              <div className="p-5 rounded-2xl bg-card/50 border border-border/40">
                <div className="font-semibold text-lime-400">What counts</div>
                <p className="text-muted-foreground mt-2 leading-relaxed">The hours you and your team spend on the workflows we automate: lead replies, follow-ups, scheduling, reporting, onboarding. We agree the list at kickoff.</p>
              </div>
              <div className="p-5 rounded-2xl bg-card/50 border border-border/40">
                <div className="font-semibold text-lime-400">When it is measured</div>
                <p className="text-muted-foreground mt-2 leading-relaxed">We capture your baseline at kickoff, then measure recovered hours over the first 30 days after your system goes live.</p>
              </div>
              <div className="p-5 rounded-2xl bg-card/50 border border-border/40">
                <div className="font-semibold text-lime-400">If we miss it</div>
                <p className="text-muted-foreground mt-2 leading-relaxed">If you have not recovered at least 40 hours that month, we keep building and tuning at no extra charge until you do.</p>
              </div>
            </div>
          </section>

          {/* Works with your stack */}
          <section className="mt-14 text-center p-10 rounded-3xl bg-gradient-to-br from-card/60 to-card/20 border border-border/40">
            <h2 className="text-3xl md:text-4xl font-bold">Works with your stack</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Gmail, Outlook, HubSpot, Pipedrive, ClickUp, Asana, Slack, Google Workspace, Stripe, QuickBooks,
              Notion, and the rest of the tools you already run on.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact">
                <span className="inline-flex items-center justify-center bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500 rounded-full px-10 py-4 font-bold cursor-pointer transition-all duration-300 hover:scale-105">
                  Get your free Lead Engine
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
