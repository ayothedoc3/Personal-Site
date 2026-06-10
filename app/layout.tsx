import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalyticsPageView } from "@/components/google-analytics"
import "./globals.css"

const SITE_TITLE = "Managed AI Operations for Growing Businesses | Ayothedoc"
const SITE_DESCRIPTION =
  "We install your company's AI Operating System, wired into your tools, trained on your business, then run it for you. Live in 10 days. Recover 40+ hours a month or you don't pay."

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords:
    "managed AI operations, AI operating system, AIOS, AI automation agency, done-for-you AI, business automation, workflow automation, AI for small business, lead response automation, AI consulting",
  authors: [{ name: "Ayothedoc" }],
  creator: "Ayothedoc",
  publisher: "Ayothedoc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ayothedoc.com"),
  // No site-wide canonical here: a layout-level canonical is inherited by every
  // child page, which made them all canonicalize to the homepage and get
  // dropped from the index. Each page sets its own canonical (see per-route
  // metadata / layouts); pages without one self-canonicalize to their URL.
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://ayothedoc.com",
    siteName: "Ayothedoc",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ayothedoc: Managed AI Operations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: "@ayothedoc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Ayothedoc",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#84cc16" />
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Ayothedoc",
              description:
                "Managed AI Operations. We install and run your company's AI Operating System, wired into your tools, trained on your business, then operate it for you.",
              url: "https://ayothedoc.com",
              logo: "https://ayothedoc.com/logo.png",
              image: "https://ayothedoc.com/og-image.jpg",
              areaServed: "Worldwide",
              serviceType: "Managed AI Operations",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: ["https://twitter.com/ayothedoc", "https://linkedin.com/company/ayothedoc"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "AI Operations Plans",
                itemListElement: [
                  {
                    "@type": "Offer",
                    name: "Foundation",
                    description: "AI Operating System installed and connected; you operate it.",
                    price: "1000",
                    priceCurrency: "USD",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "1000",
                      priceCurrency: "USD",
                      billingDuration: 1,
                      billingIncrement: 1,
                      unitCode: "MON",
                    },
                  },
                  {
                    "@type": "Offer",
                    name: "Operations",
                    description: "We actively run your AI operations and ship new automations weekly.",
                    price: "2500",
                    priceCurrency: "USD",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "2500",
                      priceCurrency: "USD",
                      billingDuration: 1,
                      billingIncrement: 1,
                      unitCode: "MON",
                    },
                  },
                  {
                    "@type": "Offer",
                    name: "Autonomous",
                    description: "A 24/7 AI operations layer running across your whole business.",
                    price: "5000",
                    priceCurrency: "USD",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "5000",
                      priceCurrency: "USD",
                      billingDuration: 1,
                      billingIncrement: 1,
                      unitCode: "MON",
                    },
                  },
                ],
              },
            }),
          }}
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
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-lime-400 focus:text-gray-900 focus:rounded-lg focus:font-semibold"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
