module.exports = {
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  loadLocaleFrom: (lang, ns) => import(`/src/locales/${lang}/${ns}.json`).then((m) => m.default),
  logBuild: false,
  loader: true,
  pages: {
    '*': ['common', 'validate'],
    '/': ['home'],
    '/login': ['login'],
    '/register': ['register'],
  },
};
