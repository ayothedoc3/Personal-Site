"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    message: "",
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible((prev) => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting,
        }))
      })
    }, observerOptions)

    document.addEventListener("mousemove", handleMouseMove)
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el))

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl animate-float"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 bg-gradient-to-tr from-accent/15 to-primary/15 rounded-full blur-xl animate-bounce-slow" />
      </div>

      <header className="relative z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 sticky top-0">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110">
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Ayothedoc
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact", active: true },
              { href: "/blog", label: "Blog" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 transition-all duration-300 group ${
                  item.active ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    item.active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-6 py-2 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group">
              <span className="group-hover:scale-110 transition-transform duration-200">Book a Consultation</span>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className="mb-8 opacity-0 animate-fade-in-up"
            data-animate
            id="contact-badge"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-sm font-semibold tracking-wider uppercase shadow-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              CONTACT US
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-in-up"
            data-animate
            id="contact-title"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Don't Wait
            </span>{" "}
            <span className="inline-block hover:scale-105 transition-transform duration-300">- Let's Get Started</span>
          </h1>

          <p
            className="text-muted-foreground text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            data-animate
            id="contact-subtitle"
            style={{ animationDelay: "0.6s" }}
          >
            Ready to transform your business with smart automation and custom web solutions? Book your free consultation
            today and discover how we can save your business 10+ hours per week.
          </p>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div
              className="backdrop-blur-xl bg-card/50 border border-border/50 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 opacity-0 animate-fade-in-up"
              data-animate
              id="contact-form"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="group">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors duration-200"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
                        placeholder="John"
                      />
                    </div>
                    <div className="group">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors duration-200"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors duration-200"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors duration-200"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors duration-200"
                    >
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="ai-automation">AI Automation</option>
                      <option value="business-development">Online Business Development</option>
                      <option value="virtual-assistance">Virtual Assistance</option>
                      <option value="process-optimization">Process Optimization</option>
                      <option value="technical-support">Technical Support</option>
                    </select>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors duration-200"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50 resize-none"
                      placeholder="Tell us about your project and how we can help..."
                    ></textarea>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02] group">
                    <span className="group-hover:scale-110 transition-transform duration-200">Send Message</span>
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-8">
              <div
                className="opacity-0 animate-fade-in-up"
                data-animate
                id="contact-info"
                style={{ animationDelay: "1.0s" }}
              >
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Get In Touch
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 hover:text-foreground/80 transition-colors duration-300">
                  Ready to streamline your business operations and boost productivity? We're here to help you discover
                  the perfect automation and web development solutions for your unique needs.
                </p>
              </div>

              <div
                className="backdrop-blur-xl bg-card/50 border border-border/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] opacity-0 animate-fade-in-up group"
                data-animate
                id="consultation-benefits"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Free Consultation Includes:
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "Comprehensive business process analysis",
                      "Custom automation recommendations",
                      "Time and cost savings projection",
                      "Implementation roadmap and timeline",
                      "No-obligation project proposal",
                    ].map((item, index) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 hover:text-foreground/80"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className="backdrop-blur-xl bg-card/50 border border-border/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] opacity-0 animate-fade-in-up group"
                data-animate
                id="why-choose"
                style={{ animationDelay: "1.4s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Why Choose Ayothedoc?
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "Proven track record of saving businesses 10+ hours per week",
                      "Expert knowledge in WordPress, Make.com, and N8N",
                      "Personalized solutions tailored to your business",
                      "Ongoing support and optimization",
                    ].map((item, index) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300 hover:text-foreground/80"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className="text-center opacity-0 animate-fade-in-up"
                data-animate
                id="book-now-button"
                style={{ animationDelay: "1.6s" }}
              >
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110 group">
                  <span className="group-hover:scale-110 transition-transform duration-200">I'm Ready - Book Now</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in-up"
              data-animate
              id="faq-title"
              style={{ animationDelay: "1.8s" }}
            >
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                Questions
              </span>
            </h2>
            <p
              className="text-muted-foreground text-lg opacity-0 animate-fade-in-up"
              data-animate
              id="faq-subtitle"
              style={{ animationDelay: "2.0s" }}
            >
              Get answers to common questions about our services and process.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary depending on complexity, but most web development projects take 2-6 weeks, while automation setups typically take 1-3 weeks. We'll provide a detailed timeline during your consultation.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "Yes! We offer comprehensive technical support packages to ensure your website and automations continue running smoothly. This includes updates, monitoring, and optimization.",
              },
              {
                question: "What makes your automation solutions different?",
                answer:
                  "We focus on practical, business-specific solutions using proven platforms like Make.com and N8N. Our approach prioritizes ease of use and measurable time savings over complex technical implementations.",
              },
              {
                question: "Can you work with my existing systems?",
                answer:
                  "We specialize in integrating with existing tools and platforms. During our consultation, we'll assess your current setup and recommend the best integration approach.",
              },
            ].map((faq, index) => (
              <div
                key={faq.question}
                className="backdrop-blur-xl bg-card/50 border border-border/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] opacity-0 animate-fade-in-up group"
                data-animate
                id={`faq-${index}`}
                style={{ animationDelay: `${2.2 + index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
