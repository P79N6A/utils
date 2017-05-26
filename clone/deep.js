/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description deep
 */

'use strict';

module.exports = {
  /**
   * 深度克隆（只处理了常用内置对象）
   * @param origin
   * @returns {*}
   */
  deepClone: function(origin) {
    var target;

    if (typeof origin === 'string' || typeof origin === 'number' || typeof origin === 'boolean' || typeof origin === 'undefined' || origin === null || origin instanceof Function || origin instanceof Date) {
      return origin;
    } else if (origin instanceof Array) {
      target = [];

      for (var i = 0; i < origin.length; ++i) {
        target.push(this.deepClone(origin[i]));
      }

    } else {
      target = {};

      for (var key in origin) {
        if (origin.hasOwnProperty(key)) {
          target[key] = this.deepClone(origin[key]);
        }
      }
    }

    return target;
  }
};
