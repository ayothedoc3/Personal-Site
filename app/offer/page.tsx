import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck, XCircle } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { TrackedLink } from "@/components/tracked-link"
import { buildMetadata } from "@/lib/seo"
import { faqPageJsonLd, type FaqEntry } from "@/lib/structured-data"

export const metadata = buildMetadata({
  site: "aios",
  path: "/offer",
  title: "Free Lead Response Pilot for Agencies | AIOS",
  description:
    "Apply for a free, scoped lead-response pilot on one agreed lead source. Validate the workflow against written technical criteria before deciding whether to expand.",
})

const valueStack = [
  "Current lead-response workflow review",
  "One agreed inbound lead source",
  "Eligible-lead and exclusion rules",
  "Approved business context and reply examples",
  "Booking, routing and human-handoff rules",
  "Alerts and visible failure handling",
  "A written pilot scorecard and handover notes",
]

const goodFit = [
  "You run an agency or consulting business with a clear offer",
  "Genuine enquiries already arrive through a form, inbox or CRM",
  "You can provide approved replies, booking rules and an accountable owner",
  "You are willing to test one narrow workflow before expanding",
]

const notYet = [
  "You do not yet receive genuine inbound enquiries",
  "You want an autonomous sales system with no human ownership",
  "You cannot provide access, approval rules or safe test data",
  "You are looking for bulk unsolicited outreach or a generic chatbot",
]

const faqs: FaqEntry[] = [
  {
    question: "What makes the pilot free?",
    answer:
      "The first scoped build covers one agreed inbound lead source and its reply and handoff path. No card is required to apply. Broader integrations, ongoing operation and additional workflows are separate paid work only if you choose to continue.",
  },
  {
    question: "What does success mean?",
    answer:
      "Before the build starts, we document which enquiries are eligible, the response-time target, required reply elements, routing rules, human handoff and failure handling. The pilot is reviewed against that written scorecard rather than an unmeasurable sales promise.",
  },
  {
    question: "Does the pilot guarantee booked calls or revenue?",
    answer:
      "No. The pilot can validate the response workflow, but prospect behaviour, offer quality and sales outcomes remain outside the automation's control. We report observed workflow performance without inventing counterfactual results.",
  },
  {
    question: "What happens after the pilot?",
    answer:
      "You receive the findings and decide whether to stop, keep the workflow focused or scope a managed AIOS engagement. Any paid scope, timing, support level and price are documented before work begins.",
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
              Application-based free pilot
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Validate one lead-response workflow before you buy a larger system
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              We build a scoped 60-Second Lead Response Pilot on one agreed inbound source, using your approved
              context, booking rules and human handoff. You review it against written technical success criteria,
              then decide whether expanding makes sense.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TrackedLink
                href="/contact"
                eventParams={{ site: "aios", cta: "offer_apply_pilot", destination: "/contact" }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 px-10 py-4 text-lg font-bold text-gray-900 shadow-2xl transition hover:scale-105 hover:from-lime-500 hover:to-emerald-500"
              >
                Apply for the free pilot
                <ArrowRight className="h-5 w-5" aria-hidden />
              </TrackedLink>
              <Link href="/demo" className="font-medium text-lime-400 hover:underline">
                See the sandbox demonstration
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              No card is required to apply. Fit, access, scope, timeline and the pilot scorecard are confirmed before
              a build starts.
            </p>
          </section>

          <section className="mt-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">The complete pilot</div>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Everything needed to test one real handoff</h2>
              <p className="mt-4 text-muted-foreground">
                The pilot is deliberately narrow. It is large enough to test with real operating rules and small
                enough to inspect, approve and stop safely.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {valueStack.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card/50 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-400" aria-hidden />
                  <span className="text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/[0.06] p-8">
              <h2 className="text-2xl font-bold">A strong fit</h2>
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
              <h2 className="text-2xl font-bold">Not ready yet</h2>
              <ul className="mt-6 space-y-4">
                {notYet.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-20">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">One clear path</div>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Apply, validate, then decide</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  n: "01",
                  title: "Confirm the fit",
                  body: "We review your lead source, current response path, access, reply examples and human owner. If the workflow is not ready, we say so before a build begins.",
                },
                {
                  n: "02",
                  title: "Build and test",
                  body: "We configure the agreed workflow and review eligible leads, timing, reply content, routing, alerts and failures against the written pilot scorecard.",
                },
                {
                  n: "03",
                  title: "Review and choose",
                  body: "You receive the observed results and handover notes. Continue into managed operations only if the workflow creates enough value to justify a broader scope.",
                },
              ].map((step) => (
                <div key={step.n} className="rounded-2xl border border-border/50 bg-card/50 p-7">
                  <div className="text-sm font-bold tracking-widest text-lime-400">STEP {step.n}</div>
                  <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20 rounded-3xl border border-lime-400/30 bg-gradient-to-br from-lime-400/10 to-emerald-400/5 p-8 md:p-12">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 shrink-0 text-lime-400" aria-hidden />
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">The pilot risk reversal</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    The pilot starts free. If it does not meet the written technical success criteria, you have no
                    obligation to buy a broader system. We do not guarantee booked calls or revenue because prospect
                    behaviour and offer quality are outside the workflow&apos;s control.
                  </p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    If you continue, the paid proposal states the exact workflows, responsibilities, delivery
                    prerequisites, support level, measurement method and price. There is no automatic upgrade.
                  </p>
                </div>
              </div>
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
            <h2 className="text-3xl font-bold md:text-4xl">Have a real inbound lead path worth testing?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Apply with the source, current process and approximate lead volume. We will confirm whether the free
              pilot is a responsible fit and what would need to be available before it starts.
            </p>
            <div className="mt-8">
              <TrackedLink
                href="/contact"
                eventParams={{ site: "aios", cta: "offer_final_apply", destination: "/contact" }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 px-10 py-4 font-bold text-gray-900 transition hover:scale-105"
              >
                Apply for the free pilot
                <ArrowRight className="h-5 w-5" aria-hidden />
              </TrackedLink>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
