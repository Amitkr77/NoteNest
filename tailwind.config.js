/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      ringColor: ['focus'],
      ringWidth: ['focus'],
      colors: {
        'custom-gray': '#686D76',
        'custom-orange': '#DC5F00',
        'custom-dark': '#373A40',
      },
    },
  },
  plugins: [],
}