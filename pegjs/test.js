/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description test
 */

'use strict';

const parser = require('./css');
const code = `
      .a {

          color: red;

      }
      `;

const ast = parser.parse(code);

console.log(ast);
