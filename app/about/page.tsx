"use client"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { HeroLayout } from "@/components/ui/hero-layout"
import { motion } from "framer-motion"

export default function About() {
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
    <HeroLayout lightningHue={95} lightningIntensity={0.4}>
      <SiteHeader />

      <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-lime-400 text-sm font-semibold tracking-wider uppercase shadow-lg">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
              ABOUT US
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Empowering Businesses Through{" "}
            <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
              Smart Technology
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            We're passionate about helping businesses leverage technology to work smarter, not harder. Our mission is to
            eliminate inefficiencies and unlock your team's potential through intelligent automation and custom
            solutions.
          </motion.p>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">Story</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 hover:text-white/90 transition-colors duration-300">
                Founded with a vision to bridge the gap between complex technology and practical business solutions,
                Ayothedoc emerged from the understanding that every business deserves access to powerful automation and
                web development tools.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 hover:text-white/90 transition-colors duration-300">
                We've witnessed firsthand how the right technology can transform operations, save countless hours, and
                drive significant growth. That's why we're committed to making these solutions accessible and
                understandable for businesses of all sizes.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed hover:text-white/90 transition-colors duration-300">
                Today, we continue to evolve our services, staying at the forefront of web development and AI automation
                to ensure our clients always have access to the most effective solutions available.
              </p>
            </motion.div>

            <motion.div
              className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-lime-400/10 transition-all duration-500 hover:scale-[1.02]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-emerald-400/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                  Our Mission
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 hover:text-white/90 transition-colors duration-300">
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
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      <p className="text-gray-300 group-hover:text-white/90 transition-colors duration-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet the{" "}
            <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
              Founder
            </span>
          </motion.h2>

          <motion.div
            className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-lime-400/10 transition-all duration-500 hover:scale-[1.02] group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-emerald-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-32 h-32 bg-gradient-to-br from-lime-400/20 to-emerald-400/20 rounded-full mx-auto mb-6 flex items-center justify-center border border-lime-400/30 group-hover:scale-110 transition-transform duration-300">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-lime-400 transition-colors duration-300 text-white">
                Ayothedoc
              </h3>
              <p className="text-lime-400 text-lg mb-6 font-semibold">Founder & Lead Developer</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                With years of experience in web development and business automation, Ayothedoc founded this agency with
                a clear vision: to help businesses harness the power of technology without the complexity. Specializing
                in WordPress development, AI automation, and process optimization, Ayothedoc brings both technical
                expertise and business acumen to every project.
              </p>
              <blockquote className="text-gray-300 text-lg leading-relaxed italic border-l-4 border-lime-400/30 pl-6 group-hover:text-white/90 group-hover:border-lime-400/50 transition-all duration-300">
                "I believe that technology should work for you, not against you. My goal is to create solutions that are
                not only powerful but also intuitive and sustainable for long-term success."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
                Values
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              These core principles guide everything we do and ensure we deliver exceptional value to every client.
            </motion.p>
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
              <motion.div
                key={value.title}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl text-center shadow-xl hover:shadow-2xl hover:shadow-lime-400/10 transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-emerald-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-lime-400/25 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      {value.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent group-hover:from-emerald-400 group-hover:to-lime-400 transition-all duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white/90 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <motion.div
          className="relative max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to{" "}
            <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
              Work Together
            </span>
            ?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Let's discuss how we can help transform your business with smart technology solutions.
          </p>
          <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-lime-400/25 transition-all duration-300 hover:scale-110 group">
            <span className="group-hover:scale-110 transition-transform duration-200">Get Started Today</span>
          </Button>
        </motion.div>
      </section>
    </HeroLayout>
  )
}
