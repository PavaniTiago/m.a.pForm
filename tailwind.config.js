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
      'lg': '1024px',
      'md': '540px',
      'sm': '390px',
      'xsm': '280px',
    },
  },
  plugins: [],
}

