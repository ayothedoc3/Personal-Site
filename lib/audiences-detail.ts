// Detailed content for the four "Who We Help" pages, keyed by slug.
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
    metaTitle: "Healthcare Technology Support for Healthtech Startups | Ayothedoc",
    metaDescription:
      "Move from prototype to an implementable pilot: clinical workflow fit, product requirements, user research, integrations and adoption.",
    heroTitle: "From prototype to an implementable pilot",
    intro:
      "We help healthtech founders turn a promising prototype into a product that fits real clinical workflows and can actually be piloted, adopted and measured.",
    problems: [
      "The product does not fit actual healthcare workflows",
      "Clinicians and engineers are not aligned",
      "Product requirements are unclear",
      "Implementation documentation is incomplete",
      "Adoption and onboarding have not been planned",
      "AI or automation features lack appropriate controls",
    ],
    focus: [
      "Moving from prototype to pilot",
      "Clinical workflow fit",
      "Product requirements",
      "User research",
      "Implementation planning",
      "Healthcare integrations",
      "Adoption",
      "Responsible AI",
      "Cross-functional alignment",
    ],
    relatedSolutions: ["clinical-product-implementation", "digital-health-connected-systems", "ai-intelligent-automation"],
    ctaLabel: "Discuss Your Healthtech Product",
  },
  "medtech-robotics-companies": {
    slug: "medtech-robotics-companies",
    navLabel: "Medical-Device and Robotics Companies",
    metaTitle: "Implementation Support for Medical-Device and Robotics Companies | Ayothedoc",
    metaDescription:
      "Introduce devices and robotic programmes into hospitals: readiness assessment, clinical workflows, training, adoption, utilisation and new-market support.",
    heroTitle: "Introduce your device or robotic programme where it will be used",
    intro:
      "We help medical-device and robotics companies fit their technology to hospital workflows, train and onboard clinical teams, and lift utilisation with clear implementation measurement.",
    problems: [
      "A device needs to fit hospital workflows",
      "A robotic programme requires implementation planning",
      "Clinical teams need training and onboarding",
      "Product utilisation is below expectations",
      "User requirements are unclear",
      "The company needs implementation support in a new market",
    ],
    focus: [
      "Hospital-readiness assessment",
      "Product introduction",
      "Clinical workflows",
      "User requirements",
      "Training",
      "Adoption",
      "Utilisation",
      "Clinical feedback",
      "Implementation measurement",
      "New-market support",
    ],
    relatedSolutions: ["medtech-robotics-implementation", "clinical-product-implementation"],
    ctaLabel: "Discuss a Device or Robotics Programme",
  },
  "healthcare-organisations": {
    slug: "healthcare-organisations",
    navLabel: "Healthcare Organisations",
    metaTitle: "Technology Implementation for Hospitals and Healthcare Organisations | Ayothedoc",
    metaDescription:
      "Turn technology investment into adopted, connected, measurable change: readiness assessment, workflow mapping, vendor evaluation and staff adoption.",
    heroTitle: "Make your technology investment actually land",
    intro:
      "We help hospitals, clinics and health systems turn purchased technology into adopted, connected and measurable operational change, with change management and clear performance measures.",
    problems: [
      "Technology is purchased but poorly adopted",
      "Systems do not fit staff workflows",
      "Digital projects are fragmented",
      "Devices and software do not exchange information",
      "Staff need implementation and change-management support",
      "Technology investment lacks clear performance measures",
    ],
    focus: [
      "Technology-readiness assessment",
      "Workflow mapping",
      "Vendor and product evaluation support",
      "Implementation planning",
      "Staff adoption",
      "Connected systems",
      "Responsible automation",
      "Performance measurement",
    ],
    relatedSolutions: ["digital-health-connected-systems", "medtech-robotics-implementation", "ai-intelligent-automation"],
    ctaLabel: "Discuss a Healthcare Technology Initiative",
  },
  "africa-market-entry": {
    slug: "africa-market-entry",
    navLabel: "African Market Entry",
    metaTitle: "Healthcare Technology Implementation Support for African Markets | Ayothedoc",
    metaDescription:
      "Local workflow research, stakeholder mapping, hospital-readiness assessment, pilot planning, product localisation and adoption support for African markets.",
    heroTitle: "Healthcare technology implementation support for African markets",
    intro:
      "We help international healthcare technology companies understand local workflows, assess hospital readiness and plan practical implementation and adoption in African markets.",
    problems: [
      "Limited understanding of local healthcare workflows",
      "Uncertainty about hospital readiness and purchasing processes",
      "Need for pilot-site identification and implementation planning",
      "Need for product adaptation and structured user feedback",
      "Need for local clinical, technical and operational coordination",
    ],
    focus: [
      "Local workflow research",
      "Stakeholder mapping",
      "Hospital-readiness assessment",
      "Pilot planning",
      "Product localisation",
      "User feedback",
      "Training coordination",
      "Implementation support",
      "Adoption measurement",
    ],
    note:
      "Ayothedoc provides research, planning, coordination and implementation support. We do not provide regulatory representation, legal advice, guaranteed procurement or government access, and we do not claim existing distributor networks or market approvals.",
    relatedSolutions: ["medtech-robotics-implementation", "digital-health-connected-systems", "clinical-product-implementation"],
    ctaLabel: "Discuss an African Market Implementation",
  },
}

export const audienceSlugs = Object.keys(audienceDetails)
