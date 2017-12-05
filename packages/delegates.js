/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description delegates
 */

'use strict';

const delegates = require('delegates');

class A {
  constructor() {
    this.p = {
      pm() {
        console.log('pm');
      }
    };
  }

  m() {
    console.log('A::m()');
  }
}

const a = new A();

delegates(a, 'p').method('pm');

a.pm();
