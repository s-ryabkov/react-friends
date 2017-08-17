import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducers from './reducers/index';

import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import App from './components/App';

import '../styles/common.scss';

const initialState = window.__INITIAL_STATE__;

const store = applyMiddleware(thunk)(createStore)(reducers, initialState);

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app'),
);