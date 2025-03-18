/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'athletis-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        'athletis-dark': '#1a1a1a',
        'athletis-light': '#f5f5f5',
        'athletis-accent': '#FFD700', // Or accent
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-oswald)', 'sans-serif'],
        title: ['var(--font-bebas)', 'var(--font-oswald)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/hero-background.jpg')",
      },
      boxShadow: {
        'athletis': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'athletis-lg': '0 10px 25px rgba(0, 0, 0, 0.2)',
      },
      textTransform: {
        'uppercase': 'uppercase',
      },
    },
  },
  plugins: [],
} 