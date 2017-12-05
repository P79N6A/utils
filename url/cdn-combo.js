/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description cdn-combo
 */

'use strict';

const url = '//g.alicdn.com/tb-mod/??pm-image/0.0.24/index.css,pm-single-subscribe/0.0.5/index.css,cm-title-pc/0.0.10/index.css';

console.log(getComboURL(url));

function getComboURL(url) {
  const itemsMatched = url.match(/^((?:https?:)?\/\/g.alicdn.com\/(?:[^\/]+)\/)(?:\?\?)?(.+)$/);

  if (itemsMatched) {
    return {
      prefix: itemsMatched[1],
      items: itemsMatched[2].split(',')
    };
  } else {
    throw new Error('不合法的 combo URL');
  }
}
