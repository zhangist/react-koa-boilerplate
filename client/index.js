import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import createHistory from 'history/createBrowserHistory'
import configureStore from './common/store/configureStore'
import routes from './routes'

const store = configureStore(window.REDUX_STATE)
const history = createHistory()

render(
  <Provider store={store}>
    <Router history={history}>
      {renderRoutes(routes)}
    </Router>
  </Provider>,
  document.getElementById('root')
)
