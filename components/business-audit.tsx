"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Globe, Mail, Sparkles, Target, TrendingUp, Zap } from "lucide-react"

const auditSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().url("Please enter a valid website URL"),
  businessType: z.string().min(3, "Please describe your business type"),
  currentChallenges: z.string().min(20, "Please provide more detail about your challenges"),
  timeSpentDaily: z.number().min(1).max(24, "Hours must be between 1-24"),
})

type AuditFormData = z.infer<typeof auditSchema>

interface BusinessAuditProps {
  className?: string
}

export function BusinessAudit({ className }: BusinessAuditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
  })

  const onSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch('/api/business-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit audit request')
      }

      setSubmitStatus("success")
      setSubmitMessage("🎉 Your personalized automation audit is being generated! Check your email in 2-3 minutes for your custom report.")
      reset()
    } catch (error) {
      console.error('Audit submission failed:', error)
      setSubmitStatus("error")
      setSubmitMessage("Sorry, there was an error processing your audit. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-400/10 to-pink-400/10 border border-purple-400/20 rounded-full text-purple-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          AI-Powered Business Audit
        </div>
        <h2 className="text-3xl font-bold mb-2">
          Get Your Personalized Automation Report
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our AI analyzes your website and business to identify specific automation opportunities tailored to your industry
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-blue-400/20 bg-blue-400/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-8 h-8 text-blue-400" />
              <h3 className="font-semibold">Website Analysis</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              AI scans your site to understand your business model and identify automation gaps
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-400/20 bg-green-400/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-8 h-8 text-green-400" />
              <h3 className="font-semibold">Custom Recommendations</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Receive specific automation ideas based on your industry and current challenges
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-400/20 bg-purple-400/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <h3 className="font-semibold">ROI Projections</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Get estimated time and cost savings for each recommended automation
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Get Your Free Audit Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <Input
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register("name")}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Your Website URL *
              </label>
              <Input
                type="url"
                placeholder="https://yourwebsite.com"
                error={errors.website?.message}
                {...register("website")}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Our AI will analyze your site to understand your business
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Business Type/Industry *
              </label>
              <Input
                placeholder="e.g., E-commerce, Consulting, SaaS, Coaching"
                error={errors.businessType?.message}
                {...register("businessType")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Hours Spent on Repetitive Tasks Daily *
              </label>
              <Input
                type="number"
                min="1"
                max="24"
                placeholder="4"
                error={errors.timeSpentDaily?.message}
                {...register("timeSpentDaily", { valueAsNumber: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Current Business Challenges *
              </label>
              <Textarea
                rows={4}
                placeholder="e.g., Managing customer inquiries, manual data entry, social media posting, lead follow-up, scheduling..."
                error={errors.currentChallenges?.message}
                {...register("currentChallenges")}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Generating Your Audit...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Send My Free Audit Report
                </>
              )}
            </Button>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                {submitMessage}
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {submitMessage}
              </div>
            )}

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                🤖 Powered by AI • 📧 Report delivered via email • 🔒 Your data is secure
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}