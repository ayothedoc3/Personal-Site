import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import BlogClient from "@/components/blog-client"
import { getPublishedPosts, getCategories } from "@/lib/posts"

export default async function Blog() {
  const blogPosts = await getPublishedPosts()
  const categories = await getCategories()


  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <header className="relative z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 sticky top-0">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110">
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
            </div>
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Ayothedoc
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/audit", label: "Business Audit" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/blog", label: "Blog", active: true },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 transition-all duration-300 group ${
                  item.active ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    item.active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-6 py-2 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group">
              <span className="group-hover:scale-110 transition-transform duration-200">Book a Consultation</span>
            </Button>
          </div>
        </div>
      </header>

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
            Stay updated with the latest trends in web development, automation strategies, and business optimization
            techniques. Learn from our experience and discover actionable insights for your business.
          </p>
        </div>
      </section>

      <BlogClient initialPosts={blogPosts} categories={categories} />

    </div>
  )
}
