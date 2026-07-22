import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalyticsPageView } from "@/components/google-analytics"
import { getSiteKey } from "@/lib/site.server"
import { sites, type SiteKey } from "@/lib/site-config"
import "./globals.css"

const META = {
  healthcare: {
    title: "Healthcare Technology Implementation & Clinical Innovation | Ayothedoc",
    description:
      "Ayothedoc helps healthtech companies, medical-device businesses and healthcare organisations design, implement and scale technology that fits real clinical and operational workflows.",
    keywords:
      "healthcare technology implementation, medtech implementation, medical device implementation, healthcare robotics, digital health implementation, clinical workflow consulting, healthcare interoperability, FHIR implementation, healthcare AI implementation, African healthtech implementation",
    url: sites.healthcare.url,
  },
  aios: {
    title: "Managed AI Operations for Agencies & Consultants | AIOS by Ayothedoc",
    description:
      "AIOS by Ayothedoc installs and runs your company's AI Operating System, wired into your tools and trained on your business. Live in 10 days.",
    keywords:
      "managed AI operations, AI operating system, AIOS, agency automation, workflow automation, lead response automation, client onboarding automation, CRM workflow automation",
    url: sites.aios.url,
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
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: sites[key].name }],
      locale: "en_GB",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["/og-image.jpg"] },
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
    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "AIOS by Ayothedoc",
      description:
        "AI operations and automation for agencies, consultants and service businesses. We install and run an AI Operating System wired into your tools.",
      url: sites.aios.url,
      areaServed: "Worldwide",
      serviceType: "Managed AI Operations",
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ayothedoc",
    description:
      "Healthcare technology implementation and clinical innovation consultancy. We help healthtech, medical-device and healthcare organisations implement and scale technology in real clinical environments.",
    url: sites.healthcare.url,
    areaServed: "Worldwide",
    serviceType: "Healthcare Technology Implementation",
    knowsAbout: [
      "Medical technology implementation",
      "Medical devices",
      "Healthcare robotics",
      "Digital health",
      "Healthcare interoperability",
      "Clinical workflow design",
      "Healthcare AI",
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
