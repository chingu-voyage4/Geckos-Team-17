const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CLIENT_DIR = path.resolve(__dirname, 'client');
module.exports = {
  entry: [
    'react-hot-loader/patch',
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    contentBase: './client/public',
    hot: true,
    stats: "errors-only",
    proxy: {
      "/api": "http://localhost:5000"
    }
  },
  devtool: 'cheap-module-eval-source-map'
};
