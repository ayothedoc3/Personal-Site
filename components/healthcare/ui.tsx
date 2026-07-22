import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { sites } from "@/lib/site-config"

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-400">
      {children}
    </div>
  )
}

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${sites.healthcare.url}${c.href}` } : {}),
    })),
  }
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {c.href ? (
              <Link href={c.href} className="hover:text-foreground transition-colors">
                {c.label}
              </Link>
            ) : (
              <span className="text-foreground" aria-current="page">
                {c.label}
              </span>
            )}
            {i < items.length - 1 ? <span aria-hidden>/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string
  title: string
  intro?: string
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
        {title}
      </h1>
      {intro ? <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{intro}</p> : null}
    </div>
  )
}

export function CheckList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 | 3 }) {
  const cols = columns === 3 ? "sm:grid-cols-3" : columns === 1 ? "" : "sm:grid-cols-2"
  return (
    <ul className={`grid gap-3 ${cols}`}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3.5">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400" aria-hidden />
          <span className="text-sm text-foreground">{it}</span>
        </li>
      ))}
    </ul>
  )
}

export function CTASection({
  heading,
  label,
  href = "/contact",
}: {
  heading: string
  label: string
  href?: string
}) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="rounded-2xl border border-border bg-card px-8 py-12 text-center">
          <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">{heading}</h2>
          <div className="mt-8">
            <Link
              href={href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
            >
              {label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StatusLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-teal-600/40 bg-teal-600/10 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-400">
      {children}
    </span>
  )
}
