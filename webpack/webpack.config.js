/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description webpack.config
 */

'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: process.cwd(),
  entry: './src/test.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        // 'test' is commonly used to match the file extension
        test: /\.jsx$/,

        // 'include' is commonly used to match the directories
        include: [
          path.resolve(__dirname, 'app/src'),
          path.resolve(__dirname, 'app/test')
        ],

        // the 'loader'
        loader: 'babel-loader' // or 'babel' because webpack adds the '-loader' automatically
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger : false
      }
    })
  ],
  devtool: '#hidden-source-map'
};
