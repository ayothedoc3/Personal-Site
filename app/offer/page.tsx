import type { Metadata } from "next"

import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { CheckoutLink } from "@/components/checkout-link"

export const metadata: Metadata = {
  title: "Agency Ops Engine | Ayothedoc",
  description:
    "Productized automation for marketing + web/dev agencies. Buy a roadmap, sprint, or care plan—lead-to-reporting installed fast.",
  alternates: {
    canonical: "/offer",
  },
  openGraph: {
    title: "Agency Ops Engine | Ayothedoc",
    description:
      "Productized automation for marketing + web/dev agencies. Buy a roadmap, sprint, or care plan—lead-to-reporting installed fast.",
    url: "https://ayothedoc.com/offer",
  },
}

export default function OfferPage() {
  const roadmapHref = process.env.NEXT_PUBLIC_STRIPE_ROADMAP_LINK
  const sprintHref = process.env.NEXT_PUBLIC_STRIPE_SPRINT_LINK
  const careHref = process.env.NEXT_PUBLIC_STRIPE_CARE_LINK

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />

      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <section className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-lime-400/20 to-emerald-400/20 border border-lime-400/40 text-sm font-semibold tracking-wider text-lime-400 uppercase shadow-lg">
              Agency Ops Engine
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6">
              Productized automation for marketing + web/dev agencies
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
              Install a repeatable system for lead intake, onboarding, delivery, reporting, and retention—without hiring
              another ops person.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <CheckoutLink
                href={sprintHref}
                label="Buy Ops Sprint — from $7,500"
                cta="offer_hero_buy_sprint"
                className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 rounded-full px-10 py-6 text-lg font-bold shadow-2xl hover:shadow-lime-400/25 transition-all duration-300 hover:scale-105"
              />
              <CheckoutLink
                href={roadmapHref}
                label="Buy Roadmap — $499"
                cta="offer_hero_buy_roadmap"
                variant="outline"
                className="rounded-full px-10 py-6 text-lg font-bold border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 transition-all duration-300 hover:scale-105"
              />
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Pay securely via Stripe. Prefer to talk first?{" "}
              <Link
                href="https://calendly.com/ayothedoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:underline"
              >
                Book a 15 minute fit call
              </Link>
              .
            </p>
          </section>

          <section className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-card/70 to-card/20 border border-border/40 hover:border-lime-400/50 transition-all duration-300">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Roadmap</div>
              <h2 className="text-2xl font-semibold mt-3">Automation Audit + Build Plan</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                A scoped plan you can execute internally—or hand to us as a Sprint.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>Prioritized workflow map + quick wins</li>
                <li>Tool-by-tool implementation steps</li>
                <li>ROI estimate and timeline</li>
                <li>48–72h delivery</li>
              </ul>
              <div className="mt-8">
                <CheckoutLink
                  href={roadmapHref}
                  label="Buy Roadmap — $499"
                  cta="offer_card_buy_roadmap"
                  className="w-full bg-muted text-foreground hover:bg-muted/80"
                />
              </div>
            </div>

            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 hover:border-lime-400/60 transition-all duration-300">
              <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Most popular</div>
              <h2 className="text-2xl font-semibold mt-3">Agency Ops Sprint</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                We install 4–6 automations end-to-end, train your team, and ship SOPs.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>Lead routing + follow-ups + booked calls</li>
                <li>Onboarding: contract, invoice, kickoff</li>
                <li>Delivery: PM templates + status updates</li>
                <li>Reporting: dashboards + client reports</li>
              </ul>
              <div className="mt-8">
                <CheckoutLink
                  href={sprintHref}
                  label="Buy Ops Sprint — from $7,500"
                  cta="offer_card_buy_sprint"
                  className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500"
                />
              </div>
            </div>

            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-card/70 to-card/20 border border-border/40 hover:border-cyan-400/50 transition-all duration-300">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Recurring</div>
              <h2 className="text-2xl font-semibold mt-3">Ops Care Plan</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Monitoring, fixes, and continuous improvements so your systems don’t rot.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>Bug fixes + incident response</li>
                <li>Monthly improvement hours</li>
                <li>Reporting + KPI review</li>
                <li>Tool changes handled</li>
              </ul>
              <div className="mt-8">
                <CheckoutLink
                  href={careHref}
                  label="Start Care — from $1,500/mo"
                  cta="offer_card_buy_care"
                  className="w-full"
                />
              </div>
            </div>
          </section>

          <section className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Track A: Lead-to-Booked",
                items: ["Forms → CRM", "Routing + scoring", "Instant follow-up", "Calendar + reminders"],
              },
              {
                title: "Track B: Onboarding-to-Delivery",
                items: ["Proposal/contract", "Invoice/payment", "Kickoff automation", "PM templates + updates"],
              },
              {
                title: "Track C: Reporting-to-Retention",
                items: ["Dashboards", "Client reporting", "Alerts + QA", "Renewal + QBR reminders"],
              },
            ].map((track) => (
              <div
                key={track.title}
                className="p-8 rounded-2xl bg-gradient-to-br from-card/60 to-card/20 border border-border/40"
              >
                <h3 className="text-lg font-semibold">{track.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {track.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mt-14 text-center p-10 rounded-3xl bg-gradient-to-br from-card/60 to-card/20 border border-border/40">
            <h2 className="text-3xl md:text-4xl font-bold">Works with your stack</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              HubSpot, Pipedrive, ClickUp, Asana, Slack, Google Workspace, Stripe, QuickBooks, Notion, Zapier, Make.com,
              n8n—bring what you use.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <CheckoutLink
                href={sprintHref}
                label="Buy Ops Sprint"
                cta="offer_bottom_buy_sprint"
                className="bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500 rounded-full px-10"
              />
              <CheckoutLink
                href={roadmapHref}
                label="Start with Roadmap"
                cta="offer_bottom_buy_roadmap"
                variant="outline"
                className="rounded-full px-10 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

