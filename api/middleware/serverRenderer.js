const React = require('react');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { Provider } = require('react-redux');
const Path = require('path');
const Promise = require('bluebird');
const { renderToString } = require('react-dom/server');
const { StaticRouter, matchPath } = require('react-router-dom');
const fs = require('fs');
const _ = require('lodash');
const Reducers = require('./../../assets/js/reducers/index').default;
const { setAuth } = require('./../../assets/js/actions/authentication');
const App = require('../../assets/js/App').default;
const ClientRoutes = require('./../../assets/js/routes').default;
const axios = require('axios');

const INDEX_HTML_CONTENT = fs.readFileSync(Path.resolve(process.cwd(), 'dist', 'index.html'));

function renderFullPage(appHtml, preLoadedState) {
  return INDEX_HTML_CONTENT
    .toString()
    .replace('__HTML__', appHtml)
    .replace('"__INITIAL_STATE__"', JSON.stringify(preLoadedState).replace(/</g, '\\u003c'));
}

function serverRenderer(req, res, next) {
  const context = {};
  const store = createStore(Reducers, applyMiddleware(thunk));

  const routes = ClientRoutes
    .filter(r => matchPath(req.path, r))
    .filter(r => !r.path || r.path !== '*');
  if (routes.length === 0) {
    return next();
  }
  if (req.isAuthenticated) {
    const user = req.principal;
    store.dispatch(setAuth(req.cookies.token, user));
  }

  const requiredActions = _.flattenDeep(routes.map(route => route.component.requiredActions))
    .filter(action => !!action);

  // TODO: is it safe to set global headers?!
  axios.defaults.headers = req.headers;

  return Promise.map(requiredActions, action => {
    return store.dispatch(action());
  })
    .catch(console.warn)
    .then(() => {

      const appHtml = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>,
      );

      if (context.url) {
        res.writeHead(301, { Location: context.url });
        res.end();
      } else {
        const preloadedState = store.getState();
        const content = renderFullPage(appHtml, preloadedState);
        res.send(content);
      }
    });

}

module.exports = serverRenderer;
