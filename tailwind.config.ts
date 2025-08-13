import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          accent: 'var(--brand-accent)',
          muted: 'var(--brand-muted)',
          foreground: 'var(--brand-foreground)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      borderRadius: { '2xl': '1.25rem', 'xxl': '1.5rem' },
      boxShadow: { elev: '0 20px 40px rgba(0,0,0,.08)' },
    },
  },
  plugins: [],
}
export default config