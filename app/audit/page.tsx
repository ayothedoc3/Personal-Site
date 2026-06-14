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
  customIndustry?: string
  blocker?: string
  hours?: string
  optin_marketing: boolean
}

interface AuditOpportunity {
  label: string
  layer?: string | null
  value: string
}

interface AuditPreview {
  readinessScore: number | null
  headline?: string
  opportunities: AuditOpportunity[]
  hoursSavedPerMonth: string
  exampleWorkflow: string
}

// Maps the hours dropdown to a representative number (or null when unspecified),
// so we never fabricate an hours figure for the report.
const HOURS_TO_NUMBER: Record<string, number> = { "1-2": 2, "3-5": 4, "6+": 7 }

export default function AuditPage() {
  const [step, setStep] = useState<'form' | 'result' | 'complete'>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [auditPreview, setAuditPreview] = useState<AuditPreview | null>(null)
  const [formData, setFormData] = useState<AuditFormData>({
    name: '',
    email: '',
    website: '',
    industry: '',
    customIndustry: '',
    blocker: '',
    hours: '',
    optin_marketing: false
  })

  // Industry the prospect actually told us (free text when they pick "Other").
  const effectiveIndustry =
    formData.industry === 'Other' ? (formData.customIndustry?.trim() || 'Other') : formData.industry


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    trackEvent("lead_submit", { lead_type: "audit", industry: effectiveIndustry || "unknown" })

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
          businessType: effectiveIndustry,
          currentChallenges: formData.blocker || 'General workflow optimization',
          timeSpentDaily: formData.hours ? HOURS_TO_NUMBER[formData.hours] ?? null : null,
          optin_marketing: formData.optin_marketing
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        trackEvent("lead_submit_error", { lead_type: "audit" })
        throw new Error(data.error || 'Failed to submit audit request')
      }

      if (data.preview) setAuditPreview(data.preview as AuditPreview)
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
                Get your AI Operating System readiness audit
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                A personalized read on where AI can run your operations, scored across the Four Cs and sent to your inbox.
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
                <CardTitle>Get your free AIOS readiness audit</CardTitle>
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
                    <select
                      required
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="" disabled>Select your business type…</option>
                      <option value="Marketing agency">Marketing agency</option>
                      <option value="Web or design agency">Web or design agency</option>
                      <option value="Consulting firm">Consulting firm</option>
                      <option value="Other agency or service business">Other agency or service business</option>
                    </select>
                  </div>

                  {formData.industry === 'Other' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Tell us your industry *</label>
                      <Input
                        required
                        placeholder="e.g. dental clinic, recruiting firm, real estate"
                        value={formData.customIndustry}
                        onChange={(e) => setFormData(prev => ({ ...prev, customIndustry: e.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground mt-1">We read this and use it to analyze your business.</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Hours per day on manual or repetitive work</label>
                    <select
                      value={formData.hours}
                      onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                      className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="1-2">1 to 2 hours</option>
                      <option value="3-5">3 to 5 hours</option>
                      <option value="6+">6 or more hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Biggest blocker right now</label>
                    <Input
                      placeholder="Lead follow up, manual data entry, scheduling"
                      value={formData.blocker}
                      onChange={(e) => setFormData(prev => ({ ...prev, blocker: e.target.value }))}
                    />
                  </div>

                  <Checkbox
                    checked={formData.optin_marketing}
                    onChange={(e) => setFormData(prev => ({ ...prev, optin_marketing: e.target.checked }))}
                    label="Also send me automation tips and case studies"
                  />

                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.name ||
                      !formData.email ||
                      !formData.website ||
                      !formData.industry ||
                      (formData.industry === 'Other' && !formData.customIndustry?.trim())
                    }
                    className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 py-3 rounded-full font-semibold transition-all duration-500"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Generating your audit...
                      </>
                    ) : (
                      "Get my free audit"
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
              <h2 className="text-3xl font-bold mb-4">Your AI readiness snapshot</h2>
              <p className="text-muted-foreground">Based on your {effectiveIndustry} business</p>
            </div>

            {typeof auditPreview?.readinessScore === 'number' && (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-lime-400 mb-1">
                    {auditPreview.readinessScore}
                    <span className="text-xl text-muted-foreground">/100</span>
                  </div>
                  <p className="text-muted-foreground">AI Operating System readiness</p>
                  {auditPreview.headline && (
                    <p className="mt-3 text-sm text-foreground/80 max-w-xl mx-auto">{auditPreview.headline}</p>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {(auditPreview?.opportunities?.length ? auditPreview.opportunities : getMiniResults().opportunities).map(
                (opportunity: AuditOpportunity, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-lime-400">{opportunity.label}</h3>
                        {opportunity.layer && (
                          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-400/40 rounded-full px-2 py-0.5 whitespace-nowrap">
                            {opportunity.layer}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground">{opportunity.value}</p>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-lime-400 mb-2">
                    {auditPreview?.hoursSavedPerMonth || getMiniResults().hoursSaved}
                  </div>
                  <p className="text-muted-foreground">Estimated hours saved per month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">First workflow we would install</h3>
                  <p className="text-sm text-muted-foreground">
                    {auditPreview?.exampleWorkflow || getMiniResults().exampleWorkflow}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">Your full AIOS readiness report is on its way to {formData.email}</p>
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
          <div className="text-center space-y-6">
            <div className="text-6xl mb-2">✓</div>
            <h2 className="text-3xl font-bold mb-2">Your full audit is on the way</h2>
            <p className="text-xl text-muted-foreground mb-2">It usually arrives in 2 to 5 minutes.</p>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Want to see it work before anything else? We will build your 60-Second Lead Engine free, on your real leads.
            </p>

            <div className="flex justify-center pt-2">
              <Link href="/offer" onClick={() => trackEvent("cta_click", { cta: "audit_complete_lead_engine", destination: "offer" })}>
                <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105">
                  Get your Lead Engine free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
