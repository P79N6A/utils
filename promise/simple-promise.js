/**
 * 阉割版 Promise
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description 接受一个函数，返回一个 promise 实例
 */

'use strict';

function Promise(func) {
  if(!this instanceof Promise){
    throw new Error('请使用 new 创建 Promise 实例');
  }

  this.queue = [];

  var self = this;

  func.apply(null, function(data) {
    // resolved
    if (data instanceof Promise) {
      data.then();
    }
    for(var i = 0; i < self.queue.length; ++i) {

    }
  }, function(reason) {
    // reject

  });
}

Promise.ptototype = {
  then: function(success, fail) {
    this.queue.push({
      success: success,
      fail: fail
    });
  },
  _handle: function() {

  }
};

Promise.all = function(promiseList) {

};

module.exports = Promise;
