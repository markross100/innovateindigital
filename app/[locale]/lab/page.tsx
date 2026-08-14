import { setRequestLocale } from 'next-intl/server'
import Nav    from '@/components/Nav'
import Lab    from '@/components/Lab'
import Footer from '@/components/Footer'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }]
}

export default function LabPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return (
    <>
      <Nav />
      <Lab />
      <Footer />
    </>
  )
}
