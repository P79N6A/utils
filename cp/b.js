/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 */

'use strict';

require('child_process').exec('lsof -i4:3008 | grep node', function(err, stdout, stderr) {
  console.log(typeof stderr);
  console.log(err, stdout, stderr);
});


