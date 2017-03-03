/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description a
 */

'use strict';

var fs = require('fs');
var childProcess = require('child_process');

var cp = childProcess.exec('ls', {
  cwd: '/asd'
}, function(a, b, c) {
  console.log(a, b, c);
});
