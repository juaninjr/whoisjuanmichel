import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens that read CSS custom properties per persona
        theme: {
          bg:      'var(--color-bg)',
          fg:      'var(--color-fg)',
          accent:  'var(--color-accent)',
          muted:   'var(--color-muted)',
          border:  'var(--color-border)',
          surface: 'var(--color-surface)',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter:     ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:      ['var(--font-spacemono)', 'Courier New', 'monospace'],
      },
      fontSize: {
        // Section title sizes per variant
        'display-lg': ['clamp(3rem, 5vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 3.5vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-sm': ['1.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      maxWidth: {
        'content': '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
