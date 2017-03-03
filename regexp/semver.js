/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description semver
 */

'use strict';

let version = '0.0.1';
let v = [0, 0,0];

v = version.split('.').map(function(item) {
  return +item;
});

console.log(v);