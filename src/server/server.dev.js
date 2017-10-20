// Provide custom regenerator runtime and core-js
require('babel-polyfill');

// Node babel source map support
require('source-map-support').install();

// Javascript require hook
require('babel-register')({
  presets: ['es2015', 'react'],
  plugins: ['add-module-exports'],
});

// Css require hook
const stylus = require('stylus');
require('css-modules-require-hook')({
  extensions: ['.styl'],
  preprocessCss: (data, filename) => (
    stylus(data).set(filename, filename).render()
  ),
  camelCase: true,
  generateScopedName: '[name]__[local]__[hash:base64:8]',
});

// Image require hook
require('asset-require-hook')({
  name: '/[hash].[ext]',
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 8000,
});

const app = require('./app.js');
const convert = require('koa-convert');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');
const views = require('koa-views');
const router = require('./routes');
const clientRoute = require('./middlewares/clientRoute');
const config = require('../../config/webpack.config.dev');

const port = process.env.PORT;
const compiler = webpack(config);

// Webpack hook event to write html file into `/src/client` from `/src/client` due to server render
compiler.plugin('emit', (compilation, callback) => {
  const { assets } = compilation;
  let file;
  let data;

  Object.keys(assets).forEach((key) => {
    if (key.match(/\.html$/)) {
      file = path.resolve(__dirname, key);
      data = assets[key].source();
      fs.writeFileSync(file, data);
    }
  });
  callback();
});

app.use(views(path.resolve(__dirname, '../client'), { map: { html: 'ejs' } }));
app.use(clientRoute);
app.use(router.routes());
app.use(router.allowedMethods());
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
app.use(convert(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
})));
app.use(convert(hotMiddleware(compiler)));
app.listen(port);
