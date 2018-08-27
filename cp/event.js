/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 */

'use strict';

const cp = require('child_process');

console.time('pull time');

cp.exec('git pull origin feat-tms/0.0.17', {
  cwd: '/Users/smalldragonluo/code/tms/tms-test/mod/lx-test-rax'
}, function(err, stdout, stderr) {
  console.timeEnd('pull time');
  console.log(err, stdout, stderr);
});
