/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description index
 */

'use strict';

const glob = require('glob');

let files = glob.sync('**/*.json', {
  cwd: '/Users/smalldragonluo/code/tms/qbb-new/mod',
  dot: true
});

console.log(files);
