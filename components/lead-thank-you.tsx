"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useEffect } from "react"

import { trackEvent } from "@/lib/analytics"
import type { SiteKey } from "@/lib/site-config"

type LeadThankYouProps = {
  site: SiteKey
  heading: string
  message: string
  bookingUrl?: string
  contactEmail: string
  nextHref: string
  nextLabel: string
}

export function LeadThankYou({
  site,
  heading,
  message,
  bookingUrl,
  contactEmail,
  nextHref,
  nextLabel,
}: LeadThankYouProps) {
  const isAios = site === "aios"

  useEffect(() => {
    trackEvent("lead_thank_you_view", { site, funnel: isAios ? "free_pilot" : "healthcare_enquiry" })
  }, [isAios, site])

  const accent = isAios ? "text-lime-400" : "text-teal-700 dark:text-teal-400"
  const button = isAios
    ? "bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 hover:from-lime-500 hover:to-emerald-500"
    : "bg-teal-600 text-white hover:bg-teal-700"

  return (
    <section className="px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-xl md:p-12">
        <CheckCircle2 className={`mx-auto h-12 w-12 ${accent}`} aria-hidden />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">{message}</p>

        {bookingUrl ? (
          <div className="mt-8">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("booking_link_click", { site, funnel: isAios ? "free_pilot" : "healthcare_enquiry" })}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors ${button}`}
            >
              Book the fit call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Booking is optional. Your application has already been received.
            </p>
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted-foreground">
            Need to add context? Email{" "}
            <a href={`mailto:${contactEmail}`} className={`${accent} hover:underline`}>
              {contactEmail}
            </a>
            . Do not send credentials or sensitive healthcare data by email.
          </p>
        )}

        <div className="mt-8 border-t border-border pt-6">
          <Link href={nextHref} className={`text-sm font-medium ${accent} hover:underline`}>
            {nextLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
