/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description es2017
 */

'use strict';

import co from 'co';

class C {
  constructor() {
    co(function*() {
      console.log('aa');
    });
  }
}

new C;
