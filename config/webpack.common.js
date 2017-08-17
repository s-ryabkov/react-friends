const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    bundle: [
      "babel-polyfill",
      "./assets/js/index.js"
    ],
    vendor: [
      "react",
      "react-dom",
      "react-router",
      "react-bootstrap",
      "redux",
      "react-redux",
      "redux-thunk"
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(svg|png|jpe?g|gif|ico)$/,
        loader: "file-loader?name=assets/images/[name].[hash].[ext]"
      },
      {
        test: /\.?scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!autoprefixer-loader?browsers=last 2 version!resolve-url-loader!sass-loader?sourceMap"
        })
      },
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: "style.[hash].css",
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./assets/views/index.html"
    }),
    new webpack.ProgressPlugin()
  ]
};
