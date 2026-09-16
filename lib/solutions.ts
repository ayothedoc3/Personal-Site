// Detailed healthcare AI service-page content, keyed by stable search-focused slug.
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
  demo?: { href: string; label: string; blurb: string }
  ctaLabel: string
}

export const solutionDetails: Record<string, SolutionDetail> = {
  "healthcare-ai-consulting": {
    slug: "healthcare-ai-consulting",
    navLabel: "Healthcare AI Readiness and Strategy",
    metaTitle: "Healthcare AI Consulting and Readiness | Ayothedoc",
    metaDescription:
      "Prioritise healthcare AI use cases, assess workflow, data and governance readiness, and build a practical roadmap from opportunity to pilot.",
    heroTitle: "Choose the right healthcare AI problem before you build",
    intro:
      "We help healthtech teams and healthcare organisations turn broad AI ambition into a prioritised use case, a clear readiness picture and a practical delivery roadmap.",
    positioning:
      "The output is a decision you can act on: what to pursue, what to fix first, what evidence is needed and what a responsible pilot should test.",
    problems: [
      "A long list of AI ideas with no clear priority",
      "Unclear workflow ownership or intended users",
      "Data that may not be ready or appropriate",
      "No agreed success or acceptance criteria",
      "Build-versus-buy uncertainty",
      "Risk and governance work left until the end",
    ],
    services: [
      "Healthcare AI opportunity discovery",
      "Use-case prioritisation",
      "Current-workflow mapping",
      "Data and integration readiness review",
      "Build, buy or integrate assessment",
      "Human-oversight and risk planning",
      "Evaluation and acceptance criteria",
      "Prototype or pilot roadmap",
    ],
    process: {
      heading: "What the assessment considers",
      items: [
        "User need",
        "Workflow fit",
        "Available data",
        "System connections",
        "Clinical and operational risk",
        "Human ownership",
        "Evaluation evidence",
        "Delivery effort",
      ],
    },
    responsibleUse:
      "AI readiness is not permission to deploy. Higher-risk use cases need proportionate clinical, privacy, security, regulatory and organisational review before implementation.",
    boundaries:
      "Ayothedoc provides product, workflow and technical delivery support. We do not replace legal, regulatory, clinical-safety, information-security or data-protection specialists.",
    aiosNote: true,
    ctaLabel: "Start with the Pilot Readiness Sprint",
  },
  "ai-intelligent-automation": {
    slug: "ai-intelligent-automation",
    navLabel: "Healthcare AI Workflow Automation",
    metaTitle: "Healthcare AI Workflow Automation | Ayothedoc",
    metaDescription:
      "Design and implement human-supervised AI workflows, knowledge assistants and agentic automation for healthcare operations and healthtech products.",
    heroTitle: "Build AI around the healthcare workflow, not beside it",
    intro:
      "We design and implement focused AI-assisted workflows that connect to the tools people already use, reduce repetitive steps and preserve clear human accountability.",
    positioning:
      "The best first workflow is narrow enough to test, useful enough to matter and controlled enough that people know when to review, override or stop it.",
    problems: [
      "Staff copy information between disconnected tools",
      "Knowledge is scattered across documents and inboxes",
      "AI pilots produce text but do not complete a workflow",
      "No one owns review, escalation or failure handling",
      "The automation has no monitoring or audit trail",
      "Sensitive data moves farther than necessary",
    ],
    services: [
      "Administrative workflow automation",
      "Healthcare knowledge assistants",
      "Document and intake workflows",
      "Human-in-the-loop agent design",
      "API and system integration",
      "MCP server and tool design",
      "Agent-to-agent orchestration",
      "Review and escalation workflows",
      "Monitoring and audit requirements",
    ],
    audience: [
      "Healthtech product teams",
      "Healthcare operations teams",
      "Clinical innovation teams",
      "Digital health programmes",
      "Technical teams adding AI to an existing product",
    ],
    responsibleUse:
      "Clinical and other high-impact decisions remain with appropriately qualified people. Automation scope, permissions and escalation should match the risk of the task.",
    boundaries:
      "We do not market autonomous diagnosis or treatment. Any production workflow involving health information requires controls agreed for the organisation and intended use.",
    aiosNote: true,
    ctaLabel: "Discuss a Healthcare AI Workflow",
  },
  "healthcare-ai-product-development": {
    slug: "healthcare-ai-product-development",
    navLabel: "Healthcare AI Product and Prototype Delivery",
    metaTitle: "Healthcare AI Product Development | Ayothedoc",
    metaDescription:
      "Turn a healthcare AI concept into requirements, a testable prototype, evaluation scenarios and a practical pilot plan grounded in real workflows.",
    heroTitle: "Turn a healthcare AI concept into something testable",
    intro:
      "We connect healthcare context, product decisions and technical delivery so teams can move from an AI concept to a prototype that answers a real workflow question.",
    positioning:
      "A prototype should reduce uncertainty. It should show what the system does, where people stay in control and what must be proven before a pilot.",
    problems: [
      "The AI feature is not tied to a specific user workflow",
      "Clinical and technical teams use different definitions of success",
      "Requirements do not cover data, review or failure states",
      "A demo is being treated as evidence of production readiness",
      "The pilot has no evaluation plan",
      "Integration assumptions have not been tested",
    ],
    services: [
      "Healthcare AI product discovery",
      "User and workflow requirements",
      "Prototype scope and architecture",
      "Rapid AI prototype delivery",
      "Agent, API and tool orchestration",
      "Evaluation scenarios",
      "User testing plan",
      "Pilot requirements and roadmap",
      "Technical project delivery",
    ],
    process: {
      heading: "A prototype is designed to answer",
      items: [
        "Does it solve the intended problem?",
        "Can the workflow be integrated?",
        "Is the output reviewable?",
        "Where does it fail?",
        "What evidence is still missing?",
        "What would a responsible pilot require?",
      ],
    },
    responsibleUse:
      "Prototype output is not clinical evidence. Intended use, evaluation, oversight and governance must be defined before the work is considered for a real healthcare environment.",
    boundaries:
      "Ayothedoc can design and build prototypes and coordinate delivery. Formal clinical validation, regulatory approval and production security assurance require the appropriate accountable specialists.",
    aiosNote: true,
    ctaLabel: "Discuss a Healthcare AI Product",
  },
  "healthcare-ai-governance": {
    slug: "healthcare-ai-governance",
    navLabel: "Healthcare AI Safety, Privacy and Governance",
    metaTitle: "Healthcare AI Safety and Governance | Ayothedoc",
    metaDescription:
      "Design healthcare AI controls for data minimisation, human review, evaluation, failure handling, audit trails and ongoing monitoring.",
    heroTitle: "Make healthcare AI controls part of the workflow",
    intro:
      "We help teams turn responsible-AI principles into concrete product and operating decisions that users can follow and reviewers can inspect.",
    positioning:
      "Governance is strongest when it is visible in the system: what data enters, what the AI may do, who reviews it, what gets logged and what happens when confidence is low.",
    problems: [
      "The intended use and system boundaries are vague",
      "Sensitive data is used without minimisation",
      "Human review exists only as a policy statement",
      "Edge cases and failures are not tested",
      "No acceptance threshold has been agreed",
      "Logs, monitoring and incident ownership are unclear",
    ],
    services: [
      "Intended-use and boundary definition",
      "Workflow-level risk assessment",
      "Data minimisation and de-identification design",
      "Human-review and escalation design",
      "Evaluation scenarios and acceptance criteria",
      "Failure and fallback planning",
      "Audit-trail requirements",
      "Monitoring and review plans",
    ],
    responsibleUse:
      "Controls must be proportionate to intended use and risk. High-risk healthcare decisions require appropriate human oversight, validation and accountable governance.",
    boundaries:
      "This service supports product and workflow governance. It is not legal advice, regulatory certification, a clinical-safety sign-off or an information-security audit.",
    aiosNote: true,
    demo: {
      href: "/tools/de-identify",
      label: "Try the on-device de-identification demo",
      blurb: "See common identifiers removed from clinical text in your browser, without uploading the pasted text.",
    },
    ctaLabel: "Discuss Healthcare AI Safety and Governance",
  },
}

export const solutionSlugs = Object.keys(solutionDetails)
