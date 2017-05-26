/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description dir
 */

'use strict';

const fs = require('fs');
const path = require('path');

let accessStatus = fs.accessSync('/addxz', 7);

console.log(accessStatus);

//fs.constants.F_OK - path is visible to the calling process. This is useful for determining if a file exists, but says nothing about rwx permissions. Default if no mode is specified.
//fs.constants.R_OK - path can be read by the calling process.
//fs.constants.W_OK - path can be written by the calling process.
//fs.constants.X_OK - path can be executed by the calling process. This has no effect on Windows (will behave like fs.constants.F_OK).