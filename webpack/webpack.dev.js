'use strict';

let webpack = require('webpack');
let merge = require('webpack-merge');
let common = require('./webpack.config.js');

module.exports = merge(common, {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
});
