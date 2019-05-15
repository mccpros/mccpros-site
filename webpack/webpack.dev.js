'use strict';

let webpack = require('webpack');
let merge = require('webpack-merge');
let common = require('./webpack.config.js');

module.exports = merge(common, {
  devServer: {
    hot: true,
  },
});
