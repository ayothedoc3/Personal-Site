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
    title: "Terms of Use | Ayothedoc",
    description:
      key === "aios"
        ? "The terms governing use of AIOS by Ayothedoc's AI operations services and website."
        : "The terms governing use of Ayothedoc's healthcare technology consulting services and website.",
    alternates: { canonical: `${sites[key].url}/terms` },
  }
}

const UPDATED = "May 27, 2026"
const prose =
  "space-y-6 text-muted-foreground leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-teal-700 dark:[&_a]:text-teal-400 [&_a]:underline"

function AiosTerms() {
  return (
    <div className={prose}>
      <p>
        These Terms govern your access to and use of the website and services provided by <strong>AIOS by Ayothedoc</strong>,
        including our AI operations services. By using our site or purchasing a plan, you agree to these Terms.
      </p>
      <h2>1. Services</h2>
      <p>We install and operate an AI Operating System and related automation, as described on our <Link href="/offer">Plans &amp; Pricing</Link> page. Scope is confirmed at kickoff.</p>
      <h2>2. Plans, billing, and renewals</h2>
      <ul>
        <li>One-time services (e.g. the install sprint) are billed upfront.</li>
        <li>Monthly plans are subscriptions billed in advance via Stripe and renew until cancelled. See our <Link href="/refund">Refund &amp; Cancellation Policy</Link>.</li>
        <li>Prices exclude applicable taxes.</li>
      </ul>
      <h2>3. Ownership</h2>
      <p>You own the automations, configurations and documentation we build within your accounts. We retain our pre-existing tools, templates and methodologies.</p>
      <h2>4. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, our total liability is limited to the fees paid in the three months preceding the claim. We are not liable for indirect or consequential damages.</p>
      <h2>5. Governing law</h2>
      <p>These Terms are governed by the laws of <strong>Lithuania</strong>.</p>
      <h2>6. Contact</h2>
      <p>Email <a href="mailto:aios@ayothedoc.com">aios@ayothedoc.com</a>.</p>
    </div>
  )
}

function HealthcareTerms() {
  return (
    <div className={prose}>
      <p>
        These Terms of Use govern your access to and use of the website and services provided by <strong>Ayothedoc</strong>,
        a healthcare technology implementation and clinical innovation practice. By using this site, you agree to these Terms.
      </p>
      <h2>1. Services</h2>
      <p>
        We provide healthcare technology product, workflow and implementation consulting. Specific deliverables and scope
        are agreed in a written statement of work before an engagement begins.
      </p>
      <h2>2. Not medical or regulatory services</h2>
      <p>
        Ayothedoc does not provide personal medical diagnosis, treatment or emergency services, and does not provide
        regulatory, legal, certified engineering, installation or maintenance services. See our{" "}
        <Link href="/medical-disclaimer">Medical Disclaimer</Link>.
      </p>
      <h2>3. Ownership</h2>
      <p>
        You own the deliverables we produce for you within your own accounts. We retain ownership of our pre-existing
        methods, templates and materials.
      </p>
      <h2>4. Your responsibilities</h2>
      <ul>
        <li>Provide timely access to the information and stakeholders needed to deliver the work.</li>
        <li>Maintain your own third-party accounts and their fees.</li>
        <li>Use the services lawfully.</li>
      </ul>
      <h2>5. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, our total liability arising from the services is limited to the fees
        paid for the relevant engagement. We are not liable for indirect, incidental or consequential damages.
      </p>
      <h2>6. Governing law</h2>
      <p>These Terms are governed by the applicable law stated in the engagement agreement.</p>
      <h2>7. Contact</h2>
      <p>Email <a href="mailto:hello@ayothedoc.com">hello@ayothedoc.com</a> with any questions about these Terms.</p>
    </div>
  )
}

export default async function TermsPage() {
  const key = await getSiteKey()
  const isAios = key === "aios"

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isAios ? <SiteHeader /> : <HealthcareHeader />}
      <main className="relative px-6 py-16 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Terms of Use</h1>
          <p className="text-muted-foreground mb-10">Last updated: {UPDATED}</p>
          {isAios ? <AiosTerms /> : <HealthcareTerms />}
          <div className="mt-12">
            <Link href="/" className="text-teal-700 dark:text-teal-400 font-medium hover:underline">&larr; Back to home</Link>
          </div>
        </div>
      </main>
      {isAios ? null : <HealthcareFooter />}
    </div>
  )
}
