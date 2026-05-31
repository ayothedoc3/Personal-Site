import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { createPost, deletePost, listAllPosts, updatePost } from "@/lib/blog-store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Admin blog CMS. All methods require the admin bearer (LEADS_API_KEY), the
 * same key the rest of the admin dashboard uses. Posts are stored in Postgres
 * so edits go live immediately.
 */

function authed(req: NextRequest): boolean {
  const expected = process.env.LEADS_API_KEY
  if (!expected) return false
  const header = req.headers.get("authorization") || ""
  const presented = header.startsWith("Bearer ") ? header.slice(7) : ""
  const a = Buffer.from(presented)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

function parseTags(raw: any): string[] {
  if (Array.isArray(raw)) return raw.map((t) => String(t).trim()).filter(Boolean)
  if (typeof raw === "string") return raw.split(",").map((t) => t.trim()).filter(Boolean)
  return []
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const posts = (await listAllPosts()) ?? []
    return NextResponse.json({ posts })
  } catch (e) {
    console.error("blog list error:", e)
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  let body: any = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  if (!String(body.title || "").trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 })
  }
  try {
    const post = await createPost({
      slug: String(body.slug || body.title || ""),
      title: String(body.title),
      excerpt: String(body.excerpt || ""),
      content: String(body.content || ""),
      category: String(body.category || ""),
      tags: parseTags(body.tags),
      coverImage: String(body.coverImage || ""),
      author: body.author ? String(body.author) : undefined,
      readTime: body.readTime ? String(body.readTime) : undefined,
      published: !!body.published,
    })
    return NextResponse.json({ ok: true, post })
  } catch (e: any) {
    console.error("blog create error:", e)
    const msg = /unique/i.test(String(e?.message)) ? "A post with that slug already exists" : "Failed to create post"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const id = req.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })
  let body: any = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  const patch: any = {}
  for (const k of ["slug", "title", "excerpt", "content", "category", "coverImage", "author", "readTime"]) {
    if (body[k] !== undefined) patch[k] = String(body[k])
  }
  if (body.tags !== undefined) patch.tags = parseTags(body.tags)
  if (body.published !== undefined) patch.published = !!body.published
  try {
    const post = await updatePost(id, patch)
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 })
    return NextResponse.json({ ok: true, post })
  } catch (e: any) {
    console.error("blog update error:", e)
    const msg = /unique/i.test(String(e?.message)) ? "A post with that slug already exists" : "Failed to update post"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const id = req.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })
  try {
    const ok = await deletePost(id)
    return NextResponse.json({ ok })
  } catch (e) {
    console.error("blog delete error:", e)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
