'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function EventFormat() {
  const t      = useTranslations('format')
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const events = [
    { time: t('time1'), title: t('event1title'), body: t('event1body') },
    { time: t('time2'), title: t('event2title'), body: t('event2body') },
    { time: t('time3'), title: t('event3title'), body: t('event3body') },
  ]

  const details = [t('detail1'), t('detail2'), t('detail3'), t('detail4')]

  return (
    <section id="format" className="py-28">
      <div className="container mx-auto px-[5vw]">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-14">
          <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">{t('label')}</span>
          <h2 className="font-display font-semibold text-ink mt-3" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.12 }}>
            {t('headline1')}<br />{t('headline2')}
          </h2>
        </motion.div>

        <div className="max-w-[720px]">
          {events.map(({ time, title, body }, i) => (
            <motion.div key={time}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-6 mb-10 last:mb-0"
            >
              <div className="flex-shrink-0 pt-1">
                <span className="inline-block px-3 py-[0.3rem] text-[0.72rem] font-semibold tracking-[0.1em] text-gold bg-gold/[0.08] border border-gold/[0.25] rounded-[2px]">
                  {time}
                </span>
              </div>
              <div className="flex-1 pb-10 border-b border-white/[0.06] last:border-0 last:pb-0">
                <h3 className="text-ink font-semibold text-[1rem] mb-2">{title}</h3>
                <p className="text-muted text-[0.88rem] leading-[1.78]">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <div className="flex flex-wrap gap-3 mb-8">
            {details.map((d) => (
              <span key={d} className="px-4 py-[0.45rem] text-[0.78rem] text-muted border border-white/[0.08] rounded-[2px] tracking-[0.04em]">
                {d}
              </span>
            ))}
          </div>
          <div className="max-w-[640px] p-7 bg-bg2 border border-white/[0.06] border-l-2 border-l-gold">
            <p className="font-display italic text-[1rem] text-ink leading-[1.75]">{t('closing')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
