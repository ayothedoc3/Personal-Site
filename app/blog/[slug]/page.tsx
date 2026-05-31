import { marked } from "marked"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { getPostBySlug } from "@/lib/blog-store"

// Posts are DB-backed and managed from admin, so render on demand.
export const dynamic = "force-dynamic"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

function fmtDate(iso: string | null): string {
  if (!iso) return ""
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  } catch {
    return ""
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post Not Found - Ayothedoc" }
  return {
    title: `${post.title} - Ayothedoc Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const html = await marked.parse(post.content || "", { gfm: true, breaks: false })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="relative">
        <section className="relative px-6 py-20 lg:px-12 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300">
                ← Back to Blog
              </Link>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                {post.category && (
                  <span className="bg-gradient-to-r from-lime-400 to-emerald-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {post.category}
                  </span>
                )}
                <span className="text-muted-foreground text-sm">{fmtDate(post.publishedAt || post.createdAt)}</span>
                {post.readTime && <span className="text-muted-foreground text-sm">{post.readTime}</span>}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>

              {post.excerpt && (
                <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">{post.excerpt}</p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {post.author}</span>
                {post.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span>•</span>
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bg-muted px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {post.coverImage && (
              <div className="aspect-video overflow-hidden rounded-2xl mb-12 shadow-2xl">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </section>

        <section className="relative px-6 py-16 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <article
              className="prose prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-foreground/90 prose-p:leading-relaxed
                prose-a:text-lime-500 hover:prose-a:text-lime-400 prose-a:font-medium
                prose-strong:text-foreground
                prose-ul:text-foreground/90 prose-ol:text-foreground/90
                prose-li:marker:text-lime-400 prose-li:my-1
                prose-blockquote:border-l-lime-400 prose-blockquote:bg-muted/40 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r prose-blockquote:not-italic
                dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </section>

        {/* CTA: drive to the free Lead Engine, the primary site action */}
        <section className="relative px-6 py-16 lg:px-12">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/30 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stop losing leads to slow follow-up</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              We will build your 60-Second Lead Engine free, on your real leads. No card, no risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                  Get Your Lead Engine Free
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                  Read more articles
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
