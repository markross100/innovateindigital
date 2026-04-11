'use client'
import { motion } from 'framer-motion'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const stats = [
  { num: '4+',   label: 'Roundtables delivered' },
  { num: '14',   label: 'Avg. senior attendees per event' },
  { num: '100%', label: 'Physical, in-person events' },
  { num: '40+',  label: 'Community members' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-36 pb-20 overflow-hidden"
    >
      {/* Background grid */}
      <div className="hero-grid-bg" />
      {/* Glow */}
      <div className="hero-glow" />

      <div className="container mx-auto px-[5vw] relative z-10">

        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-3 mb-8"
          {...fade(0.2)}
        >
          <span className="w-2 h-2 bg-yellow rounded-full animate-pulseYellow" />
          <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">
            Invite-Only · Zurich, Switzerland · 2025–2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display font-bold text-ink mb-6"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)', lineHeight: 1.12 }}
          {...fade(0.35)}
        >
          Where Switzerland's
          <br />
          <em className="text-gold not-italic font-display">Senior AI Leaders</em>
          <br />
          Actually Talk.
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="max-w-[600px] text-muted leading-[1.82] mb-10"
          style={{ fontSize: '1.05rem' }}
          {...fade(0.5)}
        >
          A private roundtable series for senior leaders in RPA, AI, and Agentic
          Automation — designed for peer learning, meaningful connections, and
          practical outcomes. No vendor pitches. No theory. Just honest,
          high-value conversation.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex gap-4 flex-wrap" {...fade(0.65)}>
          <a
            href="mailto:mark.ross@innovateindigital.com"
            className="
              inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem]
              rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase
              bg-gold text-bg border border-gold
              hover:bg-gold-l hover:border-gold-l transition-all duration-200 no-underline
            "
          >
            Request an Invitation
          </a>
          <a
            href="#community"
            className="
              inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem]
              rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase
              bg-transparent text-ink border border-gold/[0.22]
              hover:bg-gold/[0.07] hover:border-gold hover:text-gold
              transition-all duration-200 no-underline
            "
          >
            Explore the Format ↓
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-[4.5rem] pt-10 border-t border-white/[0.06] flex gap-14 flex-wrap"
          {...fade(0.85)}
        >
          {stats.map(({ num, label }) => (
            <div key={label}>
              <div
                className="font-display font-bold text-ink leading-none"
                style={{ fontSize: '2.4rem' }}
              >
                {num.replace(/(\+|%)/, '')}
                <span className="text-gold">
                  {num.includes('+') ? '+' : num.includes('%') ? '%' : ''}
                </span>
              </div>
              <div className="text-muted text-[0.8rem] mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-[5vw] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-muted text-[0.62rem] tracking-[0.2em] uppercase">Scroll</span>
        <span className="scroll-line-anim" />
      </motion.div>
    </section>
  )
}
