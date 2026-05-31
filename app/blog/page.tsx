import { SiteHeader } from "@/components/site-header"
import BlogClient from "@/components/blog-client"
import { listPublishedPosts } from "@/lib/blog-store"

// Posts come from the database (managed in admin), so render dynamically and
// reflect publish/edit changes immediately without a redeploy.
export const dynamic = "force-dynamic"

function fmtDate(iso: string | null): string {
  if (!iso) return ""
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  } catch {
    return ""
  }
}

function coverUrl(title: string, category: string): string {
  return `/blog/cover?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`
}

export default async function Blog() {
  const records = await listPublishedPosts()
  const blogPosts = records.map((r) => ({
    id: Number(r.id),
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    date: fmtDate(r.publishedAt || r.createdAt),
    category: r.category,
    readTime: r.readTime,
    image: r.coverImage || coverUrl(r.title, r.category),
    published: r.published,
    author: r.author,
    tags: r.tags,
    content: "",
  }))
  const categories = Array.from(new Set(records.map((r) => r.category).filter(Boolean)))


  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <SiteHeader />

      <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className="mb-8 opacity-0 animate-fade-in-up"
            data-animate
            id="blog-badge"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-sm font-semibold tracking-wider uppercase shadow-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              OUR BLOG
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-in-up"
            data-animate
            id="blog-title"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Insights
            </span>{" "}
            <span className="inline-block hover:scale-105 transition-transform duration-300">& Expertise</span>
          </h1>

          <p
            className="text-muted-foreground text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            data-animate
            id="blog-subtitle"
            style={{ animationDelay: "0.6s" }}
          >
            Practical thinking on AI operations for agencies and consultants: faster lead response, less busywork, and
            systems that run the repetitive work for you.
          </p>
        </div>
      </section>

      <BlogClient initialPosts={blogPosts} categories={categories} />

    </div>
  )
}
