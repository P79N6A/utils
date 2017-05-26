/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description test
 */

'use strict';

const parser = require('./calc.js');
const ast = parser.parse('-abs(1 - 2 * 2)');

let result = evaluate(ast);

console.log(result);


function evaluate(ast) {
  if (!ast.opt) {
    return ast;
  } else {
    switch (ast.opt) {
      case '+':
        return evaluate(ast.left) + evaluate(ast.right);
        break;
      case '-':
        return evaluate(ast.left) - evaluate(ast.right);
        break;
      case '*':
        return evaluate(ast.left) * evaluate(ast.right);
        break;
      case '/':
        return evaluate(ast.left) / evaluate(ast.right);
        break;
      case 'fn':
        return Math[ast.id](evaluate(ast.left));
        break;
    }
  }
}
