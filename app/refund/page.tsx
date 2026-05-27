import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Ayothedoc",
  description: "How cancellations, the 40-hour guarantee, and refunds work for Ayothedoc plans.",
  alternates: { canonical: "/refund" },
  robots: { index: true, follow: true },
}

const UPDATED = "May 27, 2026"

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />
      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Refund &amp; Cancellation Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: {UPDATED}</p>

          <div className="space-y-8 text-muted-foreground leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-lime-400 [&_a]:underline">
            <h2>Monthly plans</h2>
            <ul>
              <li>Foundation, Operations, and Autonomous are billed monthly in advance.</li>
              <li>You can cancel anytime; cancellation stops the next renewal. Your plan stays active until the end of the current paid month.</li>
              <li>We don&apos;t prorate partial months unless required by law.</li>
              <li>You keep everything we&apos;ve built in your own accounts.</li>
            </ul>

            <h2>One-time install (AIOS Install Sprint)</h2>
            <p>
              The install is a fixed-scope service delivered over ~10 business days. Because work begins immediately,
              it is generally non-refundable once kickoff has started. If we fail to deliver the agreed scope, we&apos;ll
              make it right by completing the work.
            </p>

            <h2>The 40-hour guarantee</h2>
            <p>
              Where offered, the guarantee is a <em>work guarantee</em>, not a money-back guarantee: if your AI
              Operating System doesn&apos;t recover the agreed hours against your kickoff baseline within 30 days, we
              keep working at no extra cost until it does. It does not entitle you to a cash refund unless we expressly
              agree otherwise in writing.
            </p>

            <h2>How to cancel or request a refund</h2>
            <p>
              Email <a href="mailto:contact@ayothedoc.com">contact@ayothedoc.com</a> from the address on your account.
              We&apos;ll confirm cancellation and process any eligible refund to your original payment method within
              5–10 business days.
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
