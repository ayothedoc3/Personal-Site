/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add standalone output for Docker builds (only when DOCKER_BUILD is set)
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Transformers.js (browser ML for the de-identify tool) pulls in
  // onnxruntime-web; keep the node-only onnxruntime and sharp out of the bundle.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false,
    }
    return config
  },

  // Permanent redirects from the retired tool-led programmatic SEO slugs to their
  // outcome-led replacements (or to the /automation index when there's no clean
  // 1:1 mapping). See programmatic-seo-realignment-plan.md → Migration.
  async redirects() {
    return [
      {
        source: '/automation/n8n-lead-generation-marketing-agencies',
        destination: '/automation/60-second-lead-response-marketing-agencies',
        permanent: true,
      },
      {
        source: '/automation/n8n-lead-generation-consulting',
        destination: '/automation/60-second-lead-response-consulting-firms',
        permanent: true,
      },
      {
        source: '/automation/zapier-customer-onboarding-consulting',
        destination: '/automation/client-onboarding-automation-consulting-firms',
        permanent: true,
      },
      // Retired tool-led pages with no clean 1:1 mapping fall back to the
      // /automation index so traffic still lands somewhere useful.
      { source: '/automation/make-com-lead-generation-law-firms', destination: '/automation', permanent: true },
      { source: '/automation/n8n-lead-generation-law-firms', destination: '/automation', permanent: true },
      { source: '/automation/n8n-lead-generation-e-commerce', destination: '/automation', permanent: true },
      { source: '/automation/n8n-lead-generation-healthcare', destination: '/automation', permanent: true },
      { source: '/automation/n8n-lead-generation-real-estate', destination: '/automation', permanent: true },
      { source: '/automation/n8n-lead-generation-restaurants', destination: '/automation', permanent: true },
      { source: '/automation/n8n-lead-generation-saas-companies', destination: '/automation', permanent: true },
      { source: '/automation/n8n-reporting-automation-saas-companies', destination: '/automation', permanent: true },
      { source: '/automation/n8n-social-media-posting-e-commerce', destination: '/automation', permanent: true },
      { source: '/automation/n8n-social-media-posting-real-estate', destination: '/automation', permanent: true },
    ]
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://api.emailjs.com https://www.googletagmanager.com https://challenges.cloudflare.com https://cdn.jsdelivr.net; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://challenges.cloudflare.com; connect-src 'self' https://api.emailjs.com https://www.google-analytics.com https://region1.google-analytics.com https://huggingface.co https://*.huggingface.co https://*.hf.co https://cdn.jsdelivr.net;",
          },
        ],
      },
    ]
  },
}

export default nextConfig
