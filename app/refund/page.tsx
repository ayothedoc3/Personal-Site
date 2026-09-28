import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  site: "aios",
  path: "/refund",
  title: "Refund & Cancellation Policy | Ayothedoc",
  description: "How the free AIOS pilot, any separately agreed paid work, cancellations and refunds are handled.",
  robots: { index: true, follow: true },
})

const UPDATED = "September 28, 2026"

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="relative px-6 py-16 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Refund &amp; Cancellation Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: {UPDATED}</p>

          <div className="space-y-8 text-muted-foreground leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-lime-400 [&_a]:underline">
            <h2>Free pilot</h2>
            <p>
              Applying for the scoped lead response pilot does not require payment. If we agree to run a pilot,
              its scope, prerequisites and success criteria are confirmed in writing before work begins. There is
              no automatic upgrade or recurring charge when the pilot ends.
            </p>

            <h2>Paid work after the pilot</h2>
            <p>
              Any paid continuation requires a separate written agreement. The scope, fees, billing schedule,
              cancellation terms and any applicable refund terms are set out in that agreement. If you have an
              existing paid agreement, its terms govern that work, subject to applicable law.
            </p>

            <h2>How to cancel or request a refund</h2>
            <p>
              Email <a href="mailto:contact@ayothedoc.com">contact@ayothedoc.com</a> from the address used for
              your application or agreement. Include the service and agreement concerned so we can review the
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
