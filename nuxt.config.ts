// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      title: '2026年1月18日結婚式招待状',
      htmlAttrs: {
        lang: 'ja'
      },
      meta: [
        { name: 'description', content: '回答は2025年11月30日までにお願いいたします。' },
        { name: 'robots', content: 'noindex' },
        { name: 'format-detection', content: 'telephone=no,address=no,email=no' }
      ]
    }
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@kgierke/nuxt-basic-auth'
  ],
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  vite: { 
    plugins: [
      tailwindcss()
    ],
  },
  runtimeConfig: {
    public: {
      CORS_PROXY: process.env.CORS_PROXY,
      GOOGLE_FORM_ACTION: process.env.GOOGLE_FORM_ACTION,
      googleMaps: {
        mapId: process.env.GOOGLE_MAPS_MAP_ID,
      },
      scripts: {
        googleMaps: {
          apiKey: process.env.NUXT_PUBLIC_SCRIPTS_GOOGLE_MAPS_API_KEY
        }
      }
    }
  },
  routeRules: {
    '/api/gallery': {
      ssr: false,
    },
    '/api/proxy/**': {
      ssr: false,
    }
  },
  image: {
    domeins: [
      'https://res.cloudinary.com'
    ]
  }
})