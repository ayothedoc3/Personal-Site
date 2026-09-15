import { lookup } from "node:dns/promises"
import { isIP } from "node:net"

const MAX_REDIRECTS = 3
const MAX_RESPONSE_BYTES = 512_000
const ALLOWED_PORTS = new Set(["", "80", "443"])

function ipv4Number(address: string): number | null {
  const parts = address.split(".")
  if (parts.length !== 4) return null
  const octets = parts.map(Number)
  if (octets.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return null
  return (((octets[0] * 256 + octets[1]) * 256 + octets[2]) * 256 + octets[3]) >>> 0
}

function ipv4InCidr(address: number, base: string, prefix: number): boolean {
  const baseNumber = ipv4Number(base)
  if (baseNumber === null) return false
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  return (address & mask) === (baseNumber & mask)
}

function isNonPublicIpv4(address: string): boolean {
  const value = ipv4Number(address)
  if (value === null) return true

  return [
    ["0.0.0.0", 8],
    ["10.0.0.0", 8],
    ["100.64.0.0", 10],
    ["127.0.0.0", 8],
    ["169.254.0.0", 16],
    ["172.16.0.0", 12],
    ["192.0.0.0", 24],
    ["192.168.0.0", 16],
    ["198.18.0.0", 15],
    ["224.0.0.0", 4],
    ["240.0.0.0", 4],
  ].some(([base, prefix]) => ipv4InCidr(value, String(base), Number(prefix)))
}

function ipv6Groups(address: string): number[] | null {
  let value = address.toLowerCase().split("%")[0]
  const dottedTail = value.match(/(?:^|:)(\d{1,3}(?:\.\d{1,3}){3})$/)
  if (dottedTail) {
    const ipv4 = ipv4Number(dottedTail[1])
    if (ipv4 === null) return null
    const hi = ((ipv4 >>> 16) & 0xffff).toString(16)
    const lo = (ipv4 & 0xffff).toString(16)
    value = value.slice(0, value.length - dottedTail[1].length) + hi + ":" + lo
  }

  const halves = value.split("::")
  if (halves.length > 2) return null
  const left = halves[0] ? halves[0].split(":") : []
  const right = halves[1] ? halves[1].split(":") : []
  const missing = 8 - left.length - right.length
  if ((halves.length === 1 && missing !== 0) || missing < 0) return null

  const groups = halves.length === 2 ? [...left, ...Array(missing).fill("0"), ...right] : left
  if (groups.length !== 8 || groups.some((group) => !/^[0-9a-f]{1,4}$/.test(group))) return null

  return groups.map((group) => Number.parseInt(group, 16))
}

function isNonPublicIpv6(address: string): boolean {
  const groups = ipv6Groups(address)
  if (groups === null) return true

  // Unspecified/loopback, IPv4-compatible, IPv4-mapped, unique-local,
  // link-local and multicast ranges must never be reached by the fetcher.
  if (groups.slice(0, 6).every((group) => group === 0)) return true
  if (groups.slice(0, 5).every((group) => group === 0) && groups[5] === 0xffff) return true
  if ((groups[0] & 0xfe00) === 0xfc00) return true // fc00::/7
  if ((groups[0] & 0xffc0) === 0xfe80) return true // fe80::/10
  if ((groups[0] & 0xff00) === 0xff00) return true // ff00::/8
  return false
}

export function isNonPublicAddress(address: string): boolean {
  const version = isIP(address)
  if (version === 4) return isNonPublicIpv4(address)
  if (version === 6) return isNonPublicIpv6(address)
  return true
}

async function assertPublicHttpUrl(input: string | URL): Promise<URL> {
  const url = input instanceof URL ? new URL(input) : new URL(input)
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Unsupported URL protocol")
  if (url.username || url.password) throw new Error("URL credentials are not allowed")
  if (!ALLOWED_PORTS.has(url.port)) throw new Error("Unsupported URL port")

  const hostname = url.hostname.replace(/^\[|\]$/g, "").toLowerCase()
  if (
    !hostname ||
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    throw new Error("Private hostnames are not allowed")
  }

  if (isIP(hostname)) {
    if (isNonPublicAddress(hostname)) throw new Error("Private network addresses are not allowed")
    return url
  }

  const addresses = await lookup(hostname, { all: true, verbatim: true })
  if (!addresses.length || addresses.some(({ address }) => isNonPublicAddress(address))) {
    throw new Error("The hostname does not resolve exclusively to public addresses")
  }

  return url
}

async function readLimitedText(response: Response): Promise<string> {
  const declaredLength = Number(response.headers.get("content-length") || "0")
  if (declaredLength > MAX_RESPONSE_BYTES) throw new Error("Website response is too large")
  if (!response.body) return ""

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let size = 0
  let text = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_RESPONSE_BYTES) {
      await reader.cancel()
      throw new Error("Website response is too large")
    }
    text += decoder.decode(value, { stream: true })
  }

  return text + decoder.decode()
}

export async function fetchPublicWebsiteText(input: string): Promise<string> {
  let url = await assertPublicHttpUrl(input)

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10_000)

    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; AyothedocBot/1.0)" },
        redirect: "manual",
        signal: controller.signal,
      })

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location")
        if (!location || redirectCount === MAX_REDIRECTS) throw new Error("Too many or invalid redirects")
        url = await assertPublicHttpUrl(new URL(location, url))
        continue
      }

      if (!response.ok) throw new Error("Website returned " + response.status)
      const contentType = response.headers.get("content-type")?.toLowerCase() || ""
      if (contentType && !contentType.includes("text/html") && !contentType.includes("text/plain")) {
        throw new Error("Website did not return HTML or text")
      }

      return await readLimitedText(response)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  throw new Error("Unable to fetch website")
}
