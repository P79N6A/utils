/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description windvane
 */

'use strict';

const fs = require('fs');
const path = require('path');

let JSONStr = fs.readFileSync(path.join(__dirname, 'kimi.json'), 'utf-8');
let matched = JSONStr.match(/lib-windvane\/([^\/\s":]+)\//g);

if (matched) {
  for(let i = 0; i < matched.length; ++i) {
    let version = matched[i].split('/')[1];

    if (version < '2.1.8') {
      throw {
        msg: 'aaa'
      };
    }
  }
}
