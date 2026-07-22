// Detailed content for the four solution pages, keyed by slug.
export interface SolutionDetail {
  slug: string
  navLabel: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  intro: string
  positioning?: string
  problems: string[]
  services: string[]
  process?: { heading: string; items: string[] }
  audience?: string[]
  responsibleUse?: string
  boundaries?: string
  aiosNote?: boolean
  ctaLabel: string
}

export const solutionDetails: Record<string, SolutionDetail> = {
  "medtech-robotics-implementation": {
    slug: "medtech-robotics-implementation",
    navLabel: "MedTech and Robotics Implementation",
    metaTitle: "MedTech and Robotics Implementation | Ayothedoc",
    metaDescription:
      "Introduce medical devices and robotics into hospitals with readiness assessment, workflow mapping, training and adoption planning.",
    heroTitle: "Turn medical technology into an operational healthcare programme",
    intro:
      "We help medical-device and robotics companies introduce devices, robotic programmes and practical healthcare technology into hospitals and care environments, safely and with measurable adoption.",
    problems: [
      "Poor hospital readiness",
      "Unclear operational requirements",
      "Workflow disruption",
      "Inadequate user training",
      "Slow adoption",
      "Low device utilisation",
      "Weak stakeholder coordination",
      "Lack of implementation KPIs",
    ],
    services: [
      "Hospital-readiness assessment",
      "Clinical workflow mapping",
      "Robotic programme planning",
      "Device implementation roadmap",
      "User and stakeholder requirements",
      "Training programme design",
      "Adoption and utilisation planning",
      "Implementation KPI framework",
      "Post-launch review",
      "Product feedback and optimisation",
    ],
    process: {
      heading: "Who we coordinate with",
      items: [
        "Manufacturer or technology company",
        "Hospital leadership",
        "Clinicians",
        "Theatre or departmental staff",
        "Biomedical engineers",
        "IT teams",
        "Procurement and operations",
      ],
    },
    boundaries:
      "Ayothedoc provides product, workflow and implementation consulting. It does not replace certified engineering, regulatory, installation, maintenance or clinical services.",
    ctaLabel: "Discuss a MedTech or Robotics Implementation",
  },
  "digital-health-connected-systems": {
    slug: "digital-health-connected-systems",
    navLabel: "Digital Health and Connected Systems",
    metaTitle: "Digital Health and Connected Systems | Ayothedoc",
    metaDescription:
      "Connect healthcare products, data and workflows: FHIR and API planning, connected-device workflows, integration and care-coordination.",
    heroTitle: "Connect healthcare products, data and workflows",
    intro:
      "We connect healthcare products, data and workflows so technology supports rather than disrupts care delivery, with a focus on systems working together in real operational environments.",
    problems: [
      "Devices and software that do not exchange information",
      "Fragmented digital projects",
      "Manual data transfer between systems",
      "Unclear integration requirements",
      "Poorly defined data flows and permissions",
      "Weak care-coordination and referral handoffs",
    ],
    services: [
      "Digital health implementation",
      "Connected-device workflows",
      "Remote-monitoring workflow design",
      "FHIR and healthcare API planning",
      "Clinical data mapping",
      "Healthcare platform integration",
      "Referral and care-coordination workflows",
      "Data dashboards",
      "User permissions",
      "Implementation programme management",
    ],
    boundaries:
      "This is implementation and integration consulting focused on how systems work together in operational environments. It is not generic software development, and Ayothedoc does not act as a data controller for client systems.",
    ctaLabel: "Discuss a Digital Health Implementation",
  },
  "clinical-product-implementation": {
    slug: "clinical-product-implementation",
    navLabel: "Clinical Product and Implementation Consulting",
    metaTitle: "Clinical Product and Implementation Consulting | Ayothedoc",
    metaDescription:
      "Translate healthcare needs into product requirements, pilots, user acceptance testing and measurable implementation and adoption.",
    heroTitle: "Translate healthcare needs into practical product and implementation decisions",
    intro:
      "We translate healthcare needs into practical product requirements, implementation plans and measurable outcomes, connecting clinical reality with product and technical teams.",
    problems: [
      "Product requirements that do not reflect clinical workflows",
      "Clinicians and engineers not aligned",
      "A prototype that needs to become an implementable pilot",
      "Incomplete implementation documentation",
      "Unplanned adoption and onboarding",
    ],
    services: [
      "Product discovery",
      "Clinical workflow analysis",
      "User research",
      "Stakeholder interviews",
      "Product requirements documents",
      "User stories",
      "Acceptance criteria",
      "Pilot planning",
      "Product roadmap support",
      "User acceptance testing",
      "Implementation planning",
      "Change management",
      "Adoption measurement",
    ],
    audience: [
      "Healthtech founders",
      "Product teams",
      "Medical-device companies",
      "Healthcare organisations",
      "Technical teams needing clinical and workflow translation",
    ],
    ctaLabel: "Discuss a Product or Implementation Challenge",
  },
  "ai-intelligent-automation": {
    slug: "ai-intelligent-automation",
    navLabel: "AI and Intelligent Automation",
    metaTitle: "Healthcare AI and Intelligent Automation | Ayothedoc",
    metaDescription:
      "Apply AI in healthcare where it creates measurable value, with evidence grounding, human review, escalation, monitoring and governance.",
    heroTitle: "Use AI where it creates measurable healthcare value",
    intro:
      "We apply AI only where it creates meaningful healthcare value, with clear controls, human accountability and measurable outcomes.",
    positioning:
      "AI is not the starting point. The starting point is the healthcare problem, workflow, risk and desired outcome. We work backwards from there.",
    problems: [
      "AI features without appropriate controls",
      "No evidence grounding or validation",
      "No human review on high-risk steps",
      "Unclear escalation and failure handling",
      "No monitoring or quality review",
    ],
    services: [
      "Administrative workflow automation",
      "Healthcare knowledge assistants",
      "Documentation-support workflows",
      "Care-navigation support",
      "Internal staff tools",
      "AI product evaluation",
      "Evidence-grounding assessment",
      "Human-review workflows",
      "Escalation design",
      "Failure handling",
      "Monitoring and governance",
    ],
    responsibleUse:
      "High-risk healthcare decisions require appropriate human oversight, governance and validation. We do not design or market autonomous diagnosis or treatment.",
    aiosNote: true,
    ctaLabel: "Assess an AI or Automation Use Case",
  },
}

export const solutionSlugs = Object.keys(solutionDetails)
