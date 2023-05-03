/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'inter': ['Inter', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'roboto-slab': ['Roboto-slab', 'sans- serif'],
    },
    extend: {},
    screens:{
      '3xl': '1920px',
    },
  },
  plugins: [],
}

