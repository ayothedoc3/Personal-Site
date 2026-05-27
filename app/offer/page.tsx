import type { Metadata } from "next"

import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { CheckoutLink } from "@/components/checkout-link"

export const metadata: Metadata = {
  title: "Plans & Pricing: Managed AI Operations | Ayothedoc",
  description:
    "Install your AI Operating System in 10 days, then run it on a monthly plan: Foundation $1,000, Operations $2,500, or Autonomous $5,000. Recover 40+ hours a month or you don't pay.",
  alternates: {
    canonical: "/offer",
  },
  openGraph: {
    title: "Plans & Pricing: Managed AI Operations | Ayothedoc",
    description:
      "Install your AI Operating System in 10 days, then run it on a monthly plan. Recover 40+ hours a month or you don't pay.",
    url: "https://ayothedoc.com/offer",
  },
}

export default function OfferPage() {
  // Stripe Payment Links (set in env). Empty values fall back to /contact via CheckoutLink.
  const installHref = process.env.NEXT_PUBLIC_STRIPE_SPRINT_LINK // one-time install ($7,500)
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
              Plans &amp; Pricing
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              Install once. Then we run your AI operations.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
              Every engagement starts with a one-time install, your AI Operating System wired into your tools
              and live in 10 business days. After that, we operate and expand it on a monthly plan.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/audit">
                <span className="inline-flex items-center justify-center bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 rounded-full px-10 py-4 text-lg font-bold shadow-2xl hover:shadow-lime-400/25 transition-all duration-300 hover:scale-105 cursor-pointer">
                  Start with the Free Audit
                </span>
              </Link>
              <Link
                href="https://calendly.com/ayothedoc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-bold border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                Book a 15-min fit call
              </Link>
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

          {/* Guarantee */}
          <section className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30">
            <h2 className="text-3xl md:text-4xl font-bold">The 40-hour guarantee</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
              We capture your manual-hours baseline at kickoff and measure against it. If your AI Operating
              System doesn&apos;t recover 40+ hours a month, we keep working free until it does.
            </p>
          </section>

          {/* Works with your stack */}
          <section className="mt-14 text-center p-10 rounded-3xl bg-gradient-to-br from-card/60 to-card/20 border border-border/40">
            <h2 className="text-3xl md:text-4xl font-bold">Works with your stack</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Gmail, Outlook, HubSpot, Pipedrive, ClickUp, Asana, Slack, Google Workspace, Stripe, QuickBooks,
              Notion, Zapier, Make.com, n8n, bring what you already use.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/audit">
                <span className="inline-flex items-center justify-center bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500 rounded-full px-10 py-4 font-bold cursor-pointer transition-all duration-300 hover:scale-105">
                  Get Your Free AI Readiness Audit
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
