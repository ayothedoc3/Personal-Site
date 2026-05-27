"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Mail, User, Globe, Calendar, BarChart3, Send, Zap, Inbox, ExternalLink, LogOut, KeyRound, Trash2, ShieldCheck, ShieldAlert } from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  website: string
  businessType: string
  currentChallenges: string
  timeSpentDaily: number
  optin_marketing?: boolean
  timestamp: string
}

interface Stats {
  total: number
  last7d: number
  last30d: number
  optedIn: number
  highIntent: number
  avgHoursPerDay: number
}

interface SecretRow {
  id: string
  provider: string
  label: string | null
  hint: string
  last4: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastUsedAt: string | null
}

const PROVIDER_OPTIONS: { value: string; label: string; placeholder: string }[] = [
  { value: "anthropic", label: "Anthropic (Claude)", placeholder: "sk-ant-…" },
  { value: "openai", label: "OpenAI", placeholder: "sk-…" },
  { value: "openrouter", label: "OpenRouter", placeholder: "sk-or-…" },
  { value: "gemini", label: "Google Gemini", placeholder: "AIza…" },
  { value: "stripe", label: "Stripe", placeholder: "sk_live_… or rk_live_…" },
]
const providerLabel = (v: string) => PROVIDER_OPTIONS.find((p) => p.value === v)?.label ?? v

type Tab = "overview" | "leads" | "campaign" | "settings" | "actions"

export default function AdminPage() {
  const [apiKey, setApiKey] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [tab, setTab] = useState<Tab>("overview")

  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats | null>(null)

  // campaign state
  const [audience, setAudience] = useState<"all" | "optedin">("all")
  const [subject, setSubject] = useState("")
  const [bodyHtml, setBodyHtml] = useState("")
  const [testEmail, setTestEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [campaignResult, setCampaignResult] = useState<string>("")

  // API keys (BYOK) state
  const [secrets, setSecrets] = useState<SecretRow[]>([])
  const [secretsConfigured, setSecretsConfigured] = useState(true)
  const [newProvider, setNewProvider] = useState("anthropic")
  const [newLabel, setNewLabel] = useState("")
  const [newValue, setNewValue] = useState("")
  const [savingKey, setSavingKey] = useState(false)
  const [keyMsg, setKeyMsg] = useState("")

  const loadSecrets = useCallback(async (key: string) => {
    try {
      const res = await fetch("/api/admin/secrets", { headers: { Authorization: `Bearer ${key}` } })
      if (res.ok) {
        const d = await res.json()
        setSecrets(d.secrets || [])
        setSecretsConfigured(!!d.encryptionConfigured)
      }
    } catch {
      /* non-fatal */
    }
  }, [])

  const loadAll = useCallback(async (key: string) => {
    setIsLoading(true)
    setError("")
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch("/api/leads", { headers: { Authorization: `Bearer ${key}` } }),
        fetch("/api/admin/stats", { headers: { Authorization: `Bearer ${key}` } }),
      ])
      if (!leadsRes.ok) {
        setError("Invalid API key")
        setIsAuthenticated(false)
        return
      }
      const leadsData = await leadsRes.json()
      setLeads(leadsData.leads || [])
      if (statsRes.ok) setStats(await statsRes.json())
      setIsAuthenticated(true)
      localStorage.setItem("admin-api-key", key)
      loadSecrets(key)
    } catch {
      setError("Failed to load data")
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("admin-api-key")
    if (saved) {
      setApiKey(saved)
      loadAll(saved)
    }
  }, [loadAll])

  const logout = () => {
    localStorage.removeItem("admin-api-key")
    setIsAuthenticated(false)
    setApiKey("")
    setLeads([])
    setStats(null)
  }

  const downloadCSV = async () => {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ format: "csv" }),
    })
    if (res.ok) {
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "audit-leads.csv"
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  const sendCampaign = async (test: boolean) => {
    setSending(true)
    setCampaignResult("")
    try {
      const res = await fetch("/api/admin/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          subject,
          html: bodyHtml,
          audience,
          ...(test ? { testEmail } : {}),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setCampaignResult(`❌ ${data.error || "Send failed"}`)
      } else if (test) {
        setCampaignResult(`✅ Test sent to ${data.sentTo} (from ${data.from})`)
      } else {
        setCampaignResult(
          `✅ Sent ${data.sent}/${data.total}${data.failed ? `, ${data.failed} failed` : ""}` +
            (data.error ? `, ${data.error}` : ""),
        )
      }
    } catch {
      setCampaignResult("❌ Network error")
    } finally {
      setSending(false)
    }
  }

  const saveKey = async () => {
    if (!newValue.trim()) return
    setSavingKey(true)
    setKeyMsg("")
    try {
      const res = await fetch("/api/admin/secrets", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ provider: newProvider, label: newLabel.trim() || undefined, value: newValue }),
      })
      const data = await res.json()
      if (!res.ok) {
        setKeyMsg(`❌ ${data.error || "Save failed"}`)
      } else {
        setKeyMsg(`✅ Saved ${providerLabel(data.secret.provider)} key (${data.secret.hint})`)
        setNewValue("")
        setNewLabel("")
        loadSecrets(apiKey)
      }
    } catch {
      setKeyMsg("❌ Network error")
    } finally {
      setSavingKey(false)
    }
  }

  const deleteKey = async (id: string, label: string) => {
    if (!confirm(`Delete this ${label} key? Anything relying on it will fall back to the server env var (if any). This cannot be undone.`)) return
    const res = await fetch(`/api/admin/secrets?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    if (res.ok) {
      setKeyMsg("🗑️ Key deleted")
      loadSecrets(apiKey)
    }
  }

  // ---------- Login ----------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Ayothedoc Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                loadAll(apiKey)
              }}
              className="space-y-4"
            >
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Admin API key"
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">Uses your LEADS_API_KEY.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "leads", label: "Leads", icon: Inbox },
    { id: "campaign", label: "Email Campaign", icon: Send },
    { id: "settings", label: "API Keys", icon: KeyRound },
    { id: "actions", label: "Quick Actions", icon: Zap },
  ]

  const recipientCount = audience === "optedin" ? leads.filter((l) => l.optin_marketing).length : leads.length

  // ---------- Dashboard ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Ayothedoc Admin</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => loadAll(apiKey)}>Refresh</Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border/50 pb-3">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  tab === t.id ? "bg-lime-400 text-gray-900" : "bg-card/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Total leads", value: stats?.total ?? leads.length },
                { label: "Last 7 days", value: stats?.last7d ?? ", " },
                { label: "Opted-in", value: stats?.optedIn ?? ", " },
                { label: "High intent (3h+/day)", value: stats?.highIntent ?? ", " },
                { label: "Avg hrs/day reported", value: stats?.avgHoursPerDay ?? ", " },
              ].map((m) => (
                <Card key={m.label}>
                  <CardContent className="p-5">
                    <div className="text-3xl font-bold text-lime-400">{m.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader><CardTitle className="text-lg">Hottest leads to follow up</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[...leads]
                  .sort((a, b) => (b.timeSpentDaily || 0) - (a.timeSpentDaily || 0))
                  .slice(0, 5)
                  .map((l) => (
                    <div key={l.id} className="flex items-center justify-between gap-4 text-sm border-b border-border/30 pb-2">
                      <div>
                        <span className="font-semibold">{l.name}</span>{" "}
                        <span className="text-muted-foreground">· {l.businessType}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-red-500 font-semibold">{l.timeSpentDaily}h/day</span>
                        <a href={`mailto:${l.email}`} className="text-lime-400 hover:underline">Email</a>
                      </div>
                    </div>
                  ))}
                {leads.length === 0 && <p className="text-muted-foreground text-sm">No leads yet.</p>}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Leads */}
        {tab === "leads" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">{leads.length} total leads</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setTab("campaign")}>
                  <Mail className="w-4 h-4 mr-1" /> Email these leads
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCSV}>
                  <Download className="w-4 h-4 mr-1" /> Export CSV
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {leads.map((lead) => (
                <Card key={lead.id}>
                  <CardContent className="p-5 grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2"><User className="w-4 h-4 text-lime-400" /><span className="font-semibold">{lead.name}</span> · {lead.businessType}</div>
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-lime-400" /><a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a></div>
                      <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-lime-400" /><a href={lead.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{lead.website}</a></div>
                      <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4" />{new Date(lead.timestamp).toLocaleDateString()}</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-muted-foreground">Repetitive hours/day: </span><span className="font-bold text-red-500">{lead.timeSpentDaily}</span></div>
                      <div className="text-muted-foreground bg-muted/40 p-3 rounded-lg">{lead.currentChallenges || ", "}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {leads.length === 0 && <p className="text-muted-foreground text-sm">No leads yet.</p>}
            </div>
          </div>
        )}

        {/* Campaign */}
        {tab === "campaign" && (
          <Card className="max-w-3xl">
            <CardHeader><CardTitle className="text-lg">Send an email campaign</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as "all" | "optedin")}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2"
                >
                  <option value="all">All leads ({leads.length})</option>
                  <option value="optedin">Opted-in only ({leads.filter((l) => l.optin_marketing).length})</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">This campaign will send to {recipientCount} recipient(s).</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Your AI Readiness results + next step" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email body (HTML allowed)</label>
                <textarea
                  value={bodyHtml}
                  onChange={(e) => setBodyHtml(e.target.value)}
                  rows={10}
                  placeholder="<p>Hi there,</p><p>Thanks for taking the AI Readiness Audit…</p>"
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 font-mono text-sm"
                />
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium mb-2">Send a test to</label>
                  <Input type="email" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="you@ayothedoc.com" />
                </div>
                <Button variant="outline" disabled={sending || !subject || !bodyHtml || !testEmail} onClick={() => sendCampaign(true)}>
                  Send test
                </Button>
                <Button
                  className="bg-lime-400 text-gray-900 hover:bg-lime-500"
                  disabled={sending || !subject || !bodyHtml || recipientCount === 0}
                  onClick={() => {
                    if (confirm(`Send this campaign to ${recipientCount} recipient(s)?`)) sendCampaign(false)
                  }}
                >
                  <Send className="w-4 h-4 mr-1" /> {sending ? "Sending…" : `Send to ${recipientCount}`}
                </Button>
              </div>
              {campaignResult && <p className="text-sm">{campaignResult}</p>}
              <p className="text-xs text-muted-foreground border-t border-border/40 pt-3">
                Personalize per recipient with{" "}
                <code>{"{{name}}"}</code>, <code>{"{{firstName}}"}</code>, <code>{"{{businessType}}"}</code>,{" "}
                <code>{"{{website}}"}</code>. Sender: <code>contact@ayothedoc.com</code> (Resend domain verified ✓).
                Always run a test send first.
              </p>
            </CardContent>
          </Card>
        )}

        {/* API Keys (BYOK) */}
        {tab === "settings" && (
          <div className="space-y-6 max-w-3xl">
            {/* Encryption status */}
            {secretsConfigured ? (
              <div className="flex items-start gap-3 rounded-lg border border-lime-400/30 bg-lime-400/5 p-4 text-sm">
                <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Keys are encrypted at rest (AES-256-GCM).</p>
                  <p className="text-muted-foreground mt-1">
                    Stored keys are encrypted with a master key that lives only in the server environment, never in the
                    database. Keys are decrypted only server-side for outbound API calls and are never shown here in full, only a masked preview.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Encryption not configured.</p>
                  <p className="text-muted-foreground mt-1">
                    Set <code>SECRETS_ENCRYPTION_KEY</code> in the server environment before storing keys. Until then,
                    features fall back to their individual env vars.
                  </p>
                </div>
              </div>
            )}

            {/* Add a key */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Add an API key</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Provider</label>
                    <select
                      value={newProvider}
                      onChange={(e) => setNewProvider(e.target.value)}
                      className="w-full bg-card border border-border rounded-lg px-3 py-2"
                    >
                      {PROVIDER_OPTIONS.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Label (optional)</label>
                    <Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="e.g. Production, Billing account" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">API key</label>
                  <Input
                    type="password"
                    autoComplete="off"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder={PROVIDER_OPTIONS.find((p) => p.value === newProvider)?.placeholder}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Saving a new key for a provider replaces the previous one as the active key.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    className="bg-lime-400 text-gray-900 hover:bg-lime-500"
                    disabled={savingKey || !newValue.trim() || !secretsConfigured}
                    onClick={saveKey}
                  >
                    {savingKey ? "Saving…" : "Save key"}
                  </Button>
                  {keyMsg && <span className="text-sm">{keyMsg}</span>}
                </div>
              </CardContent>
            </Card>

            {/* Stored keys */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Stored keys</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {secrets.filter((s) => s.isActive).length === 0 && (
                  <p className="text-muted-foreground text-sm">No keys stored yet. Active providers fall back to server env vars.</p>
                )}
                {secrets
                  .filter((s) => s.isActive)
                  .map((s) => (
                    <div key={s.id} className="flex items-center justify-between gap-4 border-b border-border/30 pb-3 text-sm">
                      <div className="min-w-0">
                        <div className="font-semibold">
                          {providerLabel(s.provider)}
                          {s.label && <span className="text-muted-foreground font-normal"> · {s.label}</span>}
                        </div>
                        <div className="text-muted-foreground mt-0.5">
                          <code className="bg-muted/40 px-1.5 py-0.5 rounded">{s.hint}</code>
                          <span className="ml-2">added {new Date(s.createdAt).toLocaleDateString()}</span>
                          {s.lastUsedAt && <span className="ml-2">· last used {new Date(s.lastUsedAt).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => deleteKey(s.id, providerLabel(s.provider))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        {tab === "actions" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Google Analytics", href: "https://analytics.google.com", desc: "Traffic, sources, conversions" },
              { label: "Stripe Dashboard", href: "https://dashboard.stripe.com", desc: "Payments, subscriptions, payouts" },
              { label: "Resend", href: "https://resend.com/emails", desc: "Email delivery + domain verification" },
              { label: "Live site", href: "https://ayothedoc.com", desc: "View the public site" },
              { label: "Free AI Audit", href: "/audit", desc: "Your lead magnet" },
              { label: "Plans & Pricing", href: "/offer", desc: "Checkout links" },
            ].map((a) => (
              <a key={a.label} href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                <Card className="hover:border-lime-400/50 transition h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{a.label}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
