// Centralized healthcare AI copy and page data. UK English throughout.
import {
  Building2,
  ClipboardCheck,
  Cpu,
  Globe2,
  Hospital,
  LineChart,
  Network,
  PenTool,
  PlayCircle,
  Rocket,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

export interface Pillar {
  slug: string
  title: string
  positioning: string
  icon: LucideIcon
  services: string[]
}

export const pillars: Pillar[] = [
  {
    slug: "healthcare-ai-consulting",
    title: "Healthcare AI Readiness and Strategy",
    positioning:
      "Choose useful AI opportunities, test whether the data and workflow are ready, and leave with a practical delivery roadmap.",
    icon: ClipboardCheck,
    services: [
      "AI readiness assessment",
      "Use-case discovery and prioritisation",
      "Workflow and data-readiness review",
      "Build, buy or integrate assessment",
      "Risk and human-oversight planning",
      "Pilot roadmap and acceptance criteria",
    ],
  },
  {
    slug: "ai-intelligent-automation",
    title: "Healthcare AI Workflow Automation",
    positioning:
      "Design human-supervised agents and automations that reduce repetitive work without losing clinical or operational accountability.",
    icon: Network,
    services: [
      "Administrative workflow automation",
      "Healthcare knowledge assistants",
      "Document and intake workflows",
      "Human-in-the-loop agent design",
      "API, MCP and system integration",
      "Monitoring and escalation workflows",
    ],
  },
  {
    slug: "healthcare-ai-product-development",
    title: "Healthcare AI Product and Prototype Delivery",
    positioning:
      "Turn a healthcare AI idea into clear requirements, a testable prototype and an evidence-led pilot plan.",
    icon: Cpu,
    services: [
      "Product discovery",
      "Clinical workflow requirements",
      "AI prototype design and build",
      "Agent and tool orchestration",
      "Evaluation scenarios and testing",
      "Pilot and implementation planning",
    ],
  },
  {
    slug: "healthcare-ai-governance",
    title: "Healthcare AI Safety, Privacy and Governance",
    positioning:
      "Build the controls around healthcare AI, including data minimisation, human review, failure handling, evaluation and monitoring.",
    icon: ShieldCheck,
    services: [
      "AI risk and workflow assessment",
      "Data minimisation and de-identification",
      "Human-review and escalation design",
      "Evaluation and acceptance criteria",
      "Audit trails and failure handling",
      "Post-launch monitoring plan",
    ],
  },
]

export interface Audience {
  slug: string
  title: string
  blurb: string
  icon: LucideIcon
}

export const audiences: Audience[] = [
  {
    slug: "healthtech-startups",
    title: "Healthtech startups",
    blurb: "Move from an AI concept to a testable product and a pilot that fits a real healthcare workflow.",
    icon: Rocket,
  },
  {
    slug: "healthcare-organisations",
    title: "Healthcare organisations",
    blurb: "Prioritise safe, useful AI opportunities and introduce them with clear ownership and human oversight.",
    icon: Hospital,
  },
  {
    slug: "medtech-robotics-companies",
    title: "MedTech and digital health teams",
    blurb: "Add AI capabilities that support product users, connected workflows and implementation teams.",
    icon: Building2,
  },
  {
    slug: "africa-market-entry",
    title: "Healthcare AI teams entering African markets",
    blurb: "Research local workflows and plan AI pilots around the operational realities of the intended market.",
    icon: Globe2,
  },
]

export interface MethodStep {
  n: string
  title: string
  icon: LucideIcon
  points: string[]
}

export const methodSteps: MethodStep[] = [
  {
    n: "1",
    title: "Discover",
    icon: Search,
    points: [
      "Define the healthcare problem before choosing a model",
      "Map the current workflow and responsible people",
      "Identify available data and system constraints",
      "Set the baseline and intended outcome",
    ],
  },
  {
    n: "2",
    title: "Design",
    icon: PenTool,
    points: [
      "Choose the smallest useful AI-assisted workflow",
      "Define inputs, outputs, roles and integrations",
      "Design human review and escalation points",
      "Agree success and acceptance criteria",
    ],
  },
  {
    n: "3",
    title: "De-risk",
    icon: ShieldCheck,
    points: [
      "Assess clinical, privacy, operational and technical risks",
      "Use the minimum necessary data",
      "Test expected, edge and failure cases",
      "Document boundaries and fallback behaviour",
    ],
  },
  {
    n: "4",
    title: "Deliver",
    icon: PlayCircle,
    points: [
      "Build or integrate the agreed workflow",
      "Run structured evaluation and user testing",
      "Prepare training, ownership and support",
      "Launch only against agreed acceptance criteria",
    ],
  },
  {
    n: "5",
    title: "Monitor",
    icon: LineChart,
    points: [
      "Track quality, adoption, errors and incidents",
      "Review human overrides and escalations",
      "Compare performance with the baseline",
      "Improve or stop the workflow based on evidence",
    ],
  },
]

export const healthcareFaqs = [
  {
    question: "What kinds of healthcare AI projects do you work on?",
    answer:
      "We work on AI readiness, workflow automation, knowledge assistants, agentic systems, healthcare AI product prototypes, integrations, evaluation and governance. We do not offer autonomous diagnosis or treatment systems.",
  },
  {
    question: "Can you help us move from an idea to a pilot?",
    answer:
      "Yes. We can define the workflow and requirements, build or coordinate a testable prototype, design evaluation scenarios, and prepare a practical pilot plan with clear acceptance criteria.",
  },
  {
    question: "How do you handle sensitive healthcare data?",
    answer:
      "We begin with data minimisation and the lowest-risk workable data path. Discovery and prototyping can use synthetic or de-identified data, and any access to real data must be agreed with the appropriate privacy, security and governance controls first.",
  },
  {
    question: "Do healthcare professionals stay in control?",
    answer:
      "Yes. Human ownership, review and escalation are designed around the risk of the workflow. AI should support accountable decisions, not obscure who is responsible for them.",
  },
  {
    question: "What does a first engagement produce?",
    answer:
      "The first engagement is scoped around your starting point. Typical outputs include a prioritised opportunity map, workflow and risk findings, requirements, a prototype brief, evaluation criteria or a pilot roadmap.",
  },
]

export const primaryCta = { label: "Discuss a Healthcare AI Project", href: "/contact" }
