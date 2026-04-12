import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // English = /, German = /de
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
