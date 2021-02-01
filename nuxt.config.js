export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Cannabis',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '/css/normalize.css'},
      {rel: 'stylesheet', href: '/css/style.css'},
      {rel: 'stylesheet', href: '/css/media.css'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&amp;display=swap'}
    ]
  },

  /* <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/media.css">
  ** Global CSS
  */
  css: [
    '@/assets/style/index.scss'
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */

  plugins: [
    {src: '~/plugins/vuelidate'},
    {src: '~/plugins/localize'},
    {src: '~/plugins/locale'},
    {src: '~/plugins/flUp'},
    {src: '@/plugins/vClickOutside', ssr: false}
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    [
      'nuxt-gmaps',
      {
        // TODO: Удалить свой ключ
        key: 'AIzaSyAoxIrsAxSWlHDiuK1EOczjp4r_S82uVVY'
      }
    ]
  ],
  axios: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  watchQuery: true,
  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/': '~/api'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
