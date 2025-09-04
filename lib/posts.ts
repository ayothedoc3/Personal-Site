import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  image: string
  published: boolean
  author: string
  tags: string[]
}

export interface Post {
  meta: PostMeta
  html: string
}

export interface BlogPost extends PostMeta {
  id: number
  content?: string
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx?$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data } = matter(fileContents)

          return {
            slug,
            title: data.title || '',
            excerpt: data.excerpt || '',
            date: data.date || '',
            category: data.category || '',
            readTime: data.readTime || '',
            image: data.image || '',
            published: data.published !== false,
            author: data.author || '',
            tags: data.tags || []
          } as PostMeta
        })
    )

    // Sort posts by date
    return allPostsData
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
    
    let filePath = ''
    if (fs.existsSync(fullPath)) {
      filePath = fullPath
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    // Process markdown content
    const processedContent = await remark()
      .use(remarkHtml, { sanitize: false })
      .process(content)
    const html = processedContent.toString()

    return {
      meta: {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        category: data.category || '',
        readTime: data.readTime || '',
        image: data.image || '',
        published: data.published !== false,
        author: data.author || '',
        tags: data.tags || []
      },
      html
    }
  } catch (error) {
    console.error('Error reading post:', error)
    return null
  }
}

// Helper functions for compatibility with existing blog system
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.map((post, index) => ({
    ...post,
    id: index + 1,
    content: '' // Will be loaded separately when needed
  }))
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  return posts.filter(post => post.category === category)
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = posts.map(post => post.category)
  return Array.from(new Set(categories)).filter(Boolean)
}

export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  return posts.slice(0, limit)
}