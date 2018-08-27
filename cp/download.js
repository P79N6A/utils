/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description a
 */

'use strict';

/*
var cp = require('child_process').spawn('/usr/bin/curl', ['https://www.taobao.com']);

cp.stdout.setEncoding('utf-8');
cp.stdout.on('data', function(data) {
  console.log(data);
});
*/

var fs = require('fs');
var childProcess = require('child_process');

var cp = childProcess.spawn('/usr/bin/curl', ['https://img.alicdn.com/任意内容/TB1uq2BIFXXXXbFXpXXXXXXXXXX_!!0-item_pic.jpg']);

cp.stdout.pipe(fs.createWriteStream('/Users/username/Downloads/test.jpg'));
