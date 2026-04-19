/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pblue:       '#1A5276',
        plovender:   '#7D6B9E',
        pterracotta: '#C9704A',
        pcream:      '#F5EDD6',
        polive:      '#5D6E3B',
        pgold:       '#D4A843',
        pnavy:       '#0D2137',
        psand:       '#E8D5B0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-provence': 'linear-gradient(135deg, #1A5276 0%, #7D6B9E 100%)',
      },
    },
  },
  plugins: [],
}
