"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

export function SiteHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/audit", label: "Free Audit" },
    { href: "/automation", label: "Automation Library" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-lime-400/25 transition-all duration-300 group-hover:scale-110">
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
            </svg>
          </div>
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Ayothedoc
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3 py-2 transition-all duration-300 group ${
                isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 transition-all duration-300 ${
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            asChild
            className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full shadow-lg hover:shadow-lime-400/25 transition-all duration-300 hover:scale-105"
          >
            <Link
              href="https://calendly.com/ayothedoc"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_click", { cta: "header_book_consultation", destination: "calendly" })}
            >
              Book a Consultation
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
