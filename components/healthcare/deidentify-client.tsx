"use client"

import { useMemo, useState } from "react"
import { Copy, RotateCcw, ShieldCheck, Check } from "lucide-react"
import { detectEntities, deidentify, SAMPLE_NOTE, type DeidMethod, type PhiLabel } from "@/lib/deidentify"

const methods: { key: DeidMethod; label: string; hint: string }[] = [
  { key: "mask", label: "Mask", hint: "Replace each identifier with its type" },
  { key: "replace", label: "Replace", hint: "Swap in realistic synthetic values" },
  { key: "hash", label: "Hash", hint: "Consistent pseudonymous token" },
]

export function DeidentifyClient() {
  const [text, setText] = useState(SAMPLE_NOTE)
  const [method, setMethod] = useState<DeidMethod>("mask")
  const [copied, setCopied] = useState(false)

  const entities = useMemo(() => detectEntities(text), [text])
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
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-600/40 bg-teal-600/[0.08] px-4 py-2 text-sm text-teal-700 dark:text-teal-400">
        <ShieldCheck className="h-4 w-4" aria-hidden />
        Runs entirely in your browser. Nothing is uploaded.
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
