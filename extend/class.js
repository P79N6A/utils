/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description extend
 */

'use strict';

class A {
  static m() {
    console.log('A::m()');
    console.log(this === A);
  }
}

class B extends A {

}

console.log(A.m());
