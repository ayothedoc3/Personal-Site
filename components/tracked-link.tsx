"use client"

import type { ReactNode } from "react"
import Link from "next/link"

import { trackEvent } from "@/lib/analytics"

type TrackedLinkProps = {
  href: string
  className?: string
  eventName?: string
  eventParams: Record<string, string>
  children: ReactNode
}

export function TrackedLink({
  href,
  className,
  eventName = "cta_click",
  eventParams,
  children,
}: TrackedLinkProps) {
  return (
    <Link href={href} className={className} onClick={() => trackEvent(eventName, eventParams)}>
      {children}
    </Link>
  )
}
