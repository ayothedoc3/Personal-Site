// On-device PHI de-identification engine. Pure functions, no imports, no network,
// so it runs entirely in the browser. This is a lightweight in-browser detector
// for the public demo; production/client engagements use full clinical NER models
// running on the client's own infrastructure.

export type PhiLabel =
  | "NAME"
  | "DATE"
  | "SSN"
  | "PHONE"
  | "EMAIL"
  | "ADDRESS"
  | "MRN"
  | "ID"
  | "ZIP"

export interface Entity {
  start: number
  end: number
  label: PhiLabel
  text: string
}

export type DeidMethod = "mask" | "replace" | "hash"

// --- Structured identifier detectors (high precision) ---------------------
const patterns: { label: PhiLabel; re: RegExp }[] = [
  { label: "EMAIL", re: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },
  { label: "SSN", re: /\b\d{3}-\d{2}-\d{4}\b/g },
  { label: "PHONE", re: /(?:\+?\d{1,3}[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/g },
  { label: "MRN", re: /\b(?:MRN|Medical Record(?: No| Number)?|Record No)[:#\s]*([A-Z0-9-]{4,})/gi },
  { label: "DATE", re: /\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{4})\b/gi },
  { label: "ZIP", re: /\b\d{5}(?:-\d{4})?\b/g },
  { label: "ID", re: /\b(?:NPI|DEA|Account|Acct|Policy|Insurance ID|Member ID)[:#\s]*([A-Z0-9-]{5,})/gi },
]

// --- Contextual name + address detection ----------------------------------
// Titles/labels that reliably precede a person's name in clinical text.
// A name token is a capitalised word or an initial ("A."). A name is 1-4 tokens.
const NT = "(?:[A-Z][a-z'’-]+|[A-Z]\\.)"
const NAME_SEQ = `${NT}(?:\\s+${NT}){0,3}`
// Label-led: "Patient: John A. Carter", "Seen by: Dr. Priya Menon".
const nameLabelRe = new RegExp(
  `\\b(?:Patient|Pt|Name|Provider|Physician|Attending|Seen by|Referred by|Signed by)\\b[:.\\s]+((?:(?:Dr|Mr|Mrs|Ms|Miss|Prof)\\.?\\s+)?${NAME_SEQ})`,
  "g"
)
// Title-led anywhere: "Mr. Carter", "Dr. Priya Menon".
const nameTitleRe = new RegExp(`\\b(?:Dr|Mr|Mrs|Ms|Miss|Prof)\\.\\s+(${NAME_SEQ})`, "g")
const addressRe =
  /\b\d{1,5}\s+(?:[A-Z][a-z]+\s){0,3}(?:Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Lane|Ln|Drive|Dr|Court|Ct|Way|Place|Pl|Terrace|Ter)\b\.?/g

function pushMatches(text: string, re: RegExp, label: PhiLabel, group: number, out: Entity[]) {
  re.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const captured = group > 0 ? m[group] : m[0]
    if (!captured) continue
    const start = m.index + m[0].indexOf(captured)
    out.push({ start, end: start + captured.length, label, text: captured })
    if (m.index === re.lastIndex) re.lastIndex++
  }
}

export function detectEntities(text: string): Entity[] {
  const found: Entity[] = []
  for (const p of patterns) {
    const group = p.label === "MRN" || p.label === "ID" ? 1 : 0
    pushMatches(text, p.re, p.label, group, found)
  }
  pushMatches(text, nameLabelRe, "NAME", 1, found)
  pushMatches(text, nameTitleRe, "NAME", 1, found)
  pushMatches(text, addressRe, "ADDRESS", 0, found)

  // Resolve overlaps: prefer the longer span; on ties, earlier start.
  found.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start))
  const resolved: Entity[] = []
  for (const e of found) {
    if (resolved.some((r) => e.start < r.end && e.end > r.start)) continue
    resolved.push(e)
  }
  return resolved.sort((a, b) => a.start - b.start)
}

// --- De-identification methods --------------------------------------------
const fakeNames = ["Alex Rivera", "Jordan Blake", "Sam Okafor", "Maria Santos", "Chen Wei", "Amara Diallo"]
const fakeStreets = ["48 Elm Street", "12 Rowan Avenue", "301 Cedar Road", "7 Marlow Lane"]

function djb2(s: string): string {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i)
  return (h >>> 0).toString(16).padStart(8, "0")
}

function fakeFor(label: PhiLabel, original: string): string {
  const seed = Math.abs([...original].reduce((a, c) => a + c.charCodeAt(0), 0))
  switch (label) {
    case "NAME":
      return fakeNames[seed % fakeNames.length]
    case "ADDRESS":
      return fakeStreets[seed % fakeStreets.length]
    case "EMAIL":
      return "patient@example.com"
    case "PHONE":
      return "(555) 010-" + String(1000 + (seed % 8999)).padStart(4, "0")
    case "SSN":
      return "900-" + String(10 + (seed % 89)) + "-" + String(1000 + (seed % 8999))
    case "DATE": {
      // shift, keeping a plausible date shape
      return original.replace(/\d+/g, (d) => String(((parseInt(d, 10) + 7) % 90) + 1))
    }
    case "ZIP":
      return String(90000 + (seed % 9999))
    default:
      return String(seed % 1000000).padStart(6, "0")
  }
}

export function deidentify(text: string, method: DeidMethod, entities?: Entity[]): string {
  const ents = entities ?? detectEntities(text)
  let out = ""
  let cursor = 0
  for (const e of ents) {
    out += text.slice(cursor, e.start)
    if (method === "mask") out += `[${e.label}]`
    else if (method === "replace") out += fakeFor(e.label, e.text)
    else out += `${e.label.toLowerCase()}_${djb2(e.text).slice(0, 6)}`
    cursor = e.end
  }
  out += text.slice(cursor)
  return out
}

export const SAMPLE_NOTE = `DISCHARGE SUMMARY

Patient: John A. Carter    MRN: 004821573
DOB: 03/14/1968    SSN: 123-45-6789
Address: 214 Maple Street, Springfield
Phone: (415) 555-0142    Email: jcarter@email.com

Seen by: Dr. Priya Menon on 06/12/2026.

Mr. Carter presented with chronic myeloid leukemia and Type 2 diabetes.
Started on imatinib 400mg daily. Follow-up scheduled for 07/20/2026.
Insurance ID: BCBS-7788341.`
