/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description index
 */

'use strict';

const transform = require('./lib/transform');
const path = require('path');
const fs = require('fs');

let sourcePath = path.join(__dirname, 'test', 'origin.js');
let targetPath = path.join(__dirname, 'test', 'target.js');
let astPath = path.join(__dirname, 'test', 'syntax.json');
let sourceCode = fs.readFileSync(sourcePath, 'utf-8');

//fs.writeFileSync(astPath, JSON.stringify(transform.getSyntax(sourceCode), null, 2), 'utf-8');
fs.writeFileSync(targetPath, transform.transform(sourceCode), 'utf-8');
