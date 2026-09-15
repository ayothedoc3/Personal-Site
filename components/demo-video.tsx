"use client"

import { trackEvent } from "@/lib/analytics"

export function DemoVideo() {
  return (
    <video
      className="w-full h-auto"
      controls
      playsInline
      preload="metadata"
      poster="/lead-engine-demo-poster.jpg"
      onPlay={() => trackEvent("video_start", { video_title: "60-second Lead Engine demo" })}
      onEnded={() => trackEvent("video_complete", { video_title: "60-second Lead Engine demo" })}
    >
      <source src="/lead-engine-demo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
