'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
})

// Splits "40+" -> { value: 40, suffix: '+' }, "100%" -> { value: 100, suffix: '%' }
function parseStat(num: string) {
  const match = num.match(/^(\d+)(\D*)$/)
  if (!match) return { value: 0, suffix: '' }
  return { value: parseInt(match[1], 10), suffix: match[2] }
}

function StatCount({ target, duration = 1100 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setValue(target); return }
    let raf: number
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return <span ref={ref}>{value}</span>
}

function HeroMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const heroSection = canvas.closest('section')
    let w = 0, h = 0
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    const mouse: { x: number | null; y: number | null } = { x: null, y: null }
    let raf: number

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) * devicePixelRatio
      mouse.y = (e.clientY - rect.top) * devicePixelRatio
    }
    const onMouseLeave = () => { mouse.x = null; mouse.y = null }

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
    }
    const init = () => {
      resize()
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 42000) // sparse
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.1 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.1 * devicePixelRatio,
        r: Math.random() * 1.1 + 0.5,
      }))
    }
    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      const pullRadius = 180 * devicePixelRatio
      const display: { x: number; y: number; r: number }[] = []

      for (const n of nodes) {
        if (!reduced) { n.x += n.vx; n.y += n.vy }
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1

        let dx2 = n.x, dy2 = n.y
        if (mouse.x !== null && mouse.y !== null && !reduced) {
          const dx = mouse.x - n.x, dy = mouse.y - n.y
          const dist = Math.hypot(dx, dy)
          if (dist < pullRadius && dist > 0.01) {
            const force = (1 - dist / pullRadius) * 16 * devicePixelRatio
            dx2 = n.x + (dx / dist) * force
            dy2 = n.y + (dy / dist) * force
          }
        }
        display.push({ x: dx2, y: dy2, r: n.r })
      }

      for (let i = 0; i < display.length; i++) {
        for (let j = i + 1; j < display.length; j++) {
          const dx = display[i].x - display[j].x
          const dy = display[i].y - display[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 120 * devicePixelRatio
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(201,168,76,${0.11 * (1 - dist / maxDist)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(display[i].x, display[i].y)
            ctx.lineTo(display[j].x, display[j].y)
            ctx.stroke()
          }
        }
      }
      for (const d of display) {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(232,240,0,0.4)'
        ctx.shadowColor = 'rgba(232,240,0,0.6)'
        ctx.shadowBlur = 4
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    heroSection?.addEventListener('mousemove', onMouseMove)
    heroSection?.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', init)
    init()
    draw()

    return () => {
      heroSection?.removeEventListener('mousemove', onMouseMove)
      heroSection?.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', init)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-mesh" />
}

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
      <HeroMesh />
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
          {stats.map(({ num, label }) => {
            const { value, suffix } = parseStat(num)
            return (
              <div key={label}>
                <div className="font-display font-bold text-ink leading-none" style={{ fontSize: '2.4rem' }}>
                  <StatCount target={value} />
                  <span className="text-gold">{suffix}</span>
                </div>
                <div className="text-muted text-[0.8rem] mt-2 leading-snug">{label}</div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
