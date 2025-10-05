"use client"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { useEffect, useState, useCallback } from "react"
import Link from "next/link"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set<string>())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    })
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  }, [])

  const handleMouseDown = useCallback(() => {
    document.body.classList.remove("keyboard-navigation")
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("mousedown", handleMouseDown)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [handleMouseMove, handleKeyDown, handleMouseDown])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground overflow-hidden relative transition-colors duration-500">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-lime-400/10 to-emerald-400/5 rounded-full blur-3xl animate-pulse transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        ></div>
        <div
          className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-tr from-lime-400/8 to-cyan-400/4 rounded-full blur-3xl animate-pulse delay-1000 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * 0.015}px)`,
          }}
        ></div>
      </div>

      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <main id="main-content" className="relative z-10">
        <section className="min-h-[90vh] flex items-center justify-center px-6 lg:px-12">
          <div className="text-center max-w-6xl mx-auto">
            <div
              className={`transition-all duration-1500 delay-300 ${visibleSections.has('main-content') || isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                  Automation and AI systems that save 10 to 40 hours per month
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
                We design and ship automations that cut manual work and unlock growth within 30 days.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link href="/audit">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-lime-400/50">
                    Get Your Free Automation Score
                  </Button>
                </Link>
                <Button
                  onClick={openCalendly}
                  variant="outline"
                  className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 px-12 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-110"
                >
                  Book a Call
                </Button>
              </div>

              <p className="text-muted-foreground mb-8">Works with your stack</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
                <div className="text-xl font-semibold">Shopify</div>
                <div className="text-xl font-semibold">WooCommerce</div>
                <div className="text-xl font-semibold">Notion</div>
                <div className="text-xl font-semibold">Google Workspace</div>
                <div className="text-xl font-semibold">Zapier</div>
                <div className="text-xl font-semibold">n8n</div>
                <div className="text-xl font-semibold">Apify</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">What we deliver</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors duration-300">
                  Automation Readiness Assessment
                </h3>
                <div className="text-2xl font-bold text-lime-400 mb-2">€49–199</div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Quick scorecard and roadmap, redeemable against a build.
                </p>
                <Link href="/audit">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all duration-500 hover:scale-105">
                    Start Free Audit
                  </Button>
                </Link>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors duration-300">
                  Automation Systems
                </h3>
                <div className="text-2xl font-bold text-lime-400 mb-2">from €2,500</div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Done-for-you workflows that cut manual work in weeks, not months.
                </p>
                <Link href="/services">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all duration-500 hover:scale-105">
                    See Packages
                  </Button>
                </Link>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors duration-300">
                  Managed Care Plans
                </h3>
                <div className="text-2xl font-bold text-lime-400 mb-2">€600–3,000/mo</div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Ongoing monitoring, fixes, and improvements.
                </p>
                <Link href="/services#care">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all duration-500 hover:scale-105">
                    View Care Plans
                  </Button>
                </Link>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors duration-300">
                  Custom Builds
                </h3>
                <div className="text-2xl font-bold text-lime-400 mb-2">Custom pricing</div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Full-stack apps and dashboards when you need more than a workflow.
                </p>
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all duration-500 hover:scale-105">
                    Talk to Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section id="case-study" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-card/30 backdrop-blur-xl px-4 py-2 rounded-full border border-border mb-6">
              <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">Client result</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Order to ticketing automation cut manual time by 80 percent in 21 days</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                <div className="text-2xl font-bold text-lime-400 mb-2">25 hours</div>
                <p className="text-muted-foreground">Saved per month across support</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                <div className="text-2xl font-bold text-lime-400 mb-2">90%</div>
                <p className="text-muted-foreground">Reduced missed follow ups</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
                <div className="text-2xl font-bold text-lime-400 mb-2">Weekly</div>
                <p className="text-muted-foreground">Added report for ops</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"The workflows turned manual processes into growth engines. We saw results in weeks."</p>
                <div className="font-semibold">Emily Rodriguez, Founder, Digital Dynamics</div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"Custom automations saved us more than 20 hours per week. Fast return on investment."</p>
                <div className="font-semibold">Sarah Johnson, CEO, TechStart Solutions</div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"We launched internal tools 60 percent faster and kept scaling."</p>
                <div className="font-semibold">Michael Chen, Operations Director, GrowthLab</div>
              </div>
            </div>
          </div>
        </section>



        {/* Final CTA Section */}
        <section className="py-20 px-6 lg:px-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 backdrop-blur-sm">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to save 10 to 40 hours each month
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/audit">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-bold transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-lime-400/50">
                    Get Your Free Automation Score
                  </Button>
                </Link>
                <Button
                  onClick={openCalendly}
                  variant="outline"
                  className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 px-12 py-4 rounded-full text-lg font-bold transition-all duration-500 hover:scale-110"
                >
                  Book a Call
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 lg:px-12 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">The Fastest Way to Build What's Next</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>AI Strategy</li>
                  <li>Custom Development</li>
                  <li>Data Analytics</li>
                  <li>Process Automation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Contact</li>
                  <li>Skool Community</li>
                  <li>1:1 Coaching</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}