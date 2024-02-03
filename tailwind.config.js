/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/modules/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: '#00abc5',
      white: '#ffffff',
      error: '#FF3333',
      black: '#333333',
      'gray-1': '#DCDCDC',
    },
  },
  plugins: [],
};
