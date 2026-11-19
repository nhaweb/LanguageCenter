export type LeadPayload = {
  kind: 'consultation' | 'quiz' | 'newsletter'
  name?: string
  phone?: string
  email?: string
  course?: string
  campus?: string
  age?: string
  callback?: string
  note?: string
  consent?: boolean
  attribution?: string
  createdAt: string
}

const STORAGE_KEY = 'bright-english-leads'

export function readAttribution() {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  return ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((key) => {
      const value = params.get(key)
      return value ? `${key}=${value}` : ''
    })
    .filter(Boolean)
    .join(' ')
}

export function readStoredLeads(): LeadPayload[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as LeadPayload[]) : []
  } catch {
    return []
  }
}

export async function saveLead(payload: Omit<LeadPayload, 'createdAt' | 'attribution'>) {
  const lead: LeadPayload = {
    ...payload,
    attribution: readAttribution(),
    createdAt: new Date().toISOString(),
  }
  const next = [...readStoredLeads(), lead].slice(-20)
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))

  const webhook = process.env.NEXT_PUBLIC_LEAD_WEBHOOK
  if (!webhook) return { delivered: false as const }
  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })
  if (!response.ok) throw new Error('Lead webhook failed')
  return { delivered: true as const }
}
