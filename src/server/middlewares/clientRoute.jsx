import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from '../../client/routes';
import configureStore from '../../../src/client/store/configureStore';

async function clientRoute(ctx, next) {
  // appData
  const locale = ctx.i18n.locale || ctx.i18n.defaultLocale;
  const appData = {
    title: 'React Koa Boilerplate',
    locale,
    translate: ctx.i18n.locales[locale],
  };
  // session & userInfo
  // ctx.session.user = { userInfo: { "The object will send to client." } };
  const userInfo = (ctx.session.user && ctx.session.user.userInfo)
    ? ctx.session.user.userInfo
    : { isLogin: false };

  // userAgent for react isomorphic
  global.navigator = {
    userAgent: ctx.headers['user-agent'],
  };

  // !!!important!!!
  // "src/client/routes/common/translate.js" used.
  global.window = global.window || {};
  global.window.REDUX_STATE = { appData, userInfo };

  // match routes
  const store = configureStore({ appData, userInfo });
  const branch = matchRoutes(routes, ctx.url);
  let isMatched = false;
  for (let i = 0; i < branch.length; i += 1) {
    if (branch[i].match.isExact) {
      isMatched = true;
    }
  }

  // match routes result
  if (isMatched) {
    const context = {};
    const provider = (
      <Provider store={store}>
        <StaticRouter location={ctx.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    const html = renderToString(provider);

    // redirect if context.url not null
    if (context.url) {
      ctx.redirect(context.url);
    }

    await ctx.render('index', {
      root: html,
      state: { appData, userInfo },
    });
  } else {
    await next();
  }
}

export default clientRoute;
