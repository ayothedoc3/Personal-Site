// Centralized copy + data for the healthcare site so pages do not duplicate
// strings. UK English throughout. Icons are lucide-react components.
import {
  Activity,
  Network,
  ClipboardList,
  Cpu,
  Rocket,
  Building2,
  Hospital,
  Globe2,
  Search,
  PenTool,
  ShieldCheck,
  PlayCircle,
  LineChart,
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
    slug: "medtech-robotics-implementation",
    title: "MedTech and Robotics Implementation",
    positioning:
      "Helping medical-device and robotics companies introduce technology into healthcare environments safely, practically and successfully.",
    icon: Activity,
    services: [
      "Hospital-readiness assessment",
      "Clinical workflow mapping",
      "Robotics programme planning",
      "Device implementation roadmap",
      "Training programme design",
      "Adoption and utilisation planning",
    ],
  },
  {
    slug: "digital-health-connected-systems",
    title: "Digital Health and Connected Systems",
    positioning:
      "Connecting healthcare products, data and workflows so technology supports rather than disrupts care delivery.",
    icon: Network,
    services: [
      "Digital health implementation",
      "Connected-device workflows",
      "FHIR and healthcare API planning",
      "Clinical data mapping",
      "Referral and care-coordination workflows",
      "Implementation programme management",
    ],
  },
  {
    slug: "clinical-product-implementation",
    title: "Clinical Product and Implementation Consulting",
    positioning:
      "Translating healthcare needs into practical product requirements, implementation plans and measurable outcomes.",
    icon: ClipboardList,
    services: [
      "Product discovery",
      "Clinical workflow analysis",
      "User and stakeholder requirements",
      "Pilot planning",
      "User acceptance testing",
      "Change management and adoption",
    ],
  },
  {
    slug: "ai-intelligent-automation",
    title: "AI and Intelligent Automation",
    positioning:
      "Applying AI only where it creates meaningful healthcare value, with clear controls, human accountability and measurable outcomes.",
    icon: Cpu,
    services: [
      "Administrative workflow automation",
      "Healthcare knowledge assistants",
      "Documentation-support workflows",
      "AI product evaluation",
      "Human-review and escalation design",
      "Monitoring and governance",
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
    blurb: "Move from prototype to an implementable pilot that fits real clinical workflows.",
    icon: Rocket,
  },
  {
    slug: "medtech-robotics-companies",
    title: "Medical-device and robotics companies",
    blurb: "Introduce devices and robotic programmes into hospitals with training, adoption and measurement.",
    icon: Building2,
  },
  {
    slug: "healthcare-organisations",
    title: "Hospitals and healthcare organisations",
    blurb: "Turn technology investment into adopted, connected, measurable operational change.",
    icon: Hospital,
  },
  {
    slug: "africa-market-entry",
    title: "International companies entering African markets",
    blurb: "Understand local workflows, assess hospital readiness and plan practical implementation.",
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
      "Understand the healthcare problem",
      "Map the existing workflow",
      "Identify stakeholders",
      "Establish the operational baseline",
      "Define desired outcomes",
    ],
  },
  {
    n: "2",
    title: "Design",
    icon: PenTool,
    points: [
      "Define requirements",
      "Design the future workflow",
      "Identify integration needs",
      "Set user roles and responsibilities",
      "Plan training and adoption",
    ],
  },
  {
    n: "3",
    title: "De-risk",
    icon: ShieldCheck,
    points: [
      "Identify clinical, operational, technical and privacy risks",
      "Define human oversight",
      "Plan failure handling",
      "Create test scenarios",
      "Set acceptance criteria",
    ],
  },
  {
    n: "4",
    title: "Deploy",
    icon: PlayCircle,
    points: [
      "Coordinate implementation",
      "Support integration",
      "Conduct testing",
      "Train users",
      "Manage launch activities",
    ],
  },
  {
    n: "5",
    title: "Monitor and improve",
    icon: LineChart,
    points: [
      "Measure adoption",
      "Review utilisation",
      "Track errors and incidents",
      "Compare outcomes against the baseline",
      "Improve the product or workflow",
    ],
  },
]

export const primaryCta = { label: "Discuss a Healthcare Technology Project", href: "/contact" }
export const secondaryCta = { label: "Explore Our Solutions", href: "/solutions" }
