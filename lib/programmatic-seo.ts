import fs from "fs/promises"
import path from "path"
import { cache } from "react"

export interface ProgrammaticSeoSections {
  intro: string
  benefits: string
  workflow: string
  steps: string
  results: string
  faq: string
}

export interface ProgrammaticSeoSource {
  tool?: Record<string, unknown>
  use_case?: Record<string, unknown>
  industry?: Record<string, unknown>
}

export interface ProgrammaticSeoPage {
  slug: string
  title: string
  metaDescription: string
  tool: string
  useCase: string
  industry: string
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
  tool: string
  useCase: string
  industry: string
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

  const tools = new Set<string>()
  const useCases = new Set<string>()
  const industries = new Set<string>()

  for (const summary of summaries) {
    if (summary.tool) {
      tools.add(summary.tool)
    }
    if (summary.useCase) {
      useCases.add(summary.useCase)
    }
    if (summary.industry) {
      industries.add(summary.industry)
    }
  }

  return {
    tools: Array.from(tools).sort(),
    useCases: Array.from(useCases).sort(),
    industries: Array.from(industries).sort(),
  }
})
