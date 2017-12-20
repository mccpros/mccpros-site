'use strict';

let merge = require('webpack-merge');
let webpack = require('webpack');

let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let common = require('./webpack.config.js');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
});
