/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description proxy
 */

'use strict';

class A {
  action(a, b) {
    console.log('this:', this, a, b);
  }
}

console.log(A);

A.prototype.action = new Proxy(A.prototype.action, {
  apply: function(target, thisArg, argumentsList) {
    console.log(`Calculate sum: ${argumentsList}`);
    // expected output: "Calculate sum: 1,2"

    return target(argumentsList[0], argumentsList[1]) * 10;
  }
});

(new A).action(1, 2);
