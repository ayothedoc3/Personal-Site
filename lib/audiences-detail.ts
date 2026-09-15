// Detailed healthcare AI audience-page content, keyed by the existing audience slugs.
export interface AudienceDetail {
  slug: string
  navLabel: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  intro: string
  problems: string[]
  focus: string[]
  relatedSolutions: string[]
  note?: string
  ctaLabel: string
}

export const audienceDetails: Record<string, AudienceDetail> = {
  "healthtech-startups": {
    slug: "healthtech-startups",
    navLabel: "Healthtech Startups",
    metaTitle: "Healthcare AI Consulting for Healthtech Startups | Ayothedoc",
    metaDescription:
      "Define, prototype and evaluate a healthcare AI product that fits a real workflow and is ready for a responsible pilot.",
    heroTitle: "Move your healthcare AI idea from concept to testable product",
    intro:
      "We help healthtech founders define the workflow, build or coordinate the right prototype, and plan the evidence and controls needed for a responsible pilot.",
    problems: [
      "The AI feature is not tied to a clear user problem",
      "Clinical and technical requirements are not aligned",
      "The prototype lacks an evaluation plan",
      "Integration and data assumptions are untested",
      "Human review and failure handling are undefined",
      "The team needs hands-on technical project delivery",
    ],
    focus: [
      "Use-case prioritisation",
      "Clinical workflow fit",
      "Product requirements",
      "AI prototyping",
      "Agent orchestration",
      "Evaluation design",
      "Pilot planning",
      "Responsible AI controls",
    ],
    relatedSolutions: [
      "healthcare-ai-consulting",
      "healthcare-ai-product-development",
      "healthcare-ai-governance",
    ],
    ctaLabel: "Discuss Your Healthcare AI Product",
  },
  "healthcare-organisations": {
    slug: "healthcare-organisations",
    navLabel: "Healthcare Organisations",
    metaTitle: "Healthcare AI Consulting for Organisations | Ayothedoc",
    metaDescription:
      "Assess healthcare AI readiness, prioritise useful workflows, and plan human-supervised pilots with clear data, safety and governance controls.",
    heroTitle: "Turn healthcare AI interest into a controlled, useful workflow",
    intro:
      "We help healthcare organisations identify practical AI opportunities, understand readiness gaps and plan focused pilots with accountable human oversight.",
    problems: [
      "Teams are experimenting without a shared AI roadmap",
      "The workflow problem and owner are unclear",
      "Data, privacy and integration readiness are unknown",
      "Vendors are difficult to compare against the real need",
      "Staff adoption and review steps are not designed",
      "Success measures are missing",
    ],
    focus: [
      "AI readiness assessment",
      "Use-case prioritisation",
      "Workflow mapping",
      "Build-versus-buy support",
      "Human oversight",
      "Pilot design",
      "Evaluation criteria",
      "Monitoring requirements",
    ],
    relatedSolutions: [
      "healthcare-ai-consulting",
      "ai-intelligent-automation",
      "healthcare-ai-governance",
    ],
    ctaLabel: "Discuss a Healthcare AI Initiative",
  },
  "medtech-robotics-companies": {
    slug: "medtech-robotics-companies",
    navLabel: "MedTech and Digital Health Teams",
    metaTitle: "AI Product Support for MedTech & Digital Health | Ayothedoc",
    metaDescription:
      "Add testable AI capabilities to MedTech and digital health products with workflow requirements, prototypes, integrations, evaluation and governance.",
    heroTitle: "Add AI to a healthcare product without losing the workflow",
    intro:
      "We help MedTech and digital health teams define, prototype and evaluate AI capabilities around the people, data and systems their product already depends on.",
    problems: [
      "The AI roadmap is disconnected from user needs",
      "Clinical, product and engineering teams are not aligned",
      "The feature depends on unclear data or integrations",
      "The demo does not expose failure states",
      "Human review is not part of the product workflow",
      "The team needs a practical path to a pilot",
    ],
    focus: [
      "AI product discovery",
      "Workflow requirements",
      "Prototype delivery",
      "API and MCP integration",
      "Agent orchestration",
      "Evaluation scenarios",
      "Human factors",
      "Pilot planning",
    ],
    relatedSolutions: [
      "healthcare-ai-product-development",
      "ai-intelligent-automation",
      "healthcare-ai-governance",
    ],
    ctaLabel: "Discuss an AI Product Capability",
  },
  "africa-market-entry": {
    slug: "africa-market-entry",
    navLabel: "African Market Entry",
    metaTitle: "Healthcare AI Implementation in African Markets | Ayothedoc",
    metaDescription:
      "Research local healthcare workflows and plan responsible AI product or pilot implementation for an intended African market.",
    heroTitle: "Plan healthcare AI around the market where it must work",
    intro:
      "We help international healthcare AI teams research local workflows, surface implementation assumptions and prepare a market-specific pilot plan.",
    problems: [
      "The product assumes workflows from a different market",
      "Data availability and system connections are uncertain",
      "Local users and decision owners have not shaped the plan",
      "Infrastructure and support assumptions are untested",
      "The pilot needs market-specific success criteria",
      "Implementation risks have not been made explicit",
    ],
    focus: [
      "Local workflow research",
      "Stakeholder mapping",
      "Data and infrastructure assumptions",
      "Product localisation requirements",
      "Pilot planning",
      "User feedback",
      "Implementation coordination",
      "Adoption and evaluation",
    ],
    note:
      "Ayothedoc provides research, product, workflow and implementation support. We do not provide regulatory representation, legal advice, guaranteed procurement, government access, distributor networks or market approvals.",
    relatedSolutions: [
      "healthcare-ai-consulting",
      "healthcare-ai-product-development",
      "healthcare-ai-governance",
    ],
    ctaLabel: "Discuss an African-Market AI Project",
  },
}

export const audienceSlugs = Object.keys(audienceDetails)
