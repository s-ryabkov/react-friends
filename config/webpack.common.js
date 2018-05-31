const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      './assets/js/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-bootstrap',
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      styles: path.resolve(__dirname, './assets/styles'),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(svg|png|jpe?g|gif|ico)$/,
        loader: 'file-loader?name=assets/images/[name].[ext],url-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!autoprefixer-loader?browsers=last 2 version!resolve-url-loader!sass-loader?sourceMap',
        }),
      },
      {
        test: /\.woff(2)?((\?v=[0-9]\.[0-9]\.[0-9])|(\?ver=[0-9]\.[0-9]))?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(otf|ttf|eot|svg)((\?v=[0-9]\.[0-9]\.[0-9])|(\?ver=[0-9]\.[0-9]))?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]',
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'style.[hash].css',
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './assets/views/index.html',
    }),
    new webpack.ProgressPlugin(),
  ],
};
