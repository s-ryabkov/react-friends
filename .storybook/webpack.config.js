// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.[hash].css',
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(svg|png|jpe?g|gif|ico)$/,
        loader: 'file-loader?name=assets/images/[name].[hash].[ext]',
      },
      {
        test: /\.?scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!autoprefixer-loader?browsers=last 2 version!resolve-url-loader!sass-loader?sourceMap',
        }),
      },
      {
        test: /\.?css$/,
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
};
