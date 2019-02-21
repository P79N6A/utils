/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description dom-selector，仅支持现代浏览器
 */

'use strict';

/**
 * 寻找满足选择器的父节点
 * @param element
 * @param selector
 * @returns {*}
 */
export function findParent(element, selector) {
  let currentNode = element;

  while (currentNode && (currentNode = currentNode.parentNode)) {
    if (matchSelector(currentNode, selector)) {
      return currentNode;
    }
  }
}

/**
 * 当前元素是否满足选择器
 * @param element
 * @param selector
 * @param parentNode 开始匹配的节点（可选）
 * @returns {boolean}
 */
export function matchSelector(element, selector, parentNode) {
  return Array.prototype.indexOf.call(
    (parentNode || document).querySelectorAll(selector),
    element
  ) !== -1;
}

/**
 * 添加 className
 * @param element
 * @param className
 */
export function addClass(element, className) {
  const classNames = element.className.split(' ').filter(function(classStr) {
    return classStr !== className;
  });

  classNames.push(className);
  element.className = classNames.join(' ');
}

/**
 * 移除 className
 * @param element
 * @param className
 */
export function removeClass(element, className) {
  element.className = element.className.split(' ').filter(function(classStr) {
    return classStr !== className;
  }).join(' ');
}
