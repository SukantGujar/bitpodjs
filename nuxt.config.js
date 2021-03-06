const basePath = process.env.PUBLIC_PATH || ''

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  router: {
    base: basePath || '/',
  },
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
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0,user-scalable=0',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '~/assets/logo.png' },
      {
        rel: 'stylesheet',
        href:
          'https://res.cloudinary.com/mytestlogo/raw/upload/v1573628681/Icons/style.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap',
      },
    ],
    script: [
      {
        src: `${
          process.env.GOOGLE_MAPS_API ||
          'https://maps.googleapis.com/maps/api/js'
        }?key=${
          process.env.GOOGLE_API_KEY ||
          'AIzaSyBKle17JR_zpGEzwARF0H8VFU9NeH9nh7c'
        }&libraries=places`,
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/geopattern/1.2.3/js/geopattern.min.js',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/main.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/v-i18n.js',
    '~/plugins/eventBus.js',
    '~/plugins/bitpod',
    { src: '~/plugins/v-datetime-picker.js', mode: 'client' },
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
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],
  eslint: {
    cache: true,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-i18n',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/device',
    '@nuxtjs/apollo',
    '@bitpod/auth-next',
    [
      'nuxt-gmaps',
      {
        key:
          process.env.GOOGLE_API_KEY ||
          'AIzaSyBKle17JR_zpGEzwARF0H8VFU9NeH9nh7c',
        // you can use libraries: ['places']
      },
    ],
  ],
  /**
   * nuxt-i18n options
   * https://i18n.nuxtjs.org/options-reference
   */
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', label: 'English', file: 'en-US.json' },
      { code: 'hi', iso: 'hi-IN', label: 'हिन्दी', file: 'hi-IN.json' },
      { code: 'fr', iso: 'fr', label: 'Française', file: 'fr.json' },
      { code: 'he', iso: 'he', label: 'עִבְרִית', file: 'he.json', rtl: true },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      fallbackLocale: 'en',
      onlyOnRoot: true,
    },
    /**
     * vue-i18n options
     * https://kazupon.github.io/vue-i18n/api/#constructor-options
     */
    vueI18n: {
      fallbackLocale: 'en',
      dateTimeFormats: {
        en: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          },
        },
        hi: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          },
        },
        fr: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          },
        },
        he: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          },
        },
      },
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
          },
        },
        hi: {
          currency: {
            style: 'currency',
            currency: 'INR',
          },
        },
        fr: {
          currency: {
            style: 'currency',
            currency: 'USD',
          },
        },
        he: {
          currency: {
            style: 'currency',
            currency: 'USD',
          },
        },
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  axios: {
    apiEndpoint: '/svc/api/',
    baseURL: `https://${process.env.PUBLIC_DOMAIN}${basePath}`,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
      //* refer getApiUrl() in /api/index.js for possible changes on changing the following line
      backendBaseUrl: process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io',
      eventUrl: process.env.GET_EVENT_URL || 'event.test.bitpod.io',
    },
    cdnUri:
      'https://res.cloudinary.com/mytestlogo/image/upload/bitpodjs/images/',
    cdnCsvUri: 'https://res.cloudinary.com/mytestlogo/raw/upload/',
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    optionsPath: './vuetify.options.js',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: /@fullcalendar.*/, // transpile ESM modules within all fullcalendar packages
    parallel: true,
    cache: true,
    hardSource: true,
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[chunkhash].js'),
    },
  },
  vue: {
    config: {
      productionTip: true,
      devtools: true,
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `https://${
          process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io'
        }/svc/graphql`,
        browserHttpEndpoint: '/svc/graphql',
      },
    },
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        fetchPolicy: 'no-cache',
      },
    },
  },
  serverMiddleware: [
    '~/api/index.js',
    { path: '/callback', handler: '~/api/callback.js' },
    { path: '/authorize', handler: '~/api/authorize.js' },
  ],
  auth: {
    redirect: {
      login: '/login',
      callback: '/callback',
      home: `${basePath}/apps/event/eventboard`,
      logout: '/',
    },
    strategies: {
      bitpod: {
        scheme: 'oauth2',
        tokenEndPointUrl:
          process.env.BITPOD_TOKEN_ENDPOINT_URL ||
          'https://login.bitpod.io/auth/connect/token',
        userInfoEndPointUrl:
          process.env.BITPOD__USERINFO_ENDPOINT_URL ||
          'https://login.bitpod.io/auth/connect/userinfo',
        authorization:
          process.env.BITPOD_AUTHORIZATION_ENDPOINT_URL ||
          'https://login.bitpod.io/auth/connect/authorize',
        endpoints: {
          authorization: `${basePath}/authorize?provider=bitpod`,
          token: 'api/connect/token?provider=bitpod',
          userInfo: 'api/connect/userinfo?provider=bitpod',
          logout:
            process.env.BITPOD_ENDSESSION_ENDPOINT_URL ||
            'https://login.bitpod.io/auth/connect/endsession',
        },
        logoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
        responseType: 'code',
        grantType: 'authorization_code',
        redirectUri:
          process.env.REDIRECT_URI || 'http://localhost:3000/callback',
        scope: ['notification', 'offline_access', 'openid', 'profile', 'email'],
        clientId:
          process.env.BITPOD_EVENT_CLIENTID || `5F1ED0F95B78182ED39E7DF0`,
        clientSecret:
          process.env.BITPOD_EVENT_CLIENTSECRET ||
          `34389e794e294bc2afb1223b4298b9c9`,
        tokenType: 'Bearer',
        tokenKey: 'access_token',
        refreshTokenKey: 'refresh_token',
      },
      google: {
        scheme: 'oauth2',
        tokenEndPointUrl:
          process.env.GOOGLE_TOKEN_ENDPOINT_URL ||
          'https://oauth2.googleapis.com/token',
        userInfoEndPointUrl:
          process.env.GOOGLE__USERINFO_ENDPOINT_URL ||
          'https://oauth2.googleapis.com/tokeninfo',
        authorization:
          process.env.GOOGLE_AUTHORIZATION_ENDPOINT_URL ||
          'https://accounts.google.com/o/oauth2/v2/auth',
        endpoints: {
          authorization: `${basePath}/authorize?provider=google&prompt=consent`,
          token: 'api/connect/token?provider=google',
          userInfo: 'api/connect/userinfo?provider=google',
        },
        accessType: 'offline',
        prompt: 'consent',
        responseType: 'code',
        grantType: 'authorization_code',
        redirectUri:
          process.env.REDIRECT_URI || 'http://localhost:3000/callback',
        scope: ['openid', 'profile', 'email'],
        clientId:
          process.env.GOOGLE_EVENT_CLIENTID ||
          `49928390950-pmu4l73fu6mpcim2gdnerqf62k6oppqt.apps.googleusercontent.com`,
        clientSecret:
          process.env.GOOGLE_EVENT_CLIENTSECRET || `2lhT6LeqTR1sx5pxyPLZoA0_`,
        tokenType: 'Bearer',
        tokenKey: 'access_token',
        refreshTokenKey: 'refresh_token',
        codeChallengeMethod: '',
      },
    },
    devtools: true,
  },
  generalConfig: {
    googleMapKey:
      process.env.GOOGLE_API_KEY || 'AIzaSyBKle17JR_zpGEzwARF0H8VFU9NeH9nh7c',
    googleMapGeocodeApi:
      process.env.GOOGLE_MAPS_GEOCODE_API ||
      'https://maps.googleapis.com/maps/api/geocode/json',
  },
  setting: {
    domains: {
      defaultPublicDomain:
        process.env.DEFAULT_PUBLIC_DOMAIN || 'event.test.bitpod.io',
    },
  },
  mappingIds: {
    contact: '5f7ac71841a664000a774fc0',
    attendee: '5f7b46475ca471000bfecf9d',
  },
  integrationLinks: {
    BITOPD_VIRTUAL_LINK: 'meet.bitpod.io',
    EVENT_LINK_HINT: `https://${
      process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io'
    }/e/`,
    ZOOM_DOCUMENT_LINK: `https://${
      process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io'
    }/admin/apps/HelpCenter/Integrations/Zoom/views/Zoom`,
    GOOGLE_MEET_DOCUMENT_LINK: `https://${
      process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io'
    }/admin/apps/HelpCenter/Integrations/Gmail/views/Gmail`,
  },
}
