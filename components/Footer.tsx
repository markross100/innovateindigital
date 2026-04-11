import Link from 'next/link'

const links = [
  { href: '#community',                                      label: 'Events' },
  { href: '#audience',                                       label: 'Who Attends' },
  { href: '#mark',                                           label: 'About' },
  { href: '#sponsors',                                       label: 'Sponsors' },
  { href: 'https://www.linkedin.com/in/markrossch/',         label: 'LinkedIn', external: true },
  { href: 'mailto:mark.ross@innovateindigital.com',          label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="px-[5vw] py-10 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">

      {/* Logo */}
      <Link href="#" className="flex items-center font-sans font-semibold text-[0.88rem] text-muted no-underline hover:text-ink transition-colors duration-200">
        Innovate
        <span className="inline-flex items-center justify-center w-[18px] h-[18px] bg-yellow rounded-full text-bg text-[0.65rem] font-bold mx-[1.5px]">
          In
        </span>
        Digital
      </Link>

      {/* Links */}
      <ul className="flex flex-wrap gap-8 list-none">
        {links.map(({ href, label, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-muted text-[0.8rem] no-underline hover:text-gold transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Copyright */}
      <p className="text-muted text-[0.75rem]">
        © {new Date().getFullYear()} InnovateInDigital · Zurich, Switzerland
      </p>
    </footer>
  )
}
