import type { SiteInfo } from "@/lib/site-config"

const ORGANIZATION_LOGO_PATH = "/organization-logo.svg"
const ORGANIZATION_LOGO_SIZE = 512

export function organizationJsonLd(site: SiteInfo) {
  const logoUrl = `${site.url}${ORGANIZATION_LOGO_PATH}`

  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${site.url}/#logo`,
      url: logoUrl,
      contentUrl: logoUrl,
      width: ORGANIZATION_LOGO_SIZE,
      height: ORGANIZATION_LOGO_SIZE,
      caption: site.name,
    },
  }
}

export type FaqEntry = {
  question: string
  answer: string
}

export function faqPageJsonLd(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  }
}
