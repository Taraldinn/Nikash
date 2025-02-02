/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/preline/dist/*.js',


  ],
  theme: {
    fontFamily: {
      'body' : ['"Outfit", sans-serif']
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/background.svg')",
      },
      colors: {
        primary: {"50":"#f0f9ff","100":"#e0f2fe","200":"#bae6fd","300":"#7dd3fc","400":"#38bdf8","500":"#0ea5e9","600":"#0284c7","700":"#0369a1","800":"#075985","900":"#0c4a6e","950":"#082f49"}
      }
  },
},
  plugins: [
        require('flowbite/plugin'),
        require('tailwind-scrollbar-hide'),
        require('@tailwindcss/aspect-ratio'),
        require('preline/plugin'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms'),


  ],
}