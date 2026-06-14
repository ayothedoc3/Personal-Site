"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { ContactForm } from "@/components/contact-form"
import { useState, useEffect } from "react"

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState({})
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

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

  const handleFormSuccess = () => {
    setShowSuccessAnimation(true)
    setTimeout(() => setShowSuccessAnimation(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-clip">
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

      <SiteHeader />

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
              FREE BUILD, NO CARD
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-in-up"
            data-animate
            id="contact-title"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Get your free
            </span>{" "}
            <span className="inline-block hover:scale-105 transition-transform duration-300">60-Second Lead Engine</span>
          </h1>

          <p
            className="text-muted-foreground text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            data-animate
            id="contact-subtitle"
            style={{ animationDelay: "0.6s" }}
          >
            Tell us about your business below. We&apos;ll build you a system that replies to every new lead in under 60
            seconds, personalized, in your voice, with your booking link, on your real leads, free. If it books calls
            you&apos;d have missed, we talk about running the rest of your operations.
          </p>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div
              className="backdrop-blur-xl bg-card/50 border border-border/50 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-lime-400/10 transition-all duration-500 opacity-0 animate-fade-in-up"
              data-animate
              id="contact-form"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-emerald-400/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                  Request your free Lead Engine
                </h2>
                <ContactForm onSuccess={handleFormSuccess} />
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
                  How the free build works
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 hover:text-foreground/80 transition-colors duration-300">
                  No card, no call required, no risk. We build your Lead Engine on your real leads so you can watch it
                  work. Most builds are live within a few days.
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
                    Your free Lead Engine includes:
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "Replies to every new lead in under 60 seconds",
                      "Personalized and written in your voice",
                      "Your booking link built into every reply",
                      "Instant alert to you on every new lead",
                      "Built on your real leads, no card required",
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
                      "Start free: we build your Lead Engine before you pay anything",
                      "On paid plans: recover 40+ hours a month or we keep working free until you do",
                      "Built on your tools and trained on your real replies",
                      "We run and improve it for you, every week",
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
                question: "How long until it's running?",
                answer:
                  "Your AI Operating System is installed and live in 10 business days. We then measure recovered hours against your kickoff baseline over the following 30 days.",
              },
              {
                question: "Do you run it for me, or just set it up?",
                answer:
                  "We run it. Beyond the install, our monthly plans cover monitoring, fixes, and shipping one new automation every week. You own everything we build.",
              },
              {
                question: "Does this replace my team?",
                answer:
                  "No. It removes the repetitive work so your team does the work only humans should. Most clients redeploy recovered hours into sales and client delivery.",
              },
              {
                question: "Can you work with my existing tools?",
                answer:
                  "Yes, that's the point. We wire the AIOS into the tools you already use (email, CRM, calendar, billing, docs) so it works from live data, not copy-paste.",
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
