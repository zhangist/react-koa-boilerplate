// app import
import Koa from 'koa';
import path from 'path';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import compress from 'koa-compress';
import redisStore from 'koa-redis';
import locale from 'koa-locale';
import i18n from 'koa-i18n';

// server.prd import
import serve from 'koa-static';
// import path from 'path';
import views from 'koa-views';
import router from './routes';
import clientRoute from './middlewares/clientRoute';

// app code
const app = new Koa();
// upload dir
process.env.UPLOAD_DIR = path.resolve(__dirname, '../../upload');
// port
const port = process.env.PORT;

app.keys = ['this is a secret'];
app.proxy = true; // ctx.ip

app.use(compress());
app.use(bodyParser());
app.use(json());
app.use(logger());

app.use(views(path.resolve(__dirname, '../../dist/client'), { map: { html: 'ejs' } }));
app.use(serve(path.resolve(__dirname, '../../dist/client'), { index: ' ' })); // index: ' ' for clientRoute

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
app.listen(port);
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
