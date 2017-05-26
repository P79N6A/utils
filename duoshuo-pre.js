/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description duoshuo
 */

'use strict';

const fs = require('fs');
const path = require('path');

let duoshuoComments = fs.readFileSync(path.join('/Users/smalldragonluo/code/natie/migrate/duoshuo-migrate-to-disqus/example/taobaofed.json'), 'utf-8');
let regexpBigId = /: \d+/g;

duoshuoComments = duoshuoComments.replace(/([^"\d])(\d{16,})([^"\d])/g, '$1"$2"$3');

fs.writeFileSync(path.join('/Users/smalldragonluo/code/natie/migrate/duoshuo-migrate-to-disqus/example/target.json'), duoshuoComments, 'utf-8');
