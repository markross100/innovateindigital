import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'InnovateInDigital — Private AI & Automation Roundtables · Zurich',
  description:
    'A private roundtable series for senior leaders in RPA, AI, and Agentic Automation — designed for peer learning, meaningful connections, and practical outcomes. Zurich, Switzerland.',
  keywords: [
    'AI roundtable Zurich',
    'agentic AI events Switzerland',
    'RPA automation leaders',
    'senior tech community Switzerland',
    'InnovateInDigital',
  ],
  authors: [{ name: 'Mark Ross', url: 'https://www.linkedin.com/in/markrossch/' }],
  openGraph: {
    title: 'InnovateInDigital — Private AI Roundtables · Zurich',
    description:
      'Exclusive invite-only roundtables for senior AI and automation leaders in Switzerland.',
    url: 'https://innovateindigital.com',
    siteName: 'InnovateInDigital',
    locale: 'en_GB',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${playfair.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
