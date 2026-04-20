'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function Testimonials() {
  const t      = useTranslations('testimonials')
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const items = [
    { quote: t('t1quote'), author: t('t1author') },
    { quote: t('t2quote'), author: t('t2author') },
    { quote: t('t3quote'), author: t('t3author') },
  ]

  return (
    <section id="testimonials" className="py-28">
      <div className="container mx-auto px-[5vw]">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-14">
          <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">{t('label')}</span>
          <h2 className="font-display font-semibold text-ink mt-3" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.12 }}>
            {t('headline')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(({ quote, author }, i) => (
            <motion.div key={author}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-bg2 border border-white/[0.06] border-l-2 border-l-gold rounded-[2px] p-8 flex flex-col"
            >
              <blockquote className="font-display italic text-[1rem] text-ink leading-[1.75] flex-1 mb-6">
                {quote}
              </blockquote>
              <cite className="text-muted text-[0.78rem] not-italic tracking-[0.04em]">{author}</cite>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
