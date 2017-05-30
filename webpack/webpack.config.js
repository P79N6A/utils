/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description webpack.config
 */

'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: process.cwd(),
  entry: {
    vendor: 'utils',
    index: './src/index.js'
  },
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
        drop_debugger: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      // (the commons chunk name)

      filename: 'commons.js',
      // (the filename of the commons chunk)

      // minChunks: 3,
      // (Modules must be shared between 3 entries)

      // chunks: ['pageA', 'pageB'],
      // (Only use these entries)
    })
  ],
  devtool: '#source-map'
};
