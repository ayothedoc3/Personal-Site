"use client"

import Link from "next/link"

import { trackEvent } from "@/lib/analytics"
import { Button } from "@/components/ui/button"

type CheckoutLinkProps = {
  href?: string | null
  fallbackHref?: string
  label: string
  cta: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function CheckoutLink({
  href,
  fallbackHref = "/contact",
  label,
  cta,
  variant = "default",
  size = "lg",
  className,
}: CheckoutLinkProps) {
  const normalizedHref = href?.trim()
  const effectiveHref = normalizedHref || fallbackHref
  const isExternal = effectiveHref.startsWith("http")

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link
        href={effectiveHref}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={() =>
          trackEvent("checkout_click", {
            cta,
            destination: isExternal ? "stripe" : effectiveHref,
            has_checkout: Boolean(normalizedHref),
          })
        }
      >
        {label}
      </Link>
    </Button>
  )
}

