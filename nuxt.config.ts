import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  /*
  ** modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  /*
  ** axios module options
  * https://axios.nuxtjs.org/options
  */
  axios: {
  },
  head: {
    title: 'nuxt-full-stack-template',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt full stack template for creating web app easily.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** modules
  */
  plugins: [
    { src: '@/plugins/axios.js', ssr: true },
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** serverside
   */
  serverMiddleware: [
    '~/server'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        if (!config.module) return;
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

export default config;
