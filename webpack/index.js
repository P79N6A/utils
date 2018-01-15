/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description index.js
 */

'use strict';

const webpack = require('webpack');
const config = require('./webpack.config');

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack);
  } else if (stats.hasErrors()) {
    console.error(stats.compilation.errors[0].stack);
  } else {
    console.log('done');
  }
});
