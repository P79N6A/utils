/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description yield
 */

'use strict';

const co = require('co');

function getGenerator() {
  return function* () {
    console.log('1');
  };
}

co(function*() {
  yield getGenerator()();
}).catch(function(err) {
  console.error(err.stack);
});
