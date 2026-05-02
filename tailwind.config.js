/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#14121a',
          card: '#1c1824',
          elevated: '#242030',
        },
        accent: {
          DEFAULT: '#c9a7d8',
          muted: '#9d7fb0',
          deep: '#6b4d7a',
        },
        rose: {
          soft: '#e8b4c8',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
