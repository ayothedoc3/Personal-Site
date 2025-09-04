"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState, useCallback } from "react"

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

interface ApproachStep {
  title: string
  subtitle: string
  desc: string
  icon: string
}

interface TeamMember {
  name: string
  role: string
  title: string
  quote: string
  avatar: string
  links?: string[]
  recognition?: string[]
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set<string>())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [typedText] = useState("The Fastest Way to Build What's Next")
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
    { number: 60, label: "Speed to Market", suffix: "%" },
    { number: 100, label: "Custom Solutions", suffix: "%" },
    { number: 24, label: "Ongoing Support", suffix: "/7" },
    { number: 35, label: "Fractional CAIO", suffix: "K" },
  ]

  const testimonials: TestimonialItem[] = [
    {
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO",
      testimonial:
        "The Build Room transformed our operations with AI automations that saved us 20+ hours per week. The ROI was immediate.",
      rating: 5,
      avatar: "/professional-woman-ceo.png",
    },
    {
      name: "Michael Chen",
      company: "GrowthLab Agency",
      role: "Operations Director",
      testimonial:
        "Their custom AI solutions helped us launch new products 60% faster. We went from concept to deployment in weeks.",
      rating: 5,
      avatar: "/professional-operations-director.png",
    },
    {
      name: "Emily Rodriguez",
      company: "Digital Dynamics",
      role: "Founder",
      testimonial:
        "The AI-powered workflows they built for us turned manual processes into growth engines. Game-changing results.",
      rating: 5,
      avatar: "/professional-woman-founder.png",
    },
  ]

  const services: ServiceItem[] = [
    {
      title: "Automations & Workflows",
      desc: "Save time and scale faster with AI-powered business automations, CRM systems, and back-office workflows.",
      icon: "🤖",
    },
    {
      title: "Personal Brand & Growth Systems",
      desc: "AI strategies and tools to grow authority, visibility, and demand with automated content and engagement.",
      icon: "📈",
    },
    {
      title: "Custom Apps & Micro-SaaS",
      desc: "Full-stack builds that turn ideas into products. AI-powered web apps, dashboards, and digital products.",
      icon: "🌐",
    },
    {
      title: "Consulting & Advisory",
      desc: "Expert guidance to unlock AI opportunities with adoption roadmaps, audits, and best practices training.",
      icon: "💡",
    },
  ]

  const approachSteps: ApproachStep[] = [
    {
      title: "Find the Leverage",
      subtitle: "(Discovery)",
      desc: "We identify the highest-ROI opportunities for AI in your business — whether that's automating lead gen, saving 20+ hours a week, or launching a client-facing tool.",
      icon: "🎯",
    },
    {
      title: "Map the Fastest Path",
      subtitle: "(Strategy)",
      desc: "Instead of endless plans, we build a clear roadmap that shows exactly what to launch first, how fast it pays back, and how to scale it.",
      icon: "🗺️",
    },
    {
      title: "Build What's Next",
      subtitle: "(Development)",
      desc: "From automations to full-stack apps, we develop and deploy the systems that drive client acquisition, efficiency, and new revenue.",
      icon: "🚀",
    },
    {
      title: "Make It Work",
      subtitle: "(Integration)",
      desc: "We don't just ship a system. We plug it into your workflows, train your team, and ensure it runs seamlessly so you see results from day one.",
      icon: "⚙️",
    },
  ]

  const teamMembers: TeamMember[] = [
    {
      name: "Ayokunle",
      role: "Principal AI Strategist",
      title: "Founder of The Build Room",
      quote: "I founded The Build Room with a single mission: demystify artificial intelligence and show people how they can leverage this amazing technology.",
      avatar: "/ayokunle.png",
      links: ["LinkedIn", "Skool", "YouTube"],
      recognition: ["Y Combinator", "Forbes 30u30", "TechCrunch"],
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
      <header
        className={`flex items-center justify-between px-6 py-4 lg:px-12 relative z-10 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        role="banner"
      >
        <div className="absolute inset-0 bg-background/20 backdrop-blur-xl border-b border-border/50"></div>

        <div className="flex items-center gap-2 group relative z-10">
          <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-125 shadow-lg shadow-lime-400/25">
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-lime-400 group-hover:to-emerald-400 transition-all duration-500">
            The Build Room
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 relative z-10" role="navigation">
          {[
            { href: "#services", text: "Services", onClick: () => scrollToSection('services') },
            { href: "#approach", text: "Approach", onClick: () => scrollToSection('approach') },
            { href: "#reviews", text: "Reviews", onClick: () => scrollToSection('reviews') },
            { href: "#team", text: "Team", onClick: () => scrollToSection('team') },
            { href: "#solutions", text: "Solutions", onClick: () => scrollToSection('solutions') },
          ].map((item, index) => (
            <button
              key={item.text}
              onClick={item.onClick}
              className="relative px-3 py-2 text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-110 group"
            >
              <span className="relative z-10">{item.text}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 relative z-10">
          <ThemeToggle />
          <Button
            onClick={openCalendly}
            className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-medium transition-all duration-500 hover:scale-110 shadow-lg hover:shadow-lime-400/50"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main id="main-content" className="relative z-10">
        <section className="min-h-[90vh] flex items-center justify-center px-6 lg:px-12">
          <div className="text-center max-w-6xl mx-auto">
            <div
              className={`transition-all duration-1500 delay-300 ${visibleSections.has('main-content') || isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
                <span className="block text-muted-foreground text-lg md:text-xl mb-4 font-normal">Get Started</span>
                <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                  {typedText}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
                We build and deploy AI solutions that land clients, cut costs,
                and boost revenue in weeks, not months.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button
                  onClick={openCalendly}
                  className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-lime-400/50"
                >
                  Book a Consultation
                </Button>
              </div>

              <p className="text-muted-foreground mb-8">Our team has worked with and been recognized by</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
                <div className="text-2xl font-bold">Y Combinator</div>
                <div className="text-2xl font-bold">Forbes 30u30</div>
                <div className="text-2xl font-bold">TechCrunch</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Custom AI systems, apps, and automations that turn ideas into growth engines — so your business scales without adding more hours or headcount.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`group p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10 ${
                    visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section id="approach" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Approach</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A proven process to turn AI into growth — fast, simple, and built for results.
              </p>
            </div>

            <div className="space-y-8">
              {approachSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`flex flex-col md:flex-row items-start gap-8 p-8 rounded-2xl bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm border border-border/30 hover:border-lime-400/30 transition-all duration-500 ${
                    visibleSections.has('approach') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-4xl">{step.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      {step.title} <span className="text-muted-foreground text-lg">{step.subtitle}</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={openCalendly}
                className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-110"
              >
                Book your call today
              </Button>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
              <p className="text-xl text-muted-foreground">
                Real results from real businesses who've transformed their operations with our AI solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className={`p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 ${
                    visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.testimonial}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-gray-900 font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-20">
              <h3 className="text-3xl font-bold text-center mb-12">The Build Room Difference</h3>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`p-6 rounded-2xl bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm border border-border/30 transition-all duration-500 ${
                      currentStat === index ? 'border-lime-400/50 scale-105 shadow-lg shadow-lime-400/20' : ''
                    }`}
                  >
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                      {stat.number}{stat.suffix}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Led by Ayokunle</h2>
            </div>

            <div className="flex justify-center">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`text-center p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 transition-all duration-500 max-w-2xl ${
                    visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-gray-900 font-bold text-3xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.role}</h3>
                  <h4 className="text-3xl font-bold mb-4">{member.name}</h4>
                  <p className="text-muted-foreground mb-6 italic text-lg">"{member.quote}"</p>
                  
                  {member.links && (
                    <div className="flex justify-center gap-6 mb-6">
                      {member.links.map((link) => (
                        <span key={link} className="text-lime-400 hover:text-emerald-400 transition-colors duration-300 cursor-pointer font-semibold">
                          {link}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {member.recognition && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">RECOGNIZED BY:</p>
                      <div className="flex justify-center gap-6 text-base font-semibold">
                        {member.recognition.map((item) => (
                          <span key={item} className="text-foreground">{item}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* AI Advisory Team */}
            <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm border border-border/30">
              <h3 className="text-2xl font-bold mb-4">AI Advisory Team</h3>
              <p className="text-muted-foreground mb-4">Strategic Technology Partners</p>
              <p className="text-sm text-muted-foreground mb-4">
                "Leveraging cutting-edge AI models and industry expertise to deliver transformative solutions for our clients."
              </p>
              <p className="text-sm">POWERED BY: GPT-4, Claude, Gemini & more.</p>
            </div>
          </div>
        </section>

        {/* Solutions/Pricing Section */}
        <section id="solutions" className="py-20 px-6 lg:px-12 relative" data-animate>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
              <p className="text-xl text-muted-foreground">
                Choose the solution that best fits your business needs and accelerate your AI transformation journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* AI Partner */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-lime-400/50 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-2">AI Partner</h3>
                <p className="text-muted-foreground mb-6">Ideal for businesses exploring AI possibilities</p>
                <div className="text-4xl font-bold mb-6">
                  <span className="text-2xl">$</span>Custom<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Adaptive pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Use case discovery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Initial strategy consultation</span>
                  </li>
                </ul>
                <Button
                  onClick={openCalendly}
                  className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105"
                >
                  Get Started
                </Button>
              </div>

              {/* Fractional CAIO */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border-2 border-lime-400/50 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-lime-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2">Fractional CAIO</h3>
                <p className="text-muted-foreground mb-6">Designed for forward-looking businesses needing Chief AI Officer-level expertise</p>
                <div className="text-4xl font-bold mb-6">
                  $35,000<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "AI Strategy Roadmap",
                    "Executive Alignment",
                    "Vendor & Tool Selection",
                    "Workflow & Process",
                    "Training & Adoption",
                    "Documentation & SOPs",
                    "Metrics & Reporting",
                    "Risk & Compliance Oversight",
                    "Innovation & Leverage",
                    "AI Agent & Integration Design"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={openCalendly}
                  className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105"
                >
                  Get Started
                </Button>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Need something custom? Let's discuss your specific requirements.</p>
              <Button
                onClick={openCalendly}
                variant="outline"
                className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105"
              >
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 backdrop-blur-sm">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Business with AI?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Book a free consultation to discover how our AI solutions can revolutionize your operations, boost efficiency, and drive unprecedented growth.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                <div>
                  <h3 className="font-bold mb-2">Personalized Strategy</h3>
                  <p className="text-sm text-muted-foreground">Get a custom roadmap tailored to your specific business challenges and goals.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Expert Guidance</h3>
                  <p className="text-sm text-muted-foreground">Benefit from years of experience helping businesses implement AI solutions.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Fast Implementation</h3>
                  <p className="text-sm text-muted-foreground">Start seeing results quickly with our proven methodologies and frameworks.</p>
                </div>
              </div>

              <Button
                onClick={openCalendly}
                className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-bold transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-lime-400/50"
              >
                Book Your Consultation
              </Button>
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