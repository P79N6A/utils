/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Set
 */

'use strict';

testArrayIterator();

async function testArrayIterator() {
  for (let item of new Set([1, 2, 3, 4, 4, 5, 5, 5])) {
    await new Promise(function(r) {
      setTimeout(function() {
        console.log(item);
        r();
      }, 1000);
    });
  }
}
