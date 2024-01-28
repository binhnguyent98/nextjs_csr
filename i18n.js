module.exports = {
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  loadLocaleFrom: (lang, ns) => import(`/src/locales/${lang}/${ns}.json`).then((m) => m.default),
  logBuild: true,
  loader: true,
  pages: {
    '*': ['common', 'validate'],
    '/login': ['login'],
  },
};
