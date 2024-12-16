/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '1500': '1500ms', // 1.5 seconds
        '2000': '2000ms', // 2 seconds
      },
    },
  },
  plugins: [],
}