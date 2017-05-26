/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description index.js
 */

'use strict';

const webpack = require('webpack');
const config = require('./webpack.config');

webpack(config, (err, stats) => {
  console.log(err, stats);
});
