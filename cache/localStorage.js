/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description localStorage
 */

'use strict';

/**
 * localStorage manipulation
 * @param key
 * @param data
 */
module.exports = {
  storage: function(key, data) {
    // set cache
    if (data) {
      if (window.localStorage) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
          return true;
        } catch (e) {
          console.log(e.stack);
          return false;
        }
      } else {
        return false;
      }
    } else {
      // get cache
      if (window.localStorage) {
        var dataStr = localStorage.getItem(key);

        if (dataStr) {
          try {
            return JSON.parse(dataStr);
          } catch (e) {
            console.log(e.stack);
            return {};
          }
        } else {
          return {};
        }
      } else {
        return {};
      }
    }
  }
};
