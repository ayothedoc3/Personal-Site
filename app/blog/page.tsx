"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"

export default function Blog() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState({})
  const [activeFilter, setActiveFilter] = useState("All")

  const blogPosts = [
    {
      id: 1,
      title: "10 Business Processes You Should Automate Today",
      excerpt: "Discover the most common business tasks that can be automated to save hours of manual work every week.",
      date: "March 15, 2024",
      category: "Automation",
      readTime: "5 min read",
      image: "/business-automation-workflow.png",
    },
    {
      id: 2,
      title: "WordPress vs Custom Development: Which is Right for Your Business?",
      excerpt: "A comprehensive guide to choosing between WordPress and custom development for your next web project.",
      date: "March 10, 2024",
      category: "Web Development",
      readTime: "8 min read",
      image: "/wordpress-development-comparison.png",
    },
    {
      id: 3,
      title: "How Make.com Saved Our Client 15 Hours Per Week",
      excerpt: "A real case study showing how intelligent automation transformed a client's daily operations.",
      date: "March 5, 2024",
      category: "Case Study",
      readTime: "6 min read",
      image: "/make-com-automation-success.png",
    },
    {
      id: 4,
      title: "The Ultimate Guide to N8N Workflows for Small Businesses",
      excerpt:
        "Learn how to set up powerful N8N workflows that streamline your business operations without technical complexity.",
      date: "February 28, 2024",
      category: "Automation",
      readTime: "12 min read",
      image: "/n8n-workflow-automation-guide.png",
    },
    {
      id: 5,
      title: "5 Signs Your Website Needs a Performance Audit",
      excerpt: "Identify the warning signs that your website is underperforming and costing you potential customers.",
      date: "February 20, 2024",
      category: "Web Development",
      readTime: "4 min read",
      image: "/website-performance.png",
    },
    {
      id: 6,
      title: "Building a Virtual Assistant Workflow That Actually Works",
      excerpt:
        "Step-by-step guide to creating efficient virtual assistant processes that scale with your business growth.",
      date: "February 15, 2024",
      category: "Business Optimization",
      readTime: "7 min read",
      image: "/virtual-assistant-workflow-management.png",
    },
  ]

  const categories = ["All", "Automation", "Web Development", "Case Study", "Business Optimization"]

  const filteredPosts = activeFilter === "All" ? blogPosts : blogPosts.filter((post) => post.category === activeFilter)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible((prev) => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting,
        }))
      })
    }, observerOptions)

    document.addEventListener("mousemove", handleMouseMove)
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el))

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl animate-float"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 bg-gradient-to-tr from-accent/15 to-primary/15 rounded-full blur-xl animate-bounce-slow" />
      </div>

      <header className="relative z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 sticky top-0">
        <div className="flex items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110">
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Ayothedoc
            </span>
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

      <section className="relative px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-12">
            <h2
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent opacity-0 animate-fade-in-up"
              data-animate
              id="featured-title"
              style={{ animationDelay: "0.8s" }}
            >
              Featured Article
            </h2>
          </div>
          <div
            className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] opacity-0 animate-fade-in-up group"
            data-animate
            id="featured-post"
            style={{ animationDelay: "1.0s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <img
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {blogPosts[0].category}
                  </span>
                  <span className="text-muted-foreground text-sm">{blogPosts[0].date}</span>
                  <span className="text-muted-foreground text-sm">{blogPosts[0].readTime}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {blogPosts[0].title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                  {blogPosts[0].excerpt}
                </p>
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-6 py-2 rounded-xl self-start shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group">
                  <span className="group-hover:scale-110 transition-transform duration-200">Read Article</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent opacity-0 animate-fade-in-up"
              data-animate
              id="latest-title"
              style={{ animationDelay: "1.2s" }}
            >
              Latest Articles
            </h2>
            <div
              className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up"
              data-animate
              id="filter-buttons"
              style={{ animationDelay: "1.4s" }}
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`transition-all duration-300 hover:scale-105 ${
                    activeFilter === category
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-primary/25"
                      : "bg-transparent border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 backdrop-blur-sm"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <article
                key={post.id}
                className="group backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 opacity-0 animate-fade-in-up"
                data-animate
                id={`post-${post.id}`}
                style={{ animationDelay: `${1.6 + index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm border border-primary/30">
                        {post.category}
                      </span>
                      <span className="text-muted-foreground text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">{post.date}</span>
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-accent p-0 h-auto group-hover:translate-x-2 transition-all duration-300"
                      >
                        Read More →
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div
            className="text-center mt-12 opacity-0 animate-fade-in-up"
            data-animate
            id="load-more"
            style={{ animationDelay: "2.2s" }}
          >
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110 group">
              <span className="group-hover:scale-110 transition-transform duration-200">Load More Articles</span>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div
          className="relative max-w-4xl mx-auto text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-3xl p-12 shadow-2xl opacity-0 animate-fade-in-up"
          data-animate
          id="newsletter-section"
          style={{ animationDelay: "2.4s" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Updated
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get the latest automation tips, web development insights, and business optimization strategies delivered to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/50"
            />
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group">
              <span className="group-hover:scale-110 transition-transform duration-200">Subscribe</span>
            </Button>
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            Thank you for reading this post, don't forget to subscribe!
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
