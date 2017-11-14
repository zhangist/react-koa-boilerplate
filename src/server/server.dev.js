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
  extensions: ['jpg', 'png', 'gif', 'webp', 'ico'],
  limit: 8000,
});

const Koa = require('koa');
const path = require('path');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');
const compress = require('koa-compress');
const redisStore = require('koa-redis');
const locale = require('koa-locale');
const i18n = require('koa-i18n');

const app = new Koa();
// upload dir
process.env.UPLOAD_DIR = path.resolve(__dirname, '../../upload');

app.keys = ['this is a secret'];
app.proxy = true; // ctx.ip

app.use(compress());
app.use(bodyParser());
app.use(json());
app.use(logger());

const convert = require('koa-convert');
const webpack = require('webpack');
const fs = require('fs');
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');
const views = require('koa-views');
const serve = require('koa-static');
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
app.use(serve(path.resolve(__dirname, '../client'), { index: ' ' })); // index: ' ' for clientRoute

// i18n
locale(app);
app.use(i18n(app, {
  directory: path.join(__dirname, '/i18n'),
  extension: '.json',
  locales: ['zh-cn', 'en'], // `zh-CN` defualtLocale
  modes: [
    'cookie', // optional detect cookie - `Cookie: locale=zh-CN`
    'header', // optional detect header - `Accept-Language: zh-CN,zh;q=0.5`
  ],
}));
// session
app.use(session({
  store: redisStore({
    host: '127.0.0.1',
    port: '6379',
  }),
  key: 'SBSESSID', // session cookie name
  maxAge: 86400000, // 1 days
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
}, app));
// state
app.use(async (ctx, next) => {
  ctx.state.staticHost = process.env.STATIC_HOST;
  // set locale from session: ctx.session.locale
  // ctx.i18n.setLocaleFromSessionVar(ctx);
  ctx.i18n.setLocale(ctx.cookies.get('lang'));
  await next();
});

app.use(clientRoute);
app.use(router.routes());
app.use(router.allowedMethods());

// Put to the end
app.use(convert(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
})));
app.use(convert(hotMiddleware(compiler)));

app.listen(port);
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
