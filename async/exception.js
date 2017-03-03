/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description exception
 */

'use strict';

var co = require('co');

co(function* () {
  try {
    yield new Promise(function(resolve, reject) {
      reject({stack: 'stacksssss'});
    });
  } catch (e) {
    console.error('i', e.stack);
    throw e;
  }
}).catch(function(e) {
  console.error('o', e.stack);
});

console.log('over');
