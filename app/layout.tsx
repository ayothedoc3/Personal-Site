import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalyticsPageView } from "@/components/google-analytics"
import { getSiteKey } from "@/lib/site.server"
import { sites, siteSocialImages, type SiteKey } from "@/lib/site-config"
import { organizationJsonLd } from "@/lib/structured-data"
import "./globals.css"

const META = {
  healthcare: {
    title: "Healthcare AI Consulting and Implementation | Ayothedoc",
    description:
      "Ayothedoc helps healthtech teams and healthcare organisations choose, design, prototype and implement practical AI systems for real workflows.",
    keywords:
      "healthcare AI consulting, healthcare AI implementation, healthcare workflow automation, agentic AI healthcare, healthcare AI readiness, healthcare AI product development, healthcare AI governance",
    url: sites.healthcare.url,
    socialImage: siteSocialImages.healthcare,
  },
  aios: {
    title: "Managed AI Operations for Agencies & Consultants | AIOS by Ayothedoc",
    description:
      "AIOS by Ayothedoc installs and manages connected lead-response and operations workflows for agencies and consultants.",
    keywords:
      "managed AI operations, AI operating system, AIOS, agency automation, workflow automation, lead response automation, client onboarding automation, CRM workflow automation",
    url: sites.aios.url,
    socialImage: siteSocialImages.aios,
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const key = await getSiteKey()
  const m = META[key]
  return {
    metadataBase: new URL(m.url),
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: sites[key].name }],
    creator: sites[key].name,
    publisher: sites[key].name,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      title: m.title,
      description: m.description,
      url: m.url,
      siteName: sites[key].name,
      images: [m.socialImage],
      locale: "en_GB",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [m.socialImage.url] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    generator: "Ayothedoc",
  }
}

function structuredData(key: SiteKey) {
  if (key === "aios") {
    const organization = {
      ...organizationJsonLd(sites.aios),
      "@type": ["Organization", "ProfessionalService"],
      description:
        "AI operations and automation for agencies, consultants and service businesses. We install and run an AI Operating System wired into your tools.",
      areaServed: "Worldwide",
    }
    return {
      "@context": "https://schema.org",
      "@graph": [
        organization,
        {
          "@type": "Service",
          "@id": `${sites.aios.url}/#service`,
          name: "Managed AI Operations",
          description:
            "AI operations systems installed and managed for agencies, consultants and service businesses.",
          serviceType: "Managed AI Operations",
          provider: { "@id": organization["@id"] },
          areaServed: "Worldwide",
          url: sites.aios.url,
        },
      ],
    }
  }
  const organization = {
    ...organizationJsonLd(sites.healthcare),
    "@type": ["Organization", "ProfessionalService"],
    description:
      "Healthcare AI implementation practice helping healthtech companies and healthcare organisations design and deliver practical AI systems for real workflows.",
    areaServed: "Worldwide",
    knowsAbout: [
      "Healthcare AI",
      "Clinical workflow design",
      "Agentic AI",
      "Healthcare interoperability",
      "Clinical data privacy",
      "AI implementation",
    ],
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "Service",
        "@id": `${sites.healthcare.url}/#service`,
        name: "Healthcare AI Design and Implementation",
        description:
          "Practical healthcare AI strategy, workflow design, prototyping and implementation support.",
        serviceType: "Healthcare AI Design and Implementation",
        provider: { "@id": organization["@id"] },
        areaServed: "Worldwide",
        url: sites.healthcare.url,
      },
    ],
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const siteKey = await getSiteKey()

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {gaMeasurementId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(siteKey)) }}
        />

        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="ayothedoc-ui-theme">
          {gaMeasurementId ? (
            <Suspense fallback={null}>
              <GoogleAnalyticsPageView measurementId={gaMeasurementId} />
            </Suspense>
          ) : null}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded-lg focus:font-semibold"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
