'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function Apps() {
  const t      = useTranslations('apps')
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const badges = [
    { label: t('badge1'), href: 'https://app.innovateindigital.com' },
    { label: t('badge2'), href: null },
    { label: t('badge3'), href: null },
    { label: t('badge4'), href: null },
  ]

  return (
    <section id="apps" className="py-28 bg-bg2">
      <div className="container mx-auto px-[5vw]">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-bg3 to-bg2 border border-gold/[0.22] rounded-[2px] p-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center overflow-hidden">
          <span className="absolute top-6 right-6 text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-yellow bg-yellow/[0.07] border border-yellow/[0.18] rounded-[2px] px-3 py-[0.28rem]">
            {t('liveTag')}
          </span>
          <div className="absolute right-[-80px] top-[-80px] w-[350px] h-[350px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(232,240,0,0.04),transparent_65%)]" />
          <div className="relative z-10">
            <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">{t('label')}</span>
            <h2 className="font-display font-semibold text-ink mt-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.12 }}>
              {t('headline1')}<br />{t('headline2')}
            </h2>
            <p className="text-muted mt-4 max-w-[520px] leading-[1.78]">{t('sub')}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              {badges.map(({ label, href }) =>
                href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-[0.38rem] text-[0.76rem] text-gold tracking-[0.04em] border border-gold/[0.5] bg-gold/[0.08] rounded-[2px] hover:bg-gold/[0.15] hover:border-gold transition-all duration-200 no-underline inline-flex items-center gap-1">
                    {label} ↗
                  </a>
                ) : (
                  <span key={label} className="px-4 py-[0.38rem] text-[0.76rem] text-muted tracking-[0.04em] border border-gold/[0.22] bg-gold/[0.06] rounded-[2px]">
                    {label}
                  </span>
                )
              )}
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
