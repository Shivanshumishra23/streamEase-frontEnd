/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'streamEase-gradient': 'linear-gradient(to right, #6DD5F5, #6561F0)',
      },
    },
  },
  plugins: [],
}

