/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description escape
 */

'use strict';

const path = require('path');
const sanitize = require("sanitize-filename");

const fileName = '/-web-20160424164927im_-http://ued.taobao.org-blog-wp-content-uploads-2014-04-%E5%96%84%E7%B9%81_avatar_1396942943-50x50.jpg';
const escaped = sanitize(fileName);

console.log(escaped);
