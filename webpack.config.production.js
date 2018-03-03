const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const CLIENT_DIR = path.resolve(__dirname, 'client')

module.exports = Object.assign({}, config, {
  entry: [
    CLIENT_DIR + '/index.jsx'
  ],
  output: {
    path: CLIENT_DIR + '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // checks for any files ending in .js or .jsx
        exclude: [/node_modules/], // doesn't include node modules
        loader: ['babel-loader'], // uses babel as transpiler
      },
      {
        test: /\.(css|sass|scss)$/, // checks for any files ending in .css, .sass, or .scss
        use: ExtractTextPlugin.extract(['style-loader', 'css-loader', 'sass-loader']),
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      inject: 'body',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(false)
    })
  ]
});
