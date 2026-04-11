'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const cards = [
  { num: '01', title: 'Curated Invite',     body: '10–20 carefully selected senior professionals per session. No mass invites. No random attendees. Every participant is chosen intentionally.' },
  { num: '02', title: 'Sponsor Spotlight',  body: 'A focused 20-minute slot to present, demonstrate and open discussion — a conversation starter, never a sales pitch.' },
  { num: '03', title: 'Open Roundtable',    body: 'Facilitated peer discussion around real challenges in AI & automation. Candid, experience-led, and practically focused.' },
  { num: '04', title: 'Networking Apéro',   body: 'Informal close with drinks and food. Real introductions over a glass of wine — not badge-swapping at a booth.' },
]

function Card({ num, title, body, delay }: { num: string; title: string; body: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="
        relative bg-bg2 border border-white/[0.06] rounded-[2px] p-8
        hover:border-gold/[0.22] hover:-translate-y-1
        transition-all duration-300 card-top-line
      "
    >
      {/* Number row */}
      <div className="flex items-center gap-2 mb-5">
        <span className="font-display text-[0.8rem] font-bold text-gold tracking-[0.1em]">{num}</span>
        <span className="flex-1 h-px bg-white/[0.06]" />
      </div>
      <h3 className="text-ink text-[0.98rem] font-semibold mb-3">{title}</h3>
      <p className="text-muted text-[0.86rem] leading-[1.75]">{body}</p>
    </motion.div>
  )
}

export default function Community() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section id="community" className="py-28">
      <div className="container mx-auto px-[5vw]">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">The Community</span>
          <h2
            className="font-display font-semibold text-ink mt-3 max-w-[560px]"
            style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.12 }}
          >
            Built for depth,<br />not scale.
          </h2>
          <p className="max-w-[580px] text-muted mt-4 leading-[1.78]">
            Every seat is earned. Attendees are hand-picked for seniority, relevance, and expertise.
            Small by design — so every conversation counts and every connection is real.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <Card key={c.num} {...c} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
