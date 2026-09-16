import Link from "next/link"
import { Plus } from "lucide-react"

const solutions = [
  { href: "/solutions/healthcare-ai-consulting", label: "AI Readiness and Strategy" },
  { href: "/solutions/ai-intelligent-automation", label: "AI Workflow Automation" },
  { href: "/solutions/healthcare-ai-product-development", label: "AI Product and Prototype Delivery" },
  { href: "/solutions/healthcare-ai-governance", label: "AI Safety and Governance" },
]
const whoWeHelp = [
  { href: "/who-we-help/healthtech-startups", label: "Healthtech Startups" },
  { href: "/who-we-help/medtech-robotics-companies", label: "MedTech and Digital Health Teams" },
  { href: "/who-we-help/healthcare-organisations", label: "Healthcare Organisations" },
  { href: "/who-we-help/africa-market-entry", label: "African Market Entry" },
]
const company = [
  { href: "/healthcare-ai-pilot-readiness", label: "Pilot Readiness Sprint" },
  { href: "/about", label: "About" },
  { href: "/method", label: "Method" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
]
const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/medical-disclaimer", label: "Medical Disclaimer" },
]

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HealthcareFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-teal-600 text-white">
                <Plus className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">Ayothedoc</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Healthcare AI Design &amp; Implementation
            </p>
          </div>
          <Col title="Solutions" links={solutions} />
          <Col title="Who We Help" links={whoWeHelp} />
          <Col title="Company" links={company} />
          <div className="space-y-8">
            <Col
              title="Professional"
              links={[
                { href: "/ayo", label: "Founder Profile" },
                { href: "https://www.linkedin.com/in/ayothedoc", label: "LinkedIn" },
              ]}
            />
            <Col title="Legal" links={legal} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Ayothedoc. Healthcare AI design and implementation services.
          </p>
          <a href="https://aios.ayothedoc.com" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Looking for AI operations outside healthcare?{" "}
            <span className="font-medium text-teal-700 dark:text-teal-400">Visit AIOS &rarr;</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
