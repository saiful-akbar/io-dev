const path = require('path');

// Aktifkan pwa jika sudah production
// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');

// module.exports = withPWA({
//   reactStrictMode: true,
//   pwa: {
//     dest: 'public',
//     runtimeCaching,
//   },
//   env: {
//     APP_NAME: 'IO Dev',
//     APP_VERSION: '2.0.0',
//   },
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'src/styles')],
//   },
// });

// aktifkan dalam mode develop
module.exports = {
  reactStrictMode: true,
  env: {
    APP_NAME: 'IO Dev',
    APP_VERSION: '2.0.0',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
};
