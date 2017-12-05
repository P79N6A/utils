/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description webpack.config
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    //vendor: ['isarray'],
    index: './src/index.js'
  },
  output: {
    path: './build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      // Extract css files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      // Optionally extract less files
      // or any other compile-to-css language
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      }
    ]
  },
  //resolveLoader: {
  //  'less-loader': require.resolve('less-loader'),
  //  'css-loader': require.resolve('css-loader'),
  //  'style-loader': require.resolve('style-loader')
  //},
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false,
    //    drop_debugger: false
    //  }
    //}),
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'commons',
    //  // (the commons chunk name)
    //
    //  filename: 'commons.js',
    //  // (the filename of the commons chunk)
    //
    //   minChunks: 2,
    //  // (Modules must be shared between ? entries)
    //
    //  // chunks: ['pageA', 'pageB'],
    //  // (Only use these entries)
    //})
    new ExtractTextPlugin('[name].css')
  ],
  devtool: '#source-map'
};
