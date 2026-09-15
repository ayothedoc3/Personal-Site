// Case-study claims are limited to projects confirmed by the owner or directly
// verifiable in this repository. No client outcomes or metrics are inferred.

export interface CaseStudy {
  slug: string
  name: string
  status: string
  verified: boolean
  summary: string
  problem: string
  users: string
  context: string
  role: string
  requirements: string[]
  approach: string
  workflow: string
  technology: string[]
  safety: string
  outcome: string
  metrics: string
  lessons: string
  nextSteps: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "exerscript-healthcare-ai-prototype",
    name: "ExerScript",
    status: "Healthcare AI Prototype",
    verified: true,
    summary:
      "A physical-activity prescription agent demonstrating how healthcare-specific tools can work together through MCP and agent-to-agent orchestration.",
    problem:
      "Physical-activity prescription needs structured domain context and a workflow that keeps the output understandable and reviewable.",
    users: "Healthcare professionals exploring structured support for physical-activity prescriptions.",
    context: "An independent healthcare AI prototype, not a deployed clinical system.",
    role: "Designed and built the prototype, its MCP server and its agent-to-agent orchestration.",
    requirements: [
      "Support a physical-activity prescription workflow",
      "Expose healthcare-specific capabilities through an MCP server",
      "Coordinate specialised components through agent-to-agent orchestration",
      "Keep the result available for human review",
    ],
    approach:
      "Separated domain capabilities into tools, then coordinated them through an agent workflow instead of relying on one undifferentiated prompt.",
    workflow:
      "Healthcare context enters the agent workflow, specialised tools contribute through MCP, and the orchestrated result is returned for review.",
    technology: ["Model Context Protocol (MCP)", "Agent-to-agent orchestration", "AI agents"],
    safety:
      "The prototype is not validated for clinical use and is not presented as an autonomous diagnosis or treatment system. Any clinical use would require formal evaluation, governance and human oversight.",
    outcome:
      "Produced a working healthcare AI prototype that demonstrates physical-activity prescription support using an MCP server and agent-to-agent orchestration.",
    metrics: "Not measured",
    lessons:
      "Healthcare agent design is clearer when domain capabilities, orchestration and human review are explicit parts of the workflow.",
    nextSteps:
      "Define a specific intended-use case, test with representative users and data, and agree clinical, privacy and quality acceptance criteria before a real-world pilot.",
  },
  {
    slug: "on-device-clinical-de-identification-demo",
    name: "On-device clinical de-identification",
    status: "Public Healthcare AI Demo",
    verified: true,
    summary:
      "A browser-based demonstration that removes common identifiers from clinical text without sending the pasted text to a server.",
    problem:
      "Teams need safer ways to explore text workflows without unnecessarily moving identifiable clinical information into remote services.",
    users: "Healthtech and healthcare teams evaluating privacy-conscious clinical text workflows.",
    context:
      "A public technical demonstration on ayothedoc.com. It is not a certified de-identification product or a substitute for an organisation's privacy review.",
    role: "Designed, built and published the browser-based demonstration.",
    requirements: [
      "Process pasted text locally in the browser",
      "Detect common structured identifiers immediately",
      "Offer optional in-browser name detection",
      "Show the transformed text for user review",
    ],
    approach:
      "Combined local pattern matching with an optional browser AI model so the source text can remain on the user's device.",
    workflow:
      "The user pastes text, local detection identifies candidate information, the browser transforms it, and the user reviews the result.",
    technology: ["TypeScript", "Transformers.js", "Browser-based inference", "Pattern matching"],
    safety:
      "The page states its demonstration boundaries and keeps review with the user. Production use would require broader identifier coverage, validation, governance and monitoring.",
    outcome:
      "Published a working, inspectable demonstration of an on-device approach to clinical text de-identification.",
    metrics: "Not measured",
    lessons:
      "Data minimisation can be an architectural choice. Some useful healthcare AI processing can happen locally before a remote service is considered.",
    nextSteps:
      "Validate against representative documents, expand identifier coverage and define confidence thresholds and review rules for a specific production context.",
  },
  {
    slug: "scam-shield-voice-deepfake-detection",
    name: "Scam Shield",
    status: "AI Safety Prototype",
    verified: true,
    summary:
      "A real-time voice deepfake detection progressive web app, included as evidence of practical AI safety product delivery rather than a healthcare deployment.",
    problem:
      "People need a usable signal when a live voice interaction may be synthetic or manipulated.",
    users: "People evaluating suspicious voice interactions.",
    context: "An AI safety prototype. It is not presented as a healthcare product or a perfect fraud-detection system.",
    role: "Designed and built the real-time voice deepfake detection PWA.",
    requirements: ["Analyse voice signals in real time", "Present the experience as an installable progressive web app"],
    approach:
      "Packaged a real-time detection workflow into a focused web experience designed to surface a useful signal during a voice interaction.",
    workflow: "Voice input is analysed by the detection workflow and a result is presented to the user in the PWA.",
    technology: ["Progressive web app", "Real-time voice deepfake detection"],
    safety:
      "Detection results should support human judgement, not be treated as certainty. The case study makes no accuracy or production-readiness claim.",
    outcome: "Produced a working PWA prototype for real-time voice deepfake detection.",
    metrics: "Not measured",
    lessons:
      "Safety-focused AI products need clear boundaries and a user experience that communicates uncertainty instead of hiding it.",
    nextSteps: "Define the intended operating conditions and evaluate detection quality against a representative test set.",
  },
]

export const verifiedCaseStudies = () => caseStudies.filter((c) => c.verified)
export const caseStudyBySlug = (slug: string) => verifiedCaseStudies().find((c) => c.slug === slug)
