const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');
const compress = require('koa-compress');

const app = new Koa();

app.keys = ['this is a secret'];
app.use(session(app));
app.use(compress());
app.use(bodyParser());
app.use(json());
app.use(logger());

export default app;
