import { setRequestLocale } from 'next-intl/server'
import Nav            from '@/components/Nav'
import Hero           from '@/components/Hero'
import Gallery        from '@/components/Gallery'
import PrivateMembers from '@/components/PrivateMembers'
import EventFormat    from '@/components/EventFormat'
import Audience       from '@/components/Audience'
import Testimonials   from '@/components/Testimonials'
import AboutMark      from '@/components/AboutMark'
import MemberCTA      from '@/components/MemberCTA'
import Sponsors       from '@/components/Sponsors'
import Apps           from '@/components/Apps'
import CTA            from '@/components/CTA'
import Footer         from '@/components/Footer'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }]
}

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return (
    <main>
      <Nav />
      <Hero />
      <Gallery />
      <div className="gold-line" />
      <PrivateMembers />
      <EventFormat />
      <Audience />
      <Testimonials />
      <AboutMark />
      <MemberCTA />
      <Sponsors />
      <Apps />
      <CTA />
      <Footer />
    </main>
  )
}
