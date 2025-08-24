import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ayothedoc - Full Service Digital Agency | Web Development & AI Automation",
  description:
    "Save 10+ hours weekly with custom web development and AI automation. Expert WordPress sites, Make.com workflows, and business process optimization. Free consultation available.",
  keywords:
    "web development, AI automation, WordPress, Make.com, N8N, business automation, process optimization, digital agency, custom websites, workflow automation",
  authors: [{ name: "Ayothedoc" }],
  creator: "Ayothedoc",
  publisher: "Ayothedoc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ayothedoc.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ayothedoc - Save 10+ Hours Weekly with AI Automation",
    description:
      "Transform your business with custom web development and intelligent workflow automation. Join 150+ businesses already saving time and money.",
    url: "https://ayothedoc.com",
    siteName: "Ayothedoc",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ayothedoc - Full Service Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayothedoc - Save 10+ Hours Weekly with AI Automation",
    description: "Transform your business with custom web development and intelligent workflow automation.",
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'Ayothedoc'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#84cc16" />
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ayothedoc",
              description: "Full Service Digital Agency specializing in web development and AI automation",
              url: "https://ayothedoc.com",
              logo: "https://ayothedoc.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: ["https://twitter.com/ayothedoc", "https://linkedin.com/company/ayothedoc"],
              offers: {
                "@type": "Offer",
                description: "Free consultation for web development and automation services",
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
