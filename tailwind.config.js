/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F1E3A',
        ink: '#202034',
        cream: '#F6EFE5',
        ivory: '#FFFBF4',
        linen: '#E9D8C2',
        honey: '#C8923B',
        wood: '#8C5632',
        rose: '#E8B6BB',
        lavender: '#B9A7D7',
        citron: '#F3BB2F',
        berry: '#B73E47',
        mango: '#E8792C',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Avenir Next', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 30, 58, 0.10)',
        lift: '0 18px 55px rgba(140, 86, 50, 0.16)',
      },
    },
  },
  plugins: [],
};
