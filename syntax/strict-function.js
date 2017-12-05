/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description strict-function
 */

'use strict';

var arr = [1, 2, 3, 4, 5];
var index = null;

for (index in arr) {
  function myFunc() {};
}

if (a) {
  function b() {

  }
}