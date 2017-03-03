/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description signals.js 类
 */

'use strict';

var childProcess = require('child_process');

var cp = childProcess.spawn('/Users/smalldragonluo/code/midway/tbsecurity/node_modules/node/bin/node', ['../index.js'], {
  stdio: 'ignore',
  detached: true
});

cp.unref();
