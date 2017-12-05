/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description async
 */

'use strict';

const Promise = require('bluebird');
const co = require('co');

Promise.coroutine.addYieldHandler(co);

test();

async function test() {
  let ids = [1, 2, 3];
  let result = await function* () {
    yield new Promise(function(resolve) {
      setTimeout(function() {
        resolve(ids);
      }, 1000);
    });
  };

  console.log(result);
}
