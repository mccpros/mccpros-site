'use strict';

let webpack = require('webpack');
let path    = require('path');

let BUILD_DIR = path.resolve(__dirname, '../client/public/build/');
let APP_DIR   = path.resolve(__dirname, '../client/src/');

let config = {
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
      'babel-polyfill',
      APP_DIR
    ],
  },
  output: {
    path: BUILD_DIR,
    publicPath:'http://localhost:3000/build/',
    filename: 'bundle.js'
  },
  module : {
   loaders : [
     {
       test : /\.jsx?/,
       include : APP_DIR,
       loader : 'babel-loader',
     },
     {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
     }
   ]
  },
  devServer: {
    hot: true
  }
};

module.exports = config;
