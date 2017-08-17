const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const commonConfig = require('./webpack.common');

module.exports = (app) => {
  const config = webpackMerge(commonConfig, {

    entry: {
      bundle: [
        'webpack-hot-middleware/client',
      ],
    },

    devtool: 'eval',

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  });

  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: false,
      quiet: false,
      publicPath: '/',
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      heartbeat: 2000,
      index: 'index.html',
    })
  );

  // middleware for serving files compiler by "webpackDevMiddleware" in memory
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      return res.end();
    });
  });

};
