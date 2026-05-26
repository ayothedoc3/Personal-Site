import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Privacy Policy | Ayothedoc",
  description: "How Ayothedoc collects, uses, and protects your personal data, including your GDPR rights.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
}

const UPDATED = "May 27, 2026"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <SiteHeader />
      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: {UPDATED}</p>

          <div className="space-y-8 text-muted-foreground leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-lime-400 [&_a]:underline">
            <p className="p-4 rounded-xl border border-border/60 bg-card/40 text-sm">
              Template, not legal advice. Review and adapt with counsel — especially the GDPR sections, since you serve
              the EU. Bracketed items need your details.
            </p>

            <p>
              This Privacy Policy explains how <strong>[Legal Business Name]</strong> ("Ayothedoc", "we") collects and
              uses personal data when you use ayothedoc.com or our services. We are the data controller. Contact:{" "}
              <a href="mailto:contact@ayothedoc.com">contact@ayothedoc.com</a>.
            </p>

            <h2>1. Data we collect</h2>
            <ul>
              <li><strong>Contact details</strong> you submit (name, email, phone, message) via our contact form.</li>
              <li><strong>Usage data</strong> via Google Analytics (e.g. pages viewed, approximate location, device). IP is anonymized.</li>
              <li><strong>Payment data</strong> processed by Stripe when you purchase a plan. We don&apos;t store card numbers.</li>
              <li><strong>Service data</strong> you grant access to during an engagement, handled per our Terms and your instructions.</li>
            </ul>

            <h2>2. How we use it</h2>
            <ul>
              <li>To respond to enquiries and provide our services.</li>
              <li>To process payments and manage subscriptions.</li>
              <li>To improve the website and understand traffic.</li>
              <li>To send service-related communications.</li>
            </ul>

            <h2>3. Legal bases (GDPR)</h2>
            <p>
              We process data on the bases of consent (e.g. analytics), contract (to deliver services you buy), and
              legitimate interests (to run and secure our business).
            </p>

            <h2>4. Third parties we share with</h2>
            <ul>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Google Analytics</strong> — website analytics</li>
              <li><strong>EmailJS / Resend</strong> — delivering contact-form and transactional emails</li>
              <li>Hosting and infrastructure providers</li>
            </ul>
            <p>We do not sell your personal data.</p>

            <h2>5. Your rights</h2>
            <p>
              If you are in the EEA/UK, you have the right to access, correct, delete, restrict, or port your data, and
              to object to processing or withdraw consent. To exercise these, email{" "}
              <a href="mailto:contact@ayothedoc.com">contact@ayothedoc.com</a>. You may also complain to your local data
              protection authority (in Lithuania, the State Data Protection Inspectorate / VDAI).
            </p>

            <h2>6. Cookies</h2>
            <p>
              We use essential cookies and, with your consent, analytics cookies. You can control cookies through your
              browser settings.
            </p>

            <h2>7. Retention</h2>
            <p>We keep personal data only as long as needed for the purposes above or as required by law.</p>

            <h2>8. Contact</h2>
            <p>Email <a href="mailto:contact@ayothedoc.com">contact@ayothedoc.com</a> with any privacy questions.</p>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-lime-400 font-semibold hover:underline">← Back to home</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
