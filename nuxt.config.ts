// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      title: process.env.WEDDING_DATE ?? '' + '結婚式招待状',
      htmlAttrs: {
        lang: 'ja'
      },
      meta: [
        { name: 'description', content: process.env.INVITATION_DUE_DATE ? '回答は' + process.env.INVITATION_DUE_DATE + 'までにお願いいたします。' : '' },
        { name: 'robots', content: 'noindex' },
        { name: 'format-detection', content: 'telephone=no,address=no,email=no' }
      ]
    }
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
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
      INFORMATION_NOTE: process.env.INFORMATION_NOTE,
      VERCEL_AUTOMATION_BYPASS_SECRET: process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
      CLOUDINARY_BRIDE: process.env.CLOUDINARY_BRIDE,
      CLOUDINARY_GROOM: process.env.CLOUDINARY_GROOM,
      CLOUDINARY_THANKS: process.env.CLOUDINARY_THANKS,
      CLOUDINARY_COUNTDOWN: process.env.CLOUDINARY_COUNTDOWN,
      CLOUDINARY_PROFILE: process.env.CLOUDINARY_PROFILE,
      CLOUDINARY_TOP: process.env.CLOUDINARY_TOP,
      CLOUDINARY_PHOTOS: process.env.CLOUDINARY_PHOTOS,
      CLOUDINARY_DOT: process.env.CLOUDINARY_DOT,
      scripts: {
        googleMaps: {
          apiKey: process.env.NUXT_PUBLIC_SCRIPTS_GOOGLE_MAPS_API_KEY
        }
      }
    }
  },
  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY_BASEURL
    },
  }
})