/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description xtpl
 */

'use strict';

const path = require('path');
const xtpl = require('xtpl');

let result = renderXTPL('test');

console.log(result);

/**
 * 渲染一个本地的 XTPL 文件
 * @param xtplPath 本地资源路径
 * @param data
 * @returns {Promise}
 */
function renderXTPL(xtplPath, data) {
  return new Promise((resolve, reject) => {
    try {
      xtpl.renderFile(path.join(__dirname, `./${xtplPath}.xtpl`), data || {}, (err, content) => {
        if (err) {
          err.message = 'XTPL 渲染异常：' + err.message;
          reject(err);
        } else {
          resolve(content);
        }
      });
    } catch (err) {
      err.message = 'xtpl 执行异常：' + err.message;
      reject(err);
    }
  });
}
