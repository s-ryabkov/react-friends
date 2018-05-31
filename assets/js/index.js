import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import cookie from 'react-cookies';

import reducers from './reducers/index';
import App from './App';
import { setAuth } from './actions/authentication';

import '../styles/common.scss';
import 'bootstrap/dist/css/bootstrap.css';
import './../images/favicon.ico';
import ErrorBoundary from './components/Utils/ErrorBoundary';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, middleware),
);

const authToken = cookie.load('token');
if (authToken) {
  store.dispatch(setAuth(authToken, { email: cookie.load('email') }));
}

hydrate(
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>,
  document.querySelector('#app'),
);
