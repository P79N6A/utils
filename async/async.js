/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description async
 */

'use strict';

test();

async function test() {
  await new Promise((resolve) => {
    setTimeout(function() {
      resolve('ok');
    }, 1000);
  });
  console.log('before');
}
