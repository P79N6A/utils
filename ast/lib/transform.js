/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description transform
 */

'use strict';

let fs = require('fs');
let path = require('path');
let UglifyJS = require('uglify-js');

module.exports = {
  transform: function(sourceCode) {
    let ast = this.ast = this.getUglifyJSAst(sourceCode);
    let targetAst = this.targetAst = this.gettargetAst();

    // origin nodes
    let originTopBody;        // 顶层 body
    let originAddLambda;      // 定义模块时传入的匿名函数（KISSY.add）
    let originMod;            // 返回的模块 Mod
    let originModProtoTypes;  // Mod prototypes
    let originRequires = [];  // KISSY.add 匿名函数内顶层 require(*)
    let originFunDefs = [];   // KISSY.add 匿名函数内顶层函数直接量
    let originStats = [];     // KISSY.add 匿名函数内顶层语句（非 originFunDefs 或者 originRequires）
    let originVars = [];      // KISSY.add 匿名函数内顶层 var 声明（非 originRequires）

    let walker = new UglifyJS.TreeWalker(function(node, descend) {
      if (node instanceof UglifyJS.AST_Toplevel) {
        originTopBody = node.body;
      } else if (node instanceof UglifyJS.AST_Call) {
        if (
          node.expression.property === 'add' &&
          node.expression.expression && node.expression.expression.name === 'KISSY' &&
          node.args.length === 1 && node.args[0] instanceof UglifyJS.AST_Function
        ) {
          originAddLambda = node.args[0];

          node.args[0].body.forEach(function(item, index) {
            if (item instanceof UglifyJS.AST_Var) {
              if (item.definitions[0].value instanceof UglifyJS.AST_Call && item.definitions[0].value.expression.name === 'require') {
                originRequires.push(item);
              } else {
                originVars.push(item);
                originStats.push(item);
              }
            } else if (item instanceof UglifyJS.AST_Defun) {
              if (item.name.name !== 'Mod') {
                originFunDefs.push(item);
              }
            } else if (item instanceof UglifyJS.AST_Statement) {
              if (item.body instanceof UglifyJS.AST_Assign && item.body.left.property === 'prototype' && item.body.left.expression.name === 'Mod') {
                return;
              } else if (item instanceof UglifyJS.AST_Return) {
                return;
              }

              originStats.push(item);
            }
          });
        }
      } else if (node instanceof UglifyJS.AST_Defun) {
        if (node.name.name === 'Mod' && walker.parent() === originAddLambda) {
          originMod = node;
        }
      } else if (node instanceof UglifyJS.AST_Assign) {
        if (node.left.property === 'prototype' && node.left.expression.name === 'Mod') {
          originModProtoTypes = node.right.properties;
        }
      }
    });

    ast.walk(walker);

    // check required nodes
    if (!(originAddLambda && originMod)) {
      throw new Error('无法预料的原始代码结构');
    }

    let transformer = new UglifyJS.TreeTransformer(null, function(node) {
      if (node instanceof UglifyJS.AST_Toplevel) {
        node.body = node.body.concat(originFunDefs);
        Array.prototype.splice.apply(node.body, [3, 0].concat(originStats));
        Array.prototype.splice.apply(node.body, [3, 0].concat(originRequires));
      } else if (node instanceof UglifyJS.AST_Object) {
        node.properties.forEach(function(item, index) {
          if (item.key === 'initializer' && item.value instanceof UglifyJS.AST_Lambda) {
            item.value.body = item.value.body.concat(originMod.body);

            // 增加原型属性
            node.properties = node.properties.concat(originModProtoTypes);
          }
        });
      }
    });

    return targetAst.transform(transformer).print_to_string({
      beautify: true,
      comments: true,
      indent_level: 2
    });
  },
  getUglifyJSAst: function(sourceCode) {
    return UglifyJS.parse(sourceCode);
  },
  gettargetAst: function() {
    let sourceCode = fs.readFileSync(path.join(__dirname, 'sample.js'), 'utf-8');

    return this.getUglifyJSAst(sourceCode);
  }
};
