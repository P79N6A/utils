/**
 * @author 龙喜<xiaolong.lxl@alibaba-inc.com>
 * @description currying
 */

console.log(currying(sum, 1, 2)(3));
console.log(currying2(sum)(1)(2)(3));

function sum(a, b, c) {
  return a + b + c;
}

function currying() {
  var func = arguments[0];

  arguments[0] = null;

  return func.bind.apply(func, arguments);
}


function currying2(func) {
  return function() {
    if (func.length > 1) {
      var args = Array.from(arguments);

      args.unshift(null);

      return currying2(func.bind.apply(func, args));
    } else {
      return func(arguments[0]);
    }
  }
}
