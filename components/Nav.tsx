'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '#community', label: 'Events' },
  { href: '#audience',  label: 'Who Attends' },
  { href: '#mark',      label: 'About Mark' },
  { href: '#sponsors',  label: 'Sponsors' },
  { href: '#apps',      label: 'Applications' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-[5vw] py-[1.1rem]
        border-b border-white/[0.06]
        backdrop-blur-2xl transition-all duration-300
        ${scrolled ? 'bg-bg/[0.92]' : 'bg-bg/50'}
      `}
    >
      {/* Logo */}
      <Link href="#" className="flex items-center font-sans font-semibold text-[1.05rem] text-ink no-underline">
        Innovate
        <span className="inline-flex items-center justify-center w-[22px] h-[22px] bg-yellow rounded-full text-bg text-[0.75rem] font-bold mx-[1.5px]">
          In
        </span>
        Digital
      </Link>

      {/* Links — hidden on mobile */}
      <ul className="hidden md:flex gap-10 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="text-muted text-[0.85rem] tracking-[0.02em] no-underline hover:text-ink transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="mailto:mark.ross@innovateindigital.com"
        className="
          inline-flex items-center gap-2
          px-[1.6rem] py-[0.68rem]
          rounded-[2px] text-[0.8rem] font-semibold
          tracking-[0.1em] uppercase
          bg-gold text-bg border border-gold
          hover:bg-gold-l hover:border-gold-l
          transition-all duration-200 no-underline
        "
      >
        Request Invite
      </a>
    </nav>
  )
}
