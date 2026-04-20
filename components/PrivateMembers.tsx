'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function PrivateMembers() {
  const t       = useTranslations('members')
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const pillars = [
    { title: t('pillar1title'), body: t('pillar1body'), icon: '◈' },
    { title: t('pillar2title'), body: t('pillar2body'), icon: '◎' },
    { title: t('pillar3title'), body: t('pillar3body'), icon: '⬡' },
    { title: t('pillar4title'), body: t('pillar4body'), icon: '✦' },
  ]

  return (
    <section id="members" className="py-28 bg-bg2">
      <div className="container mx-auto px-[5vw]">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-14">
          <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">{t('label')}</span>
          <h2 className="font-display font-semibold text-ink mt-3 max-w-[560px]" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.12 }}>
            {t('headline')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ title, body, icon }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-bg border border-white/[0.06] rounded-[2px] p-8 hover:border-gold/[0.22] hover:-translate-y-1 transition-all duration-300 card-top-line"
            >
              <div className="w-[38px] h-[38px] bg-gold/[0.09] rounded-full flex items-center justify-center mb-5 text-gold text-[1rem]">
                {icon}
              </div>
              <h3 className="text-ink text-[0.98rem] font-semibold mb-3">{title}</h3>
              <p className="text-muted text-[0.86rem] leading-[1.75]">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
