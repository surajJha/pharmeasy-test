'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
process.traceDeprecation = true;

const outputPath = path.resolve(__dirname, '..', 'www');
const contextPath = path.resolve(__dirname, '..', 'src', 'client');

module.exports = {
  context: contextPath,
  entry: ['./app.js'],
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015", "react", "stage-0"]
        }
      }, {
        test: /\.(scss|sass)$/,
        loader: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
        ]
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      favicon: '../server/template/favicon.ico',
      template: '../server/template/index.html'
    })
  ]
};
