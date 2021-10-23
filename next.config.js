const path = require('path');

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
