"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Eye, Calendar, Globe, Mail, User } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  website: string
  businessType: string
  currentChallenges: string
  timeSpentDaily: number
  timestamp: string
}

export default function AdminPage() {
  const [apiKey, setApiKey] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchLeads = async (key: string) => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads || [])
        setIsAuthenticated(true)
        localStorage.setItem('admin-api-key', key)
      } else {
        setError('Invalid API key')
        setIsAuthenticated(false)
      }
    } catch (err) {
      setError('Failed to fetch leads')
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCSV = async () => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ format: 'csv' })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'audit-leads.csv'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (err) {
      setError('Failed to download CSV')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLeads(apiKey)
  }

  // Check for saved API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('admin-api-key')
    if (savedKey) {
      setApiKey(savedKey)
      fetchLeads(savedKey)
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">API Key</label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your admin API key"
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Authenticating...' : 'Access Leads'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Add LEADS_API_KEY to your environment variables</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Business Audit Leads</h1>
            <p className="text-muted-foreground mt-2">{leads.length} total leads collected</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={downloadCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => fetchLeads(apiKey)} variant="outline">
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {leads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-semibold text-lg">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.businessType}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-green-500" />
                      <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                        {lead.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-500" />
                      <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {lead.website}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">
                        {new Date(lead.timestamp).toLocaleDateString()} at {new Date(lead.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">TIME SPENT ON REPETITIVE TASKS</h4>
                      <p className="font-bold text-lg text-red-600">{lead.timeSpentDaily} hours/day</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">CURRENT CHALLENGES</h4>
                      <p className="text-sm leading-relaxed bg-muted p-3 rounded-lg">
                        {lead.currentChallenges}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {leads.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Eye className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No leads yet</h3>
              <p className="text-muted-foreground">
                Business audit leads will appear here once users start submitting the form.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}