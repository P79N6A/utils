/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description request
 */

'use strict';

const co = require('co');
const coRequest = require('co-request');

let modulename = 'lx-test1';

co(function* () {
  let tplStr = yield *getTemplate('0.0.2');

  console.log(tplStr);
});

// 获取模板
function* getTemplate(moduleversion, tpl) {
  let cdnCssStr = (yield coRequest(`https://g.alicdn.com/tb-mod/${modulename}/${moduleversion}/index.css`)).body;
  let cdnJsStr = (yield coRequest(`https://g.alicdn.com/tb-mod/${modulename}/${moduleversion}/index.js`)).body;
  // 构建 头部插入css和js
  let style = `<style>${cdnCssStr}</style>\r\n`;
  let js = `<script>${cdnJsStr}</script>\r\n`;

  return (style + js);
}