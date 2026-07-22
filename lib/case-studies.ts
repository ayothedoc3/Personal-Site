// Case-study data. CLAIMS POLICY: every entry carries an accurate status label,
// no invented metrics (use "Not measured"), and a `verified` flag. Entries are
// seeded from the brief's example projects but MUST be confirmed and completed
// with real detail by the owner before publishing. See CONTENT_VERIFICATION_REQUIRED.md.

export interface CaseStudy {
  slug: string
  name: string
  status: string // project-type label, e.g. "Healthcare AI Hackathon Pilot"
  verified: boolean // false = do not present as a real, completed engagement
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
  metrics: string // "Not measured" where evidence is unavailable
  lessons: string
  nextSteps: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "exerscript-healthcare-ai-hackathon-pilot",
    name: "ExerScript",
    status: "Healthcare AI Hackathon Pilot",
    verified: false,
    summary: "A pilot exploring AI-supported exercise prescription within a clinical workflow.",
    problem: "Exercise prescription is time-consuming and inconsistent, and rarely fits neatly into a busy clinical workflow.",
    users: "Clinicians prescribing exercise, and the patients receiving structured plans.",
    context: "Built and demonstrated within a healthcare AI hackathon setting, not a live clinical deployment.",
    role: "Concept, clinical workflow framing, product requirements and demonstration.",
    requirements: [
      "Fit the output into an existing prescription step",
      "Keep a clinician in the loop for review",
      "Produce plans in a consistent, reviewable format",
    ],
    approach: "Framed the clinical need first, then scoped the smallest AI-supported step that could help, with human review retained.",
    workflow: "Clinician input, drafted plan, clinician review and adjustment, patient-facing output.",
    technology: ["Large language model", "Structured prompt and review workflow"],
    safety: "Designed with human review on the clinical output; not intended for autonomous prescription.",
    outcome: "Demonstrated the concept in a hackathon setting.",
    metrics: "Not measured",
    lessons: "Value comes from fitting the existing workflow and keeping review in the loop, not from removing the clinician.",
    nextSteps: "Validate the workflow with practising clinicians before any pilot in a real setting.",
  },
  {
    slug: "fhir-workflow-prototype",
    name: "FHIR-enabled healthcare workflow prototype",
    status: "Independent Prototype",
    verified: false,
    summary: "A prototype demonstrating FHIR-based data exchange between healthcare systems.",
    problem: "Healthcare systems frequently cannot exchange information, forcing manual re-entry and fragmented records.",
    users: "Technical and clinical teams responsible for integration.",
    context: "An independent prototype built to demonstrate a connected data workflow, not a production integration.",
    role: "Prototype design, data mapping and demonstration.",
    requirements: [
      "Use a recognised interoperability standard (FHIR)",
      "Map data between two representative systems",
      "Show a clean, reviewable data flow",
    ],
    approach: "Modelled a representative data flow using FHIR resources to show how systems could exchange information.",
    workflow: "Source system, FHIR mapping, destination system, review.",
    technology: ["FHIR", "Healthcare API patterns"],
    safety: "No real patient data used; prototype only.",
    outcome: "Demonstrated a connected data workflow concept.",
    metrics: "Not measured",
    lessons: "Interoperability is as much about workflow and permissions as it is about the data format.",
    nextSteps: "Define real integration requirements and permissions with a specific pair of systems.",
  },
  {
    slug: "medical-device-usability-study",
    name: "Medical-device usability study",
    status: "Implementation Study",
    verified: false,
    summary: "A structured usability and human-factors assessment of a medical device in context.",
    problem: "Devices are often assessed for function but not for how they fit real user workflows and environments.",
    users: "Clinical and operational staff who would use the device.",
    context: "A structured study of usability and human factors, framed as an implementation study rather than a deployment.",
    role: "Study design, structured observation and synthesis of findings.",
    requirements: [
      "Assess usability against real tasks",
      "Capture human-factors risks",
      "Produce actionable findings",
    ],
    approach: "Structured the assessment around representative tasks and the environment the device would be used in.",
    workflow: "Task definition, observation, synthesis, recommendations.",
    technology: ["Human-factors assessment methods"],
    safety: "Findings included human-factors risks and mitigations.",
    outcome: "Produced a structured set of usability findings and recommendations.",
    metrics: "Not measured",
    lessons: "Small workflow and interface issues drive adoption more than headline features.",
    nextSteps: "Feed findings into the product and implementation plan.",
  },
]

export const verifiedCaseStudies = () => caseStudies.filter((c) => c.verified)
export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug)
