"use client"

import React from "react"

interface HoneypotProps {
  value: string
  onChange: (value: string) => void
}

// Honeypot field - hidden from real users but visible to bots
export function Honeypot({ value, onChange }: HoneypotProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: "-9999px",
        opacity: 0,
        height: 0,
        width: 0,
        overflow: "hidden",
        tabIndex: -1,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <input
        type="text"
        name="website"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  )
}