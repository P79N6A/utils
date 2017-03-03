/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description ip
 */

'use strict';

const os = require('os');

let intranetIP = '127.0.0.1';

os.networkInterfaces().en0.forEach(function(item) {
  if (item.family === 'IPv4') {
    intranetIP = item.address;
  }
});

console.log(intranetIP);
