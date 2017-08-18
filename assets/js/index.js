import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducers from './reducers/index';

import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import cookie from 'react-cookies';

import App from './components/App';
import { setAuth } from './actions/authentication';

import '../styles/common.scss';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

const initialState = window.__INITIAL_STATE__;

const store = applyMiddleware(thunk)(createStore)(reducers, initialState);
const authToken = cookie.load('token');
if (authToken) {
  store.dispatch(setAuth(authToken, { email: cookie.load('email') }));
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app'),
);
