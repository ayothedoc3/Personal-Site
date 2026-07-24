"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Plus } from "lucide-react"

const navItems = [
  { href: "/solutions", label: "Solutions" },
  { href: "/who-we-help", label: "Who We Help" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/method", label: "Method" },
  { href: "/tools/de-identify", label: "Tools" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function HealthcareHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Ayothedoc home">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-teal-600 text-white">
            <Plus className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">Ayothedoc</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-sm transition-colors ${
                isActive(item.href)
                  ? "text-teal-700 dark:text-teal-400 font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
          >
            Discuss a Project
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="lg:hidden border-t border-border bg-background">
          <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-2.5 text-base ${
                  isActive(item.href)
                    ? "bg-muted text-teal-700 dark:text-teal-400 font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-sm font-medium text-white"
            >
              Discuss a Project
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
