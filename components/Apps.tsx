'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function Apps() {
  const t      = useTranslations('apps')
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const liveEmail = [
    { label: 'AI Readiness Scorecard',  href: 'https://readiness.innovateindigital.com' },
    { label: 'Process Cost Calculator', href: 'https://costs.innovateindigital.com' },
  ]

  const liveCode = [
    { label: 'Automation Manager',          href: 'https://app.innovateindigital.com' },
    { label: 'Process Prioritisation Matrix', href: 'https://priority.innovateindigital.com' },
    { label: 'Vendor Selector',             href: 'https://vendor.innovateindigital.com' },
  ]

  const coming = [
    'Automation ROI Tracker',
    'Automation Health Check',
  ]


  return (
    <section id="apps" className="py-28 bg-bg2">
      <div className="container mx-auto px-[5vw]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-bg3 to-bg2 border border-gold/[0.22] rounded-[2px] p-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center overflow-hidden"
        >
          <div className="absolute right-[-80px] top-[-80px] w-[350px] h-[350px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(232,240,0,0.04),transparent_65%)]" />

          <div className="relative z-10">
            <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">{t('label')}</span>
            <h2 className="font-display font-semibold text-ink mt-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.12 }}>
              {t('headline1')}<br />{t('headline2')}
            </h2>
            <p className="text-muted mt-4 max-w-[520px] leading-[1.78]">{t('sub')}</p>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-[6px] h-[6px] bg-yellow rounded-full flex-shrink-0" />
                <span className="text-[0.68rem] font-semibold tracking-[0.15em] uppercase text-muted">Free — email access</span>
                <span className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {liveEmail.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-[0.38rem] text-[0.76rem] font-medium tracking-[0.04em] border border-yellow/[0.4] bg-yellow/[0.07] text-yellow rounded-[2px] hover:bg-yellow/[0.14] transition-all duration-200 no-underline inline-flex items-center gap-1">
                    {label} ↗
                  </a>
                ))}
              </div>
              <p className="text-muted text-[0.72rem] mt-2">Enter your email for immediate access</p>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-[6px] h-[6px] bg-gold rounded-full flex-shrink-0" />
                <span className="text-[0.68rem] font-semibold tracking-[0.15em] uppercase text-muted">Access code required</span>
                <span className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {liveCode.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-[0.38rem] text-[0.76rem] font-medium tracking-[0.04em] border border-gold/[0.5] bg-gold/[0.08] text-gold rounded-[2px] hover:bg-gold/[0.15] transition-all duration-200 no-underline inline-flex items-center gap-1">
                    {label} ↗
                  </a>
                ))}
              </div>
              <p className="text-muted text-[0.72rem] mt-2">Community members only</p>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-[6px] h-[6px] bg-muted rounded-full flex-shrink-0 opacity-40" />
                <span className="text-[0.68rem] font-semibold tracking-[0.15em] uppercase text-muted">Coming soon</span>
                <span className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {coming.map((label) => (
                  <span key={label} className="px-4 py-[0.38rem] text-[0.76rem] text-muted tracking-[0.04em] border border-white/[0.09] bg-white/[0.02] rounded-[2px]">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <a href="mailto:mark.ross@innovateindigital.com?subject=Agentic Applications — Early Interest"
                className="inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem] rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase bg-transparent text-ink border border-gold/[0.22] hover:bg-gold/[0.07] hover:border-gold hover:text-gold transition-all duration-200 no-underline">
                {t('cta')}
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-4 min-w-[160px]">
            <div className="text-center p-5 border border-gold/[0.22] rounded-[2px] bg-bg/40">
              <div className="font-display font-bold text-yellow leading-none" style={{ fontSize: '2.2rem' }}>AI</div>
              <div className="text-[0.65rem] tracking-[0.12em] text-muted mt-1 uppercase">{t('aiLabel')}</div>
            </div>
            <div className="text-center p-5 border border-gold/[0.22] rounded-[2px] bg-bg/40">
              <div className="font-display font-bold text-gold" style={{ fontSize: '1.6rem' }}>Agentic</div>
              <div className="text-[0.65rem] tracking-[0.12em] text-muted mt-1 uppercase">{t('agenticLabel')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
