"use client"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { useState, useEffect } from "react"

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState({})

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
            id="about-badge"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-sm font-semibold tracking-wider uppercase shadow-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              ABOUT US
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-in-up"
            data-animate
            id="about-title"
            style={{ animationDelay: "0.4s" }}
          >
            We run your business on{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              AI operations
            </span>
          </h1>

          <p
            className="text-muted-foreground text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            data-animate
            id="about-subtitle"
            style={{ animationDelay: "0.6s" }}
          >
            Ayothedoc builds and runs AI operations for small agencies and consultants. The same person who designs
            your system is the one who runs it, no account managers, no handoffs to someone junior. Owner-led,
            measured against a real baseline, and built to run while you are in client work.
          </p>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className="opacity-0 animate-fade-in-up"
              data-animate
              id="story-content"
              style={{ animationDelay: "0.8s" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Story</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 hover:text-foreground/80 transition-colors duration-300">
                Small agencies all hit the same wall: the owner becomes the bottleneck. Leads go cold while you are in
                a client call. Reports get written at 11pm. Follow-ups happen when someone remembers. The work that
                wins clients keeps losing to the work that keeps the lights on.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 hover:text-foreground/80 transition-colors duration-300">
                Ayothedoc exists to take that operational layer off your plate. Not another tool to learn, an operating
                system we build around how you already work, connect to the tools you already use, and run for you. It
                starts with one thing that pays for itself fast: a Lead Engine that replies to every inbound lead in
                under 60 seconds, in your voice.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed hover:text-foreground/80 transition-colors duration-300">
                From there it grows into the full system: onboarding, reporting, follow-ups, all running on a schedule,
                all measured against the hours you used to spend doing them by hand.
              </p>
            </div>

            <div
              className="backdrop-blur-xl bg-card/50 border border-border/50 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] opacity-0 animate-fade-in-up"
              data-animate
              id="mission-card"
              style={{ animationDelay: "1.0s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  How we work
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 hover:text-foreground/80 transition-colors duration-300">
                  We build on the Four Cs: Context (the system knows your business and voice), Connections (it works
                  inside your existing tools), Capabilities (the workflows that do the work), and Cadence (it runs on a
                  schedule, unprompted).
                </p>
                <div className="space-y-4">
                  {[
                    "Prove value free before you pay anything",
                    "Custom-built around your business, never off-the-shelf templates",
                    "You own everything: cancel anytime and keep the system",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 opacity-0 animate-fade-in-up"
            data-animate
            id="founder-title"
            style={{ animationDelay: "1.2s" }}
          >
            Meet the{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Founder
            </span>
          </h2>

          <div
            className="backdrop-blur-xl bg-card/50 border border-border/50 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] opacity-0 animate-fade-in-up group"
            data-animate
            id="founder-card"
            style={{ animationDelay: "1.4s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                Ayo
              </h3>
              <p className="text-primary text-lg mb-6 font-semibold">Founder, Ayothedoc</p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                I build and run these systems myself. When you work with Ayothedoc you work directly with the person
                doing the build, not an account manager who hands it to someone junior. I design the workflows, wire
                them into your tools, and stay on them as your business changes.
              </p>
              <blockquote className="text-muted-foreground text-lg leading-relaxed italic border-l-4 border-primary/30 pl-6 group-hover:text-foreground/80 group-hover:border-primary/50 transition-all duration-300">
                "I use the least AI necessary and the simplest workflow that reliably works. Fewer moving parts, fewer
                failures, a system you can actually trust. And if it does not recover the hours we agreed on, I keep
                working until it does."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in-up"
              data-animate
              id="values-title"
              style={{ animationDelay: "1.6s" }}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                Values
              </span>
            </h2>
            <p
              className="text-muted-foreground text-lg max-w-3xl mx-auto opacity-0 animate-fade-in-up"
              data-animate
              id="values-subtitle"
              style={{ animationDelay: "1.8s" }}
            >
              These core principles guide everything we do and ensure we deliver exceptional value to every client.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                ),
                title: "Least AI necessary",
                description:
                  "No hype, no AI for the sake of it. We use the simplest workflow that reliably works, because fewer moving parts means fewer failures and a system you can trust.",
              },
              {
                icon: (
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                ),
                title: "You own everything",
                description:
                  "The system, the automations, the documentation, all yours. No black boxes, no lock-in. Cancel anytime and keep what we built.",
              },
              {
                icon: (
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                ),
                title: "Measured, not vibes",
                description:
                  "We capture your manual-hours baseline at kickoff and measure against it. The promise is concrete: recover 40+ hours a month or we keep working free until you do.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="group backdrop-blur-xl bg-card/50 border border-border/50 p-6 rounded-2xl text-center shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 opacity-0 animate-fade-in-up"
                data-animate
                id={`value-${index}`}
                style={{ animationDelay: `${2.0 + index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      {value.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div
          className="relative max-w-4xl mx-auto text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-3xl p-12 shadow-2xl opacity-0 animate-fade-in-up"
          data-animate
          id="cta-section"
          style={{ animationDelay: "2.6s" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See it work on{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              your real leads
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            We build your 60-Second Lead Engine free, no card, no risk. If it books calls you would have missed, we
            talk about running the rest of your operations.
          </p>
          <a href="/contact">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110 group">
              <span className="group-hover:scale-110 transition-transform duration-200">Get your free Lead Engine</span>
            </Button>
          </a>
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
