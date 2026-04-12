import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import '../globals.css'

const locales = ['en', 'de']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const outfit   = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })

export const metadata: Metadata = {
  title: 'InnovateInDigital — Private AI & Automation Roundtables · Zurich',
  description: 'A private roundtable series for senior leaders in RPA, AI, and Agentic Automation. Zurich, Switzerland.',
  robots: { index: true, follow: true },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  setRequestLocale(locale)
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
