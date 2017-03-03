/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description Utils 类
 */

'use strict';

const co = require('co');
const cp = require('child_process');
const colors = require('colors/safe');

co(function*() {
  yield publish('/Users/smalldragonluo/code/tms/test/module/lx-test201610141537');
});

function publish(modulePath) {
  return new Promise((resolve, reject)=> {
    process.env.FORCE_COLOR = true;

    const curProcess = cp.spawn('def', ['p', '-d'], {
      cwd: modulePath,
      env: process.env,
      stdio: [process.stdin, 'pipe', 'pipe']
    });

    curProcess.stdout.on('data', (data) => {
      console.log(`${colors.yellow('publish:')}`, data.toString('utf8'));
    });

    curProcess.stderr.on('data', (data) => {
      console.log(`${colors.red('publish:')}`, data.toString('utf8'));
    });

    curProcess.on('close', (code) => {
      if (code !== 0) {
        reject({
          msg: 'publish 出现错误'
        });
      } else {
        resolve({
          msg: 'publish 完成'
        });
      }
    });
  });
}
