import { getPgPool } from "@/lib/db"

/**
 * Postgres-backed blog store. The blog is managed from the admin dashboard, so
 * posts live in the database (not static MDX files) and changes appear on the
 * live site immediately, with no redeploy. Markdown is stored raw and rendered
 * to HTML at request time by the public blog pages.
 */

export type BlogPostInput = {
  slug: string
  title: string
  excerpt: string
  content: string
  category?: string | null
  tags?: string[]
  coverImage?: string | null
  author?: string | null
  readTime?: string | null
  published?: boolean
}

export type BlogPostRecord = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage: string
  author: string
  readTime: string
  published: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

async function ensureTable() {
  const p = getPgPool()
  if (!p) return null
  await p.query(`
    create table if not exists blog_posts (
      id            bigserial primary key,
      slug          text not null unique,
      title         text not null,
      excerpt       text not null default '',
      content       text not null default '',
      category      text not null default '',
      tags          text[] not null default '{}',
      cover_image   text not null default '',
      author        text not null default 'Ayothedoc',
      read_time     text not null default '',
      published     boolean not null default false,
      created_at    timestamptz not null default now(),
      updated_at    timestamptz not null default now(),
      published_at  timestamptz
    );
  `)
  await p.query(`create index if not exists blog_posts_pub_idx on blog_posts (published, published_at desc);`)
  return p
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

// Rough read-time estimate from word count (~200 wpm).
function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

function mapRow(r: any): BlogPostRecord {
  return {
    id: String(r.id),
    slug: String(r.slug),
    title: String(r.title ?? ""),
    excerpt: String(r.excerpt ?? ""),
    content: String(r.content ?? ""),
    category: String(r.category ?? ""),
    tags: Array.isArray(r.tags) ? r.tags : [],
    coverImage: String(r.cover_image ?? ""),
    author: String(r.author ?? "Ayothedoc"),
    readTime: String(r.read_time ?? ""),
    published: Boolean(r.published),
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : new Date().toISOString(),
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : null,
  }
}

/** Admin: every post regardless of status. */
export async function listAllPosts(): Promise<BlogPostRecord[] | null> {
  const p = await ensureTable()
  if (!p) return null
  const res = await p.query(`select * from blog_posts order by coalesce(published_at, created_at) desc`)
  return res.rows.map(mapRow)
}

/** Public: only published posts, newest first. */
export async function listPublishedPosts(): Promise<BlogPostRecord[]> {
  const p = await ensureTable()
  if (!p) return []
  const res = await p.query(
    `select * from blog_posts where published = true order by coalesce(published_at, created_at) desc`,
  )
  return res.rows.map(mapRow)
}

export async function getPostBySlug(slug: string, opts: { includeDrafts?: boolean } = {}): Promise<BlogPostRecord | null> {
  const p = await ensureTable()
  if (!p) return null
  const res = opts.includeDrafts
    ? await p.query(`select * from blog_posts where slug = $1 limit 1`, [slug])
    : await p.query(`select * from blog_posts where slug = $1 and published = true limit 1`, [slug])
  return res.rows.length ? mapRow(res.rows[0]) : null
}

export async function getPostById(id: string): Promise<BlogPostRecord | null> {
  const p = await ensureTable()
  if (!p) return null
  const res = await p.query(`select * from blog_posts where id = $1 limit 1`, [id])
  return res.rows.length ? mapRow(res.rows[0]) : null
}

export async function createPost(input: BlogPostInput): Promise<BlogPostRecord> {
  const p = await ensureTable()
  if (!p) throw new Error("Database not configured")
  const slug = slugify(input.slug || input.title)
  if (!slug) throw new Error("slug or title required")
  const readTime = input.readTime?.trim() || estimateReadTime(input.content || "")
  const published = !!input.published
  const res = await p.query(
    `insert into blog_posts (slug, title, excerpt, content, category, tags, cover_image, author, read_time, published, published_at)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, case when $10 then now() else null end)
     returning *`,
    [
      slug,
      input.title,
      input.excerpt || "",
      input.content || "",
      input.category || "",
      input.tags || [],
      input.coverImage || "",
      input.author || "Ayothedoc",
      readTime,
      published,
    ],
  )
  return mapRow(res.rows[0])
}

export async function updatePost(id: string, input: Partial<BlogPostInput>): Promise<BlogPostRecord | null> {
  const p = await ensureTable()
  if (!p) return null
  const existing = await getPostById(id)
  if (!existing) return null

  const slug = input.slug !== undefined ? slugify(input.slug) : existing.slug
  const content = input.content !== undefined ? input.content : existing.content
  const readTime =
    input.readTime !== undefined && input.readTime.trim()
      ? input.readTime.trim()
      : input.content !== undefined
        ? estimateReadTime(content)
        : existing.readTime
  const published = input.published !== undefined ? !!input.published : existing.published

  const res = await p.query(
    `update blog_posts set
       slug = $2,
       title = $3,
       excerpt = $4,
       content = $5,
       category = $6,
       tags = $7,
       cover_image = $8,
       author = $9,
       read_time = $10,
       published = $11,
       published_at = case when $11 and published_at is null then now()
                           when not $11 then null
                           else published_at end,
       updated_at = now()
     where id = $1
     returning *`,
    [
      id,
      slug,
      input.title !== undefined ? input.title : existing.title,
      input.excerpt !== undefined ? input.excerpt : existing.excerpt,
      content,
      input.category !== undefined ? input.category || "" : existing.category,
      input.tags !== undefined ? input.tags : existing.tags,
      input.coverImage !== undefined ? input.coverImage || "" : existing.coverImage,
      input.author !== undefined ? input.author || "Ayothedoc" : existing.author,
      readTime,
      published,
    ],
  )
  return res.rows.length ? mapRow(res.rows[0]) : null
}

export async function deletePost(id: string): Promise<boolean> {
  const p = await ensureTable()
  if (!p) return false
  const res = await p.query(`delete from blog_posts where id = $1`, [id])
  return (res.rowCount ?? 0) > 0
}

/** Insert a post only if its slug does not already exist (idempotent seeding). */
export async function upsertBySlugIfNew(input: BlogPostInput): Promise<{ created: boolean; slug: string }> {
  const p = await ensureTable()
  if (!p) throw new Error("Database not configured")
  const slug = slugify(input.slug || input.title)
  const exists = await p.query(`select 1 from blog_posts where slug = $1`, [slug])
  if (exists.rows.length) return { created: false, slug }
  await createPost(input)
  return { created: true, slug }
}
