"use client"

import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Loader2 } from "lucide-react"

interface MiniFormData {
  website: string
  industry: string
  blocker?: string
}

interface EmailFormData {
  name: string
  email: string
  optin_marketing: boolean
}

export default function AuditPage() {
  const [step, setStep] = useState<'form' | 'result' | 'email' | 'complete'>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [miniFormData, setMiniFormData] = useState<MiniFormData>({ website: '', industry: '', blocker: '' })
  const [emailFormData, setEmailFormData] = useState<EmailFormData>({ name: '', email: '', optin_marketing: false })

  const openCalendly = () => {
    window.open('https://calendly.com/ayothedoc', '_blank')
  }

  const handleMiniFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate mini audit processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setStep('result')
    setIsSubmitting(false)
  }

  const handleEmailFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setStep('complete')
    setIsSubmitting(false)
  }

  const getMiniResults = () => {
    const industryLower = miniFormData.industry.toLowerCase()
    
    if (industryLower.includes('ecommerce') || industryLower.includes('e-commerce') || industryLower.includes('retail')) {
      return {
        opportunities: [
          { label: "Order processing automation", value: "Streamline order-to-fulfillment workflow, reducing manual entry by 75%" },
          { label: "Customer service chatbot", value: "Handle 60% of common inquiries automatically with instant responses" },
          { label: "Inventory management alerts", value: "Automated restock notifications and low-inventory warnings" }
        ],
        hoursSaved: "15-25",
        exampleWorkflow: "Order confirmation email with tracking automatically triggers inventory update and customer service notification"
      }
    } else if (industryLower.includes('agency') || industryLower.includes('marketing') || industryLower.includes('consulting')) {
      return {
        opportunities: [
          { label: "Client onboarding automation", value: "Streamline contract-to-kickoff process, saving 8 hours per new client" },
          { label: "Reporting dashboard creation", value: "Automated weekly/monthly client reports from multiple data sources" },
          { label: "Lead qualification system", value: "Score and route leads automatically based on preset criteria" }
        ],
        hoursSaved: "12-20",
        exampleWorkflow: "New lead form submission triggers qualification scoring, CRM entry, and personalized follow-up sequence"
      }
    } else if (industryLower.includes('saas') || industryLower.includes('software')) {
      return {
        opportunities: [
          { label: "User onboarding automation", value: "Personalized welcome sequences based on user signup data and behavior" },
          { label: "Support ticket routing", value: "Intelligent categorization and assignment of customer support requests" },
          { label: "Product usage analytics", value: "Automated reports on feature adoption and user engagement patterns" }
        ],
        hoursSaved: "18-30",
        exampleWorkflow: "New user signup triggers personalized onboarding email series and creates usage tracking dashboard"
      }
    } else {
      return {
        opportunities: [
          { label: "Email workflow automation", value: "Set up triggered email sequences for common business processes" },
          { label: "Data entry elimination", value: "Connect your tools to sync data automatically between platforms" },
          { label: "Scheduling optimization", value: "Automated calendar management and meeting coordination" }
        ],
        hoursSaved: "10-18",
        exampleWorkflow: "Contact form submissions automatically create CRM entries and trigger follow-up task assignments"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4 lg:px-12 relative z-10" role="banner">
        <div className="absolute inset-0 bg-background/20 backdrop-blur-xl border-b border-border/50"></div>

        <Link href="/" className="flex items-center gap-2 group relative z-10">
          <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-125 shadow-lg shadow-lime-400/25">
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-lime-400 group-hover:to-emerald-400 transition-all duration-500">
            Ayothedoc
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 relative z-10" role="navigation">
          {[
            { href: "/", text: "Home" },
            { href: "/services", text: "Services" },
            { href: "/audit", text: "Free Audit", active: true },
            { href: "/about", text: "About" },
            { href: "/contact", text: "Contact" },
            { href: "/blog", text: "Blog" },
          ].map((item) => (
            <Link
              key={item.text}
              href={item.href}
              className={`${item.active ? "text-foreground" : "text-muted-foreground"} hover:text-lime-400 transition-all duration-300 hover:scale-105 px-2 py-1`}
            >
              {item.text}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 relative z-10">
          <ThemeToggle />
          <Button
            onClick={openCalendly}
            className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-6 py-2 rounded-full font-medium transition-all duration-500 hover:scale-110"
          >
            Book a Call
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {step === 'form' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
                Get your personalized business automation audit
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Instant snapshot on page. Full report by email in minutes.
              </p>
              <div className="flex justify-center gap-6 text-sm text-lime-400">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No credit card
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  GDPR friendly
                </span>
              </div>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Quick Business Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMiniFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your website URL *</label>
                    <Input
                      required
                      placeholder="https://yourwebsite.com"
                      value={miniFormData.website}
                      onChange={(e) => setMiniFormData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Business type or industry *</label>
                    <Input
                      required
                      placeholder="E commerce, Agency, SaaS, Coaching"
                      value={miniFormData.industry}
                      onChange={(e) => setMiniFormData(prev => ({ ...prev, industry: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Biggest blocker right now</label>
                    <Input
                      placeholder="Lead follow up, manual data entry, scheduling"
                      value={miniFormData.blocker}
                      onChange={(e) => setMiniFormData(prev => ({ ...prev, blocker: e.target.value }))}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !miniFormData.website || !miniFormData.industry}
                    className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 py-3 rounded-full font-semibold transition-all duration-500"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Running Analysis...
                      </>
                    ) : (
                      "Run Free Audit"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Audit snapshot</h2>
            </div>

            <div className="space-y-6">
              {getMiniResults().opportunities.map((opportunity, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lime-400 mb-2">{opportunity.label}</h3>
                    <p className="text-muted-foreground">{opportunity.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-lime-400 mb-2">{getMiniResults().hoursSaved}</div>
                  <p className="text-muted-foreground">Estimated hours saved per month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Example workflow for your industry</h3>
                  <p className="text-sm text-muted-foreground">{getMiniResults().exampleWorkflow}</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">Get the full report with 5 plus workflows, ROI table, and a 30 day plan.</p>
              <Button
                onClick={() => setStep('email')}
                className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105"
              >
                Get Full Report
              </Button>
            </div>
          </div>
        )}

        {step === 'email' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Email me the full report</h2>
              <p className="text-muted-foreground">We will send your detailed PDF in minutes. Your data is secure.</p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <form onSubmit={handleEmailFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <Input
                        required
                        value={emailFormData.name}
                        onChange={(e) => setEmailFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        required
                        value={emailFormData.email}
                        onChange={(e) => setEmailFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={emailFormData.optin_marketing}
                      onCheckedChange={(checked) => setEmailFormData(prev => ({ ...prev, optin_marketing: !!checked }))}
                    />
                    <label htmlFor="marketing" className="text-sm text-muted-foreground">
                      Also send tips and case studies
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !emailFormData.name || !emailFormData.email}
                    className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 py-3 rounded-full font-semibold transition-all duration-500"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending Report...
                      </>
                    ) : (
                      "Send my full audit"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center space-y-8">
            <div className="text-6xl mb-6">✓</div>
            <h2 className="text-3xl font-bold mb-4">Your full audit is on the way</h2>
            <p className="text-xl text-muted-foreground mb-8">It usually arrives in 2 to 5 minutes.</p>
            
            <Button
              onClick={openCalendly}
              className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105"
            >
              Book a 15 minute readout
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}