module.exports = process.env.NODE_ENV === 'production'
  ? require('./Root')
  : require('./Root.dev');
