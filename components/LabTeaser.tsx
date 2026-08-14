'use client'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

function LabMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const panel = canvas.closest('.reticle-parent') as HTMLElement | null
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
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 22000)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.12 * devicePixelRatio,
        r: Math.random() * 1.2 + 0.5,
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
            const force = (1 - dist / pullRadius) * 18 * devicePixelRatio
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
          const maxDist = 110 * devicePixelRatio
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(201,168,76,${0.14 * (1 - dist / maxDist)})`
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
        ctx.fillStyle = 'rgba(232,240,0,0.55)'
        ctx.shadowColor = 'rgba(232,240,0,0.8)'
        ctx.shadowBlur = 5
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    panel?.addEventListener('mousemove', onMouseMove)
    panel?.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', init)
    init()
    draw()

    return () => {
      panel?.removeEventListener('mousemove', onMouseMove)
      panel?.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', init)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="lab-mesh" />
}

export default function LabTeaser() {
  const t      = useTranslations('lab')
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section className="py-28 bg-bg2">
      <div className="container mx-auto px-[5vw]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="reticle-parent relative bg-bg border border-gold/[0.25] rounded-[2px] overflow-hidden"
        >
          <LabMesh />
          <div className="reticle" style={{ '--reticle-color': '#E8F000' } as any} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center px-12 py-16 lg:px-16">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-[6px] h-[6px] bg-yellow rounded-full blink-dot" />
                <span className="font-mono text-[0.7rem] text-gold uppercase tracking-[0.2em]">{t('teaserEyebrow')}</span>
              </div>
              <h2 className="font-display font-semibold text-ink" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)', lineHeight: 1.14 }}>
                {t('teaserHeadline1')}<br />
                <em className="text-gold not-italic font-display">{t('teaserHeadline2')}</em>
              </h2>
              <p className="text-muted mt-5 max-w-[480px] leading-[1.75]">{t('teaserSub')}</p>
              <div className="mt-8">
                <Link href="/lab" className="inline-flex items-center gap-2 px-[1.7rem] py-[0.72rem] rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase bg-gold text-bg border border-gold hover:bg-gold-l hover:border-gold-l transition-all duration-200 no-underline">
                  {t('teaserCta')} →
                </Link>
              </div>
            </div>

            <div className="font-mono text-[0.72rem] text-muted flex flex-col gap-2 lg:items-end">
              <div className="flex items-center gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-yellow blink-dot" />
                <span>{t('teaserLiveCount')} {t('teaserLiveLabel')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-muted opacity-40" />
                <span>{t('teaserDevCount')} {t('teaserDevLabel')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
