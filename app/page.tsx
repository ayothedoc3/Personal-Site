"use client"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { HeroLayout } from "@/components/ui/hero-layout"
import { useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  const openCalendly = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open('https://calendly.com/ayothedoc', '_blank', 'noopener,noreferrer')
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <HeroLayout lightningHue={95} lightningIntensity={0.5}>
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <main id="main-content" className="relative z-10">
        <section className="min-h-[90vh] flex items-center justify-center px-6 lg:px-12">
          <motion.div
            className="text-center max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Automation and AI systems that save 10 to 40 hours per month
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              We design and ship automations that cut manual work and unlock growth within 30 days.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
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
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-400 mb-8">Works with your stack</motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="text-xl font-semibold text-white/80 hover:text-white transition-colors">Shopify</div>
              <div className="text-xl font-semibold text-white/80 hover:text-white transition-colors">WooCommerce</div>
              <div className="text-xl font-semibold text-white/80 hover:text-white transition-colors">Notion</div>
              <div className="text-xl font-semibold text-white/80 hover:text-white transition-colors">Google Workspace</div>
              <div className="text-xl font-semibold text-white/80 hover:text-white transition-colors">Zapier</div>
              <div className="text-xl font-semibold text-white/80 hover:text-white transition-colors">n8n</div>
              <div className="text-xl font-semibold text-white/80 hover:text-white transition-colors">Apify</div>
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What we deliver</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors duration-300 text-white">
                  Automation Readiness Assessment
                </h3>
                <div className="text-2xl font-bold text-lime-400 mb-2">€49–199</div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Quick scorecard and roadmap, redeemable against a build.
                </p>
                <Link href="/audit">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all duration-500 hover:scale-105">
                    Start Free Audit
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors duration-300 text-white">
                  Automation Systems
                </h3>
                <div className="text-2xl font-bold text-lime-400 mb-2">from €2,500</div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Done-for-you workflows that cut manual work in weeks, not months.
                </p>
                <Link href="/services">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all duration-500 hover:scale-105">
                    See Packages
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors duration-300 text-white">
                  Managed Care Plans
                </h3>
                <div className="text-2xl font-bold text-lime-400 mb-2">€600–3,000/mo</div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Ongoing monitoring, fixes, and improvements.
                </p>
                <Link href="/services#care">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all duration-500 hover:scale-105">
                    View Care Plans
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors duration-300 text-white">
                  Custom Builds
                </h3>
                <div className="text-2xl font-bold text-lime-400 mb-2">Custom pricing</div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Full-stack apps and dashboards when you need more than a workflow.
                </p>
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all duration-500 hover:scale-105">
                    Talk to Us
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section id="case-study" className="py-20 px-6 lg:px-12 relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 mb-6">
              <span className="text-lime-400 text-sm font-semibold tracking-wider uppercase">Client result</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Order to ticketing automation cut manual time by 80 percent in 21 days</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <motion.div
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-2xl font-bold text-lime-400 mb-2">25 hours</div>
                <p className="text-gray-300">Saved per month across support</p>
              </motion.div>
              <motion.div
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-2xl font-bold text-lime-400 mb-2">90%</div>
                <p className="text-gray-300">Reduced missed follow ups</p>
              </motion.div>
              <motion.div
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-2xl font-bold text-lime-400 mb-2">Weekly</div>
                <p className="text-gray-300">Added report for ops</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The workflows turned manual processes into growth engines. We saw results in weeks.",
                  author: "Emily Rodriguez, Founder, Digital Dynamics"
                },
                {
                  quote: "Custom automations saved us more than 20 hours per week. Fast return on investment.",
                  author: "Sarah Johnson, CEO, TechStart Solutions"
                },
                {
                  quote: "We launched internal tools 60 percent faster and kept scaling.",
                  author: "Michael Chen, Operations Director, GrowthLab"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-400/50 transition-all duration-500 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-6 lg:px-12 relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-12 rounded-3xl bg-lime-400/10 border border-lime-400/30 backdrop-blur-sm">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
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
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 lg:px-12 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white">The Fastest Way to Build What's Next</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
              <div>
                <h4 className="font-bold mb-4 text-white">Services</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>AI Strategy</li>
                  <li>Custom Development</li>
                  <li>Data Analytics</li>
                  <li>Process Automation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-white">Connect</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>Contact</li>
                  <li>Skool Community</li>
                  <li>1:1 Coaching</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </HeroLayout>
  )
}
