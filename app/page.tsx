"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"

interface StatItem {
  number: number
  label: string
  suffix: string
}

interface TestimonialItem {
  name: string
  company: string
  role: string
  testimonial: string
  rating: number
  avatar: string
}

interface ServiceItem {
  title: string
  desc: string
  icon: string
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set<string>())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [typedText] = useState("Full Service Digital Agency")
  const [currentStat, setCurrentStat] = useState(0)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openCalendly = () => {
    window.open('https://calendly.com/ayothedoc', '_blank')
  }

  const navigateToContact = () => {
    window.location.href = '/contact'
  }

  const stats: StatItem[] = [
    { number: 150, label: "Projects Completed", suffix: "+" },
    { number: 98, label: "Client Satisfaction", suffix: "%" },
    { number: 24, label: "Hours Saved Weekly", suffix: "+" },
    { number: 5, label: "Years Experience", suffix: "+" },
  ]

  const testimonials: TestimonialItem[] = [
    {
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO",
      testimonial:
        "Ayothedoc automated our entire client onboarding process. We now save 15 hours per week and our clients love the seamless experience.",
      rating: 5,
      avatar: "/professional-woman-ceo.png",
    },
    {
      name: "Michael Chen",
      company: "GrowthLab Agency",
      role: "Operations Director",
      testimonial:
        "The custom WordPress site they built increased our conversion rate by 340%. The automation workflows are game-changing.",
      rating: 5,
      avatar: "/professional-operations-director.png",
    },
    {
      name: "Emily Rodriguez",
      company: "Digital Dynamics",
      role: "Founder",
      testimonial:
        "From manual chaos to automated excellence. Our team productivity doubled and we can finally focus on strategic growth.",
      rating: 5,
      avatar: "/professional-woman-founder.png",
    },
  ]

  const services: ServiceItem[] = [
    {
      title: "Web Development",
      desc: "Custom WordPress websites built for conversions and easy management. Optimized for speed and user experience.",
      icon: "🌐",
    },
    {
      title: "AI Automations",
      desc: "Eliminate repetitive tasks with Make.com and N8N automations. Save hours every week with intelligent workflows.",
      icon: "🤖",
    },
    {
      title: "Online Business Development",
      desc: "Strategic guidance to optimize your online business operations and maximize revenue potential.",
      icon: "📈",
    },
    {
      title: "Virtual Assistance",
      desc: "Offload administrative tasks to free up your time for high-value activities that grow your business.",
      icon: "👥",
    },
    {
      title: "Process Optimization",
      desc: "Identify bottlenecks and implement systems that streamline your business operations.",
      icon: "⚡",
    },
    {
      title: "Technical Support",
      desc: "Ongoing maintenance and support to ensure your website and automations run smoothly.",
      icon: "🔧",
    },
  ]

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


    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)

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
      clearInterval(statInterval)
    }
  }, [handleMouseMove, handleKeyDown, handleMouseDown, stats.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground overflow-hidden relative transition-colors duration-500">
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
        <div
          className="absolute bottom-20 right-1/4 w-60 h-60 bg-gradient-to-bl from-lime-400/6 to-yellow-400/3 rounded-full blur-2xl animate-bounce delay-2000 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        ></div>
        <div
          className="absolute top-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-emerald-400/4 to-lime-400/6 rounded-full blur-xl animate-pulse delay-3000 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.008}px, ${mousePosition.y * 0.008}px)`,
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 backdrop-blur-[0.5px]"></div>
      </div>

      <header
        className={`flex items-center justify-between px-6 py-4 lg:px-12 relative z-10 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        role="banner"
      >
        <div className="absolute inset-0 bg-background/20 backdrop-blur-xl border-b border-border/50"></div>

        <div className="flex items-center gap-2 group relative z-10">
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
        </div>

        <nav className="hidden md:flex items-center gap-8 relative z-10" role="navigation" aria-label="Main navigation">
          {[
            { href: "#main-content", text: "Home", active: true, onClick: () => scrollToSection('main-content') },
            { href: "/services", text: "Services", onClick: undefined },
            { href: "/audit", text: "Business Audit", onClick: undefined },
            { href: "/about", text: "About", onClick: undefined },
            { href: "/contact", text: "Contact", onClick: undefined },
            { href: "/blog", text: "Blog", onClick: undefined },
          ].map((item, index) => (
            <a
              key={item.text}
              href={item.href}
              onClick={item.onClick ? (e: React.MouseEvent) => { e.preventDefault(); item.onClick!() } : undefined}
              className={`${item.active ? "text-foreground" : "text-muted-foreground"} hover:text-lime-400 focus:text-lime-400 transition-all duration-300 hover:scale-105 focus:scale-105 relative group focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-background rounded-lg px-2 py-1 cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
              aria-current={item.active ? "page" : undefined}
            >
              {item.text}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 transition-all duration-500 group-hover:w-full group-focus:w-full rounded-full"></span>
              <span className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-lime-400/5 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 -z-10"></span>
            </a>
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

      <main
        id="main-content"
        className="flex flex-col items-center justify-center px-6 py-20 lg:py-32 text-center relative z-10"
        role="main"
      >
        <div
          className={`mb-8 transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-3 bg-card/30 backdrop-blur-xl px-6 py-3 rounded-full text-sm border border-border hover:border-lime-400/50 transition-all duration-300 hover:scale-105 shadow-2xl shadow-background/50 group">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-lime-400/50 relative"
                aria-hidden="true"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full animate-ping"></span>
              </span>
              <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent font-semibold group-hover:animate-pulse">
                WEB DEVELOPMENT
              </span>
            </div>
            <div
              className="w-px h-4 bg-border group-hover:bg-lime-400/50 transition-colors duration-300"
              aria-hidden="true"
            ></div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              AI AUTOMATION
            </span>
            <div
              className="w-px h-4 bg-border group-hover:bg-lime-400/50 transition-colors duration-300"
              aria-hidden="true"
            ></div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              BUSINESS SOLUTIONS
            </span>
          </div>
        </div>

        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-6xl transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ minHeight: '200px' }}
        >
          <span className="text-lime-400 inline-block hover:scale-105 transition-transform duration-300">
            Full Service
          </span>
          <span> Digital Agency</span>
        </h1>

        <p
          className={`text-muted-foreground text-xl md:text-2xl mb-4 max-w-3xl leading-relaxed transition-all duration-1000 delay-700 font-medium ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ minHeight: '60px' }}
        >
          Save 10+ Hours Weekly with Custom Web Development & AI Automation
        </p>

        <p
          className={`text-muted-foreground/80 text-lg mb-12 max-w-2xl leading-relaxed transition-all duration-1000 delay-800 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ minHeight: '50px' }}
        >
          Transform your business operations with intelligent workflows that work 24/7 while you focus on growth
        </p>

        <div
          className={`mb-8 transition-all duration-1000 delay-900 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          role="region"
          aria-label="Company statistics"
        >
          <div className="bg-card/30 backdrop-blur-xl px-8 py-4 rounded-2xl border border-border shadow-xl" style={{ minHeight: '100px', width: '200px' }}>
            <div className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent" style={{ minHeight: '40px' }}>
              {stats[currentStat].number}
              {stats[currentStat].suffix}
            </div>
            <div className="text-sm text-muted-foreground mt-1" style={{ minHeight: '20px' }}>{stats[currentStat].label}</div>
          </div>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <Button
            onClick={navigateToContact}
            className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 focus:from-lime-500 focus:to-emerald-500 text-gray-900 px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 focus:scale-105 hover:shadow-2xl focus:shadow-2xl hover:shadow-lime-400/40 focus:shadow-lime-400/40 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Get a free consultation with Ayothedoc today"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] group-focus:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            <span className="relative group-hover:animate-bounce">Get Free Consultation Today</span>
          </Button>
          <Button
            onClick={() => scrollToSection('services-section')}
            variant="outline"
            className="border-border text-foreground hover:bg-card/50 focus:bg-card/50 px-8 py-4 rounded-2xl text-lg bg-card/20 backdrop-blur-md transition-all duration-300 hover:scale-105 focus:scale-105 hover:border-lime-400/50 focus:border-lime-400/50 hover:shadow-xl focus:shadow-xl hover:shadow-foreground/10 focus:shadow-foreground/10 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="View our services and previous work"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-emerald-400/10 translate-y-[100%] group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-500 ease-out"></span>
            <span className="relative">View Our Services</span>
          </Button>
        </div>

        <div
          className={`mt-12 transition-all duration-1000 delay-1100 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          role="region"
          aria-label="Technology partners"
        >
          <p className="text-muted-foreground/60 text-sm mb-4">Trusted by businesses worldwide</p>
          <div className="flex items-center justify-center gap-8 opacity-60" role="list">
            {["WordPress", "Make.com", "N8N", "Zapier"].map((tech) => (
              <div key={tech} className="text-2xl font-bold text-muted-foreground/60" role="listitem">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </main>

      <section
        id="automation-section"
        data-animate
        className={`px-6 py-20 lg:px-12 transition-all duration-1000 ${visibleSections.has("automation-section") ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        aria-labelledby="automation-heading"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase relative">
              <span className="animate-pulse">BUSINESS AUTOMATION EXPERTS</span>
              <span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent animate-pulse"
                aria-hidden="true"
              ></span>
            </span>
          </div>
          <h2 id="automation-heading" className="text-3xl md:text-5xl font-bold mb-6">
            Custom Web Development & Intelligent Workflow
            <span className="text-lime-400 inline-block hover:scale-105 transition-transform duration-300 relative">
              {" "}
              Automation That Saves You Time & Money
              <span
                className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-lime-400 to-emerald-400 group-hover:w-full transition-all duration-500"
                aria-hidden="true"
              ></span>
            </span>
          </h2>
          <Button
            onClick={() => scrollToSection('services-section')}
            className="bg-lime-400 hover:bg-lime-500 focus:bg-lime-500 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold mt-8 transition-all duration-300 hover:scale-105 focus:scale-105 hover:shadow-xl focus:shadow-xl hover:shadow-lime-400/30 focus:shadow-lime-400/30 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Learn more about our automation services"
          >
            <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 group-focus:scale-100 transition-transform duration-500 ease-out"></span>
            <span className="relative">Learn More</span>
          </Button>
        </div>
      </section>

      <section
        id="services-section"
        data-animate
        className={`px-6 py-20 lg:px-12 relative transition-all duration-1000 ${visibleSections.has("services-section") ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        aria-labelledby="services-heading"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-card/20 to-transparent backdrop-blur-sm"
          aria-hidden="true"
        ></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-card/30 backdrop-blur-xl px-4 py-2 rounded-full border border-border mb-6 group hover:scale-105 transition-transform duration-300">
              <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase animate-pulse group-hover:animate-bounce">
                Let's solve Problems
              </span>
            </div>
            <h2
              id="services-heading"
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-muted-foreground to-muted-foreground/60 bg-clip-text text-transparent hover:from-lime-400 hover:via-emerald-400 hover:to-lime-400 transition-all duration-500"
            >
              How We Help You Succeed…
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`bg-card/30 backdrop-blur-xl p-8 rounded-2xl border border-border hover:border-lime-400/50 focus-within:border-lime-400/50 transition-all duration-500 hover:scale-105 focus-within:scale-105 hover:shadow-2xl focus-within:shadow-2xl hover:shadow-lime-400/20 focus-within:shadow-lime-400/20 group cursor-pointer relative overflow-hidden ${visibleSections.has("services-section") ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                role="listitem"
                tabIndex={0}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
                  e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    // Handle service selection
                  }
                }}
                aria-label={`${service.title}: ${service.desc}`}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                ></div>
                <div
                  className="absolute w-32 h-32 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: "var(--mouse-x, 50%)",
                    top: "var(--mouse-y, 50%)",
                  }}
                  aria-hidden="true"
                ></div>
                <div className="relative z-10">
                  <div
                    className="text-3xl mb-4 group-hover:scale-110 group-focus:scale-110 group-hover:rotate-12 group-focus:rotate-12 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent group-hover:from-lime-300 group-hover:to-emerald-300 group-focus:from-lime-300 group-focus:to-emerald-300 transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground group-focus:text-foreground transition-colors duration-300 leading-relaxed">
                    {service.desc}
                  </p>
                  <div
                    className="w-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 transition-all duration-500 group-hover:w-full group-focus:w-full mt-6 rounded-full"
                    aria-hidden="true"
                  ></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials-section"
        data-animate
        className={`px-6 py-20 lg:px-12 relative transition-all duration-1000 ${visibleSections.has("testimonials-section") ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        aria-labelledby="testimonials-heading"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent backdrop-blur-sm"
          aria-hidden="true"
        ></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-card/30 backdrop-blur-xl px-4 py-2 rounded-full border border-border mb-6">
              <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase animate-pulse">
                Client Success Stories
              </span>
            </div>
            <h2
              id="testimonials-heading"
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-muted-foreground to-muted-foreground/60 bg-clip-text text-transparent mb-4"
            >
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real results from real businesses who transformed their operations with our solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`bg-card/30 backdrop-blur-xl p-8 rounded-2xl border border-border hover:border-lime-400/50 focus-within:border-lime-400/50 transition-all duration-500 hover:scale-105 focus-within:scale-105 hover:shadow-2xl focus-within:shadow-2xl hover:shadow-lime-400/20 focus-within:shadow-lime-400/20 group cursor-pointer relative overflow-hidden ${visibleSections.has("testimonials-section") ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                role="listitem"
                tabIndex={0}
                aria-label={`Testimonial from ${testimonial.name}, ${testimonial.role} at ${testimonial.company}`}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                ></div>
                <div className="relative z-10">
                  <div
                    className="flex items-center gap-1 mb-4"
                    role="img"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-lime-400 text-lg" aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground group-hover:text-foreground group-focus:text-foreground transition-colors duration-300 leading-relaxed mb-6 italic">
                    "{testimonial.testimonial}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={`${testimonial.name}, ${testimonial.role} at ${testimonial.company}`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full border-2 border-lime-400/50 group-hover:border-lime-400 group-focus:border-lime-400 transition-colors duration-300"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-lime-400 group-focus:text-lime-400 transition-colors duration-300">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cta-section"
        data-animate
        className={`px-6 py-20 lg:px-12 relative transition-all duration-1000 ${visibleSections.has("cta-section") ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        aria-labelledby="cta-heading"
      >
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent backdrop-blur-sm"
          aria-hidden="true"
        ></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-card/30 backdrop-blur-2xl p-12 rounded-3xl border border-border shadow-2xl shadow-background/50 group hover:scale-105 focus-within:scale-105 transition-transform duration-500">
            <div
              className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-emerald-400/5 rounded-3xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            ></div>
            <div className="relative z-10">
              <div className="inline-block bg-red-500/20 backdrop-blur-xl px-4 py-2 rounded-full border border-red-400/30 mb-6">
                <span className="text-red-400 text-sm font-semibold animate-pulse">
                  ⚡ Limited Time: Free Strategy Session
                </span>
              </div>

              <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300 relative">
                  <span>Ready to Save 10+ Hours Weekly?</span>
                  <span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-400 animate-pulse"
                    aria-hidden="true"
                  ></span>
                </span>
              </h2>
              <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent hover:from-lime-400 hover:to-emerald-400 transition-all duration-500">
                Get Your Free Automation Strategy Session
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed group-hover:text-foreground group-focus-within:text-foreground transition-colors duration-300">
                Join 150+ businesses already saving time and money with our proven automation systems.
                <span className="text-lime-400 font-semibold"> Book your free consultation today!</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button
                  onClick={navigateToContact}
                  className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 focus:from-lime-500 focus:to-emerald-500 text-gray-900 px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-110 focus:scale-110 hover:shadow-2xl focus:shadow-2xl hover:shadow-lime-400/40 focus:shadow-lime-400/40 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Claim your free strategy session - limited availability"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] group-focus:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                  <span className="relative group-hover:animate-pulse">Claim Your Free Session</span>
                </Button>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></span>
                    <span>No commitment • 30-min session • Instant value</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground/60">⏰ Only 5 spots available this month</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
