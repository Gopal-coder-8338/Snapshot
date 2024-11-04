/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage : {
        'costum-image' : "url('../public/Dark.jpg')"
      }
    },
  },
  plugins: [],
}