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
        'ink': '#14110F',
        'surface': '#1F1B17',
        'paper': '#F7F5F2',
        'neutral': '#E7E5E2',
        'muted': '#6B6459',
        'accent': '#FF4433',
        'accent-deep': '#C22415',
        'success': '#1F9D55',
        'success-dark': '#15793F',
        'danger': '#B91C4C',
        'danger-dark': '#8F1439',
      },
      fontFamily: {
        'display': ['var(--font-display)', 'sans-serif'],
        'sans': ['var(--font-sans)', 'sans-serif'],
      },
      borderRadius: {
        'control': '10px',
        'card': '16px',
      },
    },
  },
  plugins: [],
}