import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, XCircle } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { TrackedLink } from "@/components/tracked-link"
import { FOUNDING_SPOTS, GUARANTEE, PLANS, TERMS_SUMMARY, usd } from "@/lib/aios-offer"
import { buildMetadata } from "@/lib/seo"
import { faqPageJsonLd, type FaqEntry } from "@/lib/structured-data"

export const metadata = buildMetadata({
  site: "aios",
  path: "/offer",
  title: "Pricing: 60-Second Lead Engine for Agencies | AIOS",
  description:
    "Every inbound lead gets a personal reply in under 60 seconds, in your voice, with your booking link. From $750/month. Backed by the 60-Second Guarantee.",
})

const steps = [
  {
    n: "01",
    title: "15-minute fit call",
    body: "We look at where your leads come from, what you say to them today and where they should book.",
  },
  {
    n: "02",
    title: "We build it",
    body: "We capture your voice from real emails you have sent, connect your form or inbox and test it on sample leads you approve.",
  },
  {
    n: "03",
    title: "Live in 7 days",
    body: "Email replies go live within 7 days of kickoff. We monitor every lead and send you a monthly response-time report.",
  },
]

const goodFit = [
  "You run a US agency, consultancy or service business",
  "Real leads already come in through a form, inbox or ads",
  "Your team sometimes takes hours to reply, or replies after hours",
  "You want replies that sound like you, not a chatbot",
]

const notFit = [
  "You don't get inbound leads yet (we don't do cold outreach)",
  "You want a website chatbot",
  "You want to text people who never opted in",
]

const faqs: FaqEntry[] = [
  {
    question: "Why does a 60-second reply matter?",
    answer:
      "The lead is still on your site, still thinking about the problem and often filling in a competitor's form next. A personal reply with a booking link while they are still there is the easiest win in your funnel.",
  },
  {
    question: "Will it sound like a bot?",
    answer:
      "No. We build the voice from real emails you have written, and every reply references what the lead actually asked. You approve sample replies before anything goes live, and you get a copy of every reply that goes out.",
  },
  {
    question: "How does the 60-Second Guarantee work?",
    answer: `${GUARANTEE.body} The timer starts when your form or inbox hands the lead to us.`,
  },
  {
    question: "How do text messages work?",
    answer:
      "On Lead Engine Pro, leads who tick an SMS consent box on your form get a text reply too. US carriers require your business to be registered for business texting first (A2P 10DLC). We handle the paperwork with your EIN. Approval usually takes 1 to 3 weeks, and email replies run in the meantime. Carrier registration fees (about $50 one time) are passed through at cost.",
  },
  {
    question: "What happens when a lead replies or books?",
    answer:
      "Replies go straight to your inbox, so the conversation is yours. On Pro, follow-ups stop automatically the moment the lead books on your calendar or texts back, and every alert email has a one-click link to stop them yourself.",
  },
  {
    question: "Is there a contract?",
    answer:
      "There's a 3-month minimum so we can tune the voice and prove the numbers, then it's month to month. Cancel with 30 days' notice and you keep your prompts, reply templates and lead data.",
  },
  {
    question: "What is the founding-client rate?",
    answer: `The first ${FOUNDING_SPOTS} clients pay half the setup fee. In return, you agree to a short case study with your real response-time and booking numbers after 60 days.`,
  },
]

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqs)) }}
      />
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <section className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-lime-400">
              Pricing
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Every new lead answered in under 60 seconds. In your voice.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              The 60-Second Lead Engine replies to every inbound lead with a personal message and your booking link,
              day or night, then tells you exactly what it sent. Done for you, monitored by a real person.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-5 py-2.5 text-sm font-semibold text-emerald-300">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              {GUARANTEE.short}
            </div>
          </section>

          <section className="mt-16 grid gap-6 lg:grid-cols-2" aria-label="Plans">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border p-8 md:p-10 ${
                  plan.highlight
                    ? "border-lime-400/60 bg-gradient-to-br from-lime-400/10 to-emerald-400/5 shadow-2xl shadow-lime-400/10"
                    : "border-border/60 bg-card/50"
                }`}
              >
                {plan.highlight ? (
                  <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900">
                    Most popular
                  </span>
                ) : null}
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="mt-2 text-muted-foreground">{plan.tagline}</p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-5xl font-bold">{usd(plan.monthly)}</span>
                  <span className="pb-1.5 text-muted-foreground">/month</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  + {usd(plan.setup)} one-time setup{" "}
                  <span className="font-semibold text-lime-400">
                    ({usd(plan.foundingSetup)} for founding clients)
                  </span>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-400" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <TrackedLink
                  href="/contact"
                  eventParams={{ site: "aios", cta: `offer_plan_${plan.id}`, destination: "/contact" }}
                  className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold transition hover:scale-[1.02] ${
                    plan.highlight
                      ? "bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500"
                      : "border border-lime-400/50 text-foreground hover:bg-lime-400/10"
                  }`}
                >
                  Get started with {plan.name}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </TrackedLink>
              </div>
            ))}
          </section>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {TERMS_SUMMARY.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden />
                {item}
              </span>
            ))}
          </div>

          <section className="mt-16 rounded-3xl border border-lime-400/30 bg-gradient-to-br from-lime-400/10 to-emerald-400/5 p-8 md:p-12">
            <div className="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-start">
              <ShieldCheck className="h-10 w-10 shrink-0 text-lime-400" aria-hidden />
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">{GUARANTEE.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{GUARANTEE.body}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Full terms on the{" "}
                  <Link href="/refund" className="text-lime-400 hover:underline">
                    refund and cancellation page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 rounded-3xl border border-border/60 bg-card/50 p-8 md:p-12">
            <div className="mx-auto max-w-4xl">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">
                Founding-client rate
              </div>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                Half-price setup for the first {FOUNDING_SPOTS} clients
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                We are opening the Lead Engine to a small group of US agencies first. Founding clients pay 50% of the
                setup fee. In return, after 60 days you share your real response-time and booking numbers in a short
                case study. Same system, same guarantee.
              </p>
            </div>
          </section>

          <section className="mt-20">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">How it works</div>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">From first call to live in 7 days</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.n} className="rounded-2xl border border-border/50 bg-card/50 p-7">
                  <div className="text-sm font-bold tracking-widest text-lime-400">STEP {step.n}</div>
                  <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden />
              Text replies on Pro switch on once US carrier registration clears, usually 1 to 3 weeks.
            </p>
          </section>

          <section className="mt-20 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/[0.06] p-8">
              <h2 className="text-2xl font-bold">Built for you if</h2>
              <ul className="mt-6 space-y-4">
                {goodFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border/50 bg-card/40 p-8">
              <h2 className="text-2xl font-bold">Not the right fit if</h2>
              <ul className="mt-6 space-y-4">
                {notFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Common questions</h2>
            </div>
            <div className="mt-10 space-y-4">
              {faqs.map((item) => (
                <details key={item.question} className="group rounded-2xl border border-border/50 bg-card/50 p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {item.question}
                    <span className="text-2xl leading-none text-lime-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-20 rounded-3xl border border-lime-400/30 bg-card/50 p-10 text-center md:p-14">
            <h2 className="text-3xl font-bold md:text-4xl">Stop losing leads to slow replies</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Tell us where your leads come from. We will reply within one business day with a fit check and a start
              date.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TrackedLink
                href="/contact"
                eventParams={{ site: "aios", cta: "offer_final_start", destination: "/contact" }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 px-10 py-4 font-bold text-gray-900 transition hover:scale-105"
              >
                Get started
                <ArrowRight className="h-5 w-5" aria-hidden />
              </TrackedLink>
              <Link href="/demo" className="font-medium text-lime-400 hover:underline">
                Try the live demo first
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
