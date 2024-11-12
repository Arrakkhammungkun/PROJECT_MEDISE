/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        prompt: ["Prompt","sans-serif"],
      },
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ["light"],
  }
}

