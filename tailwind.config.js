/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/modules/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      white: '#ffffff',
      error: '#FF3333',
      'gray-1': '#DCDCDC',
    },
  },
  plugins: [],
};
