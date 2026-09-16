"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Turnstile } from "@/components/turnstile"
import { trackEvent } from "@/lib/analytics"
import { getLeadAttribution } from "@/components/attribution-capture"

const projectTypes = [
  "Healthcare AI Pilot Readiness Sprint",
  "AI readiness and use-case assessment",
  "Healthcare AI workflow automation",
  "Healthcare AI product or prototype",
  "AI safety, evaluation or governance",
  "API, MCP or agent integration",
  "Clinical data de-identification",
  "African-market implementation research",
  "Other",
]
const orgTypes = [
  "Healthtech startup",
  "MedTech or digital health company",
  "Hospital",
  "Clinic",
  "Health system",
  "Public-health or non-profit organisation",
  "Consultancy or implementation partner",
  "Other",
]
const stages = ["Exploring", "Defined use case", "Prototype", "Pilot planning", "In pilot", "In market"]

const labelCls = "block text-sm font-medium text-foreground"
const fieldCls =
  "mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"

export function HealthcareContactForm({ defaultProjectType = "" }: { defaultProjectType?: string }) {
  const router = useRouter()
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [token, setToken] = useState("")
  const [startedTracked, setStartedTracked] = useState(false)
  const [formStartTime, setFormStartTime] = useState(0)

  useEffect(() => setFormStartTime(Date.now()), [])

  const onFirstInteract = () => {
    if (!startedTracked) {
      trackEvent("healthtech_project_enquiry_started")
      trackEvent("lead_form_start", { site: "healthcare", form_name: "healthcare_ai_project" })
      setStartedTracked(true)
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) || "").trim()
    const attribution = getLeadAttribution()

    const message = [
      `Organisation type: ${get("orgType")}`,
      `Project stage: ${get("stage")}`,
      "",
      get("message"),
    ].join("\n")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: get("name"),
          lastName: "",
          email: get("email"),
          company: get("organisation"),
          service: get("projectType"),
          message,
          website: get("website"), // honeypot
          formStartTime,
          turnstileToken: token,
          source: "healthcare-contact",
          dataAcknowledged: get("dataAcknowledged") === "yes",
          sourcePage: window.location.pathname,
          landingPage: attribution.landingPage,
          referrer: attribution.referrer,
          utmSource: attribution.utmSource,
          utmMedium: attribution.utmMedium,
          utmCampaign: attribution.utmCampaign,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Something went wrong. Please try again.")
      }
      trackEvent("healthtech_project_enquiry_submitted")
      const leadType = get("projectType") === "Healthcare AI Pilot Readiness Sprint"
        ? "healthcare_readiness_sprint"
        : "healthcare_ai_project"
      trackEvent("generate_lead", { site: "healthcare", lead_type: leadType })
      setStatus("success")
      router.push(`/thank-you?type=${leadType}`)
    } catch (err) {
      setErrorMsg((err as Error).message)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-teal-600/40 bg-teal-600/[0.06] p-8 text-center"
      >
        <h2 className="text-lg font-semibold text-foreground">Thank you, your enquiry has been sent</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
          We will review it and respond with the most useful next step for your healthcare AI project.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} onFocusCapture={onFirstInteract} className="space-y-5" aria-busy={status === "loading"}>
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Name *</label>
          <input id="name" name="name" required autoComplete="name" className={fieldCls} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Work email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} placeholder="you@organisation.com" />
        </div>
        <div>
          <label htmlFor="organisation" className={labelCls}>Organisation *</label>
          <input id="organisation" name="organisation" required autoComplete="organization" className={fieldCls} placeholder="Organisation name" />
        </div>
        <div>
          <label htmlFor="orgType" className={labelCls}>Organisation type *</label>
          <select id="orgType" name="orgType" required className={fieldCls} defaultValue="">
            <option value="" disabled>Select...</option>
            {orgTypes.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="projectType" className={labelCls}>Project type *</label>
          <select id="projectType" name="projectType" required className={fieldCls} defaultValue={defaultProjectType}>
            <option value="" disabled>Select...</option>
            {projectTypes.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="stage" className={labelCls}>Project stage *</label>
          <select id="stage" name="stage" required className={fieldCls} defaultValue="">
            <option value="" disabled>Select...</option>
            {stages.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="dataAcknowledged"
          value="yes"
          required
          className="mt-1 h-4 w-4 rounded border-border text-teal-600 focus:ring-teal-500"
        />
        <span>
          I confirm that this message contains no patient-identifiable data, credentials or other sensitive personal
          information. *
        </span>
      </label>

      <div>
        <label htmlFor="message" className={labelCls}>What are you trying to make work? *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={fieldCls}
          placeholder="Briefly describe the workflow, users, current problem and what a useful result would look like."
        />
      </div>

      <Turnstile onToken={setToken} />

      <p role="status" aria-live="polite" className="sr-only">
        {status === "loading" ? "Sending your project enquiry." : ""}
      </p>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-teal-600 px-7 py-3 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60 transition-colors"
      >
        {status === "loading"
          ? "Sending..."
          : defaultProjectType === "Healthcare AI Pilot Readiness Sprint"
            ? "Apply for the Readiness Sprint"
            : "Send Healthcare AI Enquiry"}
      </button>
    </form>
  )
}
