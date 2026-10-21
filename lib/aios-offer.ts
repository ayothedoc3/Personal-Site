// Single source of truth for the AIOS paid offer. Every page that mentions
// prices, the guarantee or the founding-client rate reads from here.

export type Plan = {
  id: "engine" | "pro"
  name: string
  tagline: string
  setup: number
  monthly: number
  foundingSetup: number
  features: string[]
  highlight: boolean
}

export const PLANS: Plan[] = [
  {
    id: "engine",
    name: "Lead Engine",
    tagline: "Every new lead gets a personal email reply in under 60 seconds.",
    setup: 1500,
    monthly: 750,
    foundingSetup: 750,
    highlight: false,
    features: [
      "AI-written email reply to every new lead in under 60 seconds",
      "Written in your voice, with your booking link in every reply",
      "Instant alert to you with the lead and the reply that went out",
      "Backup reply if the AI is ever unavailable, so no lead waits",
      "1 lead source: your website form or inbox",
      "Monitoring, fixes and voice tuning as your offer changes",
      "Monthly response-time report",
    ],
  },
  {
    id: "pro",
    name: "Lead Engine Pro",
    tagline: "Reply by email and text, follow up until they book, log it all to your CRM.",
    setup: 2500,
    monthly: 1500,
    foundingSetup: 1250,
    highlight: true,
    features: [
      "Everything in Lead Engine",
      "Text message reply to US leads who opt in on your form",
      "5-day follow-up sequence that stops the moment they book or text back",
      "Every lead logged to your CRM (HubSpot built in, others during setup)",
      "Up to 3 lead sources",
      "Up to 1,000 texts a month included",
      "Same-business-day support",
    ],
  },
]

export const FOUNDING_SPOTS = 3

export const GUARANTEE = {
  title: "The 60-Second Guarantee",
  short: "Every lead answered in 60 seconds, or your setup fee back.",
  body: "During your first 30 live days, every eligible lead gets its first reply within 60 seconds of reaching us. If one doesn't, we refund your full setup fee. You keep the system running while we fix it.",
}

export const TERMS_SUMMARY = [
  "Prices in USD, invoiced monthly",
  "3-month minimum, then month to month",
  "AI and email costs included",
  "You own your prompts, templates and lead data",
]

export function usd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`
}
