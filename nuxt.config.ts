// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import path from 'path';
import { resolve } from 'path'
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-mdi',
    '@vee-validate/nuxt',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }],

    'nuxt-primevue',


  ],
  build: {
    transpile: ["primevue"],
  },
  primevue: {
    usePrimeVue:true,
    
   
    options: {
     

      unstyled: true,

    },
    importPT: { as: 'Lara',from:'~/presets/lara/' },
  



  },


  imports: {
    autoImport: true,
    dirs: ['stores']
  },
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  postcss: {
    plugins: {

      tailwindcss: {},
      autoprefixer: {},
    }
  },

 
})
