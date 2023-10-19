/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' /* src folder, for example */],
  theme: {
    extend: {
      colors: {
        primary: '#bc141b'
      }
    }
  },
  plugins: [require('flowbite/plugin')],
};