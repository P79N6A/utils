/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description async
 */

'use strict';

const Promise = require('bluebird');
const co = require('co');

// Promise.coroutine.addYieldHandler(co);

// test();
//
// async function test() {
//   let ids = [1, 2, 3];
//   let result = await function* () {
//     yield new Promise(function(resolve) {
//       setTimeout(function() {
//         resolve(ids);
//       }, 1000);
//     });
//   };
//
//   console.log(result);
// }

testArrayIterator();

async function testArrayIterator() {
  for (let item of [1, 2, 3]) {
    await new Promise(function(r) {
      setTimeout(function() {
        console.log(item);
        r();
      }, 1000);
    });
  }
}
