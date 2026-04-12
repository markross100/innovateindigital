'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function Sponsors() {
  const t      = useTranslations('sponsors')
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const perks = [t('perk1'), t('perk2'), t('perk3'), t('perk4'), t('perk5')]

  return (
    <section id="sponsors" className="py-28">
      <div className="container mx-auto px-[5vw]">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-bg2 to-bg3 border border-gold/[0.22] rounded-[2px] p-14 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-center overflow-hidden">
          <div className="sponsor-glow" />
          <div className="relative z-10">
            <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">{t('label')}</span>
            <h2 className="font-display font-semibold text-ink mt-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.12 }}>
              {t('headline1')}<br />{t('headline2')}
            </h2>
            <p className="text-muted mt-4 max-w-[500px] leading-[1.78]">{t('sub')}</p>
            <div className="mt-8 flex flex-col gap-3">
              {perks.map((p) => (
                <div key={p} className="flex items-center gap-3 text-muted text-[0.86rem]">
                  <span className="w-[6px] h-[6px] bg-gold rounded-full flex-shrink-0" />{p}
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 bg-bg/50 border border-gold/[0.22] rounded-[2px] p-8 text-center">
            <h3 className="text-ink font-semibold text-[1.1rem] mb-2">{t('boxTitle')}</h3>
            <p className="text-muted text-[0.85rem] mb-6 leading-[1.7]">{t('boxSub')}</p>
            <a href="mailto:mark.ross@innovateindigital.com?subject=Sponsor Information Pack Request"
              className="flex items-center justify-center w-full px-[1.6rem] py-[0.75rem] rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase bg-gold text-bg border border-gold hover:bg-gold-l hover:border-gold-l transition-all duration-200 no-underline">
              {t('boxCta')}
            </a>
            <p className="text-muted text-[0.75rem] mt-4">{t('boxEmail')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
