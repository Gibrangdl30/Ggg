module.exports = function (env) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return require('./config/webpack.dev')();
  } else if (process.env.NODE_ENV == 'devserver') {
    return require('./config/webpack.server')();
  } else if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'release') {
    return require('./config/webpack.release')();
  }
};