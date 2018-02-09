/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description native
 */

'use strict';

new Promise(function(resolve) {
  resolve(1);
}).then(function(data) {
  return data;
}).catch(function(err) {
  console.error('error:', err.stack);
});
