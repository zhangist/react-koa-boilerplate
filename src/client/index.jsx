import 'core-js/es6/map'; // react 16.x for < ie11
import 'core-js/es6/set'; // react 16.x for < ie11

import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore(window.REDUX_STATE); // eslint-disable-line no-undef
const history = createHistory();

hydrate(
  <Provider store={store}>
    <Router history={history}>
      {renderRoutes(routes)}
    </Router>
  </Provider>,
  document.getElementById('root'), // eslint-disable-line no-undef
);
