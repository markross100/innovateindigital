'use client'
import { useState } from 'react'

export default function AnyHelpNowPage() {
  const [code, setCode]       = useState('')
  const [html, setHtml]       = useState<string | null>(null)
  const [error, setError]     = useState('')
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
      if (!res.ok) {
        setError('Invalid access code. Please try again.')
        setLoading(false)
        return
      }
      const data = await res.json()
      setHtml(data.html)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (html) {
    return (
      <iframe
        srcDoc={html}
        className="w-full h-screen border-0"
        title="AnyHelpNow"
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
      />
    )
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-[420px]">

        {/* Logo */}
        <div className="flex items-center justify-center mb-10 font-sans font-semibold text-[1.1rem] text-ink">
          Innovate
          <span className="inline-flex items-center justify-center w-[22px] h-[22px] bg-yellow rounded-full text-bg text-[0.75rem] font-bold mx-[1.5px]">
            In
          </span>
          Digital
        </div>

        {/* Card */}
        <div className="bg-bg2 border border-gold/[0.22] rounded-[2px] p-10">
          <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
            Restricted Access
          </span>
          <h1 className="font-display font-semibold text-ink mt-3 mb-2" style={{ fontSize: '1.6rem', lineHeight: 1.2 }}>
            AnyHelpNow
          </h1>
          <p className="text-muted text-[0.88rem] leading-[1.75] mb-8">
            This tool is available to authorised users only. Enter your access code to continue.
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter access code"
              className="w-full px-4 py-3 bg-bg3 border border-white/[0.1] rounded-[2px] text-ink text-[0.9rem] placeholder:text-muted focus:outline-none focus:border-gold/[0.5] transition-colors duration-200"
            />

            {error && (
              <p className="text-[0.8rem] text-red-400">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !code}
              className="w-full py-3 bg-gold text-bg font-semibold text-[0.8rem] tracking-[0.1em] uppercase rounded-[2px] hover:bg-gold-l transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Enter'}
            </button>
          </div>
        </div>

        <p className="text-center text-muted text-[0.75rem] mt-6">
          Need access?{' '}
          <a href="mailto:mark.ross@innovateindigital.com" className="text-gold hover:text-gold-l transition-colors no-underline">
            Contact Mark Ross
          </a>
        </p>
      </div>
    </div>
  )
}
