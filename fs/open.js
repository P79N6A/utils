/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description open test
 */

var fs = require('fs');
var path = require('path');

var p = '/a/b/c-d/package.json';

//var a = p.substring(path.dirname(p).length, p.length).replace(new RegExp(path.sep, 'g'), '');
var a = path.dirname(p);

console.log(a);
