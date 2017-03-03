/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description thenify.js 类
 */

'use strict';

const thenify = require('thenify');
const exec = thenify(require('child_process').exec);

exec('lsof -i4:2929 | grep node').then(function(data) {
  if (data) {
    let infoRows = data[0].split(/\n/);
    var pids = [];

    for (var i = 0; i < infoRows.length; i++) {
      var params = infoRows[i].match(/^[^\d]+(\d+)/);

      if (params) {
        pids.push(params[1]);
      }
    }

    console.log(pids);
  }
});
