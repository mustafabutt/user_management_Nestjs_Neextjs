/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {  display: ["group-hover"],},
    container: {
      center: true,
      // padding: {
      //   default: '1rem',
      //   sm: '2rem',
      //   lg: '1rem',
      //   xl: '2rem',
      // },
      // spacing: {
      //   sm: '8px',
      //   md: '12px',
      //   lg: '16px',
      //   xl: '24px',
      // }
    },
  },
  plugins: [],

}

