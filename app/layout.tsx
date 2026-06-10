import './globals.css'
import ChatWidget from '@/components/ChatWidget'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
