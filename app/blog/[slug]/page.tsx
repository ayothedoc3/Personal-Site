import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Ayothedoc',
    }
  }

  return {
    title: `${post.meta.title} - Ayothedoc Blog`,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      images: post.meta.image ? [post.meta.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt,
      images: post.meta.image ? [post.meta.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
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
              { href: "/blog", label: "Blog" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 w-0 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-6 py-2 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
              Book a Consultation
            </Button>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:px-12 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <a href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300">
                ← Back to Blog
              </a>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {post.meta.category}
                </span>
                <span className="text-muted-foreground text-sm">{post.meta.date}</span>
                <span className="text-muted-foreground text-sm">{post.meta.readTime}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {post.meta.title}
                </span>
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">
                {post.meta.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {post.meta.author}</span>
                {post.meta.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <div className="flex gap-2">
                      {post.meta.tags.map((tag) => (
                        <span key={tag} className="bg-muted px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {post.meta.image && (
              <div className="aspect-video overflow-hidden rounded-2xl mb-12 shadow-2xl">
                <img
                  src={post.meta.image}
                  alt={post.meta.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Article Content */}
        <section className="relative px-6 py-20 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <article 
              className="prose prose-lg max-w-none
                prose-headings:bg-gradient-to-r prose-headings:from-primary prose-headings:to-accent prose-headings:bg-clip-text prose-headings:text-transparent
                prose-p:text-foreground prose-p:leading-relaxed
                prose-a:text-primary hover:prose-a:text-accent prose-a:transition-colors prose-a:duration-300
                prose-strong:text-foreground
                prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-foreground
                prose-pre:bg-muted prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:p-4 prose-blockquote:rounded-r
                prose-ul:text-foreground prose-ol:text-foreground
                prose-li:text-foreground prose-li:marker:text-primary
                dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative px-6 py-20 lg:px-12">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Business?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get a free consultation and discover how our automation solutions can save you time and increase efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
                Book Free Consultation
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <a href="/blog">Read More Articles</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}