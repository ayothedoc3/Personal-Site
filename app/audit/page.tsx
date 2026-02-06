"use client"

import { useState, useCallback } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface AuditFormData {
  name: string
  email: string
  website: string
  industry: string
  blocker?: string
  optin_marketing: boolean
}

export default function AuditPage() {
  const [step, setStep] = useState<'form' | 'result' | 'complete'>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<AuditFormData>({
    name: '',
    email: '',
    website: '',
    industry: '',
    blocker: '',
    optin_marketing: false
  })

  const openCalendly = useCallback((cta: string) => {
    trackEvent("cta_click", { cta, destination: "calendly" })
    if (typeof window !== "undefined") {
      window.open("https://calendly.com/ayothedoc", "_blank", "noopener,noreferrer")
    }
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    trackEvent("lead_submit", { lead_type: "audit", industry: formData.industry || "unknown" })
    
    try {
      // Call the actual business audit API
      const response = await fetch('/api/business-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          website: formData.website,
          businessType: formData.industry,
          currentChallenges: formData.blocker || 'General workflow optimization',
          timeSpentDaily: 4, // Default estimate for simplicity
          optin_marketing: formData.optin_marketing
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        trackEvent("lead_submit_error", { lead_type: "audit" })
        throw new Error(data.error || 'Failed to submit audit request')
      }

      trackEvent("lead_submit_success", { lead_type: "audit" })
      setStep('result')
    } catch (error) {
      console.error('Audit submission failed:', error)
      trackEvent("lead_submit_error", { lead_type: "audit" })
      // Still show results even if API fails, for better UX
      setStep('result')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getMiniResults = () => {
    const industryLower = formData.industry.toLowerCase()
    
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
      <SiteHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {step === 'form' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
                Get your personalized business automation audit
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Get your custom audit report delivered instantly to your inbox.
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
                <CardTitle>Get Your Free Automation Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your name *</label>
                      <Input
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email address *</label>
                      <Input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your website URL *</label>
                    <Input
                      required
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Business type or industry *</label>
                    <Input
                      required
                      placeholder="E commerce, Agency, SaaS, Coaching"
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Biggest blocker right now</label>
                    <Input
                      placeholder="Lead follow up, manual data entry, scheduling"
                      value={formData.blocker}
                      onChange={(e) => setFormData(prev => ({ ...prev, blocker: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.optin_marketing}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, optin_marketing: !!checked }))}
                    />
                    <label htmlFor="marketing" className="text-sm text-muted-foreground">
                      Also send me automation tips and case studies
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.website || !formData.industry}
                    className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 py-3 rounded-full font-semibold transition-all duration-500"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Generating Your Audit...
                      </>
                    ) : (
                      "Get My Free Automation Audit"
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
              <h2 className="text-3xl font-bold mb-4">Your automation audit results</h2>
              <p className="text-muted-foreground">Based on your {formData.industry} business</p>
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
              <p className="text-muted-foreground mb-6">Your detailed PDF report with full roadmap is being sent to {formData.email}</p>
              <Button
                onClick={() => {
                  trackEvent("audit_result_continue")
                  setStep("complete")
                }}
                className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105"
              >
                Continue
              </Button>
            </div>
          </div>
        )}


        {step === 'complete' && (
          <div className="text-center space-y-8">
            <div className="text-6xl mb-6">✓</div>
            <h2 className="text-3xl font-bold mb-4">Your full audit is on the way</h2>
            <p className="text-xl text-muted-foreground mb-8">It usually arrives in 2 to 5 minutes.</p>
            
            <Button
              onClick={() => openCalendly("audit_complete_book_readout")}
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
