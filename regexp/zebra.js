/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description zebra
 */

'use strict';

const fs = require('fs');
const path = require('path');

let jsStr = fs.readFileSync(path.join(__dirname, '../', 'bundle3.js'), 'utf-8');
let debugModules = ['cm-11-page-hash'];
let targetSource = jsStr.split(/\/\*module (?:start|end)\*\//)[1];
let matched;
let lastIndex = -1;
let modDefRegexp = /define\("/g;
let splitMods = [];

while(matched = modDefRegexp.exec(targetSource)) {
  if (lastIndex !== -1) {
    splitMods.push(targetSource.substring(lastIndex, matched.index));
  }

  lastIndex = matched.index;
}

if (lastIndex !== -1) {
  splitMods.push(targetSource.substring(lastIndex, targetSource.length));
}

splitMods.map(function(item, index) {
  let modName = item.match(/^define\(("|')([^"\/]+).*\1/);

  if (modName && debugModules.indexOf(modName = modName[2]) !== -1) {
    return 'eval("' + 'local' + '")';
  } else {
    return item;
  }
});

// todo add ;

console.log(targetSource);

//jsStr.replace(/PAGE_ASSETS\s*=\s*\[([^\]]+)]/, function(matched, $1) {
//  let assetsRegexp = /"([^"]+)"/g;
//  // 原始资源列表
//  let originAssets = [];
//  // 斑马模块列表
//  let zebraModules;
//  let tmp;
//
//  while(tmp = assetsRegexp.exec($1)) {
//    originAssets.push(tmp[1]);
//
//    if (tmp[1].indexOf('zebra-tb') !== -1) {
//      let moduleMatched = tmp[1].match(/(\/\/(g-assets\.daily\.taobao\.net\/zebra-tb|g\.alicdn\.com\/zebra-tb)\/\?\?)(.+)/);
//
//      zebraModules = moduleMatched[3].split(',').filter(function(item) {
//        return debugModules.indexOf(item.match(/^([^\/]+)/)[1]) === -1;
//      });
//
//      if (originAssets.length) {
//        originAssets[originAssets.length - 1] = moduleMatched[1] + zebraModules.join(',');
//      } else {
//        originAssets.pop();
//      }
//
//      if (debugModules.length) {
//        debugModules.forEach(function(item) {
//          originAssets.push(`${item}`);
//        });
//      }
//    }
//  }
//
//  console.log(originAssets);
//});
