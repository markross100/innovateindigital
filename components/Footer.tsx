import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  const links = [
    { href: '#community',                                   label: t('events') },
    { href: '#audience',                                    label: t('whoAttends') },
    { href: '#mark',                                        label: t('about') },
    { href: '#sponsors',                                    label: t('sponsors') },
    { href: 'https://www.linkedin.com/in/markrossch/',      label: t('linkedin'), external: true },
    { href: 'mailto:mark.ross@innovateindigital.com', label: t('contact') },
    { href: '/privacy',                                label: t('privacy') },
  ]

  return (
    <footer className="px-[5vw] py-10 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
      <Link href="/" className="flex items-center font-sans font-semibold text-[0.88rem] text-muted no-underline hover:text-ink transition-colors duration-200">
        Innovate
        <span className="inline-flex items-center justify-center w-[18px] h-[18px] bg-yellow rounded-full text-bg text-[0.65rem] font-bold mx-[1.5px]">In</span>
        Digital
      </Link>
      <ul className="flex flex-wrap gap-8 list-none">
        {links.map(({ href, label, external }) => (
          <li key={label}>
            <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-muted text-[0.8rem] no-underline hover:text-gold transition-colors duration-200">
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-muted text-[0.75rem]">
        {t('copy').replace('{year}', String(year))}
      </p>
    </footer>
  )
}
