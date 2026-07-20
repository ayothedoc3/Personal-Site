// Insights: genuine educational explainer articles (no fabricated claims,
// clients or metrics) plus the category taxonomy. Add more over time.

export const insightCategories = [
  "MedTech implementation",
  "Healthcare robotics",
  "Digital health",
  "Connected healthcare systems",
  "Clinical product development",
  "Healthcare interoperability",
  "Human factors and usability",
  "AI and intelligent automation",
  "African healthcare technology",
] as const

export type InsightCategory = (typeof insightCategories)[number]

export interface Insight {
  slug: string
  title: string
  category: InsightCategory
  date: string
  excerpt: string
  body: string[]
}

export const insights: Insight[] = [
  {
    slug: "what-a-hospital-readiness-assessment-covers",
    title: "What a hospital-readiness assessment actually covers",
    category: "MedTech implementation",
    date: "2026-06-01",
    excerpt:
      "Before a device or robotic programme enters a hospital, readiness is about workflow, people and operations, not just the technology.",
    body: [
      "A hospital-readiness assessment answers a practical question: if this technology arrived next month, would the site actually be able to use it well? The answer rarely depends on the device alone.",
      "In practice, readiness covers the clinical workflow the technology has to fit into, the staff who will use it, the space and operational constraints, the integrations it depends on, and the way success will be measured. Each of these can quietly stop an otherwise good product from being adopted.",
      "The output is not a pass or fail score. It is a clear picture of what needs to be in place, what has to change, and what the realistic path to adoption looks like. That picture is what turns a purchase into a working programme.",
      "Done early, a readiness assessment saves far more than it costs, because it surfaces the workflow and operational issues while they are still cheap to fix.",
    ],
  },
  {
    slug: "why-fhir-matters-connecting-healthcare-systems",
    title: "Why FHIR matters when you connect healthcare systems",
    category: "Healthcare interoperability",
    date: "2026-06-08",
    excerpt:
      "FHIR gives healthcare systems a common way to exchange information, but interoperability is as much about workflow and permissions as the format.",
    body: [
      "FHIR is a standard for exchanging healthcare information. It defines common resources, a patient, an observation, a referral, so that different systems can describe the same things in the same way.",
      "That shared vocabulary matters because the alternative is bespoke, brittle integrations between every pair of systems. A common format reduces that cost and makes data flows easier to reason about.",
      "But a format alone does not create interoperability. The harder questions are which data should flow, who is allowed to see it, when it should move, and how each system fits into the clinical workflow. Those decisions determine whether an integration is safe and useful.",
      "The most reliable approach is to design the workflow and permissions first, then use FHIR to carry the data, rather than starting from the standard and hoping the workflow follows.",
    ],
  },
  {
    slug: "human-factors-and-medical-device-adoption",
    title: "Human factors: the quiet driver of medical-device adoption",
    category: "Human factors and usability",
    date: "2026-06-15",
    excerpt:
      "Devices are often assessed for function but not for how they fit real user workflows. Small usability issues drive adoption more than headline features.",
    body: [
      "When a device underperforms in a real setting, the cause is often not the core technology. It is the small friction points: an extra step, an unclear prompt, a workflow that does not match how staff actually work.",
      "Human-factors assessment looks at the device against real tasks, in the environment it will be used in, with the people who will use it. It captures where errors are likely and where the design fights the workflow.",
      "This matters because adoption is a human decision made many times a day. If a device is even slightly harder than the current way of working, busy staff will route around it, and utilisation quietly falls.",
      "Assessing human factors early, and feeding the findings into the product and implementation plan, is one of the highest-leverage things a device company can do.",
    ],
  },
]

export const insightBySlug = (slug: string) => insights.find((i) => i.slug === slug)
