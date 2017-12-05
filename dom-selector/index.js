/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description dom-selector，仅支持现代浏览器
 */

'use strict';

module.exports = {
  /**
   * 寻找满足选择器的父节点
   * @param element
   * @param selector
   * @returns {*}
   */
  parents: function(element, selector) {
    var currentNode = element;

    while (currentNode && (currentNode = currentNode.parentNode)) {
      if (this.is(currentNode, selector)) {
        return currentNode;
      }
    }
  },
  /**
   * 当前元素是否满足选择器
   * @param element
   * @param selector
   * @param parentNode 开始匹配的节点（可选）
   * @returns {boolean}
   */
  is: function(element, selector, parentNode) {
    return Array.prototype.indexOf.call(
      (parentNode || document).querySelectorAll(selector),
      element
    ) !== -1;
  }
};
