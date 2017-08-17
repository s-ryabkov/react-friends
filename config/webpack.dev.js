const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const commonConfig = require("./webpack.common");

module.exports = function(app) {
  const config = webpackMerge(commonConfig, {

    entry: {
      bundle: [
        'webpack-hot-middleware/client'
      ],
    },

    devtool: "eval",

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  });

  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: false,
      quiet: false,
      publicPath: "/"
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      heartbeat: 2000,
      index: "index.html"
    })
  );
};
