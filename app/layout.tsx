import type { Metadata } from 'next'
import { Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'

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
  twitter: {
    card: 'summary_large_image',
    title: 'InnovateInDigital — Private AI Roundtables · Zurich',
    description: 'Exclusive roundtables for senior AI and automation leaders in Switzerland.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
