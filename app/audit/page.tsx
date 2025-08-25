"use client"

import { BusinessAudit } from "@/components/business-audit"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuditPage() {
  const openCalendly = () => {
    window.open('https://calendly.com/ayothedoc', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4 lg:px-12 relative z-10" role="banner">
        <div className="absolute inset-0 bg-background/20 backdrop-blur-xl border-b border-border/50"></div>

        <Link href="/" className="flex items-center gap-2 group relative z-10">
          <div
            className="w-8 h-8 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-125 shadow-lg shadow-lime-400/25 group-hover:shadow-lime-400/50 relative overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <svg
              className="w-5 h-5 text-gray-900 relative z-10 transition-transform duration-300 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-lime-400 group-hover:to-emerald-400 transition-all duration-500 group-hover:tracking-wider">
            Ayothedoc
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 relative z-10" role="navigation" aria-label="Main navigation">
          {[
            { href: "/", text: "Home" },
            { href: "/services", text: "Services" },
            { href: "/audit", text: "Business Audit", active: true },
            { href: "/about", text: "About" },
            { href: "/contact", text: "Contact" },
            { href: "/blog", text: "Blog" },
          ].map((item, index) => (
            <Link
              key={item.text}
              href={item.href}
              className={`${item.active ? "text-foreground" : "text-muted-foreground"} hover:text-lime-400 focus:text-lime-400 transition-all duration-300 hover:scale-105 focus:scale-105 relative group focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-background rounded-lg px-2 py-1`}
              style={{ animationDelay: `${index * 100}ms` }}
              aria-current={item.active ? "page" : undefined}
            >
              {item.text}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 transition-all duration-500 group-hover:w-full group-focus:w-full rounded-full"></span>
              <span className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-lime-400/5 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 relative z-10">
          <ThemeToggle />
          <Button
            onClick={openCalendly}
            className="bg-card/50 backdrop-blur-md hover:bg-card/70 focus:bg-card/70 text-foreground px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 focus:scale-105 hover:shadow-xl focus:shadow-xl hover:shadow-lime-400/20 focus:shadow-lime-400/20 border border-border hover:border-lime-400/50 focus:border-lime-400/50 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Book a consultation with Ayothedoc"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 translate-x-[-100%] group-hover:translate-x-[100%] group-focus:translate-x-[100%] transition-transform duration-700 ease-out"></span>
            <span className="relative">Book a Consultation</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" role="main">
        <div className="text-center mb-12">
          <div className="inline-block bg-card/30 backdrop-blur-xl px-4 py-2 rounded-full border border-border mb-6">
            <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase animate-pulse">
              FREE AI-POWERED ANALYSIS
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
            Get Your Personalized Business Automation Audit
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed">
            Discover exactly how AI automation can save your business 10+ hours per week
          </p>
          <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Our AI analyzes your website and business model to create a custom automation roadmap with specific recommendations and ROI projections.
          </p>
        </div>

        <div className="bg-gradient-to-b from-background to-gray-950/50 py-12 rounded-3xl">
          <BusinessAudit />
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card/30 backdrop-blur-xl p-8 rounded-2xl border border-border max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-lime-400">What You'll Get:</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Custom Website Analysis</h3>
                  <p className="text-muted-foreground text-sm">AI-powered analysis of your current business model and processes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Top 5 Automation Opportunities</h3>
                  <p className="text-muted-foreground text-sm">Specific workflows you can automate immediately</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Implementation Roadmap</h3>
                  <p className="text-muted-foreground text-sm">Step-by-step plan with timeline and priorities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">ROI Projections</h3>
                  <p className="text-muted-foreground text-sm">Estimated time and cost savings for each automation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}