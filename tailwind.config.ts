import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ec',
          100: '#faeec9',
          200: '#f5d98f',
          300: '#efc254',
          400: '#C9A84C',  // Brand Gold
          500: '#b8922e',
          600: '#9a7523',
          700: '#7b5a1d',
          800: '#60441a',
          900: '#4d3618',
        },
        brand: {
          gold:  '#C9A84C',
          black: '#1A1A1A',
          dark:  '#111111',
          gray:  '#2D2D2D',
        },
      },
      fontFamily: {
        serif:   ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in':      'fadeIn 0.4s ease-out',
        'fade-up':      'fadeUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left':  'slideInLeft 0.3s ease-out',
        'pulse-gold':   'pulseGold 2s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'float':        'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(201, 168, 76, 0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'gold-gradient':   'linear-gradient(135deg, #C9A84C 0%, #f0d080 50%, #C9A84C 100%)',
        'dark-gradient':   'linear-gradient(135deg, #1A1A1A 0%, #2d2d2d 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 25%, rgba(201,168,76,0.1) 50%, transparent 75%)',
      },
      boxShadow: {
        'gold':    '0 4px 24px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 8px 40px rgba(201, 168, 76, 0.4)',
        'dark':    '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card':    '0 2px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
