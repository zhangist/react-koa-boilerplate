import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from '../../client/routes';
import configureStore from '../../../src/client/store/configureStore';

const store = configureStore();

async function clientRoute(ctx, next) {
  const branch = matchRoutes(routes, ctx.url);
  let isMatched = false;
  for (let i = 0; i < branch.length; i += 1) {
    if (branch[i].match.isExact) {
      isMatched = true;
    }
  }

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

    await ctx.render('index', {
      root: html,
      state: store.getState(),
    });
  } else {
    await next();
  }
}

export default clientRoute;
