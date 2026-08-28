'use client'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { useTranslations } from 'next-intl'

// ---- shared count-up (mirrors Hero's StatCount) ----
function CountUp({ target, duration = 900 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0)
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
  return <>{value}</>
}

// ---- cursor-reactive constellation mesh, sized to the hero panel ----
function LabHeroMesh() {
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
    const resize = () => { w = canvas.width = canvas.offsetWidth * devicePixelRatio; h = canvas.height = canvas.offsetHeight * devicePixelRatio }
    const init = () => {
      resize()
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 26000)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
        r: Math.random() * 1.4 + 0.6,
      }))
    }
    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      const pullRadius = 200 * devicePixelRatio
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
            const force = (1 - dist / pullRadius) * 22 * devicePixelRatio
            dx2 = n.x + (dx / dist) * force
            dy2 = n.y + (dy / dist) * force
          }
        }
        display.push({ x: dx2, y: dy2, r: n.r })
      }
      for (let i = 0; i < display.length; i++) {
        for (let j = i + 1; j < display.length; j++) {
          const dx = display[i].x - display[j].x, dy = display[i].y - display[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 130 * devicePixelRatio
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(201,168,76,${0.16 * (1 - dist / maxDist)})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(display[i].x, display[i].y); ctx.lineTo(display[j].x, display[j].y); ctx.stroke()
          }
        }
      }
      for (const d of display) {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(232,240,0,0.65)'
        ctx.shadowColor = 'rgba(232,240,0,0.9)'; ctx.shadowBlur = 6
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    heroSection?.addEventListener('mousemove', onMouseMove)
    heroSection?.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', init)
    init(); draw()
    return () => {
      heroSection?.removeEventListener('mousemove', onMouseMove)
      heroSection?.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', init)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <canvas ref={canvasRef} className="lab-mesh" style={{ opacity: 0.55 }} />
}

// ---- ambient constellation mesh behind the ecosystem diagram (sparser, no hover-pull needed on the whole area) ----
function EcosystemMesh({ wrapRef }: { wrapRef: RefObject<HTMLDivElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
    const resize = () => { w = canvas.width = canvas.offsetWidth * devicePixelRatio; h = canvas.height = canvas.offsetHeight * devicePixelRatio }
    const init = () => {
      resize()
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 24000)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.1 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.1 * devicePixelRatio,
        r: Math.random() * 1.5 + 0.8,
      }))
    }
    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      const pullRadius = 200 * devicePixelRatio
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
            const force = (1 - dist / pullRadius) * 15 * devicePixelRatio
            dx2 = n.x + (dx / dist) * force
            dy2 = n.y + (dy / dist) * force
          }
        }
        display.push({ x: dx2, y: dy2, r: n.r })
      }
      for (let i = 0; i < display.length; i++) {
        for (let j = i + 1; j < display.length; j++) {
          const dx = display[i].x - display[j].x, dy = display[i].y - display[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 150 * devicePixelRatio
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(201,168,76,${0.28 * (1 - dist / maxDist)})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(display[i].x, display[i].y); ctx.lineTo(display[j].x, display[j].y); ctx.stroke()
          }
        }
      }
      for (const d of display) {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(232,240,0,0.6)'
        ctx.shadowColor = 'rgba(232,240,0,0.8)'; ctx.shadowBlur = 5
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    wrap.addEventListener('mousemove', onMouseMove)
    wrap.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', init)
    init(); draw()
    const lateInit = setTimeout(init, 600) // catch late font-load reflow
    return () => {
      wrap.removeEventListener('mousemove', onMouseMove)
      wrap.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', init)
      clearTimeout(lateInit)
      cancelAnimationFrame(raf)
    }
  }, [wrapRef])
  return <canvas ref={canvasRef} className="ecosystem-mesh" />
}

// ---- real relationships between tools, drawn as connector lines ----
type ConnStyle = 'solid' | 'hub' | 'future'
const CONNECTIONS: { from: string; to: string; style: ConnStyle }[] = [
  { from: 'scorecard',  to: 'manager',     style: 'solid' },
  { from: 'scorecard',  to: 'maturity',    style: 'solid' },
  { from: 'calculator', to: 'bizcase',     style: 'solid' },
  { from: 'manager',    to: 'matrix',      style: 'hub' },
  { from: 'manager',    to: 'vendor',      style: 'hub' },
  { from: 'manager',    to: 'bizcase',     style: 'hub' },
  { from: 'manager',    to: 'canvas',      style: 'hub' },
  { from: 'manager',    to: 'maturity',    style: 'hub' },
  { from: 'manager',    to: 'healthcheck', style: 'future' },
]

function EcosystemConnectors({ wrapRef }: { wrapRef: RefObject<HTMLDivElement> }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const svg = svgRef.current
    if (!wrap || !svg) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const edgePoint = (rect: DOMRect, towards: DOMRect) => {
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2
      const tx = towards.left + towards.width / 2, ty = towards.top + towards.height / 2
      const dx = tx - cx, dy = ty - cy
      if (dx === 0 && dy === 0) return { x: cx, y: cy }
      const scaleX = dx !== 0 ? (rect.width / 2) / Math.abs(dx) : Infinity
      const scaleY = dy !== 0 ? (rect.height / 2) / Math.abs(dy) : Infinity
      const scale = Math.min(scaleX, scaleY, 1)
      return { x: cx + dx * scale, y: cy + dy * scale }
    }

    const draw = () => {
      if (!wrap || !svg) return
      svg.innerHTML = ''
      const wrapRect = wrap.getBoundingClientRect()
      svg.setAttribute('width', String(wrapRect.width))
      svg.setAttribute('height', String(wrapRect.height))

      CONNECTIONS.forEach((conn, i) => {
        const fromEl = wrap.querySelector<HTMLElement>(`[data-node="${conn.from}"]`)
        const toEl = wrap.querySelector<HTMLElement>(`[data-node="${conn.to}"]`)
        if (!fromEl || !toEl) return

        const fromRect = fromEl.getBoundingClientRect()
        const toRect = toEl.getBoundingClientRect()
        const p1 = edgePoint(fromRect, toRect)
        const p2 = edgePoint(toRect, fromRect)
        const x1 = p1.x - wrapRect.left, y1 = p1.y - wrapRect.top
        const x2 = p2.x - wrapRect.left, y2 = p2.y - wrapRect.top
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
        const dx = x2 - x1, dy = y2 - y1
        const norm = Math.sqrt(dx * dx + dy * dy) || 1
        const perpX = -dy / norm, perpY = dx / norm
        const bend = Math.min(norm * 0.12, 40)
        const cx = mx + perpX * bend, cy = my + perpY * bend

        const pathId = `eco-path-${i}`
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('id', pathId)
        path.setAttribute('d', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`)
        path.setAttribute('fill', 'none')

        if (conn.style === 'future') {
          path.setAttribute('stroke', 'rgba(138,136,120,0.5)')
          path.setAttribute('stroke-width', '1.6')
          path.setAttribute('stroke-dasharray', '4 5')
          svg.appendChild(path)
        } else {
          path.setAttribute('stroke', conn.style === 'hub' ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.22)')
          path.setAttribute('stroke-width', conn.style === 'hub' ? '2' : '1.6')
          svg.appendChild(path)

          const flow = path.cloneNode() as SVGPathElement
          flow.removeAttribute('id')
          flow.setAttribute('stroke', conn.style === 'hub' ? '#E8F000' : '#C9A84C')
          flow.setAttribute('stroke-width', conn.style === 'hub' ? '2.2' : '1.8')
          flow.style.opacity = '0.85'
          flow.style.filter = conn.style === 'hub' ? 'drop-shadow(0 0 3px #E8F000)' : 'drop-shadow(0 0 2px #C9A84C)'
          flow.classList.add('flow-line')
          flow.style.animationDelay = `${(i % 5) * 0.18}s`
          svg.appendChild(flow)
        }

        if (!reduced && conn.style === 'hub') {
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          dot.setAttribute('r', '4')
          dot.setAttribute('fill', '#E8F000')
          dot.style.filter = 'drop-shadow(0 0 8px #E8F000)'
          const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion')
          animate.setAttribute('dur', `${3 + (i % 3) * 0.5}s`)
          animate.setAttribute('repeatCount', 'indefinite')
          animate.setAttribute('begin', `${i * 0.3}s`)
          const mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath')
          mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${pathId}`)
          animate.appendChild(mpath)
          dot.appendChild(animate)
          svg.appendChild(dot)
        }
      })
    }

    draw()
    const ro = new ResizeObserver(() => draw())
    ro.observe(wrap)
    window.addEventListener('load', draw)
    const t1 = setTimeout(draw, 300)
    const t2 = setTimeout(draw, 900) // catch late font-load reflow

    return () => {
      ro.disconnect()
      window.removeEventListener('load', draw)
      clearTimeout(t1); clearTimeout(t2)
    }
  }, [wrapRef])

  return <svg ref={svgRef} className="connector-svg" />
}

type Tier = 'open' | 'gated' | 'dev'
type Tool = { node: string; title: string; desc: string; href?: string; codeLabel?: string }

function ToolCard({ tier, tool }: { tier: Tier; tool: Tool }) {
  const reticleColor = tier === 'open' ? '#E8F000' : tier === 'gated' ? '#C9A84C' : '#6b6b5e'
  const tagClass =
    tier === 'open'  ? 'text-yellow border-yellow/[0.35]' :
    tier === 'gated' ? 'text-gold border-gold/[0.4]' :
                        'text-muted border-white/[0.12]'
  const iconGlyph = tier === 'dev' ? '○' : tier === 'open' ? '◇' : '◆'
  const tagLabel = tier === 'open' ? 'ACCESS: OPEN' : tier === 'gated' ? 'ACCESS: GATED' : 'STATUS: IN DEV'
  const clickable = !!tool.href
  const arrowHoverColor = tier === 'open' ? 'group-hover:text-yellow' : 'group-hover:text-gold'

  const inner = (
    <>
      {clickable && (
        <span className={`absolute top-5 right-5 text-[13px] text-muted opacity-55 transition-all duration-300 ${arrowHoverColor} group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}>
          ↗
        </span>
      )}
      <div className="reticle" style={{ ['--reticle-color' as any]: reticleColor }} />
      <div className="flex items-start justify-between mb-5">
        <div className="w-[34px] h-[34px] border border-gold/[0.35] flex items-center justify-center text-gold text-[0.9rem]">{iconGlyph}</div>
        <span className={`font-mono text-[0.62rem] px-[9px] py-[5px] border rounded-[2px] ${tagClass}`}>{tagLabel}</span>
      </div>
      <h3 className="font-display font-semibold text-[1.15rem] text-ink mb-2">{tool.title}</h3>
      <p className="text-muted text-[0.85rem] leading-[1.6] mb-6 min-h-[42px]">{tool.desc}</p>
      <div className="flex items-center justify-between pt-[18px] border-t border-white/[0.06] text-[0.72rem]">
        {tool.href ? (
          <span className="text-ink">{tool.href.replace('https://', '')}</span>
        ) : (
          <span className="text-muted">Subdomain TBC</span>
        )}
        <span className="text-muted">{tool.codeLabel ?? '—'}</span>
      </div>
    </>
  )

  const className = `reticle-parent group relative block bg-bg3 border border-white/[0.06] p-8 transition-all duration-300 hover:bg-[#181826] ${tier === 'dev' ? 'opacity-60' : ''}`

  if (clickable) {
    return (
      <a data-node={tool.node} href={tool.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }
  return <div data-node={tool.node} className={className}>{inner}</div>
}

function FlagshipCard({ tool }: { tool: Tool }) {
  return (
    <a
      data-node={tool.node}
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      className="reticle-parent group relative flex flex-col md:flex-row justify-between items-center gap-8 p-9 md:p-10 bg-gradient-to-br from-gold/[0.09] to-bg3 border border-gold/[0.35] block hover:border-gold transition-all duration-300"
    >
      <span className="absolute top-5 right-5 text-[13px] text-yellow opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
      <div className="flex items-center gap-6">
        <div
          className="w-14 h-14 border-[1.5px] border-gold flex items-center justify-center text-gold text-2xl flex-shrink-0"
          style={{ boxShadow: '0 0 20px -4px rgba(201,168,76,0.5)' }}
        >
          ◆
        </div>
        <div>
          <div className="font-mono text-[0.68rem] text-yellow uppercase tracking-[0.18em] mb-2">Hub — Private Access</div>
          <div className="font-display font-semibold text-ink text-[1.6rem] mb-1">{tool.title}</div>
          <div className="text-muted text-[0.85rem] max-w-[420px] leading-[1.6]">{tool.desc}</div>
        </div>
      </div>
      <div className="text-right font-mono text-[0.75rem] flex-shrink-0">
        <div className="text-ink mb-1">{tool.href?.replace('https://', '')}</div>
        <div className="text-muted">{tool.codeLabel}</div>
      </div>
    </a>
  )
}

export default function Lab() {
  const t = useTranslations('lab')

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '0px 0px -60px 0px' })

  const openRef = useRef<HTMLDivElement>(null)
  const openInView = useInView(openRef, { once: true, margin: '0px 0px -60px 0px' })
  const privateRef = useRef<HTMLDivElement>(null)
  const privateInView = useInView(privateRef, { once: true, margin: '0px 0px -60px 0px' })
  const devRef = useRef<HTMLDivElement>(null)
  const devInView = useInView(devRef, { once: true, margin: '0px 0px -60px 0px' })
  const signalsRef = useRef<HTMLDivElement>(null)
  const signalsInView = useInView(signalsRef, { once: true, margin: '0px 0px -60px 0px' })

  const ecosystemRef = useRef<HTMLDivElement>(null)

  const openTools: Tool[] = [
    { node: 'scorecard',  title: t('openTool1Title'), desc: t('openTool1Desc'), href: 'https://readiness.innovateindigital.com', codeLabel: t('emailAccess') },
    { node: 'calculator', title: t('openTool2Title'), desc: t('openTool2Desc'), href: 'https://costs.innovateindigital.com', codeLabel: t('emailAccess') },
  ]

  const managerTool: Tool =
    { node: 'manager', title: t('privateTool1Title'), desc: t('privateTool1Desc'), href: 'https://app.innovateindigital.com', codeLabel: t('codeRequired') }

  const satelliteTools: Tool[] = [
    { node: 'matrix',   title: t('privateTool2Title'), desc: t('privateTool2Desc'), href: 'https://priority.innovateindigital.com', codeLabel: t('codeRequired') },
    { node: 'vendor',   title: t('privateTool3Title'), desc: t('privateTool3Desc'), href: 'https://vendor.innovateindigital.com', codeLabel: t('codeRequired') },
    { node: 'bizcase',  title: t('privateTool4Title'), desc: t('privateTool4Desc'), href: 'https://businesscase.innovateindigital.com', codeLabel: t('codeRequired') },
    { node: 'canvas',   title: t('privateTool5Title'), desc: t('privateTool5Desc'), href: 'https://blueprint.innovateindigital.com', codeLabel: t('codeRequired') },
    { node: 'maturity', title: t('privateTool6Title'), desc: t('privateTool6Desc'), href: 'https://maturity.innovateindigital.com', codeLabel: t('codeRequired') },
  ]

  const devTools: Tool[] = [
    { node: 'healthcheck', title: t('devTool1Title'), desc: t('devTool1Desc') },
  ]

  const tickerItems = [
    { label: t('openTool1Title'), tier: 'open' as Tier },
    { label: t('openTool2Title'), tier: 'open' as Tier },
    { label: t('privateTool1Title'), tier: 'gated' as Tier },
    { label: t('privateTool2Title'), tier: 'gated' as Tier },
    { label: t('privateTool3Title'), tier: 'gated' as Tier },
    { label: t('privateTool4Title'), tier: 'gated' as Tier },
    { label: t('privateTool5Title'), tier: 'gated' as Tier },
    { label: t('privateTool6Title'), tier: 'gated' as Tier },
    { label: t('devTool1Title'), tier: 'dev' as Tier },
  ]
  const tickerLoop = [...tickerItems, ...tickerItems]

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[70vh] flex flex-col justify-center pt-40 pb-24 overflow-hidden">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <LabHeroMesh />
        <div className="container mx-auto px-[5vw] relative z-10">
          <motion.div ref={heroRef} initial={{ opacity: 0, y: 22 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-2 mb-7">
              <span className="w-2 h-2 bg-yellow rounded-full blink-dot" />
              <span className="font-mono text-[0.7rem] text-gold uppercase tracking-[0.2em]">
                {t('heroEyebrowPrefix')} — <CountUp target={8} /> {t('heroEyebrowLive')} · <CountUp target={1} /> {t('heroEyebrowDev')}
              </span>
            </div>
            <h1 className="font-display font-bold text-ink mb-6 max-w-[820px]" style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)', lineHeight: 1.06 }}>
              {t('heroHeadline1')}<br />
              <em className="text-gold not-italic font-display">{t('heroHeadline2')}</em>
            </h1>
            <p className="max-w-[560px] text-muted leading-[1.75]" style={{ fontSize: '1.05rem' }}>{t('heroSub')}</p>
            <div className="flex gap-4 flex-wrap mt-9">
              <a href="#open" className="inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem] rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase bg-gold text-bg border border-gold hover:bg-gold-l hover:border-gold-l transition-all duration-200 no-underline">
                {t('heroCtaOpen')}
              </a>
              <a href="#private" className="inline-flex items-center gap-2 px-[1.6rem] py-[0.68rem] rounded-[2px] text-[0.8rem] font-semibold tracking-[0.1em] uppercase bg-transparent text-ink border border-gold/[0.22] hover:bg-gold/[0.07] hover:border-gold hover:text-gold transition-all duration-200 no-underline">
                {t('heroCtaPrivate')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <div className="border-y border-white/[0.06] bg-bg2 overflow-hidden whitespace-nowrap">
        <div className="lab-ticker-track inline-flex py-[14px]">
          {tickerLoop.map((item, i) => (
            <span key={i} className="font-mono text-[0.72rem] px-7 text-muted border-r border-white/[0.06] inline-flex items-center gap-[10px]">
              <span
                className={`w-[5px] h-[5px] rounded-full ${item.tier === 'open' ? 'bg-yellow blink-dot' : item.tier === 'gated' ? 'bg-gold' : 'bg-[#4a4a3f]'}`}
              />
              <span className="text-ink">{item.label}</span>
              &nbsp;— {item.tier === 'open' ? t('tickerOpen') : item.tier === 'gated' ? t('tickerGated') : t('tickerDev')}
            </span>
          ))}
        </div>
      </div>

      {/* ============ ECOSYSTEM: Open Access + Private Access + In Development, sharing one connected diagram ============ */}
      <div className="ecosystem-wrap relative" ref={ecosystemRef}>
        <EcosystemMesh wrapRef={ecosystemRef} />
        <EcosystemConnectors wrapRef={ecosystemRef} />

        {/* ---- OPEN ACCESS ---- */}
        <section id="open" className="relative z-10 py-28">
          <div className="container mx-auto px-[5vw]">
            <motion.div ref={openRef} initial={{ opacity: 0, y: 28 }} animate={openInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-7 border-b border-white/[0.06]">
              <div className={`sec-head ${openInView ? 'in' : ''}`}>
                <span className="font-mono text-[0.7rem] text-gold uppercase tracking-[0.16em]">{t('openTag')}</span>
                <h2 className="font-display font-semibold text-ink mt-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.15 }}>{t('openTitle')}</h2>
              </div>
              <p className="text-muted text-[0.85rem] max-w-[340px] leading-[1.6] md:text-right">{t('openNote')}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/[0.06] border border-white/[0.06]">
              {openTools.map((tool, i) => (
                <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} animate={openInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }}>
                  <ToolCard tier="open" tool={tool} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- PRIVATE ACCESS ---- */}
        <section id="private" className="relative z-10 py-28">
          <div className="container mx-auto px-[5vw]">
            <motion.div ref={privateRef} initial={{ opacity: 0, y: 28 }} animate={privateInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-7 border-b border-white/[0.06]">
              <div className={`sec-head ${privateInView ? 'in' : ''}`}>
                <span className="font-mono text-[0.7rem] text-gold uppercase tracking-[0.16em]">{t('privateTag')}</span>
                <h2 className="font-display font-semibold text-ink mt-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.15 }}>{t('privateTitle')}</h2>
              </div>
              <p className="text-muted text-[0.85rem] max-w-[340px] leading-[1.6] md:text-right">{t('privateNote')}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={privateInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-[1px]">
              <FlagshipCard tool={managerTool} />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.06] border border-white/[0.06] border-t-0">
              {satelliteTools.map((tool, i) => (
                <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} animate={privateInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.06 }}>
                  <ToolCard tier="gated" tool={tool} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- IN DEVELOPMENT ---- */}
        <section id="dev" className="relative z-10 py-24">
          <div className="container mx-auto px-[5vw]">
            <motion.div ref={devRef} initial={{ opacity: 0, y: 28 }} animate={devInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-7 border-b border-white/[0.06]">
              <div className={`sec-head ${devInView ? 'in' : ''}`}>
                <span className="font-mono text-[0.7rem] text-gold uppercase tracking-[0.16em]">{t('devTag')}</span>
                <h2 className="font-display font-semibold text-ink mt-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.15 }}>{t('devTitle')}</h2>
              </div>
              <p className="text-muted text-[0.85rem] max-w-[340px] leading-[1.6] md:text-right">{t('devNote')}</p>
            </motion.div>
            <div className="grid grid-cols-1 gap-[1px] bg-white/[0.06] border border-white/[0.06]" style={{ maxWidth: 380 }}>
              {devTools.map((tool, i) => (
                <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} animate={devInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }}>
                  <ToolCard tier="dev" tool={tool} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ============ SIGNALS (reserved) ============ */}
      <section id="signals" className="py-24 bg-bg2">
        <div className="container mx-auto px-[5vw]">
          <motion.div ref={signalsRef} initial={{ opacity: 0, y: 28 }} animate={signalsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-12 pb-7 border-b border-white/[0.06]">
            <div className={`sec-head ${signalsInView ? 'in' : ''}`}>
              <span className="font-mono text-[0.7rem] text-gold uppercase tracking-[0.16em]">{t('signalsTag')}</span>
              <h2 className="font-display font-semibold text-ink mt-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.15 }}>{t('signalsTitle')}</h2>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={signalsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
            className="border border-dashed border-gold/[0.35] bg-gradient-to-b from-gold/[0.04] to-transparent p-14 text-center">
            <p className="font-display italic text-gold text-[1.2rem] mb-3">{t('signalsPanelTitle')}</p>
            <p className="text-muted text-[0.85rem] max-w-[460px] mx-auto leading-[1.6]">{t('signalsPanelDesc')}</p>
            <svg viewBox="0 0 520 64" preserveAspectRatio="none" className="w-full max-w-[520px] mx-auto mt-7" style={{ height: 64 }}>
              <polyline fill="none" stroke="#C9A84C" strokeWidth="1.4" opacity="0.55"
                points="0,44 40,38 80,46 120,30 160,34 200,20 240,26 280,14 320,22 360,10 400,18 440,8 480,16 520,6" />
            </svg>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
