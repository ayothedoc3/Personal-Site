"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
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
              { href: "/about", label: "About", active: true },
              { href: "/contact", label: "Contact" },
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
            Empowering Businesses Through{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Smart Technology
            </span>
          </h1>

          <p
            className="text-muted-foreground text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            data-animate
            id="about-subtitle"
            style={{ animationDelay: "0.6s" }}
          >
            We're passionate about helping businesses leverage technology to work smarter, not harder. Our mission is to
            eliminate inefficiencies and unlock your team's potential through intelligent automation and custom
            solutions.
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
                Founded with a vision to bridge the gap between complex technology and practical business solutions,
                Ayothedoc emerged from the understanding that every business deserves access to powerful automation and
                web development tools.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 hover:text-foreground/80 transition-colors duration-300">
                We've witnessed firsthand how the right technology can transform operations, save countless hours, and
                drive significant growth. That's why we're committed to making these solutions accessible and
                understandable for businesses of all sizes.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed hover:text-foreground/80 transition-colors duration-300">
                Today, we continue to evolve our services, staying at the forefront of web development and AI automation
                to ensure our clients always have access to the most effective solutions available.
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
                  Our Mission
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 hover:text-foreground/80 transition-colors duration-300">
                  To empower businesses with intelligent technology solutions that eliminate repetitive tasks,
                  streamline operations, and create more time for what matters most - growing your business and serving
                  your customers.
                </p>
                <div className="space-y-4">
                  {[
                    "Simplify complex business processes",
                    "Deliver measurable time and cost savings",
                    "Provide ongoing support and optimization",
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
                Ayothedoc
              </h3>
              <p className="text-primary text-lg mb-6 font-semibold">Founder & Lead Developer</p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                With years of experience in web development and business automation, Ayothedoc founded this agency with
                a clear vision: to help businesses harness the power of technology without the complexity. Specializing
                in WordPress development, AI automation, and process optimization, Ayothedoc brings both technical
                expertise and business acumen to every project.
              </p>
              <blockquote className="text-muted-foreground text-lg leading-relaxed italic border-l-4 border-primary/30 pl-6 group-hover:text-foreground/80 group-hover:border-primary/50 transition-all duration-300">
                "I believe that technology should work for you, not against you. My goal is to create solutions that are
                not only powerful but also intuitive and sustainable for long-term success."
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
                title: "Quality First",
                description:
                  "We never compromise on quality. Every solution is thoroughly tested and optimized to ensure it meets the highest standards.",
              },
              {
                icon: (
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                ),
                title: "Client-Centric",
                description:
                  "Your success is our success. We take the time to understand your unique needs and tailor solutions accordingly.",
              },
              {
                icon: (
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                ),
                title: "Innovation",
                description:
                  "We stay ahead of the curve, continuously learning and implementing the latest technologies to benefit our clients.",
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
            Ready to{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Work Together
            </span>
            ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let's discuss how we can help transform your business with smart technology solutions.
          </p>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110 group">
            <span className="group-hover:scale-110 transition-transform duration-200">Get Started Today</span>
          </Button>
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
