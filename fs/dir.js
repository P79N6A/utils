/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description dir
 */

'use strict';

const fs = require('fs');

fs.readdirSync('/').map(function(file) {

  console.log('->', file);
});
