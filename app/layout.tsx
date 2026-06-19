import './globals.css'
import ChatWidget from '@/components/ChatWidget'
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
