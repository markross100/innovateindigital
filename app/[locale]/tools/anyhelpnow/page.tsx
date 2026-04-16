'use client'
import { useState } from 'react'

export default function AnyHelpNowPage() {
  const [code, setCode]     = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/tools/anyhelpnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Invalid access code. Please try again.')
        setLoading(false)
        return
      }
      window.location.href = '/tools/anyhelpnow.html'
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#08080F', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', fontFamily: 'sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#EDE9E0' }}>
          Innovate
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', background: '#E8F000', borderRadius: '50%', color: '#08080F', fontSize: '0.75rem', fontWeight: 700, margin: '0 2px' }}>
            In
          </span>
          Digital
        </div>
        <div style={{ background: '#0F0F18', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '2px', padding: '2.5rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C' }}>
            Restricted Access
          </span>
          <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 600, color: '#EDE9E0', marginTop: '0.75rem', marginBottom: '0.5rem', fontSize: '1.6rem', lineHeight: 1.2 }}>
            AnyHelpNow
          </h1>
          <p style={{ color: '#7A7A90', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '2rem' }}>
            This tool is available to authorised users only. Enter your access code to continue.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter access code"
              style={{ width: '100%', padding: '0.75rem 1rem', background: '#141420', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', color: '#EDE9E0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
            {error && <p style={{ fontSize: '0.8rem', color: '#f87171', margin: 0 }}>{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading || !code}
              style={{ width: '100%', padding: '0.75rem', background: '#C9A84C', color: '#08080F', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', border: 'none', cursor: loading || !code ? 'not-allowed' : 'pointer', opacity: loading || !code ? 0.4 : 1 }}
            >
              {loading ? 'Verifying...' : 'Enter'}
            </button>
          </div>
        </div>
        <p style={{ textAlign: 'center', color: '#7A7A90', fontSize: '0.75rem', marginTop: '1.5rem' }}>
          Need access?{' '}
          <a href="mailto:mark.ross@innovateindigital.com" style={{ color: '#C9A84C', textDecoration: 'none' }}>
            Contact Mark Ross
          </a>
        </p>
      </div>
    </div>
  )
}
