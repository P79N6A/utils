/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description async-listener
 */

'use strict';

require('async-listener');

let current = 1;

process.addAsyncListener({
  create: function() {
    console.log('create');
  },
  before: function(context, storage) {
    console.log('before', storage);
  },
  after: function(context, storage) {
    console.log('after', storage);
  }
});

console.log('a');
