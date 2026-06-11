"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Turnstile } from "@/components/turnstile"
import { trackEvent } from "@/lib/analytics"

type Phase = "idle" | "working" | "done" | "error"

const SAMPLE = {
  name: "Dana Mercer",
  company: "Northway Studio",
  message:
    "Hi, we're a 6-person web design studio. We get decent inbound from our site but replies go out hours later because everyone's heads-down on client work, and we know we're losing jobs to faster studios. Can you help?",
}

export function DemoClient() {
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [phase, setPhase] = useState<Phase>("idle")
  const [elapsed, setElapsed] = useState(0)
  const [error, setError] = useState("")
  const [reply, setReply] = useState<{ subject: string; bodyHtml: string; elapsedMs: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  const fillSample = () => {
    setName(SAMPLE.name)
    setCompany(SAMPLE.company)
    setMessage(SAMPLE.message)
  }

  const run = async () => {
    if (!message.trim()) {
      setError("Type a message first, anything a real lead might send.")
      return
    }
    setError("")
    setReply(null)
    setPhase("working")
    setElapsed(0)
    trackEvent("demo_run", { destination: "/api/demo" })
    const t0 = Date.now()
    timerRef.current = setInterval(() => setElapsed(Date.now() - t0), 100)

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, message, turnstileToken }),
      })
      const data = await res.json()
      if (timerRef.current) clearInterval(timerRef.current)
      if (!res.ok) {
        setPhase("error")
        setError(data.error || "Something went wrong. Try again.")
        return
      }
      setReply({ subject: data.subject, bodyHtml: data.bodyHtml, elapsedMs: data.elapsedMs })
      setPhase("done")
      trackEvent("demo_reply_shown", { elapsed_ms: data.elapsedMs })
    } catch {
      if (timerRef.current) clearInterval(timerRef.current)
      setPhase("error")
      setError("Network error. Try again.")
    }
  }

  const seconds = (ms: number) => (ms / 1000).toFixed(1)

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* The lead's side */}
      <div className="backdrop-blur-xl bg-card/50 border border-border/50 p-8 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">You are the lead. Send an enquiry.</h2>
          <button onClick={fillSample} className="text-sm text-lime-400 hover:underline" type="button">
            Use a sample
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
            <Input placeholder="Company (optional)" value={company} onChange={(e) => setCompany(e.target.value)} maxLength={120} />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            maxLength={1200}
            placeholder="Write what a real lead might send, e.g. what you do and where leads slip through."
            className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm"
          />
          <Turnstile onToken={setTurnstileToken} />
          <Button
            onClick={run}
            disabled={phase === "working"}
            className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 rounded-full font-semibold"
          >
            {phase === "working" ? "Engine is reading your message..." : "Send it to the engine"}
          </Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-xs text-muted-foreground">
            Sandboxed demo: nothing is emailed, nothing is stored. The live engine does this on real leads and also
            pings the owner instantly.
          </p>
        </div>
      </div>

      {/* The engine's side */}
      <div className="backdrop-blur-xl bg-card/50 border border-border/50 p-8 rounded-2xl shadow-xl min-h-[320px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">The reply the lead would get</h2>
          {phase === "working" && (
            <span className="text-lime-400 font-mono font-bold tabular-nums">{seconds(elapsed)}s</span>
          )}
          {phase === "done" && reply && (
            <span className="text-sm font-semibold text-lime-400">drafted in {seconds(reply.elapsedMs)}s</span>
          )}
        </div>

        {phase === "idle" && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            Submit an enquiry and watch the engine draft the reply a real lead would receive: personalized, in the
            owner&apos;s voice, with a booking link. On the live system this lands in the lead&apos;s inbox in under 60
            seconds.
          </p>
        )}

        {phase === "working" && (
          <div className="space-y-3">
            <div className="h-3 w-2/3 rounded bg-muted/60 animate-pulse" />
            <div className="h-3 w-full rounded bg-muted/50 animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-muted/50 animate-pulse" />
            <div className="h-3 w-4/6 rounded bg-muted/40 animate-pulse" />
            <p className="text-xs text-muted-foreground pt-2">Reading the enquiry, drafting in the brand voice...</p>
          </div>
        )}

        {phase === "done" && reply && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border/50 bg-background/60 p-4">
              <p className="text-xs text-muted-foreground mb-1">Subject</p>
              <p className="font-semibold">{reply.subject}</p>
            </div>
            <div
              className="rounded-lg border border-border/50 bg-background/60 p-4 text-sm leading-relaxed [&_p]:my-3 [&_a]:text-lime-500 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: reply.bodyHtml }}
            />
            <div className="pt-2 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Now imagine this answering your real leads, every time, day and night.
              </p>
              <Link href="/contact">
                <Button
                  onClick={() => trackEvent("cta_click", { cta: "demo_free_engine", destination: "/contact" })}
                  className="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 px-8 rounded-full font-semibold"
                >
                  Get yours built free
                </Button>
              </Link>
            </div>
          </div>
        )}

        {phase === "error" && (
          <p className="text-muted-foreground text-sm">
            {error || "Something went wrong."} If the demo is busy, the real thing is better anyway:{" "}
            <Link href="/contact" className="text-lime-400 hover:underline">
              get your Lead Engine built free
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  )
}
