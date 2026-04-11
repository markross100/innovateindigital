'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const creds = [
  { strong: '30+ years',                        rest: 'in Information Technology' },
  { strong: 'RPA & Automation Manager',         rest: '— built functions & ecosystems from the ground up' },
  { strong: 'Competence Centre Builder',        rest: '— strategy, tech, and adoption' },
  { strong: 'SwissBorg Zurich Community Lead',  rest: '(volunteer)' },
]

export default function AboutMark() {
  const photoRef  = useRef<HTMLDivElement>(null)
  const textRef   = useRef<HTMLDivElement>(null)
  const photoView = useInView(photoRef, { once: true, margin: '0px 0px -60px 0px' })
  const textView  = useInView(textRef,  { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section id="mark" className="py-28 bg-bg2">
      <div className="container mx-auto px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-20 items-center">

          {/* Photo */}
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, y: 28 }}
            animate={photoView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/mark.jpg"
                alt="Mark Ross — Founder, InnovateInDigital"
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover object-top grayscale-[10%] contrast-[1.04]"
                priority
              />
            </div>
            <div className="frame-accent" />
          </motion.div>

          {/* Text */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, y: 28 }}
            animate={textView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase">The Founder</span>
            <h2
              className="font-display font-semibold text-ink mt-3"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.12 }}
            >
              Mark Ross
            </h2>

            {/* Location badge */}
            <div className="inline-flex items-center gap-2 mt-4 mb-5 px-4 py-[0.38rem] border border-gold/[0.22] rounded-[2px] text-[0.68rem] text-muted tracking-[0.1em] uppercase">
              📍 Zurich, Switzerland
            </div>

            <p className="text-muted leading-[1.78]">
              I started this community because I kept having the same conversation:
              brilliant people working on RPA, automation, and AI — but doing it in
              silos. No real space to share what's actually working, what isn't, and
              where things are heading. So I built one.
            </p>

            {/* Quote */}
            <blockquote className="my-7 pl-6 border-l-2 border-gold font-display italic text-[1.2rem] text-ink leading-[1.65]">
              "InnovateInDigital brings together business & technology leaders for
              honest, high-quality conversations — where real experience gets shared,
              not just polished presentations."
            </blockquote>

            {/* Credentials */}
            <div className="flex flex-col gap-[0.65rem] mt-8">
              {creds.map(({ strong, rest }) => (
                <div key={strong} className="flex items-start gap-3 text-[0.86rem]">
                  <span className="w-[5px] h-[5px] bg-yellow rounded-full flex-shrink-0 mt-[0.45rem]" />
                  <div>
                    <strong className="text-ink font-medium">{strong}</strong>{' '}
                    <span className="text-muted">{rest}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="mt-8 flex gap-4 flex-wrap">
              <a
                href="mailto:mark.ross@innovateindigital.com"
                className="inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem] rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase bg-gold text-bg border border-gold hover:bg-gold-l hover:border-gold-l transition-all duration-200 no-underline"
              >
                Get in Touch
              </a>
              <a
                href="https://www.linkedin.com/in/markrossch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem] rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase bg-transparent text-ink border border-gold/[0.22] hover:bg-gold/[0.07] hover:border-gold hover:text-gold transition-all duration-200 no-underline"
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
