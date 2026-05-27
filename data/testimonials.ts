export type Testimonial = {
  /** Exact client quote, paste verbatim, do not fabricate. */
  quote: string
  /** Person's name. */
  name: string
  /** Role + company, e.g. "Founder, Acme Co". */
  title: string
  /** Optional headline result, e.g. "Recovered 32 hrs/month". */
  result?: string
}

/**
 * Real client testimonials only. Leave empty until you have genuine quotes.
 * The homepage testimonials section renders automatically once this array
 * has at least one entry, and stays hidden while it's empty.
 *
 * Example entry (delete this comment and replace with real data):
 *   {
 *     quote: "They installed our AIOS in 10 days and now our leads get a reply in under a minute.",
 *     name: "Jane Doe",
 *     title: "Founder, Example Agency",
 *     result: "Recovered 32 hrs/month",
 *   },
 */
export const testimonials: Testimonial[] = []
