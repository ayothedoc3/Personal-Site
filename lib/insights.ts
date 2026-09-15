// Insights: genuine educational explainer articles (no fabricated claims,
// clients or metrics) plus the category taxonomy. Add more over time.

export const insightCategories = [
  "Healthcare AI readiness",
  "Healthcare AI workflows",
  "Healthcare interoperability",
  "Human factors and adoption",
  "Healthcare AI safety",
  "Agentic healthcare AI",
] as const

export type InsightCategory = (typeof insightCategories)[number]

export interface Insight {
  slug: string
  title: string
  category: InsightCategory
  date: string
  excerpt: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  body: string[]
}

export const insights: Insight[] = [
  {
    slug: "what-a-hospital-readiness-assessment-covers",
    title: "What a Healthcare AI Readiness Assessment Covers",
    category: "Healthcare AI readiness",
    date: "2026-06-01",
    excerpt:
      "A practical healthcare AI readiness assessment covers the use case, workflow, data, integrations, controls, evidence and pilot decision.",
    image: {
      src: "/insights/hospital-readiness-assessment.png",
      alt: "Illustration of a hospital, AI readiness checklist and connected healthcare workflow",
      width: 1200,
      height: 675,
    },
    body: [
      "A healthcare AI readiness assessment begins with the intended use. Who has the problem, what task needs support, who owns the workflow and what should be measurably different if the work succeeds?",
      "Next comes the operating environment. The assessment maps the current workflow, available data, system connections, permissions and the points where a person must review, correct or stop the AI-assisted step.",
      "Readiness also includes failure handling. Teams need to know what happens when information is missing, an integration is unavailable, output is uncertain or the system behaves outside its intended boundary.",
      "The evidence plan should be defined before a pilot. That means a baseline, representative test scenarios, acceptance criteria and a clear decision about what would justify continuing, changing or stopping the work.",
      "The useful output is not a generic score. It is a prioritised decision: which use case to pursue, which gaps must be addressed first and what a responsible prototype or pilot should test.",
    ],
  },
  {
    slug: "why-fhir-matters-connecting-healthcare-systems",
    title: "Why FHIR Matters for Healthcare AI Workflows",
    category: "Healthcare interoperability",
    date: "2026-06-08",
    excerpt:
      "FHIR can provide structured healthcare context for an AI workflow, but useful integration still depends on semantics, permissions, provenance and review.",
    image: {
      src: "/insights/fhir-healthcare-systems.png",
      alt: "Illustration of connected healthcare systems exchanging clinical information",
      width: 1200,
      height: 675,
    },
    body: [
      "FHIR is a standard for exchanging healthcare information through defined resources such as patients, observations and referrals. It can give an AI-assisted workflow a more consistent structure than ad hoc text or one-off field mappings.",
      "Structure does not make data automatically suitable for AI. Teams still need to define which fields are relevant, what each value means in context, where it came from and whether the workflow is permitted to use it.",
      "A useful design starts with the task and the minimum necessary information. It then maps the required FHIR resources, permissions, validation checks and human review points around that task.",
      "For agentic systems, the integration boundary matters as much as the model. Tools should expose only the actions and information the workflow needs, with clear authentication, logs, error handling and escalation.",
      "FHIR can support traceable healthcare AI workflows, but it does not replace workflow design, data-quality checks, privacy controls or evaluation.",
    ],
  },
  {
    slug: "human-factors-and-medical-device-adoption",
    title: "Human Factors in Healthcare AI Adoption",
    category: "Human factors and adoption",
    date: "2026-06-15",
    excerpt:
      "Healthcare AI adoption depends on how the system fits real tasks, communicates uncertainty and supports review, correction and escalation.",
    image: {
      src: "/insights/human-factors-medical-device.png",
      alt: "Illustration of a clinician evaluating a medical device interface and workflow",
      width: 1200,
      height: 675,
    },
    body: [
      "A model can perform well in a test and still be difficult to use inside a real healthcare task. People need to understand what the system did, what information it used and when the output requires closer review.",
      "Human-factors work examines the AI-assisted step in context. It looks at workload, interruptions, handoffs, terminology, accessibility and the consequences of accepting, correcting or ignoring an output.",
      "Human review must be a usable interaction, not only a statement in a policy. The interface should make uncertainty, source information, exceptions and escalation paths visible at the moment a decision is made.",
      "A pilot should observe how representative users actually work with the system. Useful measures may include completion, corrections, overrides, time on task, failure recovery and whether the workflow creates new work elsewhere.",
      "These findings belong in product requirements and acceptance criteria. Adoption is easier to evaluate when the expected user behaviour and support model are defined before rollout.",
    ],
  },
]

export const insightBySlug = (slug: string) => insights.find((i) => i.slug === slug)
