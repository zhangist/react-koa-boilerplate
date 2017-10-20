module.exports = process.env.NODE_ENV === 'production'
  ? require('./configureStore.prd')
  : require('./configureStore.dev');
