const React = require('react');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const path = require('path');
const { renderToString } = require('react-dom/server');
const { StaticRouter, matchPath } = require('react-router-dom');
const { promisify } = require('util');
const fs = require('fs');
const reducers = require('./../../assets/js/reducers/index').default;
const App = require('./../../assets/js/components/App').default;

function renderFullPage(indexHtml, appHtml, preLoadedState) {
  return indexHtml
    .replace('__HTML__', appHtml)
    .replace('__PRELOADED_STATE__', JSON.stringify(preLoadedState).replace(/</g, '\\u003c'));
}

function serverRenderer(req, res, next) {
  const context = {};
  const store = createStore(reducers);
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

    promisify(fs.readFile)(path.resolve(process.cwd(), 'dist', 'index.html'))
      .then((indexHtml) => {
        res.send(renderFullPage(indexHtml.toString(), appHtml, preloadedState));
      });
  }

}

module.exports = serverRenderer;
