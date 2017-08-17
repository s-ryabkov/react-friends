const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const commonConfig = require("./webpack.common");

module.exports = webpackMerge(commonConfig, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/",
    filename: "[name].[hash].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "\"production\""
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});
