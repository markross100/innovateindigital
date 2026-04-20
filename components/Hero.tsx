'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  const t = useTranslations('hero')

  const stats = [
    { num: t('stat1num'), label: t('stat1label') },
    { num: t('stat2num'), label: t('stat2label') },
    { num: t('stat3num'), label: t('stat3label') },
    { num: t('stat4num'), label: t('stat4label') },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-36 pb-32 overflow-hidden">
      <div className="hero-grid-bg" />
      <div className="hero-glow" />
      <div className="container mx-auto px-[5vw] relative z-10">

        <motion.div className="inline-flex items-center gap-3 mb-8" {...fade(0.2)}>
          <span className="w-2 h-2 bg-yellow rounded-full animate-pulseYellow" />
          <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">{t('eyebrow')}</span>
        </motion.div>

        <motion.h1 className="font-display font-bold text-ink mb-6" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)', lineHeight: 1.12 }} {...fade(0.35)}>
          {t('headline1')}<br />
          <em className="text-gold not-italic font-display">{t('headline2')}</em><br />
          {t('headline3')}
        </motion.h1>

        <motion.p className="max-w-[600px] text-muted leading-[1.82] mb-10" style={{ fontSize: '1.05rem' }} {...fade(0.5)}>
          {t('sub')}
        </motion.p>

        <motion.div className="flex gap-4 flex-wrap" {...fade(0.65)}>
          <a href="mailto:mark.ross@innovateindigital.com"
            className="inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem] rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase bg-gold text-bg border border-gold hover:bg-gold-l hover:border-gold-l transition-all duration-200 no-underline">
            {t('ctaPrimary')}
          </a>
          <a href="#format"
            className="inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem] rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase bg-transparent text-ink border border-gold/[0.22] hover:bg-gold/[0.07] hover:border-gold hover:text-gold transition-all duration-200 no-underline">
            {t('ctaSecondary')} ↓
          </a>
        </motion.div>

        <motion.div className="mt-[4.5rem] pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8" {...fade(0.85)}>
          {stats.map(({ num, label }) => (
            <div key={label}>
              <div className="font-display font-bold text-ink leading-none" style={{ fontSize: '2.4rem' }}>
                {num.replace(/(\+|%)/, '')}
                <span className="text-gold">{num.includes('+') ? '+' : num.includes('%') ? '%' : ''}</span>
              </div>
              <div className="text-muted text-[0.8rem] mt-2 leading-snug">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
