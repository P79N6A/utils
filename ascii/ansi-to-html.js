/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description ansi-to-html
 */

'use strict';

const ansiHTML = require('ansi-html');
const chalk = require('chalk');
let ansiStr = `${chalk.red('hello')} world!`;
const buf = Buffer.from(ansiStr, 'utf-8');

console.log('\x1b[31mhello');
