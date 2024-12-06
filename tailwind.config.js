/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #4C0000 0%, #0A0A0A 100%)',
        
        // 'dual-gradient': `
        //   linear-gradient(180deg, #4C0000 0%, #0A0A0A 100%),
        //   linear-gradient(90deg, rgba(0, 0, 0, 0) 73.01%, rgba(15, 15, 15, 0.6) 73.01%)
        // `,
        
      },
      colors: {
        'deep-red': '#4C0000',
        'dark-black': '270606',
         'palyer-color':'#4C0000',
         "line-red":"#520000",
         "red-color":"#FF5656",
         
      },
    },
  },
  plugins: [],
}

