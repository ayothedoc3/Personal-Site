"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Honeypot } from "@/components/ui/honeypot"
import { Turnstile } from "@/components/turnstile"
import { Loader2, CheckCircle, AlertCircle, Shield } from "lucide-react"
import { formRateLimiter } from "@/lib/rate-limiter"
import { sanitizeInput, isValidEmail, isValidPhone, detectSpam, isBot, getClientFingerprint } from "@/lib/security-utils"
import { trackEvent } from "@/lib/analytics"
import { getLeadAttribution } from "@/components/attribution-capture"

const contactSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s\-']+$/, "First name contains invalid characters"),
  lastName: z.string()
    .max(50, "Last name is too long")
    .optional(),
  email: z.string()
    .email("Please enter a valid email address")
    .max(320, "Email address is too long")
    .refine(isValidEmail, "Invalid email format"),
  phone: z.string()
    .optional()
    .refine((val) => !val || isValidPhone(val), "Invalid phone number format"),
  company: z.string().min(2, "Company name is required").max(100, "Company name is too long"),
  websiteUrl: z.string().url("Enter a full website URL, including https://").max(300, "Website URL is too long"),
  leadSource: z.string().min(1, "Select the main lead source"),
  leadVolume: z.string().min(1, "Select the approximate monthly lead volume"),
  canProvideInputs: z.boolean().refine((value) => value, "Confirm that the pilot inputs can be provided"),
  service: z.string().default("Free 60-Second Lead Response Pilot"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long")
    .refine((val) => !detectSpam(val), "Message contains inappropriate content"),
  newsletter: z.boolean().default(false),
  website: z.string().optional(), // Honeypot field
  formStartTime: z.number().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  onSuccess?: () => void
  className?: string
}

export function ContactForm({ onSuccess, className }: ContactFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "blocked">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [honeypotValue, setHoneypotValue] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [formStartTime] = useState(Date.now())
  const [clientId, setClientId] = useState('temp-id')
  const [startTracked, setStartTracked] = useState(false)

  // Set client ID only on client side
  useEffect(() => {
    setClientId(getClientFingerprint())
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      lastName: "",
      company: "",
      websiteUrl: "",
      leadSource: "",
      leadVolume: "",
      canProvideInputs: false,
      service: "Free 60-Second Lead Response Pilot",
      newsletter: false,
      website: "",
      formStartTime: formStartTime,
    },
  })

  // Set form start time and client ID on mount
  useEffect(() => {
    setValue("formStartTime", formStartTime)
  }, [setValue, formStartTime])

  const onFirstInteract = () => {
    if (startTracked) return
    setStartTracked(true)
    trackEvent("lead_form_start", { site: "aios", form_name: "aios_free_pilot" })
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    trackEvent("lead_submit", { site: "aios", lead_type: "aios_pilot" })

    try {
      const attribution = getLeadAttribution()
      // Security checks
      const formDataWithHoneypot = { ...data, website: honeypotValue }
      
      // Check rate limiting
      if (!formRateLimiter.isAllowed(clientId)) {
        const remainingTime = Math.ceil(formRateLimiter.getRemainingTime(clientId) / 1000 / 60)
        throw new Error(`Too many attempts. Please wait ${remainingTime} minutes before trying again.`)
      }

      // Bot detection
      if (isBot(formDataWithHoneypot)) {
        console.log('Bot detected, blocking submission')
        trackEvent("lead_submit_blocked", { site: "aios", lead_type: "aios_pilot" })
        setSubmitStatus("blocked")
        setSubmitMessage("Submission blocked due to suspicious activity.")
        return
      }

      // Sanitize all input data
      const sanitizedData = {
        firstName: sanitizeInput(data.firstName),
        lastName: sanitizeInput(data.lastName || ""),
        email: sanitizeInput(data.email),
        phone: sanitizeInput(data.phone || ""),
        company: sanitizeInput(data.company || ""),
        websiteUrl: data.websiteUrl.trim(),
        leadSource: sanitizeInput(data.leadSource),
        leadVolume: sanitizeInput(data.leadVolume),
        canProvideInputs: data.canProvideInputs,
        service: sanitizeInput(data.service),
        message: sanitizeInput(data.message),
        newsletter: data.newsletter,
      }
      // Send through our server route, which holds the Lead Engine secret and
      // forwards the lead (triggering the sub-60-second reply + operator alert).
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sanitizedData,
          website: honeypotValue, // honeypot, server silent-drops if filled
          formStartTime,
          turnstileToken, // captcha token (verified server-side when configured)
          sourcePage: window.location.pathname,
          landingPage: attribution.landingPage,
          referrer: attribution.referrer,
          utmSource: attribution.utmSource,
          utmMedium: attribution.utmMedium,
          utmCampaign: attribution.utmCampaign,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any))
        throw new Error(err.error || "Something went wrong. Please try again, or email contact@ayothedoc.com.")
      }

      trackEvent("lead_submit_success", {
        site: "aios",
        lead_type: "aios_pilot",
        service: sanitizedData.service,
        newsletter: sanitizedData.newsletter,
      })
      trackEvent("generate_lead", { site: "aios", lead_type: "aios_pilot" })
      setSubmitStatus("success")
      setSubmitMessage("Thank you. Your request has been sent and we will reply with the next step.")
      reset({ 
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        websiteUrl: "",
        leadSource: "",
        leadVolume: "",
        canProvideInputs: false,
        service: "Free 60-Second Lead Response Pilot",
        message: "",
        newsletter: false,
        website: "",
        formStartTime: Date.now()
      })
      setHoneypotValue("")
      onSuccess?.()
      router.push("/thank-you?type=aios_pilot")
    } catch (error: any) {
      console.error("Email sending failed:", error)
      trackEvent("lead_submit_error", { site: "aios", lead_type: "aios_pilot" })
      setSubmitStatus("error")
      if (error.message.includes('Too many attempts')) {
        setSubmitMessage(error.message)
      } else {
        setSubmitMessage("Sorry, there was an error sending your message. Please try again or contact us directly.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onFocusCapture={onFirstInteract}
        className="space-y-6"
        aria-busy={isSubmitting}
      >
        {/* Name */}
        <div className="group">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
          >
            First Name *
          </label>
          <Input
            id="firstName"
            required
            autoComplete="given-name"
            placeholder="Your first name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
        </div>

        {/* Email Field */}
        <div className="group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
          >
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        {/* Company Field */}
        <div className="group">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
          >
            Company Name *
          </label>
          <Input
            id="company"
            required
            autoComplete="organization"
            placeholder="Your Company"
            error={errors.company?.message}
            {...register("company")}
          />
        </div>

        <div className="group">
          <label
            htmlFor="websiteUrl"
            className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
          >
            Company Website *
          </label>
          <Input
            id="websiteUrl"
            type="url"
            required
            autoComplete="url"
            placeholder="https://yourcompany.com"
            error={errors.websiteUrl?.message}
            {...register("websiteUrl")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="group">
            <label htmlFor="leadSource" className="block text-sm font-medium text-muted-foreground mb-2">
              Main Inbound Lead Source *
            </label>
            <select
              id="leadSource"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-400"
              {...register("leadSource")}
            >
              <option value="">Select...</option>
              <option value="Website form">Website form</option>
              <option value="Email inbox">Email inbox</option>
              <option value="CRM">CRM</option>
              <option value="Calendar or booking form">Calendar or booking form</option>
              <option value="Another inbound source">Another inbound source</option>
            </select>
            {errors.leadSource ? <p className="mt-1 text-xs text-red-400">{errors.leadSource.message}</p> : null}
          </div>
          <div className="group">
            <label htmlFor="leadVolume" className="block text-sm font-medium text-muted-foreground mb-2">
              Approximate Qualified Enquiries per Month *
            </label>
            <select
              id="leadVolume"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-400"
              {...register("leadVolume")}
            >
              <option value="">Select...</option>
              <option value="None yet">None yet</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="More than 200">More than 200</option>
            </select>
            {errors.leadVolume ? <p className="mt-1 text-xs text-red-400">{errors.leadVolume.message}</p> : null}
          </div>
        </div>

        <input type="hidden" {...register("service")} />

        {/* Message Field */}
        <div className="group">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
          >
            Where do leads arrive, and what happens now? *
          </label>
          <Textarea
            id="message"
            required
            rows={5}
            placeholder="For example: website form to Gmail, then someone replies and adds the lead to HubSpot."
            error={errors.message?.message}
            {...register("message")}
          />
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/40 p-4 text-sm text-muted-foreground">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-border text-lime-400 focus:ring-lime-400"
            {...register("canProvideInputs")}
          />
          <span>
            We can provide one genuine inbound lead source, approved reply examples, booking or routing rules, and a
            human owner for the pilot. *
          </span>
        </label>
        {errors.canProvideInputs ? <p className="-mt-4 text-xs text-red-400">{errors.canProvideInputs.message}</p> : null}

        {/* Honeypot Field */}
        <Honeypot value={honeypotValue} onChange={setHoneypotValue} />

        {/* Captcha (Cloudflare Turnstile), renders only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
        <Turnstile onToken={setTurnstileToken} />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 focus:from-lime-500 focus:to-emerald-500 text-gray-900 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-lime-400/25 transition-all duration-300 hover:scale-[1.02] group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] group-focus:translate-x-[100%] transition-transform duration-1000 ease-out rounded-xl" />
          <span className="relative flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending Application...
              </>
            ) : (
            "Apply for the Free Pilot"
            )}
          </span>
        </Button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div role="status" aria-live="polite" className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 animate-in fade-in-50 duration-300">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{submitMessage}</p>
          </div>
        )}

        {submitStatus === "error" && (
          <div role="alert" className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 animate-in fade-in-50 duration-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{submitMessage}</p>
          </div>
        )}

        {submitStatus === "blocked" && (
          <div role="alert" className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 animate-in fade-in-50 duration-300">
            <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{submitMessage}</p>
          </div>
        )}

        {/* Security Notice */}
        <div className="text-xs text-muted-foreground/60 text-center mt-2">
          🔒 This form is protected against spam and automated submissions
        </div>
      </form>
    </div>
  )
}
