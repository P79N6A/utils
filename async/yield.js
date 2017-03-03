/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description yield
 */

'use strict';

const co = require('co');

co(function*() {
  yield new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log('ok');
      resolve('ok');
    }, 1000);
  });
}).then(function() {
  console.log('finished');
});
