'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function CTA() {
  const t      = useTranslations('cta')
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section id="cta" className="relative py-32 text-center overflow-hidden">
      <div className="cta-glow" />
      <div className="container mx-auto px-[5vw] relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">{t('label')}</span>
          <h2 className="font-display font-semibold text-ink mt-3" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.12 }}>
            {t('headline1')}<br /><em className="text-gold not-italic font-display">{t('headline2')}</em>
          </h2>
          <p className="text-muted max-w-[500px] mx-auto mt-4 leading-[1.78]">{t('sub')}</p>
          <div className="mt-10">
            <a href="mailto:mark.ross@innovateindigital.com" className="inline-flex items-center gap-2 px-10 py-[0.9rem] rounded-[2px] text-[0.85rem] font-semibold tracking-[0.1em] uppercase bg-gold text-bg border border-gold hover:bg-gold-l hover:border-gold-l transition-all duration-200 no-underline">
              {t('button')}
            </a>
          </div>
          <p className="text-muted text-[0.85rem] mt-6">
            {t('orWrite')}{' '}
            <a href="mailto:mark.ross@innovateindigital.com" className="text-gold hover:text-gold-l transition-colors duration-200 no-underline">
              mark.ross@innovateindigital.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
