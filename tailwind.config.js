/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#242424',
      },
      gridTemplateColumns: {


        // Complex site-specific column configuration
        'sm-notes': 'repeat(1,minmax(50px, 1fr))',
        'md-notes': 'repeat(2,minmax(50px, 1fr))',
        'notes': 'repeat(3,minmax(50px, 1fr))',
      }
    },
  },
  plugins: [],
}