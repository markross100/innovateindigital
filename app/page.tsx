import { setRequestLocale } from 'next-intl/server'
import Nav       from '@/components/Nav'
import Hero      from '@/components/Hero'
import Gallery   from '@/components/Gallery'
import Community from '@/components/Community'
import Different from '@/components/Different'
import Audience  from '@/components/Audience'
import AboutMark from '@/components/AboutMark'
import Sponsors  from '@/components/Sponsors'
import Apps      from '@/components/Apps'
import CTA       from '@/components/CTA'
import Footer    from '@/components/Footer'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }]
}

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return (
    <main>
      <Nav /><Hero /><Gallery />
      <div className="gold-line" />
      <Community /><Different /><Audience />
      <AboutMark /><Sponsors /><Apps /><CTA /><Footer />
    </main>
  )
}
