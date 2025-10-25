/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004030',
          dark: '#002820',
          light: '#005040',
        },
        secondary: {
          DEFAULT: '#4A9782',
          dark: '#3A7762',
          light: '#5AB792',
        },
        accent: {
          DEFAULT: '#DCD0A8',
          dark: '#CCC098',
          light: '#ECE0B8',
        },
      },
    },
  },
  plugins: [],
}
