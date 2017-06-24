import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import compress from 'koa-compress'

const app = new Koa()

app.keys = ['this is a fucking secret']
app.use(session(app))
app.use(compress())
app.use(bodyParser())
app.use(json())
app.use(logger())

export default app
