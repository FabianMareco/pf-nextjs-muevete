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
        'primary-dark': '#001219',
        'primary': '#005F73',
        'primary-light': '#0A9396',
        'secondary': '#94D2BD',
        'secondary-light': '#E9D8A6',
        'accent': '#EE9B00',
        'accent-dark': '#CA6702',
        'danger': '#AE2012',
        'danger-dark': '#9B2226',
        'warning': '#BB3E03',
      },
      fontFamily: {
        'carter': ['CarterOne-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}