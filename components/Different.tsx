'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function Different() {
  const t      = useTranslations('different')
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const items = [
    { icon: '⚡', title: t('item1title'), body: t('item1body') },
    { icon: '✦', title: t('item2title'), body: t('item2body') },
    { icon: '◎', title: t('item3title'), body: t('item3body') },
  ]

  return (
    <section id="different" className="py-28 bg-bg2">
      <div className="container mx-auto px-[5vw]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          ref={ref} className="mb-12"
        >
          <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">{t('label')}</span>
          <h2 className="font-display font-semibold text-ink mt-3" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.12 }}>
            {t('headline1')}<br />{t('headline2')}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-white/[0.06] border border-white/[0.06] rounded-[2px] overflow-hidden">
          {items.map(({ icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-bg2 hover:bg-bg3 transition-colors duration-300 p-10"
            >
              <div className="w-[38px] h-[38px] bg-gold/[0.09] rounded-full flex items-center justify-center mb-6 text-[1rem]">{icon}</div>
              <h3 className="text-ink font-semibold mb-3">{title}</h3>
              <p className="text-muted text-[0.88rem] leading-[1.78]">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
