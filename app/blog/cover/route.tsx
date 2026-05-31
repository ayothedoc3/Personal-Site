import { ImageResponse } from "next/og"

import { NextRequest } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Branded blog cover image, generated from the post title + category. Used as
 * the blog-index thumbnail and the Open Graph / social-share preview, so every
 * post (and every future one written in admin) gets a consistent on-brand cover
 * with no manual work and no external image tool. 1200x630.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get("title") || "Ayothedoc").slice(0, 140)
  const category = (searchParams.get("category") || "").slice(0, 40)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* brand glow */}
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, #84cc16, #10b981)",
            opacity: 0.18,
            display: "flex",
          }}
        />

        {/* category pill */}
        <div style={{ display: "flex" }}>
          {category ? (
            <div
              style={{
                display: "flex",
                color: "#0a0a0a",
                background: "linear-gradient(90deg, #84cc16, #10b981)",
                padding: "12px 26px",
                borderRadius: "9999px",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              {category}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? "58px" : "70px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.08,
            letterSpacing: "-1.5px",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #84cc16, #10b981)",
              display: "flex",
              marginRight: "16px",
            }}
          />
          <div style={{ display: "flex", fontSize: "32px", fontWeight: 700, color: "white", marginRight: "16px" }}>
            Ayothedoc
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: "#9ca3af" }}>Managed AI Operations</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
