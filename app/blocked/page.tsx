import { notFound } from "next/navigation"

// Requests that hit the wrong hostname are rewritten here by middleware.ts and
// rendered as a proper 404 via the app's not-found UI.
export default function Blocked() {
  notFound()
}
