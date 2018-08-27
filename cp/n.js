/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description n
 */

'use strict';

var childProcess = require('child_process');

var cp = childProcess.spawn('n', ['8.9.3'], {});

cp.on('exit', function(data) {
  console.log(data);
});

cp.on('close', function(data) {
  console.log(data);
});
