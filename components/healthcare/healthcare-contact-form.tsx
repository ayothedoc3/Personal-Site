"use client"

import { useEffect, useState } from "react"
import { Turnstile } from "@/components/turnstile"
import { trackEvent } from "@/lib/analytics"

const projectTypes = [
  "MedTech implementation",
  "Robotics programme",
  "Digital health implementation",
  "Connected healthcare system",
  "Product discovery",
  "Clinical workflow assessment",
  "Healthcare integration",
  "AI or intelligent automation",
  "African market-entry support",
  "Other",
]
const orgTypes = [
  "Healthtech startup",
  "Medical-device company",
  "Robotics company",
  "Hospital",
  "Clinic",
  "Health system",
  "Consultancy",
  "Investor",
  "Non-profit or public-health organisation",
  "Other",
]
const stages = ["Idea", "Prototype", "Pilot planning", "In pilot", "In market", "Scaling"]
const timelines = ["Exploring", "This quarter", "Next quarter", "This year", "Not sure"]

const labelCls = "block text-sm font-medium text-foreground"
const fieldCls =
  "mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"

export function HealthcareContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [token, setToken] = useState("")
  const [startedTracked, setStartedTracked] = useState(false)
  const [formStartTime, setFormStartTime] = useState(0)

  useEffect(() => setFormStartTime(Date.now()), [])

  const onFirstInteract = () => {
    if (!startedTracked) {
      trackEvent("healthtech_project_enquiry_started")
      setStartedTracked(true)
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) || "").trim()

    const message = [
      `Organisation type: ${get("orgType")}`,
      `Country: ${get("country")}`,
      `Project stage: ${get("stage")}`,
      `Main challenge: ${get("challenge")}`,
      `Desired outcome: ${get("outcome")}`,
      `Timeline: ${get("timeline")}`,
      `Budget: ${get("budget") || "Not specified"}`,
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
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Something went wrong. Please try again.")
      }
      trackEvent("healthtech_project_enquiry_submitted")
      setStatus("success")
    } catch (err) {
      setErrorMsg((err as Error).message)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-teal-600/40 bg-teal-600/[0.06] p-8 text-center">
        <h2 className="text-lg font-semibold text-foreground">Thank you, your enquiry has been sent</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
          We will review it and respond to discuss your healthcare technology project.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} onChange={onFirstInteract} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Name *</label>
          <input id="name" name="name" required className={fieldCls} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Work email *</label>
          <input id="email" name="email" type="email" required className={fieldCls} placeholder="you@organisation.com" />
        </div>
        <div>
          <label htmlFor="organisation" className={labelCls}>Organisation</label>
          <input id="organisation" name="organisation" className={fieldCls} placeholder="Organisation name" />
        </div>
        <div>
          <label htmlFor="country" className={labelCls}>Country</label>
          <input id="country" name="country" className={fieldCls} placeholder="Country" />
        </div>
        <div>
          <label htmlFor="orgType" className={labelCls}>Organisation type</label>
          <select id="orgType" name="orgType" className={fieldCls} defaultValue="">
            <option value="" disabled>Select...</option>
            {orgTypes.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="projectType" className={labelCls}>Project type</label>
          <select id="projectType" name="projectType" className={fieldCls} defaultValue="">
            <option value="" disabled>Select...</option>
            {projectTypes.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="stage" className={labelCls}>Project stage</label>
          <select id="stage" name="stage" className={fieldCls} defaultValue="">
            <option value="" disabled>Select...</option>
            {stages.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelCls}>Approximate timeline</label>
          <select id="timeline" name="timeline" className={fieldCls} defaultValue="">
            <option value="" disabled>Select...</option>
            {timelines.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="challenge" className={labelCls}>Main challenge</label>
        <input id="challenge" name="challenge" className={fieldCls} placeholder="The core problem you want to solve" />
      </div>
      <div>
        <label htmlFor="outcome" className={labelCls}>Desired outcome</label>
        <input id="outcome" name="outcome" className={fieldCls} placeholder="What a good result looks like" />
      </div>
      <div>
        <label htmlFor="budget" className={labelCls}>Approximate budget range (optional)</label>
        <input id="budget" name="budget" className={fieldCls} placeholder="Optional" />
      </div>
      <div>
        <label htmlFor="message" className={labelCls}>Message *</label>
        <textarea id="message" name="message" required rows={5} className={fieldCls} placeholder="Tell us about your project" />
      </div>

      <Turnstile onToken={setToken} />

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-teal-600 px-7 py-3 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60 transition-colors"
      >
        {status === "loading" ? "Sending..." : "Submit Project Enquiry"}
      </button>
    </form>
  )
}
