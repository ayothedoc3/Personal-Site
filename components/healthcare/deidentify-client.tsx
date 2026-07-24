"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Copy, RotateCcw, ShieldCheck, Check, Cpu } from "lucide-react"
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

type ModelStatus = "loading" | "ready" | "unavailable"

export function DeidentifyClient() {
  const [text, setText] = useState(SAMPLE_NOTE)
  const [method, setMethod] = useState<DeidMethod>("mask")
  const [copied, setCopied] = useState(false)
  const [modelStatus, setModelStatus] = useState<ModelStatus>("loading")
  const [mlEntities, setMlEntities] = useState<Entity[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pipeRef = useRef<any>(null)

  // Load a named-entity model into the browser. If it cannot load (offline,
  // blocked, unsupported device), we silently fall back to pattern detection,
  // so the tool always works and nothing ever leaves the device.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t: any = await import("@huggingface/transformers")
        t.env.allowLocalModels = false
        const pipe = await t.pipeline("token-classification", "Xenova/bert-base-NER", { dtype: "q8" })
        if (cancelled) return
        pipeRef.current = pipe
        setModelStatus("ready")
      } catch {
        if (!cancelled) setModelStatus("unavailable")
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  // Run the model on the text (debounced) once it is ready. Maps person -> NAME
  // and location -> ADDRESS; structured identifiers stay with the pattern layer.
  useEffect(() => {
    if (modelStatus !== "ready" || !pipeRef.current) {
      setMlEntities([])
      return
    }
    let cancelled = false
    const id = setTimeout(async () => {
      try {
        const raw: Array<{ entity_group: string; start: number; end: number; score: number }> =
          await pipeRef.current(text, { aggregation_strategy: "simple" })
        if (cancelled) return
        const map: Record<string, PhiLabel> = { PER: "NAME", LOC: "ADDRESS" }
        const mapped: Entity[] = raw
          .filter((r) => map[r.entity_group] && typeof r.start === "number" && typeof r.end === "number" && r.score > 0.5)
          .map((r) => ({ start: r.start, end: r.end, label: map[r.entity_group], text: text.slice(r.start, r.end) }))
        setMlEntities(mapped)
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

  const modelText =
    modelStatus === "loading" ? "Loading AI model…" : modelStatus === "ready" ? "AI model active" : "Pattern detection"

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-600/40 bg-teal-600/[0.08] px-4 py-2 text-sm text-teal-700 dark:text-teal-400">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Runs entirely in your browser. Nothing is uploaded.
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs text-muted-foreground">
          <Cpu className={`h-3.5 w-3.5 ${modelStatus === "ready" ? "text-teal-600" : ""}`} aria-hidden />
          {modelText}
        </span>
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
