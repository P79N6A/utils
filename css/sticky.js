/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description sticky
 */

'use strict';

/**
 * 判断是否支持sticky属性
 * @returns {boolean}
 */
module.exports = function isStickySupported() {
  var style = ['', '-webkit-', '-ms-', '-moz-', '-o-'].map(function(prefix) {
    return 'position: ' + prefix + 'sticky';
  }).join(';');
  var element = document.createElement('div');

  element.style.cssText = style;
  document.body.appendChild(element);

  var isSupported = /sticky/i.test(getComputedStyle(element).position);

  document.body.removeChild(element);

  return isSupported;
};
