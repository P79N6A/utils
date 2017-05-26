/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description extend
 */

'use strict';

function Mod(Constructor, Parent, prototype, statics) {
  // 连接原型
  var Connector = function() {};

  Connector.prototype = Parent.prototype;

  Constructor.prototype = new Connector();

  if (prototype) {
    // 将 prototype 复制到原型中
    merge(Constructor.prototype, prototype);
  }

  if (statics) {
    // 将静态属性复制到构造函数中（不会继承 Parent 的静态属性）
    merge(Constructor, statics);
  }

  // 将构造函数更改为当前构造函数 将 Parent 的引用保留
  Constructor.prototype.constructor = Parent;
  Constructor.prototype.super = Parent;
  Constructor.super = Parent;

  return Constructor;
}

function merge(target, origin) {
  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      target[key] = origin[key];
    }
  }
}

module.exports = Mod;
