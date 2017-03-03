/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description index.js
 */

'use strict';

var a;

console.time('a');

for (var i = 0; i < 100000000; ++i) {
  // 奇数
  a = i & 1 === 1;
}

console.timeEnd('a');

console.time('b');

for (var i = 0; i < 100000000; ++i) {
  // 奇数
  a = i % 2 === 0;
}

console.timeEnd('b');