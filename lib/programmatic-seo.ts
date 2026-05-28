import fs from "fs/promises"
import path from "path"
import { cache } from "react"

export type FourC = "Context" | "Connections" | "Capabilities" | "Cadence"
export type PageTier = "pillar" | "wedge" | "capability"

export interface ProgrammaticSeoSections {
  // Done-for-you structure. Every page renders these in order; the renderer
  // wraps each in a section heading appropriate for done-for-you framing
  // (no DIY "implementation steps").
  intro: string
  fourCFit: string
  whatDoneLooksLike: string
  howWeInstall: string
  expectedResults: string
  faq: string
}

export interface ProgrammaticSeoSource {
  outcome?: Record<string, unknown>
  industry?: Record<string, unknown>
  tool?: Record<string, unknown>
}

export interface ProgrammaticSeoPage {
  slug: string
  title: string
  metaDescription: string
  outcome: string
  fourC: FourC
  tier: PageTier
  industry?: string | null
  // Optional "works with your stack" mention. Never primary anymore.
  tool?: string | null
  // Legacy field, retained as nullable so older content can still be read.
  useCase?: string | null
  datePublished?: string
  readTime?: number
  excerpt?: string
  sections: ProgrammaticSeoSections
  source?: ProgrammaticSeoSource
}

export interface ProgrammaticSeoSummary {
  slug: string
  title: string
  metaDescription: string
  outcome: string
  fourC: FourC
  tier: PageTier
  industry?: string | null
  tool?: string | null
  excerpt?: string
  readTime?: number
  datePublished?: string
}

interface ProgrammaticSeoManifest {
  pages: ProgrammaticSeoSummary[]
}

const DATA_ROOT = path.join(process.cwd(), "data", "programmatic-seo")
const PAGES_DIR = path.join(DATA_ROOT, "pages")
const MANIFEST_PATH = path.join(DATA_ROOT, "index.json")

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8")
  return JSON.parse(raw) as T
}

export const getProgrammaticSummaries = cache(async (): Promise<ProgrammaticSeoSummary[]> => {
  if (!(await pathExists(MANIFEST_PATH))) {
    return []
  }

  try {
    const manifest = await readJsonFile<ProgrammaticSeoManifest>(MANIFEST_PATH)
    return manifest.pages ?? []
  } catch (error) {
    console.error("Failed to read programmatic SEO manifest:", error)
    return []
  }
})

export const getProgrammaticPageBySlug = cache(async (slug: string): Promise<ProgrammaticSeoPage | null> => {
  if (!slug) {
    return null
  }

  const filePath = path.join(PAGES_DIR, `${slug}.json`)

  if (!(await pathExists(filePath))) {
    return null
  }

  try {
    return await readJsonFile<ProgrammaticSeoPage>(filePath)
  } catch (error) {
    console.error(`Failed to read programmatic SEO page for slug ${slug}:`, error)
    return null
  }
})

export const getProgrammaticPages = cache(async (): Promise<ProgrammaticSeoPage[]> => {
  if (!(await pathExists(PAGES_DIR))) {
    return []
  }

  try {
    const files = await fs.readdir(PAGES_DIR)
    const pages = await Promise.all(
      files
        .filter((fileName) => fileName.endsWith(".json"))
        .map(async (fileName) => {
          const page = await readJsonFile<ProgrammaticSeoPage>(path.join(PAGES_DIR, fileName))
          return page
        }),
    )

    return pages.sort((a, b) => {
      const dateA = a.datePublished ? new Date(a.datePublished).getTime() : 0
      const dateB = b.datePublished ? new Date(b.datePublished).getTime() : 0
      return dateB - dateA
    })
  } catch (error) {
    console.error("Failed to load programmatic SEO pages:", error)
    return []
  }
})

export const getProgrammaticFilters = cache(async () => {
  const summaries = await getProgrammaticSummaries()

  const outcomes = new Set<string>()
  const fourCs = new Set<string>()
  const industries = new Set<string>()
  const tiers = new Set<string>()

  for (const summary of summaries) {
    if (summary.outcome) outcomes.add(summary.outcome)
    if (summary.fourC) fourCs.add(summary.fourC)
    if (summary.industry) industries.add(summary.industry)
    if (summary.tier) tiers.add(summary.tier)
  }

  // Keep Four-C order canonical (matches the brand line on the site).
  const FOUR_C_ORDER: FourC[] = ["Context", "Connections", "Capabilities", "Cadence"]
  const fourCsSorted = FOUR_C_ORDER.filter((c) => fourCs.has(c))

  return {
    outcomes: Array.from(outcomes).sort(),
    fourCs: fourCsSorted,
    industries: Array.from(industries).sort(),
    tiers: Array.from(tiers).sort(),
  }
})
