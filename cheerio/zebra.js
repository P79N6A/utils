/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description zebra
 */

'use strict';

const cheerio = require('cheerio');

let $ = cheerio.load(
  '<!DOCTYPE HTML>\
  <html>\
  <head>\
  <meta charset="utf-8">\
  </head>\
  <body>\
  <script charset="utf-8" src="/common/admin-lte/plugins/jQuery/jQuery-2.1.4.min.js"></script>\
  <script charset="utf-8" src="/common/js/debug-setting.js"></script>\
  </body>\
  </html>'
);

let matched;

$('script').each(function(index, item) {
  let aaa = $(item).attr('src');

  if (matched = $(item).attr('src').match(/\/\/(g-assets\.daily\.taobao\.net\/zebra-tb|g\.alicdn\.com\/zebra-tb)\/\?\?(.+)/)) {
    let modules, remainModules;

    if (matched && matched[2]) {
      modules = matched[2].split(',');
    } else {
      throw {
        msg: '找不到 assets'
      };
    }

    remainModules = modules.filter(function(item) {
      return debugModules.indexOf(item.match(/^([^\/]+)/)[1]) === -1;
    });

    if (remainModules.length) {
      // 替换 assets 地址
      item.src = '//' + matched[1] + '/??' + remainModules.join(',');
    } else {
      item.remove();
    }

    debugModules.forEach(function(item) {
      _injectScript.push(`<script src="http://${intranetIP}:${def.light.REFLECT_PORT}/mod/${item}/??index.js"></script>`);
    });
  }
});