/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description zebra
 */

'use strict';

let dailyAssets = '//g-assets.daily.taobao.net/zebra-tb/??tb-banner-1111/0.0.59/index.js,cm-11-page-hash/0.0.107/index.js,ze-cm-title/0.0.95/index.js,tb-seeitem-1111/0.0.20/index.js,tb-subnavigator-1111/0.0.75/index.js,tb-item-1111/0.0.66/index.js,tb-footer-nav-1111/0.1.6/index.js,tb-module-margin/0.0.7/index.js';
let onlineAssets = '//g.alicdn.com/zebra-tb/??tb-banner-1018/0.0.4/index.js,cm-11-page-hash/0.0.114/index.js,ze-cm-title/0.0.96/index.js,chaowan-11-mrtj/0.0.32/index.js,chaowan-liveshow/0.0.30/index.js,chaowan-1018-liveshow/0.0.21/index.js,tb-item-1111/0.0.76/index.js,tb-module-margin/0.0.7/index.js,tb-footer-nav-1111/0.1.6/index.js';
let localModules = ['ze-cm-title'];

let matched = onlineAssets.match(/\/\/(g-assets\.daily\.taobao\.net\/zebra-tb|g\.alicdn\.com\/zebra-tb)\/\?\?(.+)/);
let modules, remainModules;

if (matched && matched[2]) {
  modules = matched[2].split(',');
} else {
  throw {
    msg: '找不到 assets'
  };
}

remainModules = modules.filter(function(item) {
  return localModules.indexOf(item.match(/^([^\/]+)/)[1]) === -1;
});

let ripedAssets = '//' + matched[1] + '/??' + remainModules.join(',');
let localAssets = localModules.map(function(item) {
  return '127.0.0.1' + item;
});

console.log(matched);