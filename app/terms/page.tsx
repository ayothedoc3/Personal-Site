import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Terms of Service | Ayothedoc",
  description: "The terms governing use of Ayothedoc's Managed AI Operations services and website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
}

const UPDATED = "May 27, 2026"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />
      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Terms of Service</h1>
          <p className="text-muted-foreground mb-10">Last updated: {UPDATED}</p>

          <div className="space-y-8 text-muted-foreground leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-lime-400 [&_a]:underline">
            <p>
              These Terms of Service ("Terms") govern your access to and use of the website and services provided by
              {" "}<strong>Ayothedoc</strong> ("we", "us"), including our Managed AI Operations services and any related
              products. By using our site or purchasing a plan, you agree to these Terms.
            </p>

            <h2>1. Services</h2>
            <p>
              We install and operate an "AI Operating System" for your business and provide related automation,
              setup, and ongoing management services as described on our <Link href="/offer">Plans &amp; Pricing</Link>{" "}
              page. Specific deliverables and scope are confirmed at kickoff.
            </p>

            <h2>2. Plans, billing, and renewals</h2>
            <ul>
              <li>One-time services (e.g. the install sprint) are billed upfront.</li>
              <li>Monthly plans (Foundation, Operations, Autonomous) are subscriptions billed in advance each month via Stripe.</li>
              <li>Subscriptions renew automatically until cancelled. You can cancel anytime; see our <Link href="/refund">Refund &amp; Cancellation Policy</Link>.</li>
              <li>Prices are in USD unless stated otherwise and exclude applicable taxes (e.g. VAT), which may be added.</li>
            </ul>

            <h2>3. The 40-hour guarantee</h2>
            <p>
              Where offered, our guarantee is measured against a manual-hours baseline captured at kickoff and verified
              over the 30 days following install, on the agreed workflow scope. If the agreed reduction isn&apos;t met,
              we continue working at no additional cost until it is. The guarantee does not entitle you to a cash refund
              unless expressly stated.
            </p>

            <h2>4. Ownership</h2>
            <p>
              You own the automations, configurations, and documentation we build for you within your own accounts.
              We retain ownership of our pre-existing tools, templates, and methodologies. Some capabilities may be
              delivered using our own products under a license that ends if your engagement ends.
            </p>

            <h2>5. Your responsibilities</h2>
            <ul>
              <li>Provide timely access to the tools, data, and information needed to deliver the service.</li>
              <li>Maintain your own third-party accounts (e.g. CRM, email, Stripe) and their fees.</li>
              <li>Use the services lawfully and not to send spam or violate third-party terms.</li>
            </ul>

            <h2>6. Third-party services</h2>
            <p>
              Our services connect to third-party platforms (e.g. Stripe, Google, email providers). Your use of those
              platforms is governed by their terms, and we&apos;re not responsible for their availability or actions.
            </p>

            <h2>7. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, our total liability arising from the services is limited to the
              fees you paid in the three (3) months preceding the claim. We are not liable for indirect, incidental, or
              consequential damages.
            </p>

            <h2>8. Termination</h2>
            <p>
              Either party may terminate a monthly plan with notice as described in the Refund &amp; Cancellation
              Policy. We may suspend service for non-payment or misuse.
            </p>

            <h2>9. Governing law</h2>
            <p>These Terms are governed by the laws of <strong>Lithuania</strong>.</p>

            <h2>10. Contact</h2>
            <p>
              Questions about these Terms? Email <a href="mailto:contact@ayothedoc.com">contact@ayothedoc.com</a>.
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
