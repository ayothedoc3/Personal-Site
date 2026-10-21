import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "aios",
  path: "/refund",
  title: "Refund & Cancellation Policy | Ayothedoc",
  description: "How the 60-Second Guarantee, monthly plans, setup fees, cancellations and refunds work for the AIOS Lead Engine.",
  robots: { index: true, follow: true },
})

const UPDATED = "October 22, 2026"

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="relative px-6 py-16 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Refund &amp; Cancellation Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: {UPDATED}</p>

          <div className="space-y-8 text-muted-foreground leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-lime-400 [&_a]:underline">
            <h2>The 60-Second Guarantee</h2>
            <p>
              During the first 30 days after your Lead Engine goes live, every eligible lead gets its first reply
              within 60 seconds of reaching the engine. If any eligible lead does not, we refund your full setup fee.
              Your system keeps running while we fix the cause.
            </p>
            <ul>
              <li>
                An eligible lead is a genuine inquiry with a valid email address that reaches the engine through a
                source we connected during setup.
              </li>
              <li>
                The 60 seconds starts when the engine receives the lead. Delays before that point, such as a form
                provider or inbox that is slow or down, are outside the guarantee.
              </li>
              <li>
                Spam, test submissions and leads received while access we need has been revoked or changed without
                notice are excluded.
              </li>
              <li>Claim within 45 days of go-live by emailing us. We share the delivery log for every lead.</li>
            </ul>

            <h2>Monthly plans</h2>
            <p>
              Monthly fees are billed in advance in US dollars. Plans have a 3-month minimum term, then continue month
              to month. After the minimum term, cancel with 30 days&apos; written notice. The current month is not
              refunded once it has started. When you cancel, we hand over your prompts, reply templates and an export
              of your lead data.
            </p>

            <h2>Setup fees</h2>
            <p>
              The setup fee covers building and testing your Lead Engine. It is refundable only under the 60-Second
              Guarantee above, or in full if we cancel before your engine goes live. Third-party fees paid on your
              behalf, such as US carrier registration for text messaging, are not refundable.
            </p>

            <h2>How to cancel or request a refund</h2>
            <p>
              Email <a href="mailto:contact@ayothedoc.com">contact@ayothedoc.com</a> from the address used for
              your agreement. Include the service and agreement concerned so we can review the
              request and reply with the applicable terms.
            </p>

            <h2>Chargebacks</h2>
            <p>
              Please contact us before opening a payment dispute, most issues are resolved faster directly.
            </p>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-lime-400 font-semibold hover:underline">← Back to home</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
