/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description qs
 */

'use strict';

const qs = require('qs');
const obj = qs.parse('?a=1&b=2', {
  ignoreQueryPrefix: true,
});
const q = {urls: [{a: 'x'}, {b: 'c'}]};

console.log(obj);
console.log(qs.stringify(q, {indices: false}));
