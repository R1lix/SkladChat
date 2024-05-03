export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Склад здоровья',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/normalize.css',
    '@assets/styleBody.css',
    '@assets/styleHeaderCatalog.css',
    '@assets/styleFooter.css',
    '@assets/styleSpecials.css',
    '@assets/styleSpecialTarget.css',
    '@assets/mainPage.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    "@nuxtjs/svg",
  ],

  proxy: {
    '/api/': {
      target: 'https://sklad-zdorovo.ru',
      pathRewrite: { '^/api': '/api/' },
      changeOrigin: true,
    },
    '/sklad/api/':{
      target: 'https://dev.andalex.biz',
      pathRewrite: {'^/sklad/api/': '/sklad/api/support'},
      changeOrigin: true,
    }
  },

  layout: 'default',

  server: {
    host: '0.0.0.0',
    port: 3000,
    changeOrigin: true
  },

  env: {
    baseUrl: process.env.API_SERVICE_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  io: {
    // настройки Socket.IO
    sockets: [
      {
        name: 'main',
        url: 'http://localhost:3000', // URL вашего сервера Socket.IO
      },
    ],
  },
}
