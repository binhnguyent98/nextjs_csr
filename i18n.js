module.exports = {
  locales: ['en', 'ja'],
  defaultLocale: 'ja',
  loadLocaleFrom: (lang, ns) => import(`/src/locales/${lang}/${ns}.json`).then((m) => m.default),
  logBuild: false,
  // localeDetection: false,
  loader: true,
  pages: {
    '*': ['common', 'validate'],
    '/': ['home'],
    '/login': ['login'],
    '/register': ['register'],
    '/verify-account': ['verifyAccount'],
  },
};
