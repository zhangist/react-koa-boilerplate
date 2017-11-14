module.exports = process.env.NODE_ENV === 'production'
  ? require('./Main')
  : require('./Main.dev');
