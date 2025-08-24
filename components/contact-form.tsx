"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import emailjs from "emailjs-com"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Honeypot } from "@/components/ui/honeypot"
import { Loader2, CheckCircle, AlertCircle, Phone, Shield } from "lucide-react"
import { formRateLimiter } from "@/lib/rate-limiter"
import { sanitizeInput, isValidEmail, isValidPhone, detectSpam, isBot, getClientFingerprint } from "@/lib/security-utils"

const contactSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s\-']+$/, "First name contains invalid characters"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s\-']+$/, "Last name contains invalid characters"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(320, "Email address is too long")
    .refine(isValidEmail, "Invalid email format"),
  phone: z.string()
    .optional()
    .refine((val) => !val || isValidPhone(val), "Invalid phone number format"),
  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long"),
  service: z.string().min(1, "Please select a service"),
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "blocked">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [honeypotValue, setHoneypotValue] = useState("")
  const [formStartTime] = useState(Date.now())
  const [clientId, setClientId] = useState('temp-id')

  // Set client ID only on client side
  useEffect(() => {
    setClientId(getClientFingerprint())
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      website: "",
      formStartTime: formStartTime,
    },
  })

  // Set form start time and client ID on mount
  useEffect(() => {
    setValue("formStartTime", formStartTime)
  }, [setValue, formStartTime])

  const newsletterValue = watch("newsletter")

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
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
        setSubmitStatus("blocked")
        setSubmitMessage("Submission blocked due to suspicious activity.")
        return
      }

      // Sanitize all input data
      const sanitizedData = {
        firstName: sanitizeInput(data.firstName),
        lastName: sanitizeInput(data.lastName),
        email: sanitizeInput(data.email),
        phone: sanitizeInput(data.phone || ""),
        company: sanitizeInput(data.company),
        service: sanitizeInput(data.service),
        message: sanitizeInput(data.message),
        newsletter: data.newsletter,
      }
      // EmailJS configuration - You'll need to set these up in your EmailJS account
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id"
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id"
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key"

      const templateParams = {
        to_name: "Ayothedoc Team",
        from_name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
        from_email: sanitizedData.email,
        phone: sanitizedData.phone || "Not provided",
        company: sanitizedData.company,
        service: sanitizedData.service,
        message: sanitizedData.message,
        newsletter: sanitizedData.newsletter ? "Yes" : "No",
        reply_to: sanitizedData.email,
        client_id: clientId.slice(0, 8), // Include partial client ID for tracking
        timestamp: new Date().toISOString(),
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setSubmitStatus("success")
      setSubmitMessage("Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.")
      reset({ 
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
        newsletter: false,
        website: "",
        formStartTime: Date.now()
      })
      setHoneypotValue("")
      onSuccess?.()
    } catch (error: any) {
      console.error("Email sending failed:", error)
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="group">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
            >
              First Name *
            </label>
            <Input
              id="firstName"
              placeholder="John"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
          </div>
          <div className="group">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
            >
              Last Name *
            </label>
            <Input
              id="lastName"
              placeholder="Doe"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>
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
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        {/* Phone Field */}
        <div className="group">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
          >
            Phone Number (Optional)
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="pl-10"
              {...register("phone")}
            />
          </div>
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
            placeholder="Your Company"
            error={errors.company?.message}
            {...register("company")}
          />
        </div>

        {/* Service Interest */}
        <div className="group">
          <label
            htmlFor="service"
            className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
          >
            Service Interest *
          </label>
          <Select
            id="service"
            error={errors.service?.message}
            {...register("service")}
          >
            <option value="">Select a service</option>
            <option value="web-development">Web Development</option>
            <option value="ai-automation">AI Automation</option>
            <option value="business-development">Online Business Development</option>
            <option value="virtual-assistance">Virtual Assistance</option>
            <option value="process-optimization">Process Optimization</option>
            <option value="technical-support">Technical Support</option>
          </Select>
        </div>

        {/* Message Field */}
        <div className="group">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-lime-400 transition-colors duration-200"
          >
            Project Details *
          </label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Tell us about your project and how we can help..."
            error={errors.message?.message}
            {...register("message")}
          />
        </div>

        {/* Newsletter Checkbox */}
        <div className="group">
          <Checkbox
            id="newsletter"
            checked={newsletterValue}
            onChange={(e) => setValue("newsletter", e.target.checked)}
            label="Yes, I'd like to receive updates about your services and automation tips"
          />
        </div>

        {/* Honeypot Field */}
        <Honeypot value={honeypotValue} onChange={setHoneypotValue} />

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
                Sending Message...
              </>
            ) : (
              "Send Message"
            )}
          </span>
        </Button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 animate-in fade-in-50 duration-300">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{submitMessage}</p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 animate-in fade-in-50 duration-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{submitMessage}</p>
          </div>
        )}

        {submitStatus === "blocked" && (
          <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 animate-in fade-in-50 duration-300">
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