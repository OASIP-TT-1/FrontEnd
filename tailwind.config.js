module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // screens: {
    //   'tablet': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'laptop': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'desktop': '1280px',
    //   // => @media (min-width: 1280px) { ... }
    // },
    extend: {
      colors: {
        'light-green': '#D9F4A4',
        'soft-brown': '#50403f',
        'dark-purple': '#895A82',
        'light-purple': '#CFABDB',
        'pink-1': '#E9979B',
        'pink-2': '#F9E8E9',
        'red-wine': '#8D1530',
        'home_blue': '#9FC8FE'
      },
    },
  },
  plugins: [],
}
