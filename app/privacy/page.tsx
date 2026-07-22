import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { HealthcareHeader } from "@/components/healthcare/healthcare-header"
import { HealthcareFooter } from "@/components/healthcare/healthcare-footer"
import { getSiteKey } from "@/lib/site.server"
import { sites } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const key = await getSiteKey()
  return {
    title: "Privacy Policy | Ayothedoc",
    description: "How we collect, use, and protect your personal data, including your GDPR rights.",
    alternates: { canonical: `${sites[key].url}/privacy` },
  }
}

const UPDATED = "May 27, 2026"

export default async function PrivacyPage() {
  const key = await getSiteKey()
  const isAios = key === "aios"

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isAios ? <SiteHeader /> : <HealthcareHeader />}
      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: {UPDATED}</p>

          <div className="space-y-6 text-muted-foreground leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-teal-700 dark:[&_a]:text-teal-400 [&_a]:underline">
            <p>
              This Privacy Policy explains how <strong>Ayothedoc</strong> ("we") collects and uses personal data when
              you use our websites or services. We are the data controller. Contact:{" "}
              <a href="mailto:hello@ayothedoc.com">hello@ayothedoc.com</a>.
            </p>

            <h2>1. Data we collect</h2>
            <ul>
              <li><strong>Contact details</strong> you submit (name, email, organisation, message) via our forms.</li>
              <li><strong>Usage data</strong> via analytics (pages viewed, approximate location, device). IP is anonymised.</li>
              <li><strong>Service data</strong> you grant access to during an engagement, handled per our Terms and your instructions.</li>
            </ul>

            <h2>2. How we use it</h2>
            <ul>
              <li>To respond to enquiries and provide our services.</li>
              <li>To improve the website and understand traffic.</li>
              <li>To send service-related communications.</li>
            </ul>

            <h2>3. Legal bases (GDPR)</h2>
            <p>
              We process data on the bases of consent (e.g. analytics), contract (to deliver services you engage us
              for), and legitimate interests (to run and secure our business).
            </p>

            <h2>4. Third parties we share with</h2>
            <ul>
              <li>Analytics providers</li>
              <li>Email delivery providers</li>
              <li>Hosting and infrastructure providers</li>
            </ul>
            <p>We do not sell your personal data.</p>

            <h2>5. Your rights</h2>
            <p>
              If you are in the EEA/UK, you have the right to access, correct, delete, restrict, or port your data, and
              to object to processing or withdraw consent. To exercise these, email{" "}
              <a href="mailto:hello@ayothedoc.com">hello@ayothedoc.com</a>. You may also complain to your local data
              protection authority.
            </p>

            <h2>6. Cookies and retention</h2>
            <p>
              We use essential cookies and, with your consent, analytics cookies. We keep personal data only as long as
              needed for the purposes above or as required by law.
            </p>

            <h2>7. Contact</h2>
            <p>Email <a href="mailto:hello@ayothedoc.com">hello@ayothedoc.com</a> with any privacy questions.</p>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-teal-700 dark:text-teal-400 font-medium hover:underline">&larr; Back to home</Link>
          </div>
        </div>
      </main>
      {isAios ? null : <HealthcareFooter />}
    </div>
  )
}
