import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#08080F',
        bg2:      '#0F0F18',
        bg3:      '#141420',
        gold:     '#C9A84C',
        'gold-l': '#DDB96A',
        yellow:   '#E8F000',
        ink:      '#EDE9E0',
        muted:    '#7A7A90',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseYellow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(1.4)' },
        },
        scrollLine: {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'top', opacity: '1' },
          '50%':  { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%':  { transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom', opacity: '0.2' },
        },
      },
      animation: {
        fadeUp:      'fadeUp 0.8s ease forwards',
        pulseYellow: 'pulseYellow 2.5s ease infinite',
        scrollLine:  'scrollLine 2s ease infinite',
      },
    },
  },
  plugins: [],
}

export default config
