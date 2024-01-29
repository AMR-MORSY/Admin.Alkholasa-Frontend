/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
        "./node_modules/flowbite/**/*.{js,ts}",
    ],
    theme: {
        extend: {
          typography:{
          DEFAULT:{
              css: {
                li:{
                  p:{
                    margin:0,
                   
                  }
                }
              },

            }
              
          },
         
        }
    },
    plugins: [require("@tailwindcss/typography"), require('flowbite/plugin')],
   
};
