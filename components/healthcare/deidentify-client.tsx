"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Copy, RotateCcw, ShieldCheck, Check, Cpu, Loader2 } from "lucide-react"
import {
  detectEntities,
  deidentify,
  resolveOverlaps,
  SAMPLE_NOTE,
  type DeidMethod,
  type Entity,
  type PhiLabel,
} from "@/lib/deidentify"

const methods: { key: DeidMethod; label: string; hint: string }[] = [
  { key: "mask", label: "Mask", hint: "Replace each identifier with its type" },
  { key: "replace", label: "Replace", hint: "Swap in realistic synthetic values" },
  { key: "hash", label: "Hash", hint: "Consistent pseudonymous token" },
]

type ModelStatus = "idle" | "loading" | "ready" | "unavailable"

// transformers.js token-classification returns per-token tags with no character
// offsets, so group tokens into whole entities and locate them in the text.
function mergeTokenEntities(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any[],
  text: string
): Entity[] {
  const map: Record<string, PhiLabel> = { PER: "NAME", LOC: "ADDRESS" }
  const groups: { type: string; tokens: string[] }[] = []
  let cur: { type: string; tokens: string[] } | null = null
  for (const r of raw) {
    if ((r.score ?? 1) < 0.5) {
      cur = null
      continue
    }
    const tag: string = r.entity || ""
    const type = tag.slice(2)
    const isSub = String(r.word).startsWith("##")
    if (cur && (isSub || (tag[0] === "I" && cur.type === type))) {
      cur.tokens.push(r.word)
    } else {
      cur = { type, tokens: [r.word] }
      groups.push(cur)
    }
  }
  const out: Entity[] = []
  let cursor = 0
  for (const g of groups) {
    const label = map[g.type]
    if (!label) continue
    let word = ""
    for (const tk of g.tokens) word += String(tk).startsWith("##") ? String(tk).slice(2) : (word ? " " : "") + tk
    let idx = text.indexOf(word, cursor)
    if (idx === -1) idx = text.indexOf(word)
    if (idx === -1) continue
    out.push({ start: idx, end: idx + word.length, label, text: word })
    cursor = idx + word.length
  }
  return out
}

export function DeidentifyClient() {
  const [text, setText] = useState(SAMPLE_NOTE)
  const [method, setMethod] = useState<DeidMethod>("mask")
  const [copied, setCopied] = useState(false)
  const [modelStatus, setModelStatus] = useState<ModelStatus>("idle")
  const [loadError, setLoadError] = useState("")
  const [mlEntities, setMlEntities] = useState<Entity[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pipeRef = useRef<any>(null)
  const mounted = useRef(true)
  useEffect(() => () => { mounted.current = false }, [])

  // On demand: download and initialise a named-entity model in the browser.
  // Optional, the pattern layer works without it and nothing ever leaves the device.
  const loadModel = () => {
    if (modelStatus === "loading" || modelStatus === "ready") return
    setModelStatus("loading")
    setLoadError("")
    ;(async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t: any = await import("@huggingface/transformers")
        t.env.allowLocalModels = false
        const pipe = await t.pipeline("token-classification", "Xenova/bert-base-NER", { dtype: "q8" })
        if (!mounted.current) return
        pipeRef.current = pipe
        setModelStatus("ready")
      } catch (e) {
        if (!mounted.current) return
        setLoadError(String((e as Error)?.message || e).slice(0, 240))
        setModelStatus("unavailable")
      }
    })()
  }

  // Run the model on the text (debounced) once it is ready. Person -> NAME,
  // location -> ADDRESS; structured identifiers stay with the pattern layer.
  useEffect(() => {
    if (modelStatus !== "ready" || !pipeRef.current) {
      setMlEntities([])
      return
    }
    let cancelled = false
    const id = setTimeout(async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw: any[] = await pipeRef.current(text)
        if (cancelled) return
        setMlEntities(mergeTokenEntities(raw ?? [], text))
      } catch {
        if (!cancelled) setMlEntities([])
      }
    }, 500)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
  }, [text, modelStatus])

  const ruleEntities = useMemo(() => detectEntities(text), [text])
  const entities = useMemo(() => resolveOverlaps([...ruleEntities, ...mlEntities]), [ruleEntities, mlEntities])
  const output = useMemo(() => deidentify(text, method, entities), [text, method, entities])

  const counts = useMemo(() => {
    const c: Partial<Record<PhiLabel, number>> = {}
    for (const e of entities) c[e.label] = (c[e.label] || 0) + 1
    return c
  }, [entities])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-600/40 bg-teal-600/[0.08] px-4 py-2 text-sm text-teal-700 dark:text-teal-400">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Runs entirely in your browser. Nothing is uploaded.
        </span>

        {modelStatus === "idle" ? (
          <button
            type="button"
            onClick={loadModel}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <Cpu className="h-4 w-4" aria-hidden /> Enable AI name detection
          </button>
        ) : modelStatus === "loading" ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading AI model…
          </span>
        ) : modelStatus === "ready" ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-600/40 bg-teal-600/[0.08] px-4 py-2 text-sm text-teal-700 dark:text-teal-400">
            <Cpu className="h-4 w-4" aria-hidden /> AI name detection active
          </span>
        ) : (
          <button
            type="button"
            onClick={loadModel}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <Cpu className="h-4 w-4" aria-hidden /> AI model unavailable, retry
          </button>
        )}

        {modelStatus === "idle" ? (
          <span className="text-xs text-muted-foreground">Optional, downloads a one-time model and runs locally.</span>
        ) : null}
        {loadError ? <span data-testid="model-error" className="sr-only">{loadError}</span> : null}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Input */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Clinical text</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setText(SAMPLE_NOTE)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Sample
              </button>
              <button
                type="button"
                onClick={() => setText("")}
                className="rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            aria-label="Clinical text to de-identify"
            className="h-80 w-full resize-y rounded-lg border border-border bg-background p-3.5 font-mono text-sm text-foreground focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="Paste clinical text here (use synthetic data only)…"
          />
          <p className="mt-2 text-xs text-muted-foreground">Use synthetic data only. This is a demonstration.</p>
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-foreground">De-identified output</h2>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mb-3 inline-flex rounded-lg border border-border p-0.5" role="tablist" aria-label="De-identification method">
            {methods.map((m) => (
              <button
                key={m.key}
                type="button"
                role="tab"
                aria-selected={method === m.key}
                title={m.hint}
                onClick={() => setMethod(m.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  method === m.key ? "bg-teal-600 text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <pre className="h-80 w-full overflow-auto rounded-lg border border-border bg-background p-3.5 font-mono text-sm text-foreground whitespace-pre-wrap break-words">
            {output || " "}
          </pre>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-muted/30 px-5 py-4">
        <span className="text-sm font-medium text-foreground">
          {entities.length} identifier{entities.length === 1 ? "" : "s"} removed
        </span>
        <span className="text-border" aria-hidden>
          |
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.keys(counts).length === 0 ? (
            <span className="text-sm text-muted-foreground">No PHI detected</span>
          ) : (
            Object.entries(counts).map(([label, n]) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full border border-teal-600/30 bg-teal-600/10 px-2.5 py-0.5 text-xs font-medium text-teal-700 dark:text-teal-400"
              >
                {label} <span className="text-muted-foreground">{n}</span>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
