const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [require('path').join(__dirname, 'src/styles')],
  },
  ...nextTranslate(),
};

module.exports = nextConfig;
