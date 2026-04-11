'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const roles = [
  'Head of AI, Automation & RPA',
  'AI & Digitalisation Leads',
  'CTO / VP Technology',
  'IT Operations Managers',
  'Process Excellence Directors',
  'Innovation & Strategy Leaders',
]

const orgs = ['UBS', 'GenTwo', 'On Running', 'LGT Private Bank', 'Swarovski', 'Helvetia', 'Brack.ch', '+ More']

export default function Audience() {
  const leftRef   = useRef<HTMLDivElement>(null)
  const rightRef  = useRef<HTMLDivElement>(null)
  const leftView  = useInView(leftRef,  { once: true, margin: '0px 0px -60px 0px' })
  const rightView = useInView(rightRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section id="audience" className="py-28">
      <div className="container mx-auto px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — roles */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 28 }}
            animate={leftView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">Who Attends</span>
            <h2
              className="font-display font-semibold text-ink mt-3"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.12 }}
            >
              Senior professionals from<br />Switzerland's leading organisations.
            </h2>
            <p className="text-muted mt-4 leading-[1.78]">
              These are the people shaping AI and automation strategy at scale —
              Heads of AI, CTOs, VP Technology, and Innovation Directors from
              some of Switzerland's most recognised names.
            </p>
            <ul className="mt-8 flex flex-col gap-[0.9rem]">
              {roles.map((r) => (
                <li key={r} className="flex items-center gap-3 text-muted text-[0.88rem]">
                  <span className="w-[6px] h-[6px] bg-gold rounded-full flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — orgs + pull quote */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, y: 28 }}
            animate={rightView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="pt-10 lg:pt-0 lg:mt-10"
          >
            <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase block mb-5">
              Organisations Represented
            </span>
            <div className="flex flex-wrap gap-3">
              {orgs.map((o) => (
                <span
                  key={o}
                  className="
                    px-[1.1rem] py-[0.45rem]
                    border border-gold/[0.22] rounded-[2px]
                    text-[0.8rem] text-muted tracking-[0.04em]
                    hover:text-gold hover:border-gold hover:bg-gold/[0.05]
                    transition-all duration-200 cursor-default
                  "
                >
                  {o}
                </span>
              ))}
            </div>

            {/* Pull quote */}
            <div className="mt-10 p-7 bg-bg3 border border-white/[0.06] border-l-2 border-l-gold">
              <p className="font-display italic text-[1rem] text-ink leading-[1.75]">
                "Your prospects are already in the room. Senior AI and automation
                leaders in Switzerland are actively evaluating new tools and
                partnerships — but they're not attending mass conferences.
                They're gathering in trusted, curated circles."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
