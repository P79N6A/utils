/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description class
 */

'use strict';

class CustomError {
  constructor(err) {
    function proxy() {}

    proxy.prototype = err;

    return new proxy;
  }
}

let customErr = new CustomError({k: 'v'});

console.log(customErr.k);
